import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { stripe } from "~/lib/stripe";
import type Stripe from "stripe";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        customerName: z.string(),
        shippingAddress: z.string(),
        city: z.string(),
        postalCode: z.string(),
        country: z.string(),
        items: z.array(
          z.object({
            productId: z.string(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Calculate total
      const subtotal = input.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const shippingCost = subtotal > 50 ? 0 : 5.99;
      const total = subtotal + shippingCost;

      // Get Stripe customer ID if user is authenticated
      let stripeCustomerId: string | null = null;

      if (ctx.userId) {
        // Check if user exists in database
        let user = await ctx.db.user.findUnique({
          where: { id: ctx.userId },
          select: { stripeCustomerId: true },
        });

        // If user doesn't exist, create them
        user ??= await ctx.db.user.create({
          data: {
            id: ctx.userId,
            email: input.email,
          },
          select: { stripeCustomerId: true },
        });

        stripeCustomerId = user.stripeCustomerId;

        // If user exists but no Stripe customer, create one
        if (!stripeCustomerId) {
          const customer = await stripe.customers.create({
            email: input.email,
            name: input.customerName,
            metadata: {
              clerkUserId: ctx.userId,
            },
          });

          stripeCustomerId = customer.id;

          // Update user with Stripe customer ID
          await ctx.db.user.update({
            where: { id: ctx.userId },
            data: { stripeCustomerId },
          });
        }
      }

      // Create order in database
      const order = await ctx.db.order.create({
        data: {
          email: input.email,
          customerName: input.customerName,
          shippingAddress: input.shippingAddress,
          city: input.city,
          postalCode: input.postalCode,
          country: input.country,
          totalAmount: total,
          status: "PENDING",
          userId: ctx.userId ?? null,
          items: {
            create: input.items.map((item) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      // Create Stripe line items
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        input.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));

      // Add shipping if applicable
      if (shippingCost > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shipping",
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });
      }

      // Create Stripe checkout session with conditional properties
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        metadata: {
          orderId: order.id,
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      };

      // Add customer or customer_email
      if (stripeCustomerId) {
        sessionParams.customer = stripeCustomerId;
      } else {
        sessionParams.customer_email = input.email;
      }

      // Add clerkUserId to metadata if authenticated
      if (ctx.userId) {
        sessionParams.metadata = {
          ...sessionParams.metadata,
          clerkUserId: ctx.userId,
        };
      }

      const session = await stripe.checkout.sessions.create(sessionParams);

      // Save Stripe session ID to order
      await ctx.db.order.update({
        where: { id: order.id },
        data: { stripeSessionId: session.id },
      });

      return { url: session.url };
    }),

  getBySessionId: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { stripeSessionId: input.sessionId },
        include: { items: true },
      });

      if (order?.userId && order.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to view this order",
        });
      }

      return order;
    }),

  getById: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
        include: { items: true },
      });

      if (order?.userId && order.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to view this order",
        });
      }

      return order;
    }),

  getMyOrders: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(10),
          cursor: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const cursor = input?.cursor;

      const orders = await ctx.db.order.findMany({
        take: limit + 1,
        where: {
          userId: ctx.userId,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      });

      let nextCursor: string | undefined = undefined;
      if (orders.length > limit) {
        const nextItem = orders.pop();
        nextCursor = nextItem?.id;
      }

      return {
        orders,
        nextCursor,
      };
    }),

  cancelOrder: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      if (order.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to cancel this order",
        });
      }

      if (order.status === "PAID") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Cannot cancel a paid order. Please request a refund instead.",
        });
      }

      return await ctx.db.order.update({
        where: { id: input.orderId },
        data: { status: "CANCELLED" },
      });
    }),

  getAllOrders: publicProcedure
    .input(
      z
        .object({
          email: z.string().email().optional(),
          status: z
            .enum([
              "PENDING",
              "PAID",
              "FAILED",
              "EXPIRED",
              "CANCELLED",
              "REFUNDED",
              "DISPUTED",
            ])
            .optional(),
          limit: z.number().min(1).max(100).default(10),
          cursor: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const cursor = input?.cursor;

      const orders = await ctx.db.order.findMany({
        take: limit + 1,
        where: {
          ...(input?.email && { email: input.email }),
          ...(input?.status && { status: input.status }),
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      });

      let nextCursor: string | undefined = undefined;
      if (orders.length > limit) {
        const nextItem = orders.pop();
        nextCursor = nextItem?.id;
      }

      return {
        orders,
        nextCursor,
      };
    }),
});

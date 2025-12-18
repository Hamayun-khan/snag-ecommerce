import type { NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "~/lib/stripe";
import { db } from "~/server/db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("❌ Missing Stripe signature");
    return new Response(JSON.stringify({ error: "Missing Stripe signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Webhook verified:", event.type);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("⚠️ Webhook signature verification failed:", errorMessage);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("💳 Checkout session completed:", session.id);
        console.log("📊 Payment status:", session.payment_status);
        console.log("💰 Payment intent:", session.payment_intent);

        if (session.payment_status === "paid") {
          // Get payment intent ID
          const paymentIntentId =
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id;

          const updatedOrder = await db.order.update({
            where: { stripeSessionId: session.id },
            data: {
              status: "PAID",
              stripePaymentId: paymentIntentId ?? null,
              paidAt: new Date(),
            },
          });

          console.log(`✅ Order updated to PAID:`, {
            orderId: updatedOrder.id,
            sessionId: session.id,
            paymentId: paymentIntentId,
            paidAt: updatedOrder.paidAt,
          });
        }
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        console.log("💳 Async payment succeeded:", session.id);

        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

        const updatedOrder = await db.order.update({
          where: { stripeSessionId: session.id },
          data: {
            status: "PAID",
            stripePaymentId: paymentIntentId ?? null,
            paidAt: new Date(),
          },
        });

        console.log(`✅ Order updated (async payment):`, {
          orderId: updatedOrder.id,
          sessionId: session.id,
          paymentId: paymentIntentId,
        });
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        console.log("❌ Async payment failed:", session.id);

        await db.order.update({
          where: { stripeSessionId: session.id },
          data: { status: "FAILED" },
        });

        console.log(`❌ Order status updated to FAILED: ${session.id}`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        console.log("⏰ Checkout session expired:", session.id);

        await db.order.update({
          where: { stripeSessionId: session.id },
          data: { status: "EXPIRED" },
        });

        console.log(`⏰ Order status updated to EXPIRED: ${session.id}`);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`💰 Payment intent succeeded: ${paymentIntent.id}`);

        // This event fires AFTER checkout.session.completed
        // Order should already be updated, so just log it
        const existingOrder = await db.order.findFirst({
          where: { stripePaymentId: paymentIntent.id },
        });

        if (existingOrder) {
          console.log(`ℹ️ Order already updated: ${existingOrder.id}`);
        } else {
          console.log(
            `⚠️ No order found for payment intent: ${paymentIntent.id}`,
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log(`❌ Payment intent failed: ${paymentIntent.id}`);

        // Try to find by payment ID
        const order = await db.order.findFirst({
          where: { stripePaymentId: paymentIntent.id },
        });

        if (order) {
          await db.order.update({
            where: { id: order.id },
            data: { status: "FAILED" },
          });
          console.log(`❌ Order status updated to FAILED: ${order.id}`);
        } else {
          console.log(
            `⚠️ No order found for failed payment: ${paymentIntent.id}`,
          );
        }
        break;
      }

      case "payment_intent.canceled": {
        const paymentIntent = event.data.object;
        console.log(`🚫 Payment intent canceled: ${paymentIntent.id}`);

        const order = await db.order.findFirst({
          where: { stripePaymentId: paymentIntent.id },
        });

        if (order) {
          await db.order.update({
            where: { id: order.id },
            data: { status: "CANCELLED" },
          });
          console.log(`🚫 Order status updated to CANCELLED: ${order.id}`);
        }
        break;
      }

      case "charge.succeeded": {
        const charge = event.data.object;
        console.log(`✅ Charge succeeded: ${charge.id}`);
        break;
      }

      case "charge.failed": {
        const charge = event.data.object;
        console.log(`❌ Charge failed: ${charge.id}`);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        console.log(`💰 Charge refunded: ${charge.id}`);

        const paymentIntentId =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id;

        if (paymentIntentId) {
          await db.order.updateMany({
            where: { stripePaymentId: paymentIntentId },
            data: { status: "REFUNDED" },
          });
          console.log(
            `💰 Order(s) updated to REFUNDED for payment: ${paymentIntentId}`,
          );
        }
        break;
      }

      case "charge.dispute.created": {
        const dispute = event.data.object;
        console.log(`⚠️ Dispute created: ${dispute.id}`);

        const chargeId =
          typeof dispute.charge === "string"
            ? dispute.charge
            : dispute.charge?.id;

        if (chargeId) {
          const charge = await stripe.charges.retrieve(chargeId);
          const paymentIntentId =
            typeof charge.payment_intent === "string"
              ? charge.payment_intent
              : charge.payment_intent?.id;

          if (paymentIntentId) {
            await db.order.updateMany({
              where: { stripePaymentId: paymentIntentId },
              data: { status: "DISPUTED" },
            });
            console.log(
              `⚠️ Order(s) updated to DISPUTED for payment: ${paymentIntentId}`,
            );
          }
        }
        break;
      }

      case "charge.dispute.closed": {
        const dispute = event.data.object;
        console.log(
          `✅ Dispute closed: ${dispute.id} - Status: ${dispute.status}`,
        );
        break;
      }

      case "refund.created": {
        const refund = event.data.object;
        console.log(`💰 Refund created: ${refund.id}`);
        break;
      }

      case "refund.updated": {
        const refund = event.data.object;
        console.log(`💰 Refund updated: ${refund.id}`);
        break;
      }

      case "refund.failed": {
        const refund = event.data.object;
        console.log(`❌ Refund failed: ${refund.id}`);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return new Response(
      JSON.stringify({
        error: "Processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { stripe } from "~/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SIGNING_SECRET");
    return new Response("Server configuration error", { status: 500 });
  }

  // Verify webhook using Clerk's built-in function
  let evt: WebhookEvent;

  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  // Handle events
  const eventType = evt.type;
  console.log(`🔔 Clerk webhook: ${eventType}`);

  try {
    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = evt.data;
        const primaryEmail = email_addresses[0]?.email_address;

        if (!primaryEmail) {
          console.error("❌ No email found for user:", id);
          return new Response("No email provided", { status: 400 });
        }

        let stripeCustomerId: string;

        try {
          // Check for existing Stripe customer by email
          const existingCustomers = await stripe.customers.list({
            email: primaryEmail,
            limit: 1,
          });

          if (existingCustomers.data.length > 0) {
            // Use existing Stripe customer
            stripeCustomerId = existingCustomers.data[0]!.id;

            // Update metadata to link to Clerk user
            await stripe.customers.update(stripeCustomerId, {
              metadata: {
                clerkUserId: id,
              },
            });

            console.log(
              `🔗 Linked existing Stripe customer ${stripeCustomerId} to Clerk user ${id}`,
            );
          } else {
            // Create new Stripe customer
            const customer = await stripe.customers.create({
              email: primaryEmail,
              name:
                `${first_name ?? ""} ${last_name ?? ""}`.trim() || undefined,
              metadata: {
                clerkUserId: id,
              },
            });

            stripeCustomerId = customer.id;
            console.log(
              `✅ Created new Stripe customer ${stripeCustomerId} for Clerk user ${id}`,
            );
          }
        } catch (stripeError) {
          console.error("❌ Stripe API error:", stripeError);
          // Don't fail the webhook if Stripe fails - we can fix this later
          // Create user without Stripe ID for now
          stripeCustomerId = "";
        }

        // Use upsert to handle race conditions
        await db.user.upsert({
          where: { id },
          create: {
            id,
            email: primaryEmail,
            firstName: first_name ?? null,
            lastName: last_name ?? null,
            stripeCustomerId: stripeCustomerId ?? null,
            deletedAt: null,
          },
          update: {
            email: primaryEmail,
            firstName: first_name ?? null,
            lastName: last_name ?? null,
            deletedAt: null, // Restore user if they were soft-deleted
            ...(stripeCustomerId && { stripeCustomerId }),
          },
        });

        // Link any guest orders to this user
        const guestOrders = await db.order.updateMany({
          where: {
            email: primaryEmail,
            userId: null, // Only guest orders
          },
          data: {
            userId: id,
          },
        });

        if (guestOrders.count > 0) {
          console.log(
            `🔗 Linked ${guestOrders.count} guest orders to user ${id}`,
          );
        }

        console.log(`✅ User created/updated: ${id}`);
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = evt.data;
        const primaryEmail = email_addresses[0]?.email_address;

        if (!primaryEmail) {
          console.error("❌ No email found for user:", id);
          return new Response("No email provided", { status: 400 });
        }

        // Use upsert in case user doesn't exist yet (webhook ordering issues)
        await db.user.upsert({
          where: { id },
          create: {
            id,
            email: primaryEmail,
            firstName: first_name ?? null,
            lastName: last_name ?? null,
            stripeCustomerId: null,
            deletedAt: null,
          },
          update: {
            email: primaryEmail,
            firstName: first_name ?? null,
            lastName: last_name ?? null,
          },
        });

        console.log(`✅ User updated: ${id}`);
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;

        if (!id) {
          console.error("❌ No user ID provided");
          return new Response("No user ID provided", { status: 400 });
        }

        try {
          // Soft delete - preserves order history and relationships
          await db.user.update({
            where: { id },
            data: {
              deletedAt: new Date(),
            },
          });

          console.log(`✅ User soft deleted: ${id}`);
        } catch {
          console.log(`⚠️ User ${id} not found in database during deletion`);
          // Don't fail - user might have been deleted already
        }

        break;
      }

      default:
        console.log(`ℹ️ Unhandled Clerk event: ${eventType}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("❌ Error processing Clerk webhook:", error);

    // Return 500 so Clerk will retry
    return new Response(
      JSON.stringify({
        error: "Processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

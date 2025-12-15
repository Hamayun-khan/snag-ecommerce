import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "~/lib/store/stripe";
import { db } from "~/server/db";

export async function POST(req: Request) {
  const body = await req.text();
    const headersList = await headers();
      const signature = headersList.get("stripe-signature");

        if (!signature) {
            return NextResponse.json(
                  { error: "Missing Stripe signature" },
                        { status: 400 }
                            );
                              }

                                let event: Stripe.Event;

                                  // 1️⃣ Verify webhook signature
                                    try {
                                        event = stripe.webhooks.constructEvent(
                                              body,
                                                    signature,
                                                          process.env.STRIPE_WEBHOOK_SECRET!
                                                              );
                                                                } catch (error) {
                                                                    console.error("❌ Webhook signature verification failed", error);
                                                                        return NextResponse.json(
                                                                              { error: "Invalid signature" },
                                                                                    { status: 400 }
                                                                                        );
                                                                                          }

                                                                                            // 2️⃣ Handle events
                                                                                              try {
                                                                                                  switch (event.type) {
                                                                                                        case "checkout.session.completed": {
                                                                                                                const session = event.data.object;

                                                                                                                        await db.order.update({
                                                                                                                                  where: { stripeSessionId: session.id },
                                                                                                                                            data: { status: "paid" },
                                                                                                                                                    });

                                                                                                                                                            console.log(`✅ Order paid: ${session.id}`);
                                                                                                                                                                    break;
                                                                                                                                                                          }

                                                                                                                                                                                case "checkout.session.expired": {
                                                                                                                                                                                        const session = event.data.object;

                                                                                                                                                                                                await db.order.update({
                                                                                                                                                                                                          where: { stripeSessionId: session.id },
                                                                                                                                                                                                                    data: { status: "expired" },
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                    console.log(`⏰ Order expired: ${session.id}`);
                                                                                                                                                                                                                                            break;
                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                        case "payment_intent.payment_failed": {
                                                                                                                                                                                                                                                                const paymentIntent = event.data.object;

                                                                                                                                                                                                                                                                        console.log(`❌ Payment failed: ${paymentIntent.id}`);
                                                                                                                                                                                                                                                                                break;
                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                            case "charge.refunded": {
                                                                                                                                                                                                                                                                                                    const charge = event.data.object;

                                                                                                                                                                                                                                                                                                            const paymentIntentId =
                                                                                                                                                                                                                                                                                                                      typeof charge.payment_intent === "string"
                                                                                                                                                                                                                                                                                                                                  ? charge.payment_intent
                                                                                                                                                                                                                                                                                                                                              : charge.payment_intent?.id ?? "unknown";

                                                                                                                                                                                                                                                                                                                                                      console.log(`💰 Refund processed: ${paymentIntentId}`);
                                                                                                                                                                                                                                                                                                                                                              break;
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                          default:
                                                                                                                                                                                                                                                                                                                                                                                  console.log(`⚠️ Unhandled Stripe event: ${event.type}`);
                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                          return NextResponse.json({ received: true });
                                                                                                                                                                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                console.error("🔥 Error processing Stripe webhook", error);
                                                                                                                                                                                                                                                                                                                                                                                                    return NextResponse.json(
                                                                                                                                                                                                                                                                                                                                                                                                          { error: "Webhook processing failed" },
                                                                                                                                                                                                                                                                                                                                                                                                                { status: 500 }
                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                      }
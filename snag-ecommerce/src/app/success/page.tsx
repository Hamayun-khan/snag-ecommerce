"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useCartStore } from "~/lib/store/cartStore";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);

  const { data: order, isLoading } = api.order.getBySessionId.useQuery(
    { sessionId: sessionId ?? "" },
    { enabled: !!sessionId },
  );

  useEffect(() => {
    // Clear cart on successful order
    if (order) {
      clearCart();
    }
  }, [order, clearCart]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-secondary/30 px-4">
        <Loader2 className="mb-6 h-12 w-12 animate-spin text-primary" />
        <p className="text-xl text-foreground">Confirming your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-secondary/30 px-4">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <Package className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Order Not Found
        </h2>
        <p className="mb-8 text-muted-foreground">
          We couldn't find your order details. Please check your email.
        </p>
        <Button asChild className="btn-primary">
          <Link href="/">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-3xl">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-success/20"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase, <span className="font-semibold text-foreground">{order.customerName}</span>!
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="mb-8 rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Order Details
          </h2>

          {/* Key Info Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Order ID
              </p>
              <p className="mt-2 font-mono text-sm font-semibold text-foreground">
                {order.id.slice(0, 8)}
              </p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Order Date
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-lg bg-success/10 p-4">
              <p className="text-xs font-semibold text-success uppercase">
                Total Amount
              </p>
              <p className="mt-2 text-2xl font-bold text-success">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-8 border-t border-border/50"></div>

          {/* Shipping Address */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Truck className="h-5 w-5 text-primary" />
              Shipping Address
            </h3>
            <div className="ml-7 space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{order.shippingAddress}</p>
              <p>
                {order.city}, {order.postalCode}
              </p>
              <p>{order.country}</p>
            </div>
          </div>

          {/* Items Ordered */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Package className="h-5 w-5 text-primary" />
              Items Ordered
            </h3>
            <div className="ml-7 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-secondary/30 p-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total Summary */}
          <div className="border-t border-border/50 pt-6">
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-foreground">Total Paid</span>
              <span className="text-2xl font-bold text-primary">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h3 className="mb-6 text-xl font-bold text-foreground">
            What Happens Next
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Confirmation Email
                </p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for order confirmation at {order.email}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Shipping Updates</p>
                <p className="text-sm text-muted-foreground">
                  We'll send tracking information once your order ships
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Arrives within 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button asChild className="btn-primary gap-2 px-8 py-3 text-lg">
            <Link href="/">
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Truck, Lock } from "lucide-react";
import type { CartItem } from "~/lib/store/cartStore";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  finalTotal: number;
}

export function CheckoutOrderSummary({
  items,
  totalPrice,
  shippingCost,
  finalTotal,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Order Summary
        </h2>

        {/* Items List */}
        <div className="mb-6 max-h-64 space-y-3 overflow-y-auto border-b border-border/50 pb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-foreground">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-3 border-b border-border/50 pb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Shipping</span>
            </div>
            {shippingCost === 0 ? (
              <span className="font-semibold text-success">FREE</span>
            ) : (
              <span className="font-semibold text-foreground">
                ${shippingCost.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 flex justify-between py-6">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-3xl font-bold text-primary">
            ${finalTotal.toFixed(2)}
          </span>
        </div>

        {/* Security Badge */}
        <div className="rounded-lg border border-success/30 bg-success/5 p-4 text-center">
          <p className="flex items-center justify-center gap-2 text-xs text-success">
            <Lock className="h-4 w-4" />
            Secure payment with Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

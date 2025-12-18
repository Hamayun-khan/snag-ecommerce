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
      <div className="border-border/50 bg-card sticky top-24 rounded-2xl border p-6">
        <h2 className="text-foreground mb-6 text-xl font-bold">
          Order Summary
        </h2>

        {/* Items List */}
        <div className="border-border/50 mb-6 max-h-64 space-y-3 overflow-y-auto border-b pb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="text-foreground font-medium">{item.name}</p>
                <p className="text-muted-foreground text-xs">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-foreground font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="border-border/50 space-y-3 border-b pb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Truck className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">Shipping</span>
            </div>
            {shippingCost === 0 ? (
              <span className="text-success font-semibold">FREE</span>
            ) : (
              <span className="text-foreground font-semibold">
                ${shippingCost.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 flex justify-between py-6">
          <span className="text-foreground text-lg font-semibold">Total</span>
          <span className="text-primary text-3xl font-bold">
            ${finalTotal.toFixed(2)}
          </span>
        </div>

        {/* Security Badge */}
        <div className="border-success/30 bg-success/5 rounded-lg border p-4 text-center">
          <p className="text-success flex items-center justify-center gap-2 text-xs">
            <Lock className="h-4 w-4" />
            Secure payment with Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

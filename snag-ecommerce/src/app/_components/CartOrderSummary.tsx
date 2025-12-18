"use client";

import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useCallback, useMemo } from "react";
import type { CartItem } from "~/lib/store/cartStore";
import { useCartStore } from "~/lib/store/cartStore";
import { toast } from "sonner";

interface CartOrderSummaryProps {
  items: CartItem[];
}

export function CartOrderSummary({
  items: initialItems,
}: CartOrderSummaryProps) {
  const { clearCart } = useCartStore();

  const { totalPrice, shippingCost, finalTotal } = useMemo(() => {
    const subtotal = initialItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 50 ? 0 : 5.99;
    return {
      totalPrice: subtotal,
      shippingCost: shipping,
      finalTotal: subtotal + shipping,
    };
  }, [initialItems]);

  const handleClearCart = useCallback(() => {
    clearCart();
    toast.success("Cart cleared", {
      duration: 2000,
    });
  }, [clearCart]);

  return (
    <div className="lg:col-span-1">
      <div className="border-border/50 bg-card sticky top-24 rounded-2xl border p-6 shadow-sm">
        <h2 className="text-foreground mb-6 text-2xl font-bold">
          Order Summary
        </h2>

        {/* Breakdown */}
        <div className="border-border/50 space-y-3 border-b pb-6">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Truck className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground">Shipping</span>
            </div>
            {totalPrice > 50 ? (
              <span className="text-success font-semibold">FREE</span>
            ) : (
              <span className="text-foreground font-semibold">
                ${shippingCost.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Free Shipping Message */}
        {totalPrice > 0 && totalPrice < 50 && (
          <div className="bg-primary/10 my-4 rounded-lg p-3">
            <p className="text-primary text-xs">
              Free shipping on orders over $50. Add $
              {(50 - totalPrice).toFixed(2)} more!
            </p>
          </div>
        )}

        {/* Total */}
        <div className="mb-6 flex justify-between py-6 text-xl">
          <span className="text-foreground font-semibold">Total</span>
          <span className="text-primary text-2xl font-bold">
            ${finalTotal.toFixed(2)}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button asChild className="btn-primary w-full text-lg">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button asChild className="btn-secondary w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>

        {/* Clear Cart Button */}
        <button
          onClick={handleClearCart}
          className="border-destructive text-destructive hover:bg-destructive/10 mt-4 w-full rounded-lg border px-4 py-2 text-sm transition-colors"
        >
          Clear Cart
        </button>

        {/* Trust Badge */}
        <div className="border-border/50 mt-6 border-t pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            🔒 Secure checkout with Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

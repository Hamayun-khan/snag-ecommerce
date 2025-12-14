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

export function CartOrderSummary({ items: initialItems }: CartOrderSummaryProps) {
  const { clearCart } = useCartStore();

  const { totalPrice, shippingCost, finalTotal } = useMemo(() => {
    const subtotal = initialItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
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
      <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Order Summary
        </h2>

        {/* Breakdown */}
        <div className="space-y-3 border-b border-border/50 pb-6">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Shipping</span>
            </div>
            {totalPrice > 50 ? (
              <span className="font-semibold text-success">FREE</span>
            ) : (
              <span className="font-semibold text-foreground">
                ${shippingCost.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Free Shipping Message */}
        {totalPrice > 0 && totalPrice < 50 && (
          <div className="my-4 rounded-lg bg-primary/10 p-3">
            <p className="text-xs text-primary">
              Free shipping on orders over $50. Add $
              {(50 - totalPrice).toFixed(2)} more!
            </p>
          </div>
        )}

        {/* Total */}
        <div className="mb-6 flex justify-between py-6 text-xl">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
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
          className="mt-4 w-full rounded-lg border border-destructive px-4 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          Clear Cart
        </button>

        {/* Trust Badge */}
        <div className="mt-6 border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Secure checkout with Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

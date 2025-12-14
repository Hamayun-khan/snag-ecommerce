"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useCartStore } from "~/lib/store/cartStore";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice + shippingCost;

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId);
    toast.success(`${itemName} removed from cart`, {
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared", {
      duration: 2000,
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-secondary/30 px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Your cart is empty
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Explore our collection and add items to your cart
        </p>
        <Button asChild className="btn-primary">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Shopping Cart
            </h1>
            <p className="mt-1 text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="rounded-lg border-destructive text-destructive hover:bg-destructive/10"
          >
            Clear Cart
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border/50 bg-card p-4 transition-all duration-200 hover:shadow-md sm:p-6"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-32 sm:w-32">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-lg font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      {/* Quantity Control */}
                      <div className="inline-flex items-center rounded-lg border border-border bg-secondary">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex flex-shrink-0 flex-col items-end justify-center">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
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
                    Free shipping on orders over $50. Add ${(50 - totalPrice).toFixed(2)} more!
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

              {/* Trust Badge */}
              <div className="mt-6 border-t border-border/50 pt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure checkout with Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

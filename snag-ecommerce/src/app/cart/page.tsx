"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "~/lib/store/cartStore";
import { CartItemsList } from "~/app/_components/CartItemsList";
import { CartOrderSummary } from "~/app/_components/CartOrderSummary";
import { EmptyCart } from "~/app/_components/EmptyCart";
import { CartItemListSkeleton } from "~/components/skeletons";

export default function CartPage() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <CartItemListSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
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
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <CartItemsList items={items} />
          <CartOrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useCallback } from "react";
import type { CartItem } from "~/lib/store/cartStore";
import { useCartStore } from "~/lib/store/cartStore";
import { toast } from "sonner";

interface CartItemsListProps {
  items: CartItem[];
}

export function CartItemsList({ items: initialItems }: CartItemsListProps) {
  const { removeItem, updateQuantity } = useCartStore();

  const handleRemoveItem = useCallback(
    (itemId: string, itemName: string) => {
      removeItem(itemId);
      toast.success(`${itemName} removed from cart`, {
        duration: 2000,
      });
    },
    [removeItem]
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      updateQuantity(itemId, newQuantity);
    },
    [updateQuantity]
  );

  return (
    <div className="space-y-4 lg:col-span-2">
      {initialItems.map((item) => (
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
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-lg font-bold text-primary">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Quantity Control */}
                <div className="inline-flex items-center rounded-lg border border-border bg-secondary">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
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
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
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
  );
}

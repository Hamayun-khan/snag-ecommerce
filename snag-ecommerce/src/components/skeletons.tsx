"use client";

import { Skeleton } from "~/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-0 overflow-hidden">
      <Skeleton className="h-56 w-full" />
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-end justify-between gap-3 mt-4">
          <div>
            <Skeleton className="h-7 w-20 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardListSkeleton() {
  return (
    <div className="grid-products">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="flex gap-4 sm:gap-6">
        <Skeleton className="h-24 w-24 flex-shrink-0 rounded-lg sm:h-32 sm:w-32" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-6 w-20 mb-4" />
          <div className="flex gap-3">
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-9 w-16 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <Skeleton className="h-4 w-8 mb-1" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CartItemListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function CheckoutFormSkeleton() {
  return (
    <div className="space-y-6 lg:col-span-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
          <Skeleton className="h-7 w-48 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j}>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

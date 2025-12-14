"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";

export function EmptyCart() {
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

"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";

export function EmptyCart() {
  return (
    <div className="bg-secondary/30 flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <ShoppingCart className="text-muted-foreground h-10 w-10" />
      </div>
      <h2 className="text-foreground mb-2 text-3xl font-bold">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground mb-8 text-center">
        Explore our collection and add items to your cart
      </p>
      <Button asChild className="btn-primary">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}

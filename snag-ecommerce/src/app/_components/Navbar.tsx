"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "~/lib/store/cartStore";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-foreground transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl">snag</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost" className="text-foreground">
            <Link href="/">Shop</Link>
          </Button>

          <Button
            asChild
            className="relative flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95 sm:px-5"
          >
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {mounted && totalItems > 0 && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

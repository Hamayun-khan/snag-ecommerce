"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ShoppingCart, Package, User } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useCartStore } from "~/lib/store/cartStore";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

const CartBadge = memo(function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <span className="text-primary inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold">
      {totalItems}
    </span>
  );
});

export function Navbar() {
  return (
    <nav className="border-border/40 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground flex items-center gap-2 font-bold transition-opacity hover:opacity-80"
        >
          <div className="from-primary to-primary/80 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
            <Package className="text-primary-foreground h-6 w-6" />
          </div>
          <span className="text-xl">snag</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost" className="text-foreground">
            <Link href="/">Shop</Link>
          </Button>

          <SignedIn>
            <Button asChild variant="ghost" className="text-foreground">
              <Link href="/orders">My Orders</Link>
            </Button>
          </SignedIn>

          <Button
            asChild
            className="bg-primary text-primary-foreground relative flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 sm:px-5"
          >
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              <CartBadge />
            </Link>
          </Button>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

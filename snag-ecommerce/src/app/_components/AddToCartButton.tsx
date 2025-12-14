"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useCartStore } from "~/lib/store/cartStore";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
};

export function AddToCartButton({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    setIsAdded(true);
    toast.success(`${product.name} added!`, {
      description: `Price: $${product.price.toFixed(2)} • View in cart`,
      duration: 3000,
      action: {
        label: "View Cart",
        onClick: () => {
          window.location.href = "/cart";
        },
      },
    });

    // Reset after 1.5 seconds
    const timer = setTimeout(() => setIsAdded(false), 1500);
    return () => clearTimeout(timer);
  };

  if (!product.inStock) {
    return (
      <Button disabled className="btn-primary w-full opacity-50">
        Out of Stock
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      className="btn-primary w-full gap-2 text-lg disabled:opacity-70"
    >
      {isAdded ? (
        <>
          <Check className="h-5 w-5" />
          <span>Added!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  );
}

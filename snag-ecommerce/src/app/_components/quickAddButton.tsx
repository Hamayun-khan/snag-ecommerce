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
};

export function QuickAddButton({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    setIsAdded(true);
    toast.success(`${product.name} added to cart!`, {
      description: `Price: $${product.price.toFixed(2)}`,
      duration: 2000,
    });

    // Reset after 1.5 seconds
    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isAdded}
      className="btn-primary w-full gap-2 disabled:opacity-70"
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

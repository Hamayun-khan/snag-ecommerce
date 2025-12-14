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
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    toast.success(`${product.name} added to cart!`, {
      description: `Price: $${product.price.toFixed(2)}`,
      duration: 2000,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isAdding}
      className="btn-primary w-full gap-2 disabled:opacity-70"
    >
      {isAdding ? (
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

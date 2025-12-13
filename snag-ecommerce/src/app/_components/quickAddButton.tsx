"use client";

import { useState } from "react";
import { useCartStore } from "~/lib/store/cartStore";

type Product = {
  id: string;
    name: string;
      price: number;
        imageUrl: string;
        };

        export function QuickAddButton({ product }: { product: Product }) {
          const [added, setAdded] = useState(false);
            const addItem = useCartStore((state) => state.addItem);

              const handleClick = (e: React.MouseEvent) => {
                  e.preventDefault(); // Prevent Link navigation
                      e.stopPropagation();

                          addItem({
                                id: product.id,
                                      name: product.name,
                                            price: product.price,
                                                  imageUrl: product.imageUrl,
                                                      });

                                                          setAdded(true);
                                                              setTimeout(() => setAdded(false), 1500);
                                                                };

                                                                  return (
                                                                      <button
                                                                            onClick={handleClick}
                                                                                  className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
                                                                                      >
                                                                                            {added ? "✓ Added!" : "+ Add to Cart"}
                                                                                                </button>
                                                                                                  );
                                                                                                  }
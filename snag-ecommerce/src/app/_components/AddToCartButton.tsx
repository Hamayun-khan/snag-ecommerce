"use client";

import { useState } from "react";
import { useCartStore } from "~/lib/store/cartStore";

type Product = {
  id: string;
    name: string;
      price: number;
        imageUrl: string;
          inStock: boolean;
          };

          export function AddToCartButton({ product }: { product: Product }) {
            const [added, setAdded] = useState(false);
              const addItem = useCartStore((state) => state.addItem);

                const handleAddToCart = () => {
                    addItem({
                          id: product.id,
                                name: product.name,
                                      price: product.price,
                                            imageUrl: product.imageUrl,
                                                });

                                                    // Show success feedback
                                                        setAdded(true);
                                                            setTimeout(() => setAdded(false), 2000);
                                                              };

                                                                if (!product.inStock) {
                                                                    return (
                                                                          <button
                                                                                  disabled
                                                                                          className="w-full cursor-not-allowed rounded-lg bg-gray-400 px-8 py-4 text-lg font-semibold text-white"
                                                                                                >
                                                                                                        Out of Stock
                                                                                                              </button>
                                                                                                                  );
                                                                                                                    }

                                                                                                                      return (
                                                                                                                          <button
                                                                                                                                onClick={handleAddToCart}
                                                                                                                                      className="w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
                                                                                                                                          >
                                                                                                                                                {added ? "✓ Added to Cart!" : "Add to Cart"}
                                                                                                                                                    </button>
                                                                                                                                                      );
                                                                                                                                                      }
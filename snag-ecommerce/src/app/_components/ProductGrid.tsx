"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import type { Product } from "../../../generated/prisma";
import { QuickAddButton } from "./quickAddButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-2xl border border-border/50 bg-card p-0 transition-all duration-300 hover:border-border hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-secondary">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
          loading="lazy"
        />
        {product.stock < 5 && product.inStock && (
          <div className="absolute right-4 top-4 rounded-lg bg-warning px-3 py-1 text-xs font-semibold text-warning-foreground">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-5">
        {/* Product Info */}
        <div className="flex-1">
          <h3 className="mb-2 line-clamp-2 font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          
          </div>
          <div onClick={(e) => e.preventDefault()}>
            <QuickAddButton product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
});

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="products" className="px-4 py-12 sm:py-20">
      <div className="container mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              {products.length} items available
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/30">
            <p className="text-center text-muted-foreground">
              No products available yet
            </p>
          </div>
        ) : (
          <div className="grid-products">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

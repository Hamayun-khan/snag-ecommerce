import { Check, AlertCircle, Star } from "lucide-react";
import type { Product } from "../../../generated/prisma";

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          <Star className="h-4 w-4 fill-primary" />
          {product.category}
        </span>
      </div>

      <h1 className="mb-4 text-4xl font-bold text-foreground">
        {product.name}
      </h1>

      <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Price Section */}
      <div className="mb-8 border-y border-border/50 py-6">
        <p className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
          Price
        </p>
        <p className="text-5xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Stock Status */}
      <div className="mb-8">
        {product.inStock ? (
          <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
              <Check className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="font-semibold text-success">In Stock</p>
              <p className="text-sm text-muted-foreground">
                {product.stock} items available
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">Out of Stock</p>
              <p className="text-sm text-muted-foreground">
                Not currently available
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

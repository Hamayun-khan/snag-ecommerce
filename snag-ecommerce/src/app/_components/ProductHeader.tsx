import { Check, AlertCircle, Star } from "lucide-react";
import type { Product } from "../../../generated/prisma";

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-semibold">
          <Star className="fill-primary h-4 w-4" />
          {product.category}
        </span>
      </div>

      <h1 className="text-foreground mb-4 text-4xl font-bold">
        {product.name}
      </h1>

      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
        {product.description}
      </p>

      {/* Price Section */}
      <div className="border-border/50 mb-8 border-y py-6">
        <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase">
          Price
        </p>
        <p className="text-primary text-5xl font-bold">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Stock Status */}
      <div className="mb-8">
        {product.inStock ? (
          <div className="border-success/30 bg-success/5 flex items-center gap-3 rounded-lg border p-4">
            <div className="bg-success/20 flex h-10 w-10 items-center justify-center rounded-full">
              <Check className="text-success h-6 w-6" />
            </div>
            <div>
              <p className="text-success font-semibold">In Stock</p>
              <p className="text-muted-foreground text-sm">
                {product.stock} items available
              </p>
            </div>
          </div>
        ) : (
          <div className="border-destructive/30 bg-destructive/5 flex items-center gap-3 rounded-lg border p-4">
            <div className="bg-destructive/20 flex h-10 w-10 items-center justify-center rounded-full">
              <AlertCircle className="text-destructive h-6 w-6" />
            </div>
            <div>
              <p className="text-destructive font-semibold">Out of Stock</p>
              <p className="text-muted-foreground text-sm">
                Not currently available
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

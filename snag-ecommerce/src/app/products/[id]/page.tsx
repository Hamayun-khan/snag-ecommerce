import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Truck,
  Shield,
  RotateCw,
  Star,
  AlertCircle,
} from "lucide-react";
import { AddToCartButton } from "~/app/_components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await api.product.getById({ id });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-primary transition-colors hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>

        {/* Product Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 bg-secondary">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            {/* Header */}
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

              {/* Add to Cart Button */}
              <div className="mb-8">
                <AddToCartButton product={product} />
              </div>
            </div>

            {/* Trust Signals */}
            <div className="space-y-4 border-t border-border/50 pt-8">
              <h3 className="font-semibold text-foreground">Why Choose This?</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <Truck className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fast Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      Free shipping on orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                    <Shield className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      100% Secure Payment
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your data is encrypted and safe
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warning/20">
                    <RotateCw className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Easy Returns
                    </p>
                    <p className="text-sm text-muted-foreground">
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { api, HydrateClient } from "~/trpc/server";
import { QuickAddButton } from "./_components/quickAddButton";

export default async function Home() {
  const products = await api.product.getAll();

  void api.product.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-secondary/30 px-4 py-12 sm:py-20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="mb-6 text-center text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Discover Premium Products
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-muted-foreground">
              Curated selection of high-quality items, delivered with care and attention to detail.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95"
              >
                Explore Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Products Section */}
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
                  <Link
                    key={product.id}
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
                          <div className="mt-1 flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-xs text-muted-foreground">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Add */}
                      <div className="mt-4">
                        <QuickAddButton product={product} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="border-t border-border/40 bg-secondary/30 px-4 py-12 sm:py-16">
          <div className="container mx-auto">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">Premium Quality</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Carefully selected items
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <ArrowRight className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">Fast Shipping</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Delivered with care
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <Star className="h-6 w-6 text-success" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">Guaranteed Safe</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  100% satisfaction
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}

import { Suspense } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { HeroSection } from "./_components/HeroSection";
import { ProductGrid } from "./_components/ProductGrid";
import { ProductCardListSkeleton } from "~/components/skeletons";

export default async function Home() {
  const products = await api.product.getAll();

  void api.product.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <Suspense fallback={<ProductCardListSkeleton />}>
          <ProductGrid products={products} />
        </Suspense>
      </main>
    </HydrateClient>
  );
}

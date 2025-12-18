import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AddToCartButton } from "~/app/_components/AddToCartButton";
import { ProductHeader } from "~/app/_components/ProductHeader";
import { ProductTrustSignals } from "~/app/_components/ProductTrustSignals";

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
    <main className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="text-primary mb-8 inline-flex items-center gap-2 transition-colors hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>

        {/* Product Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="border-border/50 bg-secondary relative aspect-square overflow-hidden rounded-2xl border">
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
              <ProductHeader product={product} />

              {/* Add to Cart Button */}
              <div className="mb-8">
                <AddToCartButton product={product} />
              </div>
            </div>

            {/* Trust Signals */}
            <ProductTrustSignals />
          </div>
        </div>
      </div>
    </main>
  );
}

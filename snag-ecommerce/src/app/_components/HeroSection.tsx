import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-background to-secondary/30 px-4 py-12 sm:py-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover Premium Products
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-muted-foreground">
          Curated selection of high-quality items, delivered with care and
          attention to detail.
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
  );
}

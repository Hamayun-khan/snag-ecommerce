import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="border-border/40 from-background to-secondary/30 border-b bg-gradient-to-b px-4 py-12 sm:py-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-foreground mb-6 text-center text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
          Discover Premium Products
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center text-lg">
          Curated selection of high-quality items, delivered with care and
          attention to detail.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="#products"
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            Explore Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

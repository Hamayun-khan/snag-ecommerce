import Link from "next/link";
import { Package, Home } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export function OrderNotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="container mx-auto max-w-md">
        <Card className="border-border/50 bg-card">
          <CardContent className="pt-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
                <Package className="text-destructive h-10 w-10" />
              </div>
            </div>
            <h2 className="text-foreground mb-3 text-3xl font-bold">
              Order Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              We couldn&apos;t find your order details. Please check your email
              for confirmation.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="btn-primary">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

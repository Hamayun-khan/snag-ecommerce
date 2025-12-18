import { Truck, Shield, RotateCw } from "lucide-react";

export function ProductTrustSignals() {
  return (
    <div className="border-border/50 space-y-4 border-t pt-8">
      <h3 className="text-foreground font-semibold">Why Choose This?</h3>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="bg-accent/20 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
            <Truck className="text-accent h-4 w-4" />
          </div>
          <div>
            <p className="text-foreground font-medium">Fast Shipping</p>
            <p className="text-muted-foreground text-sm">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-success/20 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
            <Shield className="text-success h-4 w-4" />
          </div>
          <div>
            <p className="text-foreground font-medium">100% Secure Payment</p>
            <p className="text-muted-foreground text-sm">
              Your data is encrypted and safe
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-warning/20 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
            <RotateCw className="text-warning h-4 w-4" />
          </div>
          <div>
            <p className="text-foreground font-medium">30-Day Returns</p>
            <p className="text-muted-foreground text-sm">
              Hassle-free returns and exchanges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

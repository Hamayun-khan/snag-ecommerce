import { Truck, Shield, RotateCw } from "lucide-react";

export function ProductTrustSignals() {
  return (
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
            <p className="font-medium text-foreground">100% Secure Payment</p>
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
            <p className="font-medium text-foreground">30-Day Returns</p>
            <p className="text-sm text-muted-foreground">
              Hassle-free returns and exchanges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

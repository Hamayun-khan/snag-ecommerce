import { Truck } from "lucide-react";

interface ShippingAddressProps {
  customerName: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

export function ShippingAddress({
  customerName,
  shippingAddress,
  city,
  postalCode,
  country,
  email,
}: ShippingAddressProps) {
  return (
    <div>
      <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
        <Truck className="text-primary h-5 w-5" />
        Shipping Address
      </h3>
      <div className="border-border/50 bg-secondary/30 rounded-xl border p-4">
        <p className="text-foreground font-medium">{customerName}</p>
        <p className="text-muted-foreground">{shippingAddress}</p>
        <p className="text-muted-foreground">
          {city}, {postalCode}
        </p>
        <p className="text-muted-foreground">{country}</p>
        <p className="text-primary mt-3 text-sm">{email}</p>
      </div>
    </div>
  );
}

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
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                                            <Truck className="h-5 w-5 text-primary" />
                                                    Shipping Address
                                                          </h3>
                                                                <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                                                                        <p className="font-medium text-foreground">{customerName}</p>
                                                                                <p className="text-muted-foreground">{shippingAddress}</p>
                                                                                        <p className="text-muted-foreground">
                                                                                                  {city}, {postalCode}
                                                                                                          </p>
                                                                                                                  <p className="text-muted-foreground">{country}</p>
                                                                                                                          <p className="mt-3 text-sm text-primary">{email}</p>
                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                                      );
                                                                                                                                      }
                                                                                                                                      
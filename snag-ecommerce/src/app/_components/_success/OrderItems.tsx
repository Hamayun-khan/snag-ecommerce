import { Package } from "lucide-react";

interface OrderItem {
  id: string;
    name: string;
      quantity: number;
        price: number;
        }

        interface OrderItemsProps {
          items: OrderItem[];
          }

          export function OrderItems({ items }: OrderItemsProps) {
            return (
                <div>
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                              <Package className="h-5 w-5 text-primary" />
                                      Items Ordered
                                            </h3>
                                                  <div className="space-y-3">
                                                          {items.map((item) => (
                                                                    <div
                                                                                key={item.id}
                                                                                            className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-4"
                                                                                                      >
                                                                                                                  <div className="flex-1">
                                                                                                                                <p className="font-medium text-foreground">{item.name}</p>
                                                                                                                                              <div className="mt-1 flex items-center gap-4">
                                                                                                                                                              <span className="text-sm text-muted-foreground">
                                                                                                                                                                                Qty: {item.quantity}
                                                                                                                                                                                                </span>
                                                                                                                                                                                                                <span className="text-sm text-muted-foreground">
                                                                                                                                                                                                                                  ${item.price.toFixed(2)} each
                                                                                                                                                                                                                                                  </span>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                        <p className="text-lg font-bold text-foreground">
                                                                                                                                                                                                                                                                                                      ${(item.price * item.quantity).toFixed(2)}
                                                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                }
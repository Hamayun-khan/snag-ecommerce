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
      <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
        <Package className="text-primary h-5 w-5" />
        Items Ordered
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-border/50 bg-secondary/30 flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex-1">
              <p className="text-foreground font-medium">{item.name}</p>
              <div className="mt-1 flex items-center gap-4">
                <span className="text-muted-foreground text-sm">
                  Qty: {item.quantity}
                </span>
                <span className="text-muted-foreground text-sm">
                  ${item.price.toFixed(2)} each
                </span>
              </div>
            </div>
            <p className="text-foreground text-lg font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

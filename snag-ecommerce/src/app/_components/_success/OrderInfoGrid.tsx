interface OrderInfoGridProps {
  orderId: string;
  createdAt: Date;
  totalAmount: number;
}

export function OrderInfoGrid({
  orderId,
  createdAt,
  totalAmount,
}: OrderInfoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="border-border/50 bg-secondary/30 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs font-semibold uppercase">
          Order ID
        </p>
        <p className="text-foreground mt-2 font-mono text-sm font-bold">
          {orderId.slice(0, 8).toUpperCase()}
        </p>
      </div>
      <div className="border-border/50 bg-secondary/30 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs font-semibold uppercase">
          Order Date
        </p>
        <p className="text-foreground mt-2 font-semibold">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="border-success/30 bg-success/10 rounded-xl border p-4">
        <p className="text-success text-xs font-semibold uppercase">
          Total Amount
        </p>
        <p className="text-success mt-2 text-2xl font-bold">
          ${totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

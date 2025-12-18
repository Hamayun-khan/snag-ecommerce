interface TotalSummaryProps {
  totalAmount: number;
}

export function TotalSummary({ totalAmount }: TotalSummaryProps) {
  return (
    <div className="border-primary/30 bg-primary/10 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <span className="text-foreground text-lg font-semibold">
          Total Paid
        </span>
        <span className="text-primary text-3xl font-bold">
          ${totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

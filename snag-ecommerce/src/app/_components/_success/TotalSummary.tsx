interface TotalSummaryProps {
      totalAmount: number;
      }

      export function TotalSummary({ totalAmount }: TotalSummaryProps) {
        return (
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
                  <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-foreground">Total Paid</span>
                                  <span className="text-3xl font-bold text-primary">
                                            ${totalAmount.toFixed(2)}
                                                    </span>
                                                          </div>
                                                              </div>
                                                                );
                                                                }

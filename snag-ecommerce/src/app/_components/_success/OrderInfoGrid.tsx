interface OrderInfoGridProps {
      orderId: string;
        createdAt: Date;
          totalAmount: number;
          }

          export function OrderInfoGrid({ orderId, createdAt, totalAmount }: OrderInfoGridProps) {
            return (
                <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                              <p className="text-xs font-semibold text-muted-foreground uppercase">
                                        Order ID
                                                </p>
                                                        <p className="mt-2 font-mono text-sm font-bold text-foreground">
                                                                  {orderId.slice(0, 8).toUpperCase()}
                                                                          </p>
                                                                                </div>
                                                                                      <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                                                                                              <p className="text-xs font-semibold text-muted-foreground uppercase">
                                                                                                        Order Date
                                                                                                                </p>
                                                                                                                        <p className="mt-2 font-semibold text-foreground">
                                                                                                                                  {new Date(createdAt).toLocaleDateString("en-US", {
                                                                                                                                              month: "short",
                                                                                                                                                          day: "numeric",
                                                                                                                                                                      year: "numeric",
                                                                                                                                                                                })}
                                                                                                                                                                                        </p>
                                                                                                                                                                                              </div>
                                                                                                                                                                                                    <div className="rounded-xl border border-success/30 bg-success/10 p-4">
                                                                                                                                                                                                            <p className="text-xs font-semibold text-success uppercase">
                                                                                                                                                                                                                      Total Amount
                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                      <p className="mt-2 text-2xl font-bold text-success">
                                                                                                                                                                                                                                                ${totalAmount.toFixed(2)}
                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                    }

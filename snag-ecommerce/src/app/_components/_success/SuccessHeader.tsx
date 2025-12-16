import { CheckCircle2, Check } from "lucide-react";
import { Badge } from "~/components/ui/badge";

interface SuccessHeaderProps {
  customerName: string;
  }

  export function SuccessHeader({ customerName }: SuccessHeaderProps) {
    return (
        <div className="mb-8 text-center">
              <div className="mb-6 flex justify-center">
                      <div className="relative">
                                <div className="absolute inset-0 animate-ping rounded-full bg-success/20" />
                                          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
                                                      <CheckCircle2 className="h-12 w-12 text-success" />
                                                                </div>
                                                                        </div>
                                                                              </div>
                                                                                    <h1 className="mb-3 text-4xl font-bold text-foreground">
                                                                                            Order Confirmed!
                                                                                                  </h1>
                                                                                                        <p className="text-lg text-muted-foreground">
                                                                                                                Thank you for your purchase,{" "}
                                                                                                                        <span className="font-semibold text-primary">{customerName}</span>
                                                                                                                              </p>
                                                                                                                                    <Badge className="mt-4 border-success/30 bg-success/10 text-success">
                                                                                                                                            <Check className="mr-2 h-4 w-4" />
                                                                                                                                                    Payment Successful
                                                                                                                                                          </Badge>
                                                                                                                                                              </div>
                                                                                                                                                                );
                                                                                                                                                                }
                                                                                                                                                                
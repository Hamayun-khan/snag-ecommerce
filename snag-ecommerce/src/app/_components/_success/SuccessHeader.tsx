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
          <div className="bg-success/20 absolute inset-0 animate-ping rounded-full" />
          <div className="bg-success/10 relative flex h-24 w-24 items-center justify-center rounded-full">
            <CheckCircle2 className="text-success h-12 w-12" />
          </div>
        </div>
      </div>
      <h1 className="text-foreground mb-3 text-4xl font-bold">
        Order Confirmed!
      </h1>
      <p className="text-muted-foreground text-lg">
        Thank you for your purchase,{" "}
        <span className="text-primary font-semibold">{customerName}</span>
      </p>
      <Badge className="border-success/30 bg-success/10 text-success mt-4">
        <Check className="mr-2 h-4 w-4" />
        Payment Successful
      </Badge>
    </div>
  );
}

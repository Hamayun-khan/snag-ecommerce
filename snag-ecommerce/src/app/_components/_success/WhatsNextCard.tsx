import { Mail, Truck, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface WhatsNextCardProps {
  email: string;
}

export function WhatsNextCard({ email }: WhatsNextCardProps) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-xl">What Happens Next</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
            <Mail className="text-primary h-5 w-5" />
          </div>
          <div>
            <p className="text-foreground font-semibold">Confirmation Email</p>
            <p className="text-muted-foreground text-sm">
              Check your inbox at {email} for order confirmation
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
            <Truck className="text-primary h-5 w-5" />
          </div>
          <div>
            <p className="text-foreground font-semibold">Shipping Updates</p>
            <p className="text-muted-foreground text-sm">
              We&apos;ll send tracking information once your order ships
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl">
            <Calendar className="text-primary h-5 w-5" />
          </div>
          <div>
            <p className="text-foreground font-semibold">Estimated Delivery</p>
            <p className="text-muted-foreground text-sm">
              Arrives within 3-5 business days
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

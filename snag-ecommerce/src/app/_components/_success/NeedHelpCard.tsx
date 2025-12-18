import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function NeedHelpCard() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-muted-foreground">
          Questions about your order? Check our{" "}
          <Link
            href="/faq"
            className="text-primary font-medium hover:underline"
          >
            FAQ
          </Link>{" "}
          or contact support.
        </p>
        <p className="text-muted-foreground">
          Want to modify your order? Contact us within 1 hour.
        </p>
      </CardContent>
    </Card>
  );
}

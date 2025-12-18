import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export function LoadingSkeleton() {
  return (
    <div className="from-background to-secondary/20 min-h-[80vh] bg-gradient-to-b px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto mb-6 h-24 w-24 rounded-full" />
          <Skeleton className="mx-auto mb-4 h-10 w-72" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-72" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
                <Separator />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-20 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

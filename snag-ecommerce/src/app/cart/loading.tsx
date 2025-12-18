import { Skeleton } from "~/components/ui/skeleton";

export default function CartLoading() {
  return (
    <div className="bg-background min-h-screen px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-2 h-5 w-32" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items Skeleton */}
          <div className="space-y-4 lg:col-span-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card flex gap-4 rounded-lg p-4">
                <Skeleton className="h-24 w-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

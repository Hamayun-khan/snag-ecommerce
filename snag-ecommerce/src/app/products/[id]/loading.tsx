import { Skeleton } from "~/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function ProductLoading() {
  return (
      <main className="min-h-screen bg-background">
            <div className="container mx-auto max-w-6xl px-4 py-8">
                    {/* Back Button Skeleton */}
                            <div className="mb-8 flex items-center gap-2">
                                      <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                                                <Skeleton className="h-5 w-32" />
                                                        </div>

                                                                {/* Product Grid */}
                                                                        <div className="grid gap-8 lg:grid-cols-2">
                                                                                  {/* Image Skeleton */}
                                                                                            <Skeleton className="aspect-square w-full rounded-2xl" />

                                                                                                      {/* Details Skeleton */}
                                                                                                                <div className="space-y-6">
                                                                                                                            <div>
                                                                                                                                          <Skeleton className="mb-2 h-6 w-24" />
                                                                                                                                                        <Skeleton className="mb-4 h-10 w-3/4" />
                                                                                                                                                                      <Skeleton className="mb-6 h-20 w-full" />
                                                                                                                                                                                    <Skeleton className="mb-6 h-12 w-32" />
                                                                                                                                                                                                </div>
                                                                                                                                                                                                            <Skeleton className="h-14 w-full" />
                                                                                                                                                                                                                        <div className="space-y-3">
                                                                                                                                                                                                                                      <Skeleton className="h-16 w-full" />
                                                                                                                                                                                                                                                    <Skeleton className="h-16 w-full" />
                                                                                                                                                                                                                                                                  <Skeleton className="h-16 w-full" />
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                          </main>
                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                            }
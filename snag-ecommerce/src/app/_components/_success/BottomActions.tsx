import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export function BottomActions() {
  return (
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="btn-primary gap-2 text-lg px-8 py-3">
                    <Link href="/shop">
                              Continue Shopping
                                        <ArrowRight className="h-5 w-5" />
                                                </Link>
                                                      </Button>
                                                            <Button asChild variant="outline" className="px-8 py-3">
                                                                    <Link href="/">Back to Home</Link>
                                                                          </Button>
                                                                              </div>
                                                                                );
                                                                                }
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function QuickActionsCard() {
  return (
      <Card className="border-border/50 bg-card">
            <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                          </CardHeader>
                                <CardContent className="space-y-3">
                                        <Button asChild variant="default" className="w-full justify-start gap-2">
                                                  <Link href="/account/orders">
                                                              <ShoppingBag className="h-5 w-5" />
                                                                          View All Orders
                                                                                    </Link>
                                                                                            </Button>
                                                                                                    <Button asChild variant="outline" className="w-full justify-start gap-2">
                                                                                                              <Link href="/shop">
                                                                                                                          <ArrowRight className="h-5 w-5" />
                                                                                                                                      Continue Shopping
                                                                                                                                                </Link>
                                                                                                                                                        </Button>
                                                                                                                                                                <Button asChild variant="ghost" className="w-full justify-start">
                                                                                                                                                                          <Link href="/contact">Contact Support</Link>
                                                                                                                                                                                  </Button>
                                                                                                                                                                                        </CardContent>
                                                                                                                                                                                            </Card>
                                                                                                                                                                                              );
                                                                                                                                                                                              }
"use client";

 import { useEffect } from "react";
 import { useSearchParams } from "next/navigation";
 import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
 import { Separator } from "~/components/ui/separator";
 import { api } from "~/trpc/react";
 import { useCartStore } from "~/lib/store/cartStore";

 // Import all components
 import { SuccessHeader } from "../_components/_success/SuccessHeader";
 import { OrderInfoGrid } from "../_components/_success/OrderInfoGrid";
 import { ShippingAddress } from "../_components/_success/ShippingAddress";
 import { OrderItems } from "../_components/_success/OrderItems";
 import { TotalSummary } from "../_components/_success/TotalSummary";
 import { WhatsNextCard } from "../_components/_success/WhatsNextCard";
 import { QuickActionsCard } from "../_components/_success/QuickActionsCard";
 import { NeedHelpCard } from "../_components/_success/NeedHelpCard";
 import { BottomActions } from "../_components/_success/BottomActions";
 import { LoadingSkeleton } from "../_components/_success/LoadingSkeleton";
 import { OrderNotFound } from "../_components/_success/OrderNotFound";

 export default function SuccessPage() {
   const searchParams = useSearchParams();
     const sessionId = searchParams.get("session_id");
       const clearCart = useCartStore((state) => state.clearCart);

         const { data: order, isLoading } = api.order.getBySessionId.useQuery(
             { sessionId: sessionId ?? "" },
                 { enabled: !!sessionId },
                   );

                     useEffect(() => {
                         if (order) {
                               clearCart();
                                   }
                                     }, [order, clearCart]);

                                       if (isLoading) {
                                           return <LoadingSkeleton />;
                                             }

                                               if (!order) {
                                                   return <OrderNotFound />;
                                                     }

                                                       return (
                                                           <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 py-8 sm:py-12">
                                                                 <div className="container mx-auto max-w-4xl">
                                                                         <SuccessHeader customerName={order.customerName} />

                                                                                 <div className="grid gap-6 lg:grid-cols-3">
                                                                                           {/* Order Summary Card */}
                                                                                                     <div className="lg:col-span-2 space-y-6">
                                                                                                                 <Card className="border-border/50 bg-card">
                                                                                                                               <CardHeader>
                                                                                                                                               <CardTitle className="text-2xl">Order Details</CardTitle>
                                                                                                                                                             </CardHeader>
                                                                                                                                                                           <CardContent className="space-y-6">
                                                                                                                                                                                           <OrderInfoGrid
                                                                                                                                                                                                             orderId={order.id}
                                                                                                                                                                                                                               createdAt={order.createdAt}
                                                                                                                                                                                                                                                 totalAmount={order.totalAmount}
                                                                                                                                                                                                                                                                 />

                                                                                                                                                                                                                                                                                 <Separator />

                                                                                                                                                                                                                                                                                                 <ShippingAddress
                                                                                                                                                                                                                                                                                                                   customerName={order.customerName}
                                                                                                                                                                                                                                                                                                                                     shippingAddress={order.shippingAddress}
                                                                                                                                                                                                                                                                                                                                                       city={order.city}
                                                                                                                                                                                                                                                                                                                                                                         postalCode={order.postalCode}
                                                                                                                                                                                                                                                                                                                                                                                           country={order.country}
                                                                                                                                                                                                                                                                                                                                                                                                             email={order.email}
                                                                                                                                                                                                                                                                                                                                                                                                                             />

                                                                                                                                                                                                                                                                                                                                                                                                                                             <OrderItems items={order.items} />

                                                                                                                                                                                                                                                                                                                                                                                                                                                             <TotalSummary totalAmount={order.totalAmount} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           </CardContent>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       </Card>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <WhatsNextCard email={order.email} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       {/* Sidebar */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <div className="space-y-6">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             <QuickActionsCard />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <NeedHelpCard />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <BottomActions />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }
"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "~/lib/store/cartStore";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { CheckoutContactSection } from "~/app/_components/CheckoutContactSection";
import { CheckoutShippingSection } from "~/app/_components/CheckoutShippingSection";
import { CheckoutSubmitButton } from "~/app/_components/CheckoutSubmitButton";
import { CheckoutOrderSummary } from "~/app/_components/CheckoutOrderSummary";
import { CheckoutFormSkeleton } from "~/components/skeletons";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Full Name is required"),
  address: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const createCheckout = api.order.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error("Checkout Error", {
        description: error.message || "Failed to create checkout session",
      });
      setIsLoading(false);
    },
  });

  const methods = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="bg-secondary/30 flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingCart className="text-muted-foreground h-10 w-10" />
        </div>
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Add items to your cart before checking out
        </p>
        <Button asChild className="btn-primary">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (values: CheckoutValues) => {
    setIsLoading(true);
    createCheckout.mutate({
      email: values.email,
      customerName: values.name,
      shippingAddress: values.address,
      city: values.city,
      postalCode: values.postalCode,
      country: values.country,
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  };

  return (
    <div className="bg-background min-h-screen px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <Link
          href="/cart"
          className="text-primary mb-8 inline-flex items-center gap-2 transition-colors hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Cart
        </Link>

        <h1 className="text-foreground mb-8 text-4xl font-bold">Checkout</h1>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          {isLoading || createCheckout.isPending ? (
            <div className="space-y-6 lg:col-span-2">
              <CheckoutFormSkeleton />
            </div>
          ) : (
            <div className="space-y-6 lg:col-span-2">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <CheckoutContactSection />
                  <div className="mt-6">
                    <CheckoutShippingSection />
                  </div>
                  <div className="mt-6">
                    <CheckoutSubmitButton
                      isLoading={isLoading || createCheckout.isPending}
                    />
                  </div>
                </form>
              </FormProvider>
            </div>
          )}

          {/* Order Summary */}
          <CheckoutOrderSummary
            items={items}
            totalPrice={totalPrice}
            shippingCost={shippingCost}
            finalTotal={finalTotal}
          />
        </div>
      </div>
    </div>
  );
}

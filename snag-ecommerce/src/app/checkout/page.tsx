"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "~/lib/store/cartStore";
import Link from "next/link";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2, ArrowLeft, Lock, ShoppingCart } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    },
  });

  const checkoutSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Full Name is required"),
    address: z.string().min(1, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    country: z.string().min(1, "Country is required"),
  });

  type CheckoutValues = z.infer<typeof checkoutSchema>;

  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<CheckoutValues>({
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
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-secondary/30 px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Your cart is empty
        </h2>
        <p className="mb-8 text-muted-foreground">
          Add items to your cart before checking out
        </p>
        <Button asChild className="btn-primary">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (values: CheckoutValues) => {
    setLoading(true);

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
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-primary transition-colors hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Cart
        </Link>

        <h1 className="mb-8 text-4xl font-bold text-foreground">Checkout</h1>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="space-y-6 lg:col-span-2">
            <form onSubmit={formSubmit(handleSubmit)}>
              {/* Contact Section */}
              <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="email"
                      className="block font-semibold text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
                    />
                    {errors.email && (
                      <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                        <span>⚠</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Section */}
              <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block font-semibold text-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="John Doe"
                      className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
                    />
                    {errors.name && (
                      <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                        <span>⚠</span>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="address"
                      className="block font-semibold text-foreground"
                    >
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="123 Main Street"
                      className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
                    />
                    {errors.address && (
                      <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                        <span>⚠</span>
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* City & Postal Code Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="city"
                        className="block font-semibold text-foreground"
                      >
                        City
                      </Label>
                      <Input
                        id="city"
                        {...register("city")}
                        placeholder="New York"
                        className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
                      />
                      {errors.city && (
                        <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                          <span>⚠</span>
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="postalCode"
                        className="block font-semibold text-foreground"
                      >
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        {...register("postalCode")}
                        placeholder="10001"
                        className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
                      />
                      {errors.postalCode && (
                        <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                          <span>⚠</span>
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="country"
                      className="block font-semibold text-foreground"
                    >
                      Country
                    </Label>
                    <Input
                      id="country"
                      {...register("country")}
                      placeholder="United States"
                      className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
                    />
                    {errors.country && (
                      <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                        <span>⚠</span>
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-8 w-full gap-2 py-4 text-lg disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Continue to Payment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6">
              <h2 className="mb-6 text-xl font-bold text-foreground">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="mb-6 max-h-64 space-y-3 overflow-y-auto border-b border-border/50 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 border-b border-border/50 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="font-semibold text-success">FREE</span>
                  ) : (
                    <span className="font-semibold text-foreground">
                      ${shippingCost.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 flex justify-between py-6">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-3xl font-bold text-primary">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Security Badge */}
              <div className="rounded-lg border border-success/30 bg-success/5 p-4 text-center">
                <p className="flex items-center justify-center gap-2 text-xs text-success">
                  <Lock className="h-4 w-4" />
                  Secure payment with Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { FormField } from "./FormField";

interface CheckoutValues {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export function CheckoutShippingSection() {
  const { register, formState: { errors } } = useFormContext<CheckoutValues>();

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Shipping Address
      </h2>

      <div className="space-y-4">
        <FormField
          id="name"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.name}
        />

        <FormField
          id="address"
          label="Street Address"
          placeholder="123 Main Street"
          register={register}
          error={errors.address}
        />

        {/* City & Postal Code Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="city"
            label="City"
            placeholder="New York"
            register={register}
            error={errors.city}
          />

          <FormField
            id="postalCode"
            label="Postal Code"
            placeholder="10001"
            register={register}
            error={errors.postalCode}
          />
        </div>

        <FormField
          id="country"
          label="Country"
          placeholder="United States"
          register={register}
          error={errors.country}
        />
      </div>
    </div>
  );
}

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

export function CheckoutContactSection() {
  const { register, formState: { errors } } = useFormContext<CheckoutValues>();

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Contact Information
      </h2>

      <div className="space-y-4">
        <FormField
          id="email"
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          register={register}
          error={errors.email}
        />
      </div>
    </div>
  );
}

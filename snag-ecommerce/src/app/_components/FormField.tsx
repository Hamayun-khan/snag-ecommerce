"use client";

import type { FieldError, UseFormRegister } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface CheckoutValues {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

type FormFieldName = keyof CheckoutValues;

interface FormFieldProps {
  id: FormFieldName;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<CheckoutValues>;
  error?: FieldError;
}

export function FormField({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="block font-semibold text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        {...register(id)}
        placeholder={placeholder}
        className="mt-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground"
      />
      {error && (
        <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
          <span>⚠</span>
          {error.message}
        </p>
      )}
    </div>
  );
}

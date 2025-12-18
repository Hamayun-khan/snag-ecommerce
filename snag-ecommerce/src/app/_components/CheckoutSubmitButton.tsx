"use client";

import { Loader2, Lock } from "lucide-react";

interface CheckoutSubmitButtonProps {
  isLoading: boolean;
}

export function CheckoutSubmitButton({ isLoading }: CheckoutSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="btn-primary mt-8 flex w-full items-center justify-center gap-2 py-4 text-lg disabled:opacity-50"
    >
      {isLoading ? (
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
  );
}

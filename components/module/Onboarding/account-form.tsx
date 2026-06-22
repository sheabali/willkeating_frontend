/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";

import { useBuySubPlanMutation } from "@/redux/api/subscriptionApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { BookingAndPaymentForm } from "./StripeFrom";
import { SuccessModal } from "./success-modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface Props {
  planId: string;
  paymentId: string | null;
  clientSecret: string;
  amount: number;
}

export function AccountForm({ planId, paymentId, clientSecret, amount }: Props) {
  console.log("clientSecret", clientSecret);

  const router = useRouter();
  const params = useSearchParams();

  const [buySubPlan, { isLoading: confirmLoading }] =
    useBuySubPlanMutation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSuccess = useCallback(
    async (paymentMethodId: string) => {
      if (!paymentMethodId) {
        toast.error("Please validate card first");
        return;
      }

      setIsSubmitting(true);

      try {
        const payload = {
          subscriptionId: planId,
          amount,
          tax: 0,
          paymentMethodId,
        };

        console.log("SENDING PAYLOAD TO BACKEND:", payload);

        const confirmRes = await buySubPlan(payload).unwrap() as any;

        console.log("confirmRes", confirmRes);
        if (confirmRes.success) {
          toast.success(confirmRes.message || "Subscription successful!");
          localStorage.removeItem("clientSecret");
          setShowSuccess(true);
        } else {
          toast.error(confirmRes.message || "Payment failed");
        }
      } catch (err: any) {
        toast.error(err?.data?.message ?? err?.message ?? "Order failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [planId, amount, buySubPlan, params],
  );

  return (
    <Card className="p-6 border-0">
      <h2 className="text-2xl font-bold mb-6">Enter Account Details</h2>
      <Elements stripe={stripePromise}>
        <BookingAndPaymentForm
          onSuccess={onSuccess}
          isSubmitting={isSubmitting || confirmLoading}
        />
      </Elements>

      {showSuccess && (
        <SuccessModal
          open={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            router.push("/shop-owner/dashboard");
          }}
        />
      )}
    </Card>
  );
}

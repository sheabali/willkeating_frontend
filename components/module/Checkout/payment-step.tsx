/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1F2937",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#EF4444",
    },
  },
};

interface BookingAndPaymentFormProps {
  orderId: string;
  shippingData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  amount: number;
  onSuccess: (paymentMethodId: string) => void;
  onBack: () => void;
}

export function BookingAndPaymentForm({
  orderId,
  shippingData,
  amount,
  onSuccess,
  onBack,
}: BookingAndPaymentFormProps) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [cardHolderName, setCardHolderName] = useState(
    `${shippingData.firstName} ${shippingData.lastName}`,
  );
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    setLoading(true);

    try {
      if (!stripe || !elements) {
        setPaymentError("Stripe is not loaded yet.");
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        setPaymentError("Card details are missing.");
        return;
      }

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardHolderName,
          email: shippingData.email,
          phone: shippingData.phoneNumber,
          address: {
            line1: shippingData.address,
            city: shippingData.city,
            state: shippingData.state,
            postal_code: shippingData.zipCode,
          },
        },
      });

      if (error) {
        setPaymentError(error.message ?? "Payment failed.");
        toast.error(error.message ?? "Payment failed.");
        return;
      }

      if (!paymentMethod) {
        setPaymentError("Failed to create payment method.");
        return;
      }

      // Here you would typically send the payment method to your backend
      // to complete the payment with Stripe
      // Example:
      // const res = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     paymentMethodId: paymentMethod.id,
      //     orderId,
      //     amount,
      //   }),
      // });

      // For now, simulate success
      console.log("Payment method created:", paymentMethod.id);
      console.log("Order ID:", orderId);
      console.log("Amount:", amount);

      toast.success("Payment method validated successfully!");

      // Call the success callback to move to review step
      onSuccess(paymentMethod.id);
    } catch (err: any) {
      console.error("Unexpected error:", err);
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        "Something went wrong. Please try again.";
      setPaymentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-8 rounded-2xl shadow-md space-y-8"
    >
      {/* Payment Details */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card Information</h2>

        <div className="space-y-2">
          <Label>Cardholder Name *</Label>
          <Input
            placeholder="John Doe"
            required
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Card Number *</Label>
          <div className="border p-3 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <CardNumberElement options={cardStyle} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label>Expiry Date *</Label>
            <div className="border p-3 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <CardExpiryElement options={cardStyle} />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <Label>CVC *</Label>
            <div className="border p-3 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <CardCvcElement options={cardStyle} />
            </div>
          </div>
        </div>

        {paymentError && (
          <Alert variant="destructive">
            <AlertDescription>{paymentError}</AlertDescription>
          </Alert>
        )}
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 text-lg py-3"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Continue to Review"}
        </Button>
      </div>
    </form>
  );
}

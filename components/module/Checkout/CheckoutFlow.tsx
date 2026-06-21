/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateOrderMutation,
  useMakePaymentMutation,
} from "@/redux/api/orderPaymentApi";
import {
  cartProductsSelector,
  clearCart,
  subTotalSelector,
  taxSelector,
  totalSelector,
} from "@/redux/features/cartSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import { OrderSummary } from "./order-summary";
import { BookingAndPaymentForm } from "./payment-step";
import { ReviewStep } from "./review-step";
import { ShippingStep } from "./shipping-step";
import { SuccessStep } from "./success-step";

/* ---------------- Validation Schema ---------------- */

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Invalid ZIP code"),
});

type ShippingData = z.infer<typeof shippingSchema>;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/* ---------------- Component ---------------- */

export function CheckoutFlow() {
  const dispatch = useDispatch();

  const cartItems = useSelector(cartProductsSelector);
  const subtotal = useSelector(subTotalSelector);
  const tax = useSelector(taxSelector);
  const total = useSelector(totalSelector);

  const [step, setStep] = useState<
    "shipping" | "payment" | "review" | "success"
  >("shipping");

  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const [makePayment, { isLoading: paymentLoading }] = useMakePaymentMutation();
  const [createOrder] = useCreateOrderMutation();

  const shippingForm = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData || {},
  });

  /* ---------------- Shipping Submit ---------------- */

  const handleShippingSubmit = async (data: ShippingData) => {
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
    }));

    const orderPayload = {
      ...data,
      orderItems: orderItems.map((item) => ({
        ...item,
        quantity: String(item.quantity),
      })),
      shipping: "Free",
      tax,
    };

    try {
      const res = await createOrder(orderPayload).unwrap();

      if (res.success) {
        toast.success(res.message);
        setShippingData(data);
        setOrderId(res.data?.orderId || res.data?.id);
        setStep("payment");
      } else {
        toast.error("Order creation failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the order.");
    }
  };

  /* ---------------- Payment Success ---------------- */

  const handlePaymentSuccess = (paymentMethodId: string) => {
    console.log("Payment successful:", paymentMethodId);

    setPaymentMethodId(paymentMethodId);
    setStep("review");
  };

  /* ---------------- Review Submit ---------------- */

  const handleReviewSubmit = async () => {
    const orderPayload = {
      orderId,
      paymentMethodId,
      subtotal,
      tax,
    };

    try {
      const res = (await makePayment(orderPayload).unwrap()) as any;

      if (res.success) {
        toast.success(res.message);
        dispatch(clearCart());
        setStep("success");
      }
    } catch (error: any) {
      const err = error?.data?.message;

      console.error(error);
      toast.error(err || "An error occurred while creating the order.");
    }
  };

  /* ---------------- Back Button ---------------- */

  const goBack = () => {
    if (step === "payment") {
      setStep("shipping");
    } else if (step === "review") {
      setStep("payment");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto">
      {step === "shipping" && (
        <ShippingStep form={shippingForm} onSubmit={handleShippingSubmit} />
      )}

      {step === "payment" && shippingData && orderId && (
        <Elements stripe={stripePromise}>
          <div className="py-8 container mx-auto">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <BookingAndPaymentForm
                  orderId={orderId}
                  shippingData={shippingData}
                  amount={total}
                  onSuccess={handlePaymentSuccess}
                  onBack={goBack}
                />
              </div>

              <div>
                <OrderSummary />
              </div>
            </div>
          </div>
        </Elements>
      )}

      {step === "review" && shippingData && paymentMethodId && (
        <ReviewStep
          onSubmit={handleReviewSubmit}
          onBack={goBack}
          loading={paymentLoading}
          paymentData={paymentMethodId}
          shippingData={shippingData}
        />
      )}

      {step === "success" && <SuccessStep orderId={orderId} />}
    </div>
  );
}

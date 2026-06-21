/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllPricesQuery } from "@/redux/api/priceApi";
import { useCreateSubscriptionIntentMutation } from "@/redux/api/subscriptionApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PlanSelectionSkeleton from "../Onboarding/PlanSelectionSkeleton";
import PricingCard from "./PricingCard";
import RocketIcon from "./RocketIcon";
import UserIcon from "./UserIcon";

interface PricingFeature {
  text: string;
}

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  period?: string;
  description: string;
  icon: React.ReactNode;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
  backgroundColor?: boolean;
  showBackgroundImage?: boolean;
};

// Shape coming back from the API
interface ApiPlan {
  id: string;
  planName: string;
  planPrice: string; // e.g. "0" or "399/yearly"
  planType: "LIFETIME" | "YEARLY" | "MONTHLY" | string;
  planMode: string;
  SubscribeModelPlan: { id: string; name: string }[];
}

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "Free Plan":
    "A simple way to publish funeral information and share important announcements with the community.",
  "Premium Memorial Plan":
    "Create a dedicated memorial space where family and friends can share memories, upload photos, and leave tributes over time.",
};

const PERIOD_BY_TYPE: Record<string, string> = {
  YEARLY: "year",
  MONTHLY: "month",
};

function mapApiPlan(plan: ApiPlan, index: number): PricingPlan {
  const price = Number(plan.planPrice?.split("/")[0]) || 0;
  const isPopular = plan.planType !== "LIFETIME";

  return {
    id: plan.id,
    name: plan.planName,
    price,
    period: PERIOD_BY_TYPE[plan.planType],
    description:
      FALLBACK_DESCRIPTIONS[plan.planName] ??
      `Includes ${plan.SubscribeModelPlan?.length ?? 0} features.`,
    icon: index === 0 ? <UserIcon /> : <RocketIcon />,
    features: (plan.SubscribeModelPlan ?? []).map((f) => ({
      text: f.name.trim(),
    })),
    isPopular,
    buttonText: "Get Started",
    buttonVariant: isPopular ? "default" : "outline",
    backgroundColor: isPopular,
    showBackgroundImage: isPopular,
  };
}

export function PricingSection() {
  const router = useRouter();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const [createSubscription, { isLoading: isCreating }] =
    useCreateSubscriptionIntentMutation();

  const { data: priceData, isLoading } = useGetAllPricesQuery({}) as any;

  const apiPlans: ApiPlan[] = priceData?.data?.data ?? [];
  const plans = apiPlans.map(mapApiPlan);

  const handleSelectPlan = async (plan: any) => {
    console.log("plan", plan);

    setLoadingPlanId(plan.id);
    router.push(`/registers/payment/?planId=${plan.id}&amount=${plan.price}`);
    // try {
    //   const res = (await createSubscription({ planId }).unwrap()) as any;
    //   if (res?.success) {
    //     toast.success(
    //       res?.data?.message ||
    //         "Subscription intent created! Redirecting to payment...",
    //     );
    //     if (res?.data?.orderId) {
    //       if (res.data.clientSecret) {
    //         localStorage.setItem("clientSecret", res.data.clientSecret);
    //       } else {
    //         console.warn("No clientSecret returned from server");
    //       }
    //       router.push(
    //         `/register/payment?paymentId=${res.data.orderId}&planId=${planId}`,
    //       );
    //     }
    //   }
    // } catch (err: any) {
    //   toast.error(
    //     err?.data?.message ||
    //       "Failed to create subscription intent. Please try again.",
    //   );
    //   console.error("Subscription error:", err);
    // } finally {
    //   setLoadingPlanId(null);
    // }
  };

  if (isLoading) return <PlanSelectionSkeleton />;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
              isProcessing={isCreating && loadingPlanId === plan.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

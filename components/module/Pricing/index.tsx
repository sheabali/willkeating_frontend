/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllPricesQuery } from "@/redux/api/priceApi";
import PricingCard from "./PricingCard";
import RocketIcon from "./RocketIcon";
import UserIcon from "./UserIcon";

interface PricingFeature {
  text: string;
}

export type PricingPlan = {
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
  const { data: priceData, isLoading } = useGetAllPricesQuery({}) as any;

  const apiPlans: ApiPlan[] = priceData?.data?.data ?? [];
  const plans = apiPlans.map(mapApiPlan);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-start mb-12 lg:mb-24">
          <h2 className="text-3xl sm:text-[48px] lg:text-5xl  text-[#052858] mb-4 text-balance">
            Simple & Transparent Pricing
          </h2>
          <p className="text-base sm:text-[20px] text-[#5B5C57]  mx-auto text-balance">
            Start free to share important funeral information. Upgrade anytime
            to create a lasting memorial page.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
          {isLoading ? (
            <p className="text-slate-500">Loading plans...</p>
          ) : (
            plans.map((plan, index) => (
              <PricingCard key={`${plan.name}-${index}`} plan={plan} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

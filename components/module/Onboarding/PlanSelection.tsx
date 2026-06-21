// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// import {
//   useCreateSubscriptionIntentMutation,
//   useGetAllSubscriptionQuery,
// } from "@/redux/api/subscriptionApi";

// import Loading from "@/components/ui/loading";
// import { mapSubscriptionPlans } from "@/src/libs/mappers/subscriptionMapper";
// import { GetAllSubscriptionApiResponse } from "@/src/types/subscription";
// import { Check } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import PlanSelectionSkeleton from "./PlanSelectionSkeleton";

// export default function PlanSelection() {
//   const router = useRouter();
//   const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

//   const { data, isLoading } = useGetAllSubscriptionQuery({}) as {
//     data?: GetAllSubscriptionApiResponse;
//     isLoading: boolean;
//   };

//   // NOTE: the array lives at data.data.data, not data.data
//   const plans = mapSubscriptionPlans(data?.data?.data);

//   const [createSubscription, { isLoading: isCreating }] =
//     useCreateSubscriptionIntentMutation();

//   const handleSelectPlan = async (planId: string) => {
//     setLoadingPlanId(planId);

//     try {
//       const res = (await createSubscription({ planId }).unwrap()) as any;

//       if (res?.success) {
//         toast.success(
//           res?.data?.message ||
//             "Subscription intent created! Redirecting to payment...",
//         );

//         if (res?.data?.orderId) {
//           if (res.data.clientSecret) {
//             localStorage.setItem("clientSecret", res.data.clientSecret);
//           } else {
//             console.warn("No clientSecret returned from server");
//           }

//           router.push(
//             `/register/payment?paymentId=${res.data.orderId}&planId=${planId}`,
//           );
//         }
//       }
//     } catch (err: any) {
//       toast.error(
//         err?.data?.message ||
//           "Failed to create subscription intent. Please try again.",
//       );
//       console.error("Subscription error:", err);
//     } finally {
//       setLoadingPlanId(null);
//     }
//   };

//   if (isLoading) return <PlanSelectionSkeleton />;

//   return (
//     <main className="min-h-screen bg-white px-4 pb-20">
//       <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-4xl">
//         {plans.map((plan, index) => {
//           const isFeatured = index === 1;

//           return (
//             <Card
//               key={plan.id}
//               className={`p-8 flex flex-col ${
//                 isFeatured
//                   ? "bg-linear-to-b from-[#4d73bc] to-[#103376] text-white scale-105"
//                   : "border-2 border-gray-200"
//               }`}
//             >
//               <h3 className="text-2xl font-bold">{plan.name}</h3>

//               <div className="my-4">
//                 <span className="text-5xl font-bold">{plan.priceLabel}</span>
//                 {plan.periodLabel && (
//                   <span className="ml-2 text-sm">{plan.periodLabel}</span>
//                 )}
//               </div>

//               {plan.isFree && (
//                 <p className="text-xs mb-2 font-medium text-blue-300">
//                   No cost, ever
//                 </p>
//               )}

//               <Button
//                 onClick={() => handleSelectPlan(plan.id)}
//                 disabled={loadingPlanId === plan.id || isCreating}
//                 className={`mb-6 mt-4 font-semibold py-6 border-2 rounded-2xl ${
//                   plan.isFree
//                     ? "bg-white text-[#042055]"
//                     : "bg-[#8060a0] text-white"
//                 }`}
//               >
//                 {loadingPlanId === plan.id ? (
//                   <Loading />
//                 ) : plan.isFree ? (
//                   "Get Started"
//                 ) : (
//                   "Get Started"
//                 )}
//               </Button>

//               <div className="space-y-3">
//                 {plan.features.length === 0 ? (
//                   <p className="text-sm opacity-60">No features listed</p>
//                 ) : (
//                   plan.features.map((feature) => (
//                     <div key={feature.id} className="flex gap-2 items-center">
//                       <Check className="w-4 h-4 shrink-0" />
//                       <span className="text-sm">{feature.name}</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </Card>
//           );
//         })}
//       </div>
//     </main>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllPricesQuery } from "@/redux/api/priceApi";
import PricingCard from "../Pricing/PricingCard";
import RocketIcon from "../Pricing/RocketIcon";
import UserIcon from "../Pricing/UserIcon";

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

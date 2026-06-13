"use client";

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

const pricingPlans: PricingPlan[] = [
  {
    name: "Free Plan",
    price: 0,
    description:
      "A simple way to publish funeral information and share important announcements with the community.",
    icon: <UserIcon />,
    features: [
      { text: "Publish a death notice" },
      { text: "Funeral arrangement details" },
      { text: "Public listing access" },
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Memorial Plan",
    price: 399,
    period: "year",
    description:
      "Create a dedicated memorial space where family and friends can share memories, upload photos, and leave tributes over time.",
    icon: <RocketIcon />,
    features: [
      { text: "Everything in Free Plan" },
      { text: "Dedicated memorial page" },
      { text: "Photo gallery" },
      { text: "Memory & story sharing" },
      { text: "Tribute wall (comments)" },
    ],
    isPopular: true,
    buttonText: "Get Started",
    buttonVariant: "default",
    backgroundColor: true,
    showBackgroundImage: true,
  },
];

export function PricingSection() {
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
          {pricingPlans.map((plan, index) => (
            <PricingCard key={`${plan.name}-${index}`} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

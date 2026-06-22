"use client";

import { OnboardingLayout } from "@/components/module/Onboarding/onboarding-layout";
import { PricingSection } from "@/components/module/Pricing";

import { OnboardingProvider } from "@/redux/context/onboarding-context";

export default function PlanSelectionPage() {
  return (
    <OnboardingProvider>
      <OnboardingLayout currentStep={1}>
        <PricingSection />
      </OnboardingLayout>
    </OnboardingProvider>
  );
}

"use client";

import { OnboardingLayout } from "@/components/module/Onboarding/onboarding-layout";
import { OnboardingProvider } from "@/redux/context/onboarding-context";

export default function VerificationOtp() {
  return (
    <OnboardingProvider>
      <OnboardingLayout currentStep={2}>
        <VerificationOtpPage />
      </OnboardingLayout>
    </OnboardingProvider>
  );
}

"use client";

import FeatureCard from "./FeatureCard";

interface WhyFamiliesFeature {
  number: number;
  title: string;
  description: string;
  backgroundColor: string;
}

interface WhyFamiliesSectionProps {
  subtitle?: string;
  title?: string;
  features?: WhyFamiliesFeature[];
  titleClassName?: string;
  subtitleClassName?: string;
}

const defaultFeatures: WhyFamiliesFeature[] = [
  {
    number: 1,
    title: "Respectful & Compassionate",
    description:
      "Created to support families during life's most difficult moments.",
    backgroundColor: "bg-[#466c7a]",
  },
  {
    number: 2,
    title: "Easy to Share",
    description:
      "Keep everyone informed with a single place for funeral and memorial information.",
    backgroundColor: "bg-[#6f628c]",
  },
  {
    number: 3,
    title: "Preserve Memories",
    description:
      "Collect stories, photographs, and messages that can be treasured for years to come.",
    backgroundColor: "bg-[#4c4624]",
  },
  {
    number: 4,
    title: "Accessible Anywhere",
    description:
      "Friends and family can participate from anywhere in the world.",
    backgroundColor: "bg-[#86736b]",
  },
];

export function WhyFamiliesSection({
  subtitle = "Why Families Choose Us",
  title = "Designed for Families",
  features = defaultFeatures,
  titleClassName,
  subtitleClassName,
}: WhyFamiliesSectionProps) {
  return (
    <section className="bg-[#fff8eb] py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Subtitle */}
          <p
            className={
              subtitleClassName ||
              "text-[#0496FF] text-sm md:text-[24px] tracking-wide mb-2"
            }
          >
            {subtitle}
          </p>

          {/* Main Title */}
          <h2
            className={
              titleClassName ||
              "text-3xl md:text-4xl lg:text-5xl text-[#052858] text-balance"
            }
          >
            {title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.number}
              number={feature.number}
              title={feature.title}
              description={feature.description}
              backgroundColor={feature.backgroundColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

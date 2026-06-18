/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PricingPlan } from ".";

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div
      className={`relative rounded-2xl p-8 sm:p-10 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
        plan.backgroundColor || "bg-slate-50"
      } ${plan.isPopular ? "md:scale-105 md:shadow-xl" : ""}`}
    >
      {plan.showBackgroundImage && (
        <Image
          src="/images/Mesh.png"
          alt={plan.name}
          width={400}
          height={400}
          className="absolute top-0 right-0 w-full rounded-2xl h-40 object-cover"
        />
      )}

      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#0496FF] text-white">
            Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-6 flex items-center justify-start">
        <div className="p-3 rounded-full">{plan.icon}</div>
      </div>

      {/* Plan Name */}
      <h3 className="text-xl sm:text-[32px] my-6 text-slate-900 mb-3">
        {plan.name}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-[20px] text-[#6F6C8F] mb-6 leading-relaxed">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-[48px] font-semibold text-[#170F49]">
            ${plan.price}
          </span>
          {plan.period && (
            <span className="text-sm sm:text-base text-slate-600">
              /{plan.period}
            </span>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant={plan.buttonVariant}
        className={`w-full mb-8 font-semibold text-base py-3 ${
          plan.buttonVariant === "default"
            ? "bg-primary rounded-md py-6 hover:bg-primary/90 text-white"
            : "border-slate-300 rounded-md py-6 text-slate-900 hover:bg-slate-100"
        }`}
      >
        {plan.buttonText}
      </Button>

      {/* Features List */}
      <div className="space-y-4 grow">
        {plan.features.map((feature: any, idx: any) => (
          <div
            key={`${feature.text}-${idx}`}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-[#5B5C57] shrink-0 mt-0.5" />
            <span className="text-sm sm:text-[20px] text-[#5B5C57]">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;

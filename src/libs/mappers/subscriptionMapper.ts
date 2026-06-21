import {
  SubscriptionPlanApi,
  SubscriptionPlanViewModel,
} from "@/src/types/subscription";

function parsePlanPrice(planPrice: string | undefined | null): {
  value: number;
  suffix?: string;
} {
  if (!planPrice) return { value: 0 };
  const [priceStr, suffix] = planPrice.split("/");
  const value = Number(priceStr);
  return { value: Number.isFinite(value) ? value : 0, suffix };
}

function getPeriod(planType: string | undefined, suffix?: string): string {
  if (planType === "LIFETIME") return "lifetime";
  if (planType === "YEARLY" || suffix === "yearly") return "year";
  if (planType === "MONTHLY" || suffix === "monthly") return "month";
  return suffix || (planType ? planType.toLowerCase() : "");
}

export function mapSubscriptionPlan(
  plan: SubscriptionPlanApi,
): SubscriptionPlanViewModel {
  const { value, suffix } = parsePlanPrice(plan?.planPrice);
  const period = getPeriod(plan?.planType, suffix);
  const isFree = value === 0;

  return {
    id: plan?.id ?? "",
    name: plan?.planName ?? "Unnamed Plan",
    isFree,
    priceValue: value,
    period,
    priceLabel: isFree ? "Free" : `$${value}`,
    periodLabel: isFree
      ? ""
      : period === "lifetime"
        ? "/lifetime"
        : `/${period}`,
    features: Array.isArray(plan?.SubscribeModelPlan)
      ? plan.SubscribeModelPlan.map((f) => ({
          id: f?.id ?? "",
          name: f?.name ?? "",
        }))
      : [],
  };
}

export function mapSubscriptionPlans(
  plans: SubscriptionPlanApi[] | undefined | null,
): SubscriptionPlanViewModel[] {
  if (!Array.isArray(plans)) return [];
  return plans.map(mapSubscriptionPlan);
}

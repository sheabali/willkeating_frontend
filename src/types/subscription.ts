export interface SubscriptionFeatureApi {
  id: string;
  name: string;
}

export interface SubscriptionPlanApi {
  id: string;
  planName: string;
  /** e.g. "0" or "399/yearly" — price and period jammed into one string */
  planPrice: string;
  planType: "LIFETIME" | "YEARLY" | "MONTHLY" | string;
  planMode: string;
  createdAt: string;
  updatedAt: string;
  SubscribeModelPlan: SubscriptionFeatureApi[];
}

export interface GetAllSubscriptionApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: { total: number };
    data: SubscriptionPlanApi[];
  };
  stats: Record<string, unknown>;
}

export interface SubscriptionFeatureViewModel {
  id: string;
  name: string;
}

export interface SubscriptionPlanViewModel {
  id: string;
  name: string;
  isFree: boolean;
  priceValue: number;
  period: string;
  priceLabel: string;
  periodLabel: string;
  features: SubscriptionFeatureViewModel[];
}

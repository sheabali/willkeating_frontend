export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED";

export interface PaymentSender {
  id: string;
  fullName: string;
  email: string;
  image?: string;
}

export interface PaymentTransaction {
  id: string;
  senderId: string;
  subscriptionId: string | null;
  transactionId: string;
  amount: number;
  tax: number;
  subtotal: number;
  currency: string;
  method: string;
  paymentMethodId: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  sender: PaymentSender | null;
  subscription: unknown | null;
}

export interface RevenueChartPoint {
  label: string;
  amount: number;
}

export interface PaymentStats {
  totalRevenue: number;
  revenueChart: {
    period: string;
    chart: RevenueChartPoint[];
    totalRevenue: number;
  };
}

export interface PaymentMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaymentApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: PaymentMeta;
  data: PaymentTransaction[];
  stats: PaymentStats;
}

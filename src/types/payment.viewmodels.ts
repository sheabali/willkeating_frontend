export interface TransactionRow {
  id: string;
  transactionId: string;
  date: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
}

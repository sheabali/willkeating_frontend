import {
  PaymentStatus,
  PaymentTransaction,
  RevenueChartPoint,
} from "@/src/types/payment.types";
import {
  MonthlyRevenuePoint,
  TransactionRow,
} from "@/src/types/payment.viewmodels";

function mapStatus(status: PaymentStatus): TransactionRow["status"] {
  if (status === "COMPLETED") return "completed";
  if (status === "PENDING") return "pending";
  return "failed";
}

export function mapTransactionToRow(t: PaymentTransaction): TransactionRow {
  return {
    id: t.id,
    transactionId: t.transactionId,
    date: t.createdAt,
    userName: t.sender?.fullName ?? "Unknown User",
    userEmail: t.sender?.email ?? "",
    userImage: t.sender?.image,
    amount: t.subtotal ?? t.amount ?? 0,
    status: mapStatus(t.status),
  };
}

export function mapTransactionsToRows(
  transactions: PaymentTransaction[] | undefined | null,
): TransactionRow[] {
  if (!transactions?.length) return [];
  return transactions.map(mapTransactionToRow);
}

export function mapRevenueChartToPoints(
  chart: RevenueChartPoint[] | undefined | null,
): MonthlyRevenuePoint[] {
  if (!chart?.length) return [];
  return chart.map((p) => ({ month: p.label, revenue: p.amount ?? 0 }));
}

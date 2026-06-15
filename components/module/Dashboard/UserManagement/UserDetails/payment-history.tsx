"use client";

import { Badge } from "@/components/ui/badge";
import { Payment } from "@/src/types/user.type";

interface PaymentHistoryProps {
  payments: Payment[];
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] text-[#182232]">Payment History</h3>
          <button className="rounded-md p-2 transition-colors hover:bg-neutral-100">
            <svg
              className="h-5 w-5 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Payment List */}
      <div className="divide-y divide-neutral-200">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="px-6 py-4 transition-colors hover:bg-neutral-50"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="mt-1 shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <svg
                    className="h-5 w-5 text-neutral-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3.586a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H4a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-900">
                      {payment.description}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {payment.invoiceNumber} •{" "}
                      {new Date(payment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-col items-end gap-2 md:mt-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      ${payment.amount.toFixed(2)}
                    </p>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-700 hover:bg-green-100"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

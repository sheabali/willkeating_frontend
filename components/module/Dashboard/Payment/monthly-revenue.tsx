"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyRevenueProps {
  data?: Array<{
    month: string;
    revenue: number;
  }>;
  isLoading?: boolean;
}

export function MonthlyRevenue({
  data = [],
  isLoading = false,
}: MonthlyRevenueProps) {
  const hasData = data.length > 0;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-[20px] text-[#101828]">Monthly Revenue Trend</h2>
      <div className="h-64 w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Loading revenue data...
          </div>
        ) : !hasData ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                tickFormatter={(value: string | number) => {
                  const numValue =
                    typeof value === "string" ? parseFloat(value) : value;
                  return `$${(numValue / 1000).toFixed(0)}k`;
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => {
                  const numValue = typeof value === "number" ? value : 0;
                  return `$${numValue.toLocaleString()}`;
                }}
                labelStyle={{ color: "#111827" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

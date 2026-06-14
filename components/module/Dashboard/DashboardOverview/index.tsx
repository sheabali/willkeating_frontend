"use client";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { Briefcase, Calendar, Users } from "lucide-react";
import { MonthlyRevenue } from "./monthly-revenue";
import { RecentObituaries } from "./recent-obituaries";
import { RecentUserActivity } from "./recent-user-activity";
import { RevenueByPackage } from "./revenue-by-package";

interface DashboardProps {
  onViewAllObituaries?: () => void;
}

export function DashboardOverview({ onViewAllObituaries }: DashboardProps) {
  const metrics = [
    {
      title: "Total Users",
      value: 43,
      icon: <Users className="text-[#155DFC]" />,
      bg: "bg-[#EFF6FF]",
    },
    {
      title: "Total Hosts",
      value: 34,
      icon: <Briefcase className="text-[#9810FA]" />,
      bg: "bg-[#FAF5FF]",
    },
    {
      title: "Active Bookings",
      value: 35,
      icon: <Calendar className="text-[#00A63E]" />,
      bg: "bg-[#F0FDF4]",
    },
    {
      title: "AI Sessions Today",
      value: 0,
      icon: <Calendar className="text-[#00A63E]" />,
      bg: "bg-[#F0FDF4]",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl  text-[#092924]">Dashboard Overview</h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 my-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MonthlyRevenue />
          </div>

          <div>
            <RevenueByPackage />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <RecentObituaries onViewAll={onViewAllObituaries} />
          </div>

          <div>
            <RecentUserActivity />
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import MetricCard from "@/components/shared/MetricCardDashboard";
import { Spinner } from "@/components/ui/spinner";
import {
  DashboardActivity,
  DashboardNotice,
  DashboardRevenueChartPoint,
  useGetDashboardOverviewQuery,
} from "@/redux/api/dashboardApi";
import { BookOpen, Calendar, FileText, Users } from "lucide-react";
import { MonthlyRevenue } from "./monthly-revenue";
import { RecentObituaries } from "./recent-obituaries";
import { RecentUserActivity } from "./recent-user-activity";
import { RevenueByPackage } from "./revenue-by-package";

interface DashboardProps {
  onViewAllObituaries?: () => void;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(dateString);
}

function getInitials(name?: string) {
  if (!name) return "??";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function mapNoticeToObituary(notice: DashboardNotice) {
  return {
    deceasedName: notice.name,
    submittedBy: notice.createdBy?.fullName ?? "Unknown",
    status: notice.status,
    date: formatDate(notice.createdAt),
  };
}

export function DashboardOverview({ onViewAllObituaries }: DashboardProps) {
  const { data, isLoading, isError } = useGetDashboardOverviewQuery({
    revenuePeriod: "monthly",
  });

  const overview = data?.data;
  const stats = overview?.stats;

  const metrics = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <Users className="text-[#155DFC]" />,
      bg: "bg-[#EFF6FF]",
    },
    {
      title: "Death Notices",
      value: stats?.totalDeathNotices ?? 0,
      icon: <FileText className="text-[#9810FA]" />,
      bg: "bg-[#FAF5FF]",
    },
    {
      title: "Funeral Notices",
      value: stats?.totalFuneralNotices ?? 0,
      icon: <Calendar className="text-[#00A63E]" />,
      bg: "bg-[#F0FDF4]",
    },
    {
      title: "Memorials",
      value: stats?.totalMemorials ?? 0,
      icon: <BookOpen className="text-[#00A63E]" />,
      bg: "bg-[#F0FDF4]",
    },
  ];

  const revenueData =
    overview?.revenueChart.chart.map((item: DashboardRevenueChartPoint) => ({
      month: item.label.split(" ")[0] ?? item.label,
      revenue: item.amount,
    })) ?? [];

  const subscriptionPackages = overview
    ? [
        {
          name: "Subscribed Users",
          revenue: String(overview.subscribedUsers),
        },
        {
          name: "Non-Subscribed Users",
          revenue: String(overview.nonSubscribedUsers),
        },
      ]
    : undefined;

  const recentObituaries = overview
    ? [
        ...(overview.recentDeathNotices ?? []),
        ...(overview.recentFuneralNotices ?? []),
      ]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 6)
        .map(mapNoticeToObituary)
    : undefined;

  const recentActivities = overview?.recentActivity.map(
    (activity: DashboardActivity) => ({
      id: activity.id,
      userName: activity.user?.fullName ?? "Unknown",
      action: activity.details || activity.action,
      timeAgo: timeAgo(activity.createdAt),
      initials: getInitials(activity.user?.fullName),
    }),
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-600">
          Failed to load dashboard overview. Please try again.
        </p>
      </div>
    );
  }

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
            <MonthlyRevenue data={revenueData} />
          </div>

          <div>
            <RevenueByPackage packages={subscriptionPackages} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <RecentObituaries
              obituaries={recentObituaries}
              onViewAll={onViewAllObituaries}
            />
          </div>

          <div>
            <RecentUserActivity activities={recentActivities} />
          </div>
        </div>
      </div>
    </main>
  );
}

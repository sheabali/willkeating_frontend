/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useDismissReportMutation,
  useGetAllModerationReportsQuery,
  useRemoveReportedContentMutation,
} from "@/redux/api/dashboardApi";

import { mapModerationReportsToViewModels } from "@/src/libs/mappers/moderation.mapper";
import { ModerationReportViewModel } from "@/src/types/moderation";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // swap for whatever toast lib you're using
import {
  ReviewContentItem,
  ReviewReportedContent,
} from "./review-reported-content";

export default function ModerationPage() {
  const { data: moderationReportsData, isLoading } =
    useGetAllModerationReportsQuery({});

  const [removeReported] = useRemoveReportedContentMutation();
  const [dismissReport] = useDismissReportMutation();

  const [items, setItems] = useState<ModerationReportViewModel[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    if (!moderationReportsData) return;
    setItems(mapModerationReportsToViewModels(moderationReportsData.data));
    setLastUpdated(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    );
  }, [moderationReportsData]);

  const handleRemove = async (id: string) => {
    const previous = items;
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await removeReported(id).unwrap(); // adjust arg shape to match your mutation signature
    } catch {
      setItems(previous);
      toast.error("Failed to remove content. Please try again.");
    }
  };

  const handleDismiss = async (id: string) => {
    const previous = items;
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await dismissReport(id).unwrap();
    } catch {
      setItems(previous);
      toast.error("Failed to dismiss report. Please try again.");
    }
  };

  const pendingCount =
    moderationReportsData?.data?.filter((r: any) => r.status === "PENDING")
      .length ?? items.length;

  const reviewItems: ReviewContentItem[] = items.map((item) => ({
    ...item,
    onRemove: handleRemove,
    onDismiss: handleDismiss,
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <ReviewReportedContent
          title="Review Reported Content"
          pendingCount={pendingCount}
          lastUpdated={lastUpdated}
          items={reviewItems}
          loading={isLoading}
        />
      </div>
    </main>
  );
}

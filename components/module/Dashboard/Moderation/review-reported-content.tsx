"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trash2, X } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

export interface ReviewContentItem {
  id: string;
  reportedIn: string;
  timestamp: string;
  content: {
    type: "text" | "image";
    text?: string;
    imageUrl?: string;
    imageCaption?: string;
  };
  reportedBy: {
    name: string;
    avatar: string;
    role: string;
  };
  onRemove: (id: string) => void;
  onDismiss: (id: string) => void;
}

export interface ReviewReportedContentProps {
  title?: string;
  pendingCount: number;
  lastUpdated: string;
  items: ReviewContentItem[];
  loading?: boolean;
  emptyState?: ReactNode;
}

export function ReviewReportedContent({
  title = "Review Reported Content",
  pendingCount,
  lastUpdated,
  items,
  loading = false,
  emptyState,
}: ReviewReportedContentProps) {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 px-6 py-6">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-[32px] font-semibold text-[#182232]">{title}</h1>
          <Badge className="text-base text-white bg-[#ae5050]">
            {pendingCount} Pending Reviews
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-6">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
          </div>
        )}

        {!loading && items.length === 0 && emptyState ? (
          emptyState
        ) : !loading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">
              No pending reviews at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <ReviewContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ReviewContentCardProps {
  item: ReviewContentItem;
}

function ReviewContentCard({ item }: ReviewContentCardProps) {
  return (
    <div className="flex gap-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Left Accent Bar */}
      <div className="w-1 shrink-0 bg-[#182232]" />

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-4 min-w-0">
          {/* Header with reported location and timestamp */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-semibold text-[#45474C]">
              Reported in:{" "}
              <span className="font-medium text-muted-foreground">
                {item.reportedIn}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
          </div>

          {/* Content Preview */}
          {item.content.type === "text" ? (
            <div className="bg-gray-100 border-l-4 border-gray-300 px-4 py-3">
              <p className="text-[16px] text-[#1A1C1C] line-clamp-3">
                {item.content.text}
              </p>
            </div>
          ) : (
            <div className="flex gap-3">
              {item.content.imageUrl && (
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.content.imageUrl}
                    alt="Uploaded attachment"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Uploaded Image Attachment:
                </p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {item.content.imageCaption}
                </p>
              </div>
            </div>
          )}

          {/* Reporter Info */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <Image
                src={item.reportedBy.avatar}
                alt={item.reportedBy.name}
                width={80}
                height={88}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">
                Reported by{" "}
                <span className="text-[#182232] font-medium text-[12px]">
                  {item.reportedBy.name}
                </span>{" "}
                • {item.reportedBy.role}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-6 sm:w-auto sm:flex-col sm:gap-4">
          <div>
            <Button
              onClick={() => item.onRemove(item.id)}
              className="flex-1 gap-2 sm:flex-none bg-[#A63D3D] rounded-sm py-6 px-10 hover:bg-[#A63D3D]/90"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Remove Content</span>
              <span className="sm:hidden">Remove</span>
            </Button>
          </div>
          <div>
            <Button
              onClick={() => item.onDismiss(item.id)}
              variant="outline"
              className="flex-1 gap-2 sm:flex-none rounded-sm py-6 px-10 hover:bg-[#A63D3D]/10"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Dismiss Report</span>
              <span className="sm:hidden">Dismiss</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

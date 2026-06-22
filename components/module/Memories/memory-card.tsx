"use client";

import { useState } from "react";
import { MoreVertical, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { CommentSection } from "./comment-section";
import { ImageGallery } from "./image-gallery";
import { Memory } from "./memories";

import { useReportMemorialMutation } from "@/redux/api/memoryApi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportMemorial, { isLoading: isReporting }] = useReportMemorialMutation();

  const handleReport = async () => {
    if (!reportReason.trim()) return;

    try {
      await reportMemorial({
        id: memory.id,
        data: { reason: reportReason },
      }).unwrap();

      toast.success("Post reported successfully");
      setIsReportModalOpen(false);
      setReportReason("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to report post");
    }
  };

  return (
    <article className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={memory.author.avatar}
                alt={memory.author.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-[24px] text-[#052858]">{memory.author.name}</p>
              <p className="text-[14px] font-medium text-[#5B5C57]">
                {memory.postedAt}
              </p>
            </div>
          </div>
          <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
            <DialogTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 border-0 gap-0 overflow-hidden rounded-xl" showCloseButton={false}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <DialogTitle className="text-[20px] font-medium text-[#052858]">Report</DialogTitle>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 pb-6 pt-5">
                <h3 className="text-[18px] font-medium text-[#052858] mb-4">Why are you reporting this post?</h3>
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Write something..."
                  className="w-full h-[200px] p-4 bg-[#FAFAFA] border border-gray-100 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400 text-[15px]"
                />
                <div className="mt-6">
                  <button
                    onClick={handleReport}
                    disabled={isReporting || !reportReason.trim()}
                    className="bg-[#8C60A6] text-white px-8 py-2.5 rounded-full hover:bg-[#7a5391] transition-colors disabled:opacity-50 text-[15px] font-medium"
                  >
                    {isReporting ? <Spinner /> : 'Submit Complain'}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 sm:px-6">
        <p className="text-[#052858] leading-relaxed text-sm sm:text-[20px]">
          {memory.description}
        </p>
      </div>

      {/* Image Gallery */}
      {memory.images.length > 0 && (
        <div className="px-4 py-4 sm:px-6">
          <ImageGallery images={memory.images} layout={memory.imageLayout} />
        </div>
      )}

      {/* Comments Section */}
      <CommentSection comments={memory.comments} memorialId={memory.id} />
    </article>
  );
}

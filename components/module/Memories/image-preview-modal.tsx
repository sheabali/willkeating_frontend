/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImagePreviewModalProps {
  images: string[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImagePreviewModal({
  images,
  initialIndex,
  open,
  onOpenChange,
}: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const hasMultiple = images.length > 1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goToPrev();
      if (event.key === "ArrowRight") goToNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goToPrev, goToNext]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-[min(95vw,1200px)] border-none bg-black/95 p-0 shadow-2xl sm:max-w-[min(95vw,1200px)] [&_[data-slot=dialog-close]]:text-white **:data-[slot=dialog-close]:hover:text-white/80"
      >
        <div className="relative flex min-h-[50vh] items-center justify-center p-4 sm:min-h-[70vh]">
          <Image
            src={images[currentIndex]}
            alt={`Memory image ${currentIndex + 1} of ${images.length}`}
            width={1200}
            height={900}
            className="max-h-[75vh] w-auto max-w-full object-contain"
            priority
          />

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goToPrev}
                disabled={!canGoPrev}
                aria-label="Previous image"
                className={cn(
                  "absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
                  !canGoPrev && "pointer-events-none opacity-30",
                )}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={!canGoNext}
                aria-label="Next image"
                className={cn(
                  "absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
                  !canGoNext && "pointer-events-none opacity-30",
                )}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <p className="pb-4 text-center text-sm text-white/70">
            {currentIndex + 1} / {images.length}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

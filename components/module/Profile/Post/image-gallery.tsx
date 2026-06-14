"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ImagePreviewModal } from "./image-preview-modal";

type ImageLayout = "grid-2x2" | "grid-2col" | "grid-3col" | "single";

interface ImageGalleryProps {
  images: string[];
  layout: ImageLayout;
}

const LAYOUT_CONFIG: Record<
  ImageLayout,
  { gridClass: string; imageClass: string }
> = {
  "grid-2x2": {
    gridClass: "grid grid-cols-2 gap-2 sm:gap-3",
    imageClass:
      "w-full h-32 sm:h-86 object-cover rounded-md hover:opacity-90 transition-opacity",
  },
  "grid-2col": {
    gridClass: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3",
    imageClass:
      "w-full h-32 sm:h-86 object-cover rounded-md hover:opacity-90 transition-opacity",
  },
  "grid-3col": {
    gridClass: "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3",
    imageClass:
      "w-full h-32 sm:h-86 object-cover rounded-md hover:opacity-90 transition-opacity",
  },
  single: {
    gridClass: "flex",
    imageClass:
      "w-full h-80 object-cover rounded-md hover:opacity-90 transition-opacity",
  },
};

export function ImageGallery({ images, layout }: ImageGalleryProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { gridClass, imageClass } =
    LAYOUT_CONFIG[layout] ?? LAYOUT_CONFIG["grid-2x2"];

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
    setPreviewOpen(true);
  }, []);

  if (images.length === 0) return null;

  return (
    <>
      <div className={gridClass}>
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => handleImageClick(index)}
            className="relative overflow-hidden rounded-md bg-gray-100 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={`View memory image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Memory image ${index + 1}`}
              width={800}
              height={700}
              className={imageClass}
            />
          </button>
        ))}
      </div>

      <ImagePreviewModal
        images={images}
        initialIndex={selectedIndex}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </>
  );
}

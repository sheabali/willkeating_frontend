"use client";

import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  layout: "grid-2x2" | "grid-2col" | "grid-3col" | "single";
}

export function ImageGallery({ images, layout }: ImageGalleryProps) {
  const getGridClass = () => {
    switch (layout) {
      case "grid-2x2":
        return "grid grid-cols-2 gap-2 sm:gap-3";
      case "grid-2col":
        return "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3";
      case "grid-3col":
        return "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3";
      case "single":
        return "flex";
      default:
        return "grid grid-cols-2 gap-2 sm:gap-3";
    }
  };

  const getImageClass = () => {
    switch (layout) {
      case "grid-2x2":
        return "w-full h-32 sm:h-86 object-cover rounded-md hover:opacity-90 transition-opacity";
      case "grid-2col":
        return "w-full h-32 sm:h-86 object-cover rounded-md hover:opacity-90 transition-opacity";
      case "grid-3col":
        return "w-full h-32 sm:h-86 object-cover rounded-md hover:opacity-90 transition-opacity";
      case "single":
        return "w-full h-80 object-cover rounded-md hover:opacity-90 transition-opacity";
      default:
        return "w-full h-32 object-cover rounded-md hover:opacity-90 transition-opacity";
    }
  };

  if (images.length === 0) return null;

  return (
    <div className={getGridClass()}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-gray-100 group cursor-pointer"
        >
          <Image
            src={image}
            alt={`Memory image ${index + 1}`}
            width={800}
            height={700}
            className={getImageClass()}
          />
        </div>
      ))}
    </div>
  );
}

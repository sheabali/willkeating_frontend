"use client";

import Image from "next/image";
import { useState } from "react";

interface MediaGalleryProps {
  coverPhoto?: {
    src: string;
    alt: string;
  };
  galleryPhotos?: Array<{
    src: string;
    alt: string;
  }>;
}

export function MediaGallery({ coverPhoto, galleryPhotos }: MediaGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!coverPhoto && (!galleryPhotos || galleryPhotos.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-neutral-600 tracking-widest uppercase">
        Media Gallery
      </h3>

      {/* Cover Photo */}
      {coverPhoto && (
        <div
          className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 group cursor-pointer"
          onClick={() => setSelectedImage(coverPhoto.src)}
        >
          <Image
            src={coverPhoto.src}
            alt={coverPhoto.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-neutral-900 text-white px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded">
              Cover Photo
            </span>
          </div>
        </div>
      )}

      {/* Gallery Thumbnails */}
      {galleryPhotos && galleryPhotos.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {galleryPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 group cursor-pointer"
              onClick={() => setSelectedImage(photo.src)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for expanded view */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full aspect-auto max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Expanded memorial photo"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg object-contain"
            />
            <button
              className="absolute -top-10 right-0 text-white text-2xl hover:opacity-80 transition-opacity"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { CommentSection } from "./comment-section";
import { ImageGallery } from "./image-gallery";

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-[24px] text-[#052858]">{post.author.name}</p>
              <p className="text-[14px] font-medium text-[#5B5C57]">
                {post.postedAt}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 sm:px-6">
        <p className="text-[#052858] leading-relaxed text-sm sm:text-[20px]">
          {post.description}
        </p>
      </div>

      {/* Image Gallery */}
      {post.images.length > 0 && (
        <div className="px-4 py-4 sm:px-6">
          <ImageGallery images={post.images} layout={post.imageLayout} />
        </div>
      )}

      {/* Comments Section */}
      <CommentSection comments={post.comments} />
    </article>
  );
}

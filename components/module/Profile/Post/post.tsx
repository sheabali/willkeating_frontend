/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useMemo, useState } from "react";
import { MOCK_MEMORIES } from "./mock-post";
import { PostCard } from "./post-card";
import type { Memory, MemoryFilter } from "./types";

export type { Memory } from "./types";

function filterPost(post: Memory[], query: string): Memory[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return post;

  return post.filter(
    (memory) =>
      memory.author.name.toLowerCase().includes(normalizedQuery) ||
      memory.description.toLowerCase().includes(normalizedQuery),
  );
}

function sortPost(post: Memory[], filter: MemoryFilter): Memory[] {
  if (filter === "popular") {
    return [...post].sort((a, b) => b.comments.length - a.comments.length);
  }

  return post;
}

export function Post() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<MemoryFilter>("recent");

  const filteredPost = useMemo(() => {
    const searched = filterPost(MOCK_MEMORIES, searchQuery);
    return sortPost(searched, filter);
  }, [searchQuery, filter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="space-y-6">
          {filteredPost.length > 0 ? (
            filteredPost.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No post found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

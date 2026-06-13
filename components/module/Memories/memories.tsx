"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterDropdown } from "./filter-dropdown";
import { MemoryCard } from "./memory-card";
import { SearchBar } from "./search-bar";

export interface Memory {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  postedAt: string;
  description: string;
  images: string[];
  imageLayout: "grid-2x2" | "grid-2col" | "grid-3col" | "single";
  comments: {
    author: {
      name: string;
      avatar: string;
    };
    text: string;
  }[];
  category?: string;
}

const MOCK_MEMORIES: Memory[] = [
  {
    id: "1",
    author: {
      name: "James Williams",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
    },
    postedAt: "Posted 3 hours ago",
    description:
      "I will always remember Dad teaching us how to ride our bikes in the park every Sunday morning. His patience and encouragement gave us confidence throughout our lives.",
    images: [
      "/images/Rectangle 14 (2).png",
      "/images/Rectangle 14.png",
      "/images/Rectangle 12.png",
      "/images/Rectangle 13 (3).png",
    ],
    imageLayout: "grid-2x2",
    comments: [
      {
        author: {
          name: "Alex Hales",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "So touched by your memories with kids. You brought them a lot of memories.",
      },
      {
        author: {
          name: "H. Robinhood",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "Wonderful! What a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Carry D.",
          avatar:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=32&h=32&fit=crop",
        },
        text: "Such a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Billy something",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "",
      },
    ],
    category: "family",
  },
  {
    id: "2",
    author: {
      name: "Michael O'Brien",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop",
    },
    postedAt: "Posted 1 hour ago",
    description:
      "One of my favorite memories of James was our annual fishing trip. No matter the weather, he always managed to make everyone laugh and enjoy the day.",
    images: [
      "/images/rectangle_15.png",
      "/images/Rectangle 12 (1).png",
      "/images/Rectangle 14 (1).png",
      "/images/Rectangle 13 (2).png",
    ],
    imageLayout: "grid-2x2",
    comments: [
      {
        author: {
          name: "Alex Hales",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
        },
        text: "So touched by your memories with kids. You brought them a lot of memories.",
      },
      {
        author: {
          name: "H. Robinhood",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "Wonderful! What a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Carry D.",
          avatar:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=32&h=32&fit=crop",
        },
        text: "Such a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Billy something",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "",
      },
    ],
    category: "adventure",
  },
  {
    id: "3",
    author: {
      name: "Emma Sullivan",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop",
    },
    postedAt: "Posted 1 week ago",
    description:
      "Mum's garden was her pride and joy. Every flower she planted seemed to blossom under her care. Walking through her garden today brought back so many wonderful memories.",
    images: [
      "/images/Rectangle 12 (1).png",
      "/images/Rectangle 14 (1).png",
      "/images/Rectangle 13 (2).png",
    ],
    imageLayout: "grid-2col",
    comments: [
      {
        author: {
          name: "Alex Hales",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
        },
        text: "So touched by your memories with kids. You brought them a lot of memories.",
      },
      {
        author: {
          name: "H. Robinhood",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "Wonderful! What a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Carry D.",
          avatar:
            "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=32&h=32&fit=crop",
        },
        text: "Such a beautiful memory. Thank you for sharing this.",
      },
      {
        author: {
          name: "Billy something",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop",
        },
        text: "",
      },
    ],
    category: "nature",
  },
];

export function Memories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "recent" | "popular">("recent");

  console.log("searchQuery", searchQuery);

  const filteredMemories = useMemo(() => {
    let filtered = MOCK_MEMORIES;

    if (searchQuery) {
      filtered = filtered.filter(
        (memory) =>
          memory.author.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          memory.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filter === "recent") {
      return filtered;
    }

    return filtered;
  }, [searchQuery, filter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#052858] sm:text-[48px]">
              Memories
            </h1>
          </div>
          <Button className="w-full sm:w-auto gap-2 px-6 py-6 bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200">
            <Plus className="w-4 h-4" />
            Share Memory
          </Button>
        </div>

        {/* Controls Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>

        {/* Memories Grid */}
        <div className="space-y-6">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No memories found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2 pb-8">
          <button className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
            1
          </button>
          <button className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            2
          </button>
          <button className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            3
          </button>
          <span className="text-gray-600 mx-2">...</span>
          <button className="rounded-full bg-amber-500 w-8 h-8 flex items-center justify-center text-white hover:bg-amber-600 transition-colors">
            9
          </button>
        </div>
      </div>
    </div>
  );
}

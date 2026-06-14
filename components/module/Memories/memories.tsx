"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterDropdown } from "./filter-dropdown";
import { MemoryCard } from "./memory-card";
import { MOCK_MEMORIES } from "./mock-memories";
import { SearchBar } from "./search-bar";
import type { Memory, MemoryFilter } from "./types";

export type { Memory } from "./types";

function filterMemories(memories: Memory[], query: string): Memory[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return memories;

  return memories.filter(
    (memory) =>
      memory.author.name.toLowerCase().includes(normalizedQuery) ||
      memory.description.toLowerCase().includes(normalizedQuery),
  );
}

function sortMemories(memories: Memory[], filter: MemoryFilter): Memory[] {
  if (filter === "popular") {
    return [...memories].sort((a, b) => b.comments.length - a.comments.length);
  }

  return memories;
}

export function Memories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<MemoryFilter>("recent");

  const filteredMemories = useMemo(() => {
    const searched = filterMemories(MOCK_MEMORIES, searchQuery);
    return sortMemories(searched, filter);
  }, [searchQuery, filter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold text-[#052858] sm:text-[48px]">
            Memories
          </h1>
          <Link href="/memories/new">
            <Button className="w-full gap-2 border border-amber-200 bg-amber-50 px-6 py-6 text-amber-600 hover:bg-amber-100 sm:w-auto">
              <Plus className="h-4 w-4" />
              Share Memory
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>

        <div className="space-y-6">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No memories found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 pb-8">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200">
            3
          </button>
          <span className="mx-2 text-gray-600">...</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white transition-colors hover:bg-amber-600">
            9
          </button>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useGetAllMemoryQuery } from "@/redux/api/memoryApi";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MemoryCard } from "./memory-card";
import { mapMemorialsToMemories } from "./memory-mappers";
import { Pagination } from "./Pagination";
import { SearchBar } from "./search-bar";
import type { Memory } from "./types";

export type { Memory } from "./types";

const PAGE_LIMIT = 10;

export function Memories() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, []);

  const {
    data: memoriesData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllMemoryQuery({
    page,
    limit: PAGE_LIMIT,
    search: debouncedSearch || undefined,
  }) as any;

  const memories: Memory[] = useMemo(
    () => mapMemorialsToMemories(memoriesData?.data),
    [memoriesData],
  );

  const meta = memoriesData?.meta;
  const totalPages: number = meta?.totalPage ?? 1;
  const currentPage: number = meta?.page ?? page;

  const showEmptyState = !isLoading && !isError && memories.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold text-[#052858] sm:text-[48px]">
            Memories
          </h1>
          <Link href="/memories/new">
            <Button className="w-full gap-2 bg-[#ffffff] border border-primary px-6 py-6 text-primary font-semibold hover:bg-[#f4faff] sm:w-auto">
              <Plus className="h-4 w-4" />
              Share Memory
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchInput} onChange={setSearchInput} />
          {/* <FilterDropdown value={filter} onChange={setFilter} /> */}
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading memories...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center">
              <p className="text-red-500">
                Something went wrong loading memories. Please try again.
              </p>
            </div>
          ) : showEmptyState ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No memories found. Try adjusting your search.
              </p>
            </div>
          ) : (
            memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={isFetching}
          />
        )}
      </div>
    </div>
  );
}

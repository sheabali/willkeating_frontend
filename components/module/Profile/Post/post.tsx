/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";

import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import { Pagination } from "../../Memories/Pagination";
import { mapMemorialsToMemories } from "../../Memories/memory-mappers";
import { PostCard } from "./post-card";
import type { Memory } from "./types";

export type { Memory } from "./types";

const PAGE_LIMIT = 10;

export function Post() {
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
  } = useGetMyProfileQuery({
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
      <div className="container mx-auto px-4 py-8 sm:py-8">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"></div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* <SearchBar value={searchInput} onChange={setSearchInput} /> */}
          {/* <FilterDropdown value={filter} onChange={setFilter} /> */}
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center">
              <p className="text-red-500">
                Something went wrong loading posts. Please try again.
              </p>
            </div>
          ) : showEmptyState ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No posts found. Try adjusting your search.
              </p>
            </div>
          ) : (
            memories.map((memory) => <PostCard key={memory.id} post={memory} />)
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

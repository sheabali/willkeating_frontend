/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllObituariesQuery } from "@/redux/api/obituariesApi";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { ObituaryCard } from "./obituary-card";

type SortOption = "recent" | "oldest" | "name";

const SORT_PARAMS: Record<
  SortOption,
  { sortBy: string; sortOrder: "asc" | "desc" }
> = {
  recent: { sortBy: "createdAt", sortOrder: "desc" },
  oldest: { sortBy: "createdAt", sortOrder: "asc" },
  name: { sortBy: "name", sortOrder: "asc" },
};

const LIMIT = 9;

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy]);

  const { data, isLoading, isFetching } = useGetAllObituariesQuery({
    page,
    limit: LIMIT,
    search: debouncedSearch || undefined,
    ...SORT_PARAMS[sortBy],
  }) as any;

  const obituaries = data?.data ?? [];
  const meta = data?.meta;

  return (
    <main className="min-h-screen bg-white px-6 py-12 sm:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold text-neutral-900 md:text-4xl lg:text-5xl">
            Obituaries Notices
          </h1>

          <Link href="/obituaries-notices/create-obituaries-notices">
            <Button
              variant="outline"
              className="w-full rounded-full border-primary px-5 py-6 text-primary hover:text-primary/70 sm:w-auto"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Obituaries Notice
            </Button>
          </Link>
        </div>

        {/* Controls */}
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full border border-neutral-300 bg-white pl-10 pr-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            {/* <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none border border-neutral-300 bg-white pr-10 pl-4 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="recent">Recently Published</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" /> */}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg bg-neutral-100"
              />
            ))}
          </div>
        )}

        {/* Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {obituaries.map((obituary: any) => (
              <ObituaryCard
                key={obituary.id}
                obituary={{
                  id: obituary.id,
                  name: obituary.name,
                  birthDate: formatDate(obituary.dateOfBirth),
                  deathDate: formatDate(obituary.dateOfPassing),
                  imageUrl: obituary.images?.[0] ?? "/images/Ellipse 6.png",
                }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && obituaries.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <p className="text-lg text-neutral-600">No obituaries found</p>
            <p className="text-sm text-neutral-500">
              Try adjusting your search terms
            </p>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-neutral-600">
              Page {meta.page} of {meta.totalPage}
            </span>
            <Button
              variant="outline"
              disabled={page >= meta.totalPage || isFetching}
              onClick={() => setPage((p) => Math.min(meta.totalPage, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

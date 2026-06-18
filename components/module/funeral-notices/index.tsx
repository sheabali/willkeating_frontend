/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllFuneralQuery } from "@/redux/api/funeralApi";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { FuneralCard } from "./funeral-card";

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

export default function FuneralNotices() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy]);

  const { data, isLoading, isFetching } = useGetAllFuneralQuery({
    page,
    limit: LIMIT,
    search: debouncedSearch || undefined,
    ...SORT_PARAMS[sortBy],
  }) as any;

  const funerals = data?.data || [];
  const meta = data?.meta;

  return (
    <main className="min-h-screen bg-white px-6 py-12 sm:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold text-neutral-900 md:text-4xl lg:text-5xl">
            Funeral Notices
          </h1>

          <Link href="/funeral-notices/create">
            <Button
              variant="outline"
              className="w-full rounded-full border-primary px-5 py-6 text-primary hover:text-primary/70 sm:w-auto"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Funeral Notice
            </Button>
          </Link>
        </div>

        {/* Controls */}
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

            <input
              type="text"
              placeholder="Search by name, location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full border border-neutral-300 bg-white py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: LIMIT }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-lg bg-neutral-100"
              />
            ))}
          </div>
        )}

        {/* Funeral Cards */}
        {!isLoading && funerals?.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {funerals.map((funeral: any) => (
              <FuneralCard
                key={funeral.id}
                funeral={{
                  id: funeral.id,
                  name: funeral.name,
                  birthDate: funeral.dateOfBirth,
                  deathDate: funeral.dateOfPassing,
                  imageUrl: funeral.images?.[0] || "/placeholder.png",
                  funeralLocation: funeral.funeralLocation,
                  funeralDate: funeral.funeralDate,
                  funeralTime: funeral.funeralTime,
                  funeralTimeFormat: "",
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && funerals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-lg font-medium text-neutral-700">
              No obituaries found
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Try adjusting your search terms.
            </p>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>

            <span className="text-sm text-neutral-600">
              Page {meta.page} of {meta.totalPage}
            </span>

            <Button
              variant="outline"
              disabled={page >= meta.totalPage || isFetching}
              onClick={() =>
                setPage((prev) => Math.min(meta.totalPage, prev + 1))
              }
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

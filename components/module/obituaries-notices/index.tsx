"use client";

import { ChevronDown, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { ObituaryCard } from "./obituary-card";

const OBITUARIES = [
  {
    id: "1",
    name: "Margaret Anne Murphy",
    birthDate: "12 March 1948",
    deathDate: "28 May 2025",
    imageUrl: "/images/Ellipse 6 (1).png",
  },
  {
    id: "2",
    name: "Patrick Joseph O'Connor",
    birthDate: "22 August 1956",
    deathDate: "30 May 2026",
    imageUrl: "/images/Ellipse 6 (2).png",
  },
  {
    id: "3",
    name: "Bridget Mary Walsh",
    birthDate: "8 January 1941",
    deathDate: "26 May 2026",
    imageUrl: "/images/Ellipse 6 (3).png",
  },
  {
    id: "4",
    name: "Michael Francis Byrne",
    birthDate: "17 November 1963",
    deathDate: "24 May 2026",
    imageUrl: "/images/Ellipse 6.png",
  },
  {
    id: "5",
    name: "Catherine Elizabeth Doyle",
    birthDate: "4 July 1952",
    deathDate: "29 May 2026",
    imageUrl: "/images/Ellipse 6 (1).png",
  },
  {
    id: "6",
    name: "Sean Anthony Kelly",
    birthDate: "15 September 1970",
    deathDate: "31 May 2026",
    imageUrl: "/images/Ellipse 6 (1).png",
  },
  {
    id: "7",
    name: "Margaret Anne Murphy",
    birthDate: "12 March 1948",
    deathDate: "28 May 2025",
    imageUrl: "/images/Ellipse 6 (1).png",
  },
  {
    id: "8",
    name: "Patrick Joseph O'Connor",
    birthDate: "22 August 1956",
    deathDate: "30 May 2026",
    imageUrl: "/images/Ellipse 6 (1).png",
  },
  {
    id: "9",
    name: "Bridget Mary Walsh",
    birthDate: "8 January 1941",
    deathDate: "26 May 2026",
    imageUrl: "/images/Ellipse 6 (1).png",
  },
];

type SortOption = "recent" | "oldest" | "name";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredAndSorted = useMemo(() => {
    const results = OBITUARIES.filter((obituary) => {
      const query = searchQuery.toLowerCase();
      return (
        obituary.name.toLowerCase().includes(query) ||
        obituary.birthDate.toLowerCase().includes(query) ||
        obituary.deathDate.toLowerCase().includes(query)
      );
    });

    // Sort the results
    if (sortBy === "recent") {
      results.sort((a, b) => {
        const dateA = new Date(
          b.deathDate.split(" ").reverse().join("-"),
        ).getTime();
        const dateB = new Date(
          a.deathDate.split(" ").reverse().join("-"),
        ).getTime();
        return dateA - dateB;
      });
    } else if (sortBy === "oldest") {
      results.sort((a, b) => {
        const dateA = new Date(
          a.deathDate.split(" ").reverse().join("-"),
        ).getTime();
        const dateB = new Date(
          b.deathDate.split(" ").reverse().join("-"),
        ).getTime();
        return dateA - dateB;
      });
    } else if (sortBy === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [searchQuery, sortBy]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-neutral-300 bg-white pl-10 pr-4 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none border border-neutral-300 bg-white pr-10 pl-4 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="recent">Recently Published</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((obituary) => (
            <ObituaryCard key={obituary.id} obituary={obituary} />
          ))}
        </div>

        {/* Empty state */}
        {filteredAndSorted.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <p className="text-lg text-neutral-600">No obituaries found</p>
            <p className="text-sm text-neutral-500">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-xs">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-4 h-4" />
      </div>
      <Input
        type="text"
        placeholder="Search memories by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white py-6 pl-10 pr-10 text-sm placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-colors"
      />
      {value && (
        <Button
          onClick={() => onChange("")}
          size="sm"
          className="absolute rounded-full right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4 text-white" />
        </Button>
      )}
    </div>
  );
}

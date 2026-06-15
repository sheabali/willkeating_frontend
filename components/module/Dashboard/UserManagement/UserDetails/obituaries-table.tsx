"use client";

import { Badge } from "@/components/ui/badge";
import { Obituary } from "@/src/types/user.type";

interface ObituariesTableProps {
  obituaries: Obituary[];
}

export function ObituariesTable({ obituaries }: ObituariesTableProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] text-[#182232]">Obituaries Created</h3>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
            {obituaries.length} Records
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Deceased Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {obituaries.map((obituary, index) => (
              <tr
                key={obituary.id}
                className={`${
                  index !== obituaries.length - 1
                    ? "border-b border-neutral-200"
                    : ""
                } transition-colors hover:bg-neutral-50`}
              >
                <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                  {obituary.deceasedName}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    {obituary.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right text-sm text-neutral-600">
                  {new Date(obituary.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

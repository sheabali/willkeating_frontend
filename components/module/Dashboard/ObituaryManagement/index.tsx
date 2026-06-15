/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import { Button } from "@/components/ui/button";
import { NRTable } from "@/components/ui/core/NRTable";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Obituary } from "@/src/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Eye, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import ActionCell from "./ActionCell";

const ObituaryManagement = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const limit = 10;
  const totalItems = 24;

  const obituaryData: Obituary[] = [
    {
      id: "EH",
      deceasedName: "Eleanor Harrington",
      submittedBy: "Thomas Harrington",
      status: "PUBLISHED",
      createdDate: "Oct 24, 2023",
    },
    {
      id: "EH",
      deceasedName: "Eleanor Harrington",
      submittedBy: "Thomas Harrington",
      status: "PUBLISHED",
      createdDate: "Oct 24, 2023",
    },
    {
      id: "EH",
      deceasedName: "Eleanor Harrington",
      submittedBy: "Thomas Harrington",
      status: "PUBLISHED",
      createdDate: "Oct 24, 2023",
    },
    {
      id: "EH",
      deceasedName: "Eleanor Harrington",
      submittedBy: "Thomas Harrington",
      status: "PUBLISHED",
      createdDate: "Oct 24, 2023",
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/dashboard/obituary/${id}`);
  };

  const columns = useMemo<ColumnDef<Obituary>[]>(
    () => [
      {
        accessorKey: "deceasedName",
        header: "DECEASED NAME",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
              {row.original.deceasedName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-medium text-[#101828]">
                {row.original.deceasedName}
              </p>
              <p className="text-xs text-gray-500">ID: {row.original.id}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "submittedBy",
        header: "SUBMITTED BY",
        cell: ({ row }) => (
          <p className="text-sm text-gray-900">{row.original.submittedBy}</p>
        ),
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              row.original.status === "PUBLISHED"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: "createdDate",
        header: "CREATED DATE",
        cell: ({ row }) => {
          const createdDate =
            row.original.createdDate instanceof Date
              ? row.original.createdDate.toLocaleDateString()
              : row.original.createdDate;

          return <p className="text-sm text-gray-700">{createdDate}</p>;
        },
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleView(row.original.id)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
              title="View Obituary"
            >
              <Eye className="h-5 w-5" />
            </button>

            <ActionCell id={row.original.id} status={row.original.status} />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[24px] font-semibold text-[#092924] mt-6">
          Obituary Management
        </h1>
      </div>

      {/* Filters & Search */}
      <div className="border rounded-2xl bg-white p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="w-full sm:w-96">
            <Input
              type="text"
              placeholder="Search by deceased name or submitter..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="py-6"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-72">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 border-gray-200 justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {statusFilter}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {["All", "PUBLISHED", "DRAFT", "PENDING"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Total Count */}
          <div className="text-sm text-gray-600 whitespace-nowrap">
            Total Obituaries: <span className="font-medium">{totalItems}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow">
        <div className="p-4">
          <NRTable columns={columns} data={obituaryData} />
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 bg-white px-4 py-4">
          <TablePagination
            totalPage={Math.ceil(totalItems / limit)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ObituaryManagement;

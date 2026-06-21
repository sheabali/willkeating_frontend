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
import { TransactionRow } from "@/src/types/payment.viewmodels";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Filter } from "lucide-react";
import { useMemo } from "react";

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  failed: "bg-red-100 text-red-700 border-red-200",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}
  >
    {status}
  </span>
);

export type StatusFilter = "ALL" | "COMPLETED" | "PENDING" | "FAILED";

const STATUS_LABELS: Record<StatusFilter, string> = {
  ALL: "All Status",
  COMPLETED: "Completed",
  PENDING: "Pending",
  FAILED: "Failed",
};

interface TransactionTableProps {
  data: TransactionRow[];
  isLoading?: boolean;
  totalItems: number;
  limit?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
}

const TransactionTable = ({
  data,
  isLoading = false,
  totalItems,
  limit = 10,
  currentPage,
  onPageChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TransactionTableProps) => {
  const columns = useMemo<ColumnDef<TransactionRow>[]>(
    () => [
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.transactionId.slice(0, 10).toUpperCase()}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">
            {row.original.date
              ? new Date(row.original.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "—"}
          </span>
        ),
      },
      {
        accessorKey: "userName",
        header: "User",
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">{row.original.userName}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            ${row.original.amount.toLocaleString()}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
    ],
    [],
  );

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-[24px] mt-6 leading-7 text-[#092924]">
          Transactions
        </h2>
      </div>

      <div className="border rounded-2xl py-[25px] bg-[#ffffff] p-4">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <Input
              className="w-full py-6"
              type="text"
              placeholder="Search by Transaction ID, User, or Amount..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="w-[30%]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 flex items-center justify-between h-11 border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {STATUS_LABELS[statusFilter]}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {(Object.keys(STATUS_LABELS) as StatusFilter[]).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => onStatusFilterChange(key)}
                  >
                    {STATUS_LABELS[key]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              Total Transactions: {totalItems}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow mt-4">
        <div className="pb-4 px-4 pt-2">
          {isLoading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading transactions...
            </div>
          ) : (
            <NRTable columns={columns} data={data} />
          )}
        </div>

        <div className="flex items-center justify-start border-t border-gray-200 bg-white py-3">
          <TablePagination
            totalPage={Math.max(1, Math.ceil(totalItems / limit))}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;

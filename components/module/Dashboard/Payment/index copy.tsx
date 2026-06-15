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
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Filter } from "lucide-react";
import { useMemo, useState } from "react";

type Transaction = {
  transactionId: string;
  date: string;
  user: string;
  amount: number;
  status: "completed" | "pending" | "failed";
};

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

const TransactionTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalItems = 2; // Update this based on real data count

  const transactionData: Transaction[] = [
    {
      transactionId: "TXN-001",
      date: "2024-12-05",
      user: "John Smith",
      amount: 279.5,
      status: "completed",
    },
    {
      transactionId: "TXN-002",
      date: "2024-12-04",
      user: "Emma Wilson",
      amount: 198,
      status: "completed",
    },
  ];

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.transactionId}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <span className="text-sm text-gray-700">
            {new Date(row.original.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        ),
      },
      {
        accessorKey: "user",
        header: "User",
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
          {/* Search */}
          <div className="w-1/2">
            <Input
              className="w-full py-6"
              type="text"
              placeholder="Search by Transaction ID, User, or Amount..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter */}
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
                      All Status
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Failed</DropdownMenuItem>
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
          <NRTable columns={columns} data={transactionData} />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-start border-t border-gray-200 bg-white py-3">
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

export default TransactionTable;

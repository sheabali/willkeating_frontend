/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { Spinner } from "@/components/ui/spinner";
import { useGetAllObituaryQuery } from "@/redux/api/dashboardApi";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Eye, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ActionCell from "./ActionCell";

type ObituaryRow = {
  id: string;
  deceasedName: string;
  type: any;
  submittedByName: string;
  submittedByEmail: string;
  location: string;
  dateOfPassing: string;
  status: any;
  createdAt: string;
  thumbnail?: string;
};

const statusStyles: Record<any, string> = {
  PUBLISHED: "bg-green-100 text-green-600 border-green-200",
  PENDING: "bg-yellow-100 text-yellow-600 border-yellow-200",
  DRAFT: "bg-gray-100 text-gray-600 border-gray-200",
};

const typeStyles: Record<any, string> = {
  FUNERAL_NOTICE: "bg-blue-50 text-blue-600 border-blue-200",
  DEATH_NOTICE: "bg-purple-50 text-purple-600 border-purple-200",
};

const typeLabels: Record<any, string> = {
  FUNERAL_NOTICE: "Funeral Notice",
  DEATH_NOTICE: "Death Notice",
};

const STATUS_FILTERS: Array<{ label: string; value?: any }> = [
  { label: "All Status" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Pending", value: "PENDING" },
  { label: "Draft", value: "DRAFT" },
];

const StatusBadge = ({ status }: { status: any }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const TypeBadge = ({ type }: { type: any }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeStyles[type]}`}
  >
    {typeLabels[type]}
  </span>
);

const ObituaryManagement = () => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<any | undefined>(undefined);

  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading, isFetching } = useGetAllObituaryQuery({
    page: currentPage,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const meta = data?.meta;
  const totalItems = meta?.total ?? 0;
  const totalPages = meta?.totalPage ?? 1;

  const obituaryData: any[] = useMemo(
    () =>
      (data?.data ?? []).map((item) => ({
        id: item.id,
        deceasedName: item.name,
        type: item.type,
        submittedByName: item.createdBy?.fullName ?? "—",
        submittedByEmail: item.createdBy?.email ?? "—",
        location: item.funeralLocation ?? item.location ?? "—",
        dateOfPassing: item.dateOfPassing,
        status: item.status,
        createdAt: item.createdAt,
        thumbnail: item.images?.[0],
      })),
    [data?.data],
  );

  const handleView = (id: string, type: string) => {
    router.push(`/admin/dashboard/obituary/${id}?type=${type}`);
  };

  const selectedStatusLabel =
    STATUS_FILTERS.find((item) => item.value === statusFilter)?.label ??
    "All Status";

  const columns = useMemo<ColumnDef<ObituaryRow>[]>(
    () => [
      {
        accessorKey: "deceasedName",
        header: "Deceased",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={row.original.thumbnail}
                alt={row.original.deceasedName}
                className="h-9 w-9 rounded-full object-cover"
              />
            )}
            <div className="flex flex-col">
              <p className="text-[16px] font-medium text-[#101828]">
                {row.original.deceasedName}
              </p>
              <TypeBadge type={row.original.type} />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "submittedByName",
        header: "Submitted By",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <p className="text-sm text-gray-900">
              {row.original.submittedByName}
            </p>
            <p className="text-xs text-gray-500">
              {row.original.submittedByEmail}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <p className="text-sm text-gray-700">{row.original.location}</p>
        ),
      },
      {
        accessorKey: "dateOfPassing",
        header: "Date of Passing",
        cell: ({ row }) =>
          row.original.dateOfPassing ? (
            <p className="text-sm text-gray-700">
              {new Date(row.original.dateOfPassing).toLocaleDateString()}
            </p>
          ) : (
            <p className="text-sm text-gray-400">—</p>
          ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <p className="text-sm text-gray-700">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </p>
        ),
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleView(row.original.id, row.original.type)}
              className="rounded-md p-2 cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            >
              <Eye className="h-5 w-5" />
            </button>

            <button className="rounded-md p-2 cursor-pointer text-gray-600 hover:bg-red-50 hover:text-red-600">
              <ActionCell id={row.original.id} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <div>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[24px] mt-6 leading-7 text-[#092924]">
            Obituary Management
          </h2>
        </div>
      </div>

      <div className="border rounded-2xl py-[25px] bg-[#ffffff] p-4">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <Input
              className="w-full py-6"
              type="text"
              placeholder="Search by deceased name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
                      {selectedStatusLabel}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {STATUS_FILTERS.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={() => setStatusFilter(item.value)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <p>Total Obituaries: {totalItems}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow mt-4">
        <div className="pb-4 px-4 pt-2">
          {isLoading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            <NRTable columns={columns} data={obituaryData} />
          )}
        </div>

        <div className="flex items-center justify-start border-t border-gray-200 bg-white py-3">
          <TablePagination
            totalPage={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          {isFetching && !isLoading && (
            <span className="ml-4 text-sm text-gray-500">Updating...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObituaryManagement;

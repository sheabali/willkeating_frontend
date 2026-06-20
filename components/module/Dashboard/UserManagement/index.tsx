/* eslint-disable react-hooks/set-state-in-effect */
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
import { Spinner } from "@/components/ui/spinner";
import { AdminUserStatus, useGetAllUsersQuery } from "@/redux/api/dashboardApi";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Eye, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ActionCell from "./ActionCell";

type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: AdminUserStatus;
  totalObituaries: number;
  createdAt: string;
};

const statusStyles: Record<AdminUserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600 border-green-200",
  INACTIVE: "bg-gray-100 text-gray-600 border-gray-200",
  SUSPENDED: "bg-yellow-100 text-yellow-600 border-yellow-200",
};

const STATUS_FILTERS: Array<{ label: string; value?: AdminUserStatus }> = [
  { label: "All Status" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
];

const StatusBadge = ({ status }: { status: AdminUserStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const UserManagement = () => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<AdminUserStatus | undefined>(
    undefined,
  );

  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const { data, isLoading, isFetching } = useGetAllUsersQuery({
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

  const userData: User[] = useMemo(
    () =>
      (data?.data ?? []).map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        status: user.status,
        totalObituaries: user.obituaryCount,
        createdAt: user.createdAt,
      })),
    [data?.data],
  );

  const handleView = (id: string) => {
    router.push(`/admin/dashboard/users/${id}`);
  };

  const selectedStatusLabel =
    STATUS_FILTERS.find((item) => item.value === statusFilter)?.label ??
    "All Status";

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "User Name",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <p className="text-[16px] font-medium text-[#101828]">
              {row.original.fullName}
            </p>
            <p className="text-xs text-gray-500">{row.original.id}</p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Contact",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <p className="text-sm text-gray-900">{row.original.email}</p>
            <p className="text-xs text-gray-500">{row.original.phone}</p>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "totalObituaries",
        header: "Obituaries",
      },
      {
        accessorKey: "createdAt",
        header: "Join Date",
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
              onClick={() => handleView(row.original.id)}
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
            User Management
          </h2>
        </div>
      </div>

      <div className="border rounded-2xl py-[25px] bg-[#ffffff] p-4">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <Input
              className="w-full py-6"
              type="text"
              placeholder="Search by name, email, or phone..."
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
            <p>Total Users: {totalItems}</p>
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
            <NRTable columns={columns} data={userData} />
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

export default UserManagement;

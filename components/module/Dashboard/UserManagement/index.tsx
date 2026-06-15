/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import { NRTable } from "@/components/ui/core/NRTable";
// import { useGetTechniciansManagementStatsQuery } from "@/redux/api/shopOwnerDashboardApi";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/core/NRTable/TablePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Eye, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import ActionCell from "./ActionCell";

type UserStatus = "ACTIVE" | "INVITED" | "SUSPENDED" | "BLOCKED";

type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: UserStatus;
  totalObituaries: number;
  createdAt: string;
};

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600 border-green-200",
  INVITED: "bg-blue-100 text-blue-600 border-blue-200",
  SUSPENDED: "bg-yellow-100 text-yellow-600 border-yellow-200",
  BLOCKED: "bg-red-100 text-red-600 border-red-200",
};

const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
  >
    {status}
  </span>
);

const UserManagement = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalItems = 20;

  // console.log("searchTerm", searchTerm);

  // const { data: managementStatsData, isLoading: managementStatsLoading } =
  //   useGetTechniciansManagementStatsQuery({});
  const handleView = (id: string) => {
    console.log("view", id);
    router.push(`/admin/dashboard/users/${id}`);
  };

  const userData: User[] = [
    {
      id: "U001",
      fullName: "John Smith",
      email: "john@example.com",
      phone: "+1 234-567-8901",
      status: "ACTIVE",
      totalObituaries: 12,
      createdAt: "2024-01-15",
    },
    {
      id: "U002",
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "+1 987-654-3210",
      status: "INVITED",
      totalObituaries: 8,
      createdAt: "2024-02-10",
    },
    {
      id: "U001",
      fullName: "John Smith",
      email: "john@example.com",
      phone: "+1 234-567-8901",
      status: "ACTIVE",
      totalObituaries: 12,
      createdAt: "2024-01-15",
    },
    {
      id: "U002",
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "+1 987-654-3210",
      status: "INVITED",
      totalObituaries: 8,
      createdAt: "2024-02-10",
    },
    {
      id: "U001",
      fullName: "John Smith",
      email: "john@example.com",
      phone: "+1 234-567-8901",
      status: "ACTIVE",
      totalObituaries: 12,
      createdAt: "2024-01-15",
    },
    {
      id: "U002",
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "+1 987-654-3210",
      status: "INVITED",
      totalObituaries: 8,
      createdAt: "2024-02-10",
    },
  ];

  // const managementStats = managementStatsData?.data;
  // const activeTechnicians = managementStats?.activeTechnicians || 0;
  // const activeInvitations = managementStats?.activeInvitations || {
  //   sent: 0,
  //   remaining: 0,
  // };
  // const activePlan = managementStats?.activePlan || "N/A";
  // const nextRenewal = managementStats?.nextRenewal || "N/A";
  // const technicians = managementStats?.technicians || [];

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
              <ActionCell id={row.original.id} status={row.original.status} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // if (managementStatsLoading) {
  //   return (
  //     <div>
  //       <PageLoading />
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div> */}

      <div>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[24px] mt-6 leading-7 text-[#092924]">
            User Management
          </h2>
        </div>
      </div>

      <div className="border rounded-2xl py-[25px] bg-[#ffffff] p-4">
        <div className="flex justify-between items-center">
          {/* search */}
          <div className="w-1/2">
            <Input
              className="w-full py-6"
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          {/* filter */}
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
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Blocked</DropdownMenuItem>
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
          <NRTable columns={columns} data={userData} />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-start border-t border-gray-200 bg-white  py-3 ">
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

export default UserManagement;

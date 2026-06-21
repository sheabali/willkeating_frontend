"use client";

import { useGetPaymentDataQuery } from "@/redux/api/dashboardApi";
import {
  mapRevenueChartToPoints,
  mapTransactionsToRows,
} from "@/src/libs/mappers/payment.mapper";
import { useState } from "react";
import TransactionTable, { StatusFilter } from "./index copy";
import { MonthlyRevenue } from "./monthly-revenue";

const LIMIT = 10;

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const { data: paymentData, isLoading } = useGetPaymentDataQuery({
    page: currentPage,
    limit: LIMIT,
    search: searchTerm || undefined,
    status: statusFilter === "ALL" ? undefined : statusFilter,
  });

  const meta = paymentData?.meta;

  const transactionRows = mapTransactionsToRows(paymentData?.data);
  const revenuePoints = mapRevenueChartToPoints(
    paymentData?.stats?.revenueChart?.chart,
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: StatusFilter) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="lg:col-span-2 my-8">
        <MonthlyRevenue data={revenuePoints} isLoading={isLoading} />
      </div>
      <div className="lg:col-span-2 my-8">
        <TransactionTable
          data={transactionRows}
          isLoading={isLoading}
          totalItems={meta?.total ?? 0}
          limit={LIMIT}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
        />
      </div>
    </div>
  );
};

export default PaymentPage;

"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  AdminUserDetails,
  useGetUserDetailsQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/dashboardApi";
import { UserDashboardData } from "@/src/types/user.type";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UserDashboardSection } from "./user-dashboard-section";

function mapUserDetailsToDashboardData(
  data: AdminUserDetails,
): UserDashboardData {
  const obituaries = [
    ...data.deathNotices.map((notice) => ({
      id: notice.id,
      deceasedName: notice.name,
      submittedBy: data.fullName,
      status: notice.status as "PUBLISHED" | "DRAFT" | "ARCHIVED",
      createdDate: notice.createdAt,
    })),
    ...data.funeralNotices.map((notice) => ({
      id: notice.id,
      deceasedName: notice.name,
      submittedBy: data.fullName,
      status: notice.status as "PUBLISHED" | "DRAFT" | "ARCHIVED",
      createdDate: notice.createdAt,
    })),
  ];

  const payments = data.payments.map((payment) => ({
    id: payment.id,
    description: `${payment.method} Payment`,
    amount: payment.amount,
    invoiceNumber: payment.transactionId,
    date: payment.createdAt,
    status:
      payment.status === "COMPLETED"
        ? ("SUCCESSFUL" as const)
        : payment.status === "PENDING"
          ? ("PENDING" as const)
          : ("FAILED" as const),
  }));

  return {
    user: {
      id: data.id,
      name: data.fullName,
      email: data.email,
      avatarUrl: data.image || "/images/user_4.jpg",
      memberSince: data.createdAt,
      totalManaged: data.obituaryCount,
    },
    obituaries,
    payments,
  };
}

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetUserDetailsQuery(id, {
    skip: !id,
  });
  const [updateUserStatus, { isLoading: isUpdatingStatus }] =
    useUpdateUserStatusMutation();

  const handleDeactivateAccount = async () => {
    if (!id) return;

    try {
      const res = await updateUserStatus({
        id,
        status: "SUSPENDED",
      }).unwrap();
      toast.success(res.message || "User status updated successfully");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to update user status.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-600">
          Failed to load user details. Please try again.
        </p>
      </div>
    );
  }

  const dashboardData = mapUserDetailsToDashboardData(data.data);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-[#092924] font-bold text-[24px]">User Details</h1>
        </div>

        <UserDashboardSection
          data={dashboardData}
          onDeactivateAccount={handleDeactivateAccount}
          isDeactivating={isUpdatingStatus}
          userStatus={data.data.status}
        />
      </div>
    </main>
  );
}

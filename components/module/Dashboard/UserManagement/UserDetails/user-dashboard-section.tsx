"use client";

import { UserDashboardData } from "@/src/types/user.type";
import { AdminUserStatus } from "@/redux/api/dashboardApi";
import { ObituariesTable } from "./obituaries-table";

import { PaymentHistory } from "./payment-history";
import { UserProfileCard } from "./user-profile-card";

interface UserDashboardSectionProps {
  data: UserDashboardData;
  onDeactivateAccount: () => void;
  isDeactivating?: boolean;
  userStatus?: AdminUserStatus;
}

export function UserDashboardSection({
  data,
  onDeactivateAccount,
  isDeactivating,
  userStatus,
}: UserDashboardSectionProps) {
  return (
    <div className="w-full bg-neutral-50 p-6">
      <div className="mb-6">
        <UserProfileCard
          user={data.user}
          onDeactivate={onDeactivateAccount}
          isDeactivating={isDeactivating}
          userStatus={userStatus}
        />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Obituaries Table */}
        <ObituariesTable obituaries={data.obituaries} />

        {/* Payment History */}
        <PaymentHistory payments={data.payments} />
      </div>
    </div>
  );
}

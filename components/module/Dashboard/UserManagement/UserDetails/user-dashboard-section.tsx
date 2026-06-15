"use client";

import { UserDashboardData } from "@/src/types/user.type";
import { ObituariesTable } from "./obituaries-table";

import { PaymentHistory } from "./payment-history";
import { UserProfileCard } from "./user-profile-card";

interface UserDashboardSectionProps {
  data: UserDashboardData;
  onDeactivateAccount: () => void;
}

export function UserDashboardSection({
  data,
  onDeactivateAccount,
}: UserDashboardSectionProps) {
  return (
    <div className="w-full bg-neutral-50 p-6">
      {/* Profile Card */}
      <div className="mb-6">
        <UserProfileCard user={data.user} onDeactivate={onDeactivateAccount} />
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

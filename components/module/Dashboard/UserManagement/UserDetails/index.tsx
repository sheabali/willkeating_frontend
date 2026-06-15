"use client";

import { UserDashboardData } from "@/src/types/user.type";
import { useParams } from "next/navigation";
import { UserDashboardSection } from "./user-dashboard-section";

const mockDashboardData: UserDashboardData = {
  user: {
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
    memberSince: "2021-10-12",
    totalManaged: 4,
  },
  obituaries: [
    {
      id: "1",
      deceasedName: "Robert L. Doe",
      status: "PUBLISHED",
      createdDate: "2023-08-14",
    },
    {
      id: "2",
      deceasedName: "Martha Smith",
      status: "PUBLISHED",
      createdDate: "2022-11-02",
    },
    {
      id: "3",
      deceasedName: "William Doe",
      status: "PUBLISHED",
      createdDate: "2024-01-12",
    },
  ],
  payments: [
    {
      id: "1",
      description: "Premium Memorial Package",
      amount: 149.0,
      invoiceNumber: "Inv #RF-88219",
      date: "2023-08-14",
      status: "SUCCESSFUL",
    },
    {
      id: "2",
      description: "Basic Memorial Upgrade",
      amount: 49.0,
      invoiceNumber: "Inv #RF-44120",
      date: "2022-11-02",
      status: "SUCCESSFUL",
    },
    {
      id: "3",
      description: "Service Fee (Standard)",
      amount: 25.0,
      invoiceNumber: "Inv #RF-21004",
      date: "2021-10-12",
      status: "SUCCESSFUL",
    },
  ],
};

export default function UserDetails() {
  const { id } = useParams();

  console.log("userID", id);

  const handleDeactivateAccount = () => {
    alert("Account deactivation process initiated.");
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-[#092924] font-bold text-[24px]">User Details</h1>
        </div>

        <UserDashboardSection
          data={mockDashboardData}
          onDeactivateAccount={handleDeactivateAccount}
        />
      </div>
    </main>
  );
}

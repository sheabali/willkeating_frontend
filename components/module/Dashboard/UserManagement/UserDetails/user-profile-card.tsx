"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/src/types/user.type";

import Image from "next/image";

interface UserProfileCardProps {
  user: User;
  onDeactivate: () => void;
}

export function UserProfileCard({ user, onDeactivate }: UserProfileCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left Content */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        {/* Profile Image */}
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src="/images/user_4.jpg"
            alt={user.name}
            fill
            className="rounded-md object-cover"
            priority
          />
          {/* Online Status Indicator */}
          <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-[32px] text-[#182232]">{user.name}</h2>
            <p className="text-[16px] text-[#45474C]">{user.email}</p>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-8">
            {/* Member Since */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Member Since
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {new Date(user.memberSince).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Total Managed */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Total Managed
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {user.totalManaged} Obituaries
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Action */}
      <Button
        onClick={onDeactivate}
        variant="outline"
        className="mt-4 w-full border-red-200 text-red-600 hover:bg-red-50 md:mt-0 md:w-auto"
      >
        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1" />
          <path d="M12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
        </svg>
        Deactivate Account
      </Button>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface ProfileSectionProps {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  profileImage: string;
  profileImageAlt?: string;
  onEditClick?: () => void;
}

export function ProfileSection({
  name,
  email,
  phone,
  joinDate,
  profileImage,
  profileImageAlt = "Profile picture",
  onEditClick,
}: ProfileSectionProps) {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 md:mb-10">
        <h1 className="container mx-auto  text-[48px] text-[#052858] mb-2">
          My Profile
        </h1>
        <p className="text-[20px] md:text-base text-[#5B5C57]">
          Manage your personal information and account security settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
          {/* Profile Info Section */}
          <div className="flex flex-col sm:flex-col gap-6 md:gap-8 flex-1">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <Image
                  src={profileImage}
                  alt={profileImageAlt}
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex flex-col justify-center gap-1 md:gap-2">
              <h2 className="text-2xl md:text-[32px] text-[#052858]">{name}</h2>

              <p className="text-primary text-sm md:text-[20px]">
                Joined since {joinDate}
              </p>

              {/* Contact Information */}
              <div className="flex  gap-2 mt-2 md:mt-3 text-sm md:text-base text-slate-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-slate-500 shrink-0" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-slate-500 shrink-0" />
                  <span className="break-all">{email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="shrink-0 pt-2 md:pt-0">
            <Button
              onClick={onEditClick}
              variant="outline"
              className="w-full sm:w-auto px-6 py-2 md:px-6 md:py-3 border border-slate-400 text-[#5B5C57] hover:bg-slate-50 hover:border-slate-500 transition-colors"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

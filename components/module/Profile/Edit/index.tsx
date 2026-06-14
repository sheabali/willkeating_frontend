"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

interface EditProfileProps {
  initialFullName?: string;
  initialPhoneNumber?: string;
  profileImageUrl?: string;
  onSave?: (data: ProfileData) => void;
}

interface ProfileData {
  fullName: string;
  phoneNumber: string;
}

export default function EditProfile({
  initialFullName = "Alex Curry",
  initialPhoneNumber = "+1 (561) 555-0128",
  profileImageUrl = "/images/User profile photo.png",
  onSave,
}: EditProfileProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        onSave({ fullName, phoneNumber });
      }
      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-[48px] text-[#052858] mb-2">Edit Your Profile</h1>
        <p className="text-[#5B5C57] text-[20px]">
          Manage your personal information and account security settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="relative inline-block mb-8">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-slate-200">
              <Image
                src={profileImageUrl}
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Edit Badge */}
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>

          {/* Personal Information Form */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Personal Information
            </h2>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-6 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-6 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="w-full font-semibold md:w-auto bg-primary hover:bg-primary/90 text-white py-6 px-8 rounded-full transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

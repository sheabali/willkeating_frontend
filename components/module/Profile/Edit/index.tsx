/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import placeholder from "@/src/assets/placeholders/image_placeholder.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
  initialFullName,
  initialPhoneNumber,
  profileImageUrl,
  onSave,
}: EditProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: profileData } = useGetProfileQuery({}) as any;

  const profile = profileData?.data;

  const [fullName, setFullName] = useState(initialFullName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName ?? "");
      setPhoneNumber(profile.phone ?? "");
    }
  }, [profile]);

  const displayImage =
    imagePreview ?? profileImageUrl ?? profile?.image ?? placeholder;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSaveChanges = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName.trim());
    formData.append("phone", phoneNumber.trim());

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = (await updateProfile(formData).unwrap()) as any;

      if (res.success) {
        toast.success(res.message || "Profile updated successfully");
        onSave?.({ fullName, phoneNumber });
        setImageFile(null);
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
      console.error("Error updating profile:", error);
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
                src={displayImage}
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Edit Badge */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md cursor-pointer"
              aria-label="Change profile picture"
            >
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
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
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
              disabled={isLoading}
              className="w-full font-semibold md:w-auto bg-primary hover:bg-primary/90 text-white py-6 px-8 rounded-full transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

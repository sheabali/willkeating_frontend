/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetProfileQuery } from "@/redux/api/profileApi";
import { useRouter } from "next/navigation";
import { Post } from "./Post/post";
import { ProfileSection } from "./ProfileSection";

const ProfilePage = () => {
  const router = useRouter();

  const { data: profileData } = useGetProfileQuery({}) as any;

  const profile = profileData?.data;

  console.log("profile1", profile);

  const handleEditClick = () => {
    console.log("Edit button clicked");
    router.push("/profile/edit");
  };

  return (
    <div className="container mx-auto">
      <div className="w-full container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <ProfileSection
          id={profile?.id}
          name={profile?.fullName}
          email={profile?.email}
          phone={profile?.phone}
          joinDate={profile?.createdAt}
          profileImage={profile?.image}
          profileImageAlt="Alex Carry profile picture"
          onEditClick={handleEditClick}
        />
      </div>
      <div>
        <h1 className="text-[#052858] text-[48px]">Your Post</h1>
        <div>
          <Post />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

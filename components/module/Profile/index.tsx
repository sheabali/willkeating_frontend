"use client";

import { Post } from "./Post/post";
import { ProfileSection } from "./ProfileSection";

const ProfilePage = () => {
  const handleEditClick = () => {
    console.log("Edit button clicked");
  };

  return (
    <div className="container mx-auto">
      <div className="w-full container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <ProfileSection
          name="Alex Carry"
          email="alex.carry@gmail.com"
          phone="(406) 555-0120"
          joinDate="April 5, 2026"
          profileImage="/images/User profile photo.png"
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

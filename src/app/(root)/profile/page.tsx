import React from "react";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
const ProfileCard = dynamic(() => import('@/components/cards/user/ProfileCard'));
const ProfileSidebar = dynamic(() => import('@/components/shared/user/ProfileSidebar'));
const UserPosts = dynamic(() => import('@/components/cards/user/UserPosts'));
const Profile: React.FC = () => {
  return (
    <div>
      <div className=" h-screen overflow-hidden">
        <ProfileSidebar />

        <main className=" h-screen  overflow-y-auto ">
          <ProfileCard />
          <div className="flex justify-center mx-auto">
            <UserPosts />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

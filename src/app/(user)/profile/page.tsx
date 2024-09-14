"use client"

import dynamic from "next/dynamic";
import "@/styles/globals.css";
import ProfileCardSkeleton from "@/styled-components/skeletons/ProfileCardSkeleton";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
const ProfileCard = dynamic(
  () => import("@/components/cards/user/profiles/ProfileCard"),
  {
    loading: () => <ProfileCardSkeleton />,
    ssr: false,
  }
);
const ProfileSidebar = dynamic(
  () => import("@/components/shared/user/ProfileSidebar"),
  {
    loading: () => <LeftSidebarSkeleton />,
    ssr: false,
  }
);
const UserPosts = dynamic(() => import("@/components/cards/user/profiles/UserPosts"));

const Profile: React.FC = () => {
  return (
    <div>
      <div className=" h-screen overflow-hidden scrollbar-hide">
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

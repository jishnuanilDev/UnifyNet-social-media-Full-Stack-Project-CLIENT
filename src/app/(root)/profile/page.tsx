"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

// Dynamic imports
const ProfileCard = dynamic(
  () => import("@/components/cards/user/ProfileCard")
);
const ProfileSidebar = dynamic(
  () => import("@/components/shared/user/ProfileSidebar")
);
const UserPosts = dynamic(() => import("@/components/cards/user/UserPosts"));
interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userToken = Cookies.get("userToken");
        if (!userToken) {
          router.replace("/sign-in");
        }

        const result = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: userToken,
          },
        });

        if (result) {
          console.log("profile fetched:", result.data.user);
          setUser(result.data.user);
          setProfilePic(result.data.user.profilePic);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div>
      <div className=" h-screen overflow-hidden">
        <ProfileSidebar />

        <main className=" h-screen  overflow-y-auto ">
          <ProfileCard user={user} profilePic={profilePic} />
          <div className="flex justify-center mx-auto">
            <UserPosts user={user} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

"use client"
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import axiosInstance from "@/configs/axiosInstance";
import { NextUIProvider } from "@nextui-org/react";
import ProfileCardSkeleton from "@/styled-components/skeletons/ProfileCardSkeleton";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
const ProfileSidebar = dynamic(() => import('@/components/shared/user/ProfileSidebar'),
{
  loading: () => <LeftSidebarSkeleton />,
  ssr: false,
}
);
const FriendProfilePosts = dynamic(() => import('@/components/cards/user/profiles/FriendProfilePosts'));
const FriendProfileCard = dynamic(() => import('@/components/cards/user/profiles/FriendProfile'),
{
  loading: () => <ProfileCardSkeleton />,
  ssr: false,
}
);
const ProfileCard = dynamic(() => import('@/components/cards/user/profiles/ProfileCard'));
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


interface Params{
username:string
}


interface IUser {
  _id: string;
  profilePic: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  savedPost: string[];
  isPremium:boolean;

}
interface User {
  _id: string;
  fullname: string;
  username: string;
  savedPost: string[];
  bio: string;
  email: string;
  profilePic:string;
  isPremium:boolean;
  followers?: [
    {
      user: IUser;
    }
  ];
  following?: [
    {
      user: IUser;
    }
  ];
  posts?:[]

}
const Profile = ({params}:{params:Params}) => {
  const [friend,setFriend] = useState<User | null>(null)
  const [user,setUser] = useState<User | null>(null)

  const router = useRouter();
useEffect(()=>{
  const fetchUser= async ()=>{
    const userToken = localStorage.getItem('userToken');
    const result = await axiosInstance.get("/profile", {
      headers: {
        Authorization: userToken,
      },
    });
    if(result){
      setUser(result.data.user);
      if(result.data.user.username===params.username){
        router.push('/profile')
      }
    }
  }
  fetchUser();

    const fetchFriend = async ()=>{
      try{
        const {username} = params;
        const result = await axiosInstance.get(`/friend-profile?username=${username}`);
        if(result){
          setFriend(result.data.user);
        }
      }catch(err){
        console.log('Error occured in fetching friend profile in client side',err);
      }

    }
    fetchFriend()

},[params,router]);

  return (
    <NextUIProvider>
    <div>
      <div className=" h-screen overflow-hidden">
        <ProfileSidebar />

        <main className=" h-screen  overflow-y-auto ">
          <FriendProfileCard friend={friend}  user={user}/>
          <div className="flex justify-center mx-auto">
            <FriendProfilePosts  user={friend}/>
          </div>
        </main>
      </div>
    </div>
    </NextUIProvider>
  );
};

export default Profile;

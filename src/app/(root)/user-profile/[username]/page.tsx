"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "@/styles/globals.css";

const ProfileSidebar = dynamic(() => import('@/components/shared/user/ProfileSidebar'));
const FriendProfilePosts = dynamic(() => import('@/components/cards/user/FriendProfilePosts'));
const FriendProfileCard = dynamic(() => import('@/components/cards/user/FriendProfile'));
const ProfileCard = dynamic(() => import('@/components/cards/user/ProfileCard'));
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


interface Params{
username:string
}


interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  isPremium:boolean;
}
interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  isPremium:boolean;
  followers: [
    {
      user: IUser;
    }
  ];
  following: [
    {
      user: IUser;
    }
  ];
  posts:[]
  // Add other properties as needed
}
const Profile = ({params}:{params:Params}) => {
  const [friend,setFriend] = useState<User | null>(null)
  const [user,setUser] = useState<User | null>(null)
  const router = useRouter();
useEffect(()=>{
  const fetchUser= async ()=>{
    const userToken = localStorage.getItem('userToken');
    const result = await axios.get("http://localhost:5000/profile", {
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
        const result = await axios.get(`http://localhost:5000/friend-profile?username=${username}`);
        if(result){
          setFriend(result.data.user);
        }
      }catch(err){
        console.log('Error occured in fetching friend profile in client side',err);
      }

    }
    fetchFriend()

},[params]);

  return (
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
  );
};

export default Profile;

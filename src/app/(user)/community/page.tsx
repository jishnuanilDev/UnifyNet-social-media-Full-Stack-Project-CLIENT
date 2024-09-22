"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
import { NextUIProvider } from "@nextui-org/react";
import Spinner from "@/styled-components/loader/Spinner";

const ProfileSidebar = dynamic(() => import("@/components/shared/user/ProfileSidebar"), {
  loading: () => <LeftSidebarSkeleton/>,
  ssr: false,
});
const CommunityChatCard = dynamic(() => import("@/components/cards/user/chat/community/CommunityChatCard"), {
  loading: () =>  <div className="flex justify-center items-center"><Spinner/></div>,
  ssr: false,
});

const NoCommunityLayout = dynamic(() => import("@/components/cards/user/chat/community/NoCommunityLayout"), {
  loading: () => <div className="flex justify-center items-center"><Spinner/></div>,
  ssr: false,
});
const CommunityUsers = dynamic(() => import("@/components/cards/user/chat/community/communityUsers"), {
  loading: () => <div className="flex justify-center items-center"><Spinner/></div>,
  ssr: false,
});

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  profilePic:string;
  isPremium: boolean;
}
interface IMessage {
  _id: string;
  chat: ICommunity["_id"];
  sender: IUser["_id"];
  message: string;
  status: "seen" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}
interface ICommunity {
  name:string;
  _id: string;
  participants: IUser[];
  admin:IUser;
  messages: IMessage[]; 
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}
// interface Community {
//   community: ICommunity;
// }
function Community() {
  const router = useRouter()
  const [chatBox, setChatBox] = useState(false);
  const [communityy, setCommunityy] = useState<ICommunity | null>(null);
  const [msg,setMsg] = useState(false)
  const reduxCommunity:ICommunity | null = useSelector((state: RootState) => state.community);

 useEffect(()=>{
const userToken = localStorage.getItem('userToken');
if(!userToken){
  router.replace('/')
}
 },[router])
  return (
    <NextUIProvider>
    <div className="flex">
      <ProfileSidebar />
      {reduxCommunity?(<CommunityChatCard msg={msg} community={reduxCommunity} />):(<NoCommunityLayout />) }

      <CommunityUsers setMsg={setMsg} />
    </div>
    </NextUIProvider>
  );
}

export default Community;

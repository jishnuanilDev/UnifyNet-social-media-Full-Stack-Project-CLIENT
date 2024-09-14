"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
const ProfileSidebar = dynamic(() => import("@/components/shared/user/ProfileSidebar"), {
  loading: () => <LeftSidebarSkeleton/>,
  ssr: false,
});
const CommunityChatCard = dynamic(() => import("@/components/cards/user/chat/community/CommunityChatCard"), {
  loading: () => <h1>Chat card</h1>,
  ssr: false,
});

const NoCommunityLayout = dynamic(() => import("@/components/cards/user/chat/community/NoCommunityLayout"), {
  loading: () => <h1>No community layout</h1>,
  ssr: false,
});
const CommunityUsers = dynamic(() => import("@/components/cards/user/chat/community/communityUsers"), {
  loading: () => <h1>Community users</h1>,
  ssr: false,
});

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
  const [chatBox, setChatBox] = useState(false);
  const [communityy, setCommunityy] = useState<ICommunity | null>(null);
  const [msg,setMsg] = useState(false)
  const reduxCommunity:ICommunity | null = useSelector((state: RootState) => state.community);

  return (
    <div className="flex">
      <ProfileSidebar />
      {reduxCommunity?(<CommunityChatCard msg={msg} community={reduxCommunity} />):(<NoCommunityLayout />) }

      <CommunityUsers setMsg={setMsg} />
    </div>
  );
}

export default Community;

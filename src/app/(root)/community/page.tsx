"use client";
import ChatCard from "@/components/cards/user/ChatCard";
import ProfileSidebar from "@/components/shared/user/ProfileSidebar";
import ChatUsers from "@/components/cards/user/ChatUsers";
import NoChatLayout from "@/components/cards/user/NoChatLayout";
import React, { useState } from "react";
interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  isPremium: boolean;
}
interface IMessage {
  _id: string;
  chat: IChat["_id"];
  sender: IUser["_id"];
  message: string;
  status: "seen" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}
interface IChat {
  _id: string;
  participants: IUser[];
  messages: IMessage[]; // Assuming you have an IMessage interface
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}
interface Chat {
  chat: IChat;
}
function Community() {
  const [chatBox, setChatBox] = useState(false);
  const [chat, setChat] = useState<IChat | null>(null);
  return (
    <div className="flex">
      <ProfileSidebar />
      {chat?(<ChatCard chat={chat} />):(<NoChatLayout />) }

      <ChatUsers setChat={setChat} />
    </div>
  );
}

export default Community;

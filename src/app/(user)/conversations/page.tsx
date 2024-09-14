"use client";
import ChatCard from "@/components/cards/user/chat/individual/ChatCard";
import ProfileSidebar from "@/components/shared/user/ProfileSidebar";
import ChatUsers from "@/components/cards/user/chat/individual/ChatUsers";
import NoChatLayout from "@/components/cards/user/chat/individual/NoChatLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/configs/axiosInstance";

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  isPremium: boolean;
  profilePic:string;
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
function Conversation() {
  // const [chatBox, setChatBox] = useState(false);
  const [chat, setChat] = useState<IChat | null>(null);
  const [user,setUser] = useState<IUser | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          router.replace("/");
        }

        const result = await axiosInstance.get("/profile", {
          headers: {
            Authorization: userToken,
          },
        });

        if (result) {
          console.log("profile fetched:", result.data.user);
          setUser(result.data.user);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchProfile();
  }, [router]);
  return (
    <div className="flex">
      <ProfileSidebar />
      {chat?(<ChatCard chat={chat} />):(<NoChatLayout />) }

      <ChatUsers setChat={setChat} user={user}  />
    </div>
  );
}

export default Conversation;

import React, { useRef } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { GoDotFill } from "react-icons/go";
import NewChatSearch from "./NewChatSearchCard";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/configs/axiosInstance";
// import { io, Socket } from "socket.io-client";
interface IUser {
  _id: string;
  profilePic: string;
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
interface OnlineUser {
  userId: string;
  socketId: string;
}

interface IsetChatProps {
  setChat: React.Dispatch<React.SetStateAction<IChat | null>>;
  user: IUser | null;
  update:boolean;
}
const ChatUsers: React.FC<IsetChatProps> = ({ setChat,update }) => {
  const [searchCard, setSearchCard] = useState(false);
  const [chats, setChats] = useState<IChat[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          router.replace("/");
        }
        const result = await axiosInstance.get("/conversations", {
          headers: {
            Authorization: userToken,
          },
        });
        if (result) {
          console.log("chats consoling..", result.data.chats);
          setChats(result.data.chats);
          setCurrentUserId(result.data.currentUserId);
        }
      } catch (err) {
        console.error("Error occured in chat fetching in client side", err);
      }
    };

    fetchChats();
  }, [searchCard,router,update]);
  return (
    <div >
      <section className="w-[350px] bg-sidebarBlack h-screen flex flex-col">
        <div className="flex justify-center mt-3">
          <input
            className="bg-midBlack rounded-full w-[90%] border-none text-white"
            placeholder="Search..."
            type="text"
            name=""
            id=""
          />
        </div>
        <div
          onClick={() => setSearchCard(true)}
          className="flex justify-center mt-3 bg-fuchsia-950 rounded-full w-56 mx-auto cursor-pointer"
        >
          <span>New Chat + </span>
        </div>
        {searchCard && (
          <NewChatSearch
            setSearchCard={setSearchCard}
            currentUserId={currentUserId}
          />
        )}

        <div className="ml-3 mt-5">
          {chats
            ? chats.map((chat, index) =>
                chat.participants.length > 1 ? (
                  <div key={index}>
                    <div
                      key={index}
                      className="flex mt-8 gap-3 ml-3 cursor-pointer"
                      onClick={() => setChat(chat)}
                    >
                      {chat.participants[0]?._id === currentUserId ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            chat.participants[1]?.profilePic
                              ? chat.participants[1]?.profilePic
                              : "https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                          }
                        />
                      ) : (
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            chat.participants[0]?.profilePic
                              ? chat.participants[0]?.profilePic
                              : "https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                          }
                        />
                      )}

                      <span className="rounded-full text-sm px-3 py-2 font-semibold">
                        {chat.participants[0]?._id === currentUserId
                          ? chat.participants[1]?.username
                          : chat.participants[0]?.username}
                      </span>

                      <div className="flex ml-auto mr-5 mt-2">
                        {" "}
                        <GoDotFill
                          style={{ color: "violet", fontSize: "22px" }}
                        />
                      </div>
                    </div>
                    <p className="ml-20 mt-[-10px] text-[12px] font-light">
                      last message
                    </p>
                  </div>
                ) : (
                  ""
                )
              )
            : ""}
        </div>
      </section>
    </div>
  );
};

export default ChatUsers;

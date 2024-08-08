import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { GoDotFill } from "react-icons/go";
import NewChatSearch from "../NewChatSearchCard";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

interface IsetChatProps {
  setChat: React.Dispatch<React.SetStateAction<IChat | null>>;
}
const ChatUsers: React.FC<IsetChatProps> = ({ setChat }) => {
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
        const result = await axios.get("http://localhost:5000/conversations", {
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
  }, []);
  return (
    <div>
      <section className="w-[350px] bg-black h-screen flex flex-col">
        <div className="flex justify-center mt-3">
          <input
            className="bg-sidebarBlack rounded-full w-[90%] border-none text-white"
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
        {searchCard && <NewChatSearch setSearchCard={setSearchCard} />}

        <div className="ml-3 mt-5">
          {chats.map((chat, index) => (
            <div>
              <div
                key={index}
                className="flex mt-8 gap-3 ml-3 cursor-pointer  "
                onClick={() => setChat(chat)}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />

                <span className="rounded-full text-sm px-3 py-2 font-semibold">
                  {chat.participants[0]._id === currentUserId
                    ? chat.participants[1].username
                    : chat.participants[0].username}
                </span>

                <div className="flex ml-auto mr-5 mt-2">
                  {" "}
                  <GoDotFill style={{ color: "violet", fontSize: "22px" }} />
                </div>
              </div>
              <p className="ml-20 mt-[-10px] text-[12px] font-light">
                last message
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChatUsers;

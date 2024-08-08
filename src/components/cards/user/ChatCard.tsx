import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import {format} from'timeago.js'
import InputEmoji from "react-input-emoji";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

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
interface IChatProps {
  chat: IChat;
}
const ChatCard: React.FC<IChatProps> = ({ chat }) => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatId = chat._id;
        const userToken = localStorage.getItem("userToken");
        const result = await axios.post(
          "http://localhost:5000/getMessages",
          {
            chatId,
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );

        if (result) {
          console.log("chat messages displaying", result.data);
          setMessages(result.data.chatMessages);

          setCurrentUserId(result.data.currentUserId);
        } else {
          console.log("whats");
        }
      } catch (err) {
        console.log("error occured in fetchmessages in client side", err);
      }
    };

    fetchMessages();
  }, [trigger]);
  const handleMessageSent = async () => {
    if (message.length < 1) {
      toast.error("Please enter a message ");
      return;
    }
    try {
      setMessage("");

      const chatId = chat._id;
      const userToken = localStorage.getItem("userToken");
      const result = await axios.post(
        "http://localhost:5000/sendMessage",
        {
          chatId,
          message,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        // toast.success(result.data.message);
        console.log("savedmessage in chat", result.data.savedmessage);
        setTrigger((prev) => !prev);
        // setMessages((prevMessages) => [...prevMessages, result.data.savedmessage]);
      }
    } catch (err) {
      console.log("Error occured in senting message in client side", err);
    }
  };
  return (
    <div>
      <Toaster />
      <section className="bg-sidebarBlack w-[900px] h-screen flex flex-col">
        <header className="bg-fuchsia-700 h-20 mt-5 ml-5 mr-5 rounded-md flex overflow-hidden">
          <div className="flex mt-5 gap-3 ml-3 cursor-pointer">
            <Avatar
              alt="Remy Sharp"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <span className="rounded-full text-sm px-3 py-2 font-semibold">
              {chat.participants[0]._id === currentUserId
                ? chat.participants[1].username
                : chat.participants[0].username}
            </span>
          </div>
          <div className="flex ml-auto gap-6 mt-5 mr-5">
            <IoIosCall style={{ fontSize: "26px", cursor: "pointer" }} />
            <MdVideoCall style={{ fontSize: "26px", cursor: "pointer" }} />
            <HiDotsVertical style={{ fontSize: "26px", cursor: "pointer" }} />
          </div>
        </header>

        <div className="flex justify-center mt-3">
          <span>Yesterday, 7:14 pm</span>
        </div>

        <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide px-5">
          {messages &&
            messages.map((message, index) =>
              message.sender._id === currentUserId ? (
                <>
                  <div
                    key={index}
                    className="flex flex-col mt-6 gap-1 items-end"
                  >
                    <div className="flex gap-3">
                      <span className="bg-gradient-to-r from-violet-900 to-fuchsia-900 rounded-full text-sm px-3 py-2.5">
                        {message.message}
                      </span>
                    </div>
                    <div className="mr-2">
                      <span className="text-[10px] text-white/40 font-sans">{format(message.createdAt)} </span>
                    </div>
                  </div>

                </>
              ) : (
                <div key={index} className="flex mt-6 mb-2 gap-3">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                  <span className="bg-lightBlack rounded-full text-sm px-3 py-2">
                    {message.message}
                  </span>
                </div>
              )
            )}
        </div>

        <div className="mt-auto  mb-5 mx-5 flex gap-3">
          <InputEmoji
        background="black"
        borderColor="black"
        color="white"
             value={message}
             onChange={setMessage}
             cleanOnEnter
             onEnter={handleMessageSent}
             placeholder="Type a message..."
          />
          {/* <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="w-full rounded-full bg-lightBlack border-none"
            type="text"
          /> */}
          <button
          
            onClick={handleMessageSent}
            className="bg-fuchsia-800 rounded-full px-3 text-[15px] h-10 mt-1"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatCard;

import React, { useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";

import MessagePill from "@/styled-components/chat/MessagePill";

import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { io, Socket } from "socket.io-client";
import axiosInstance from "@/configs/axiosInstance";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

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
interface IChatProps {
  chat: IChat;
  setUpdate:React.Dispatch<React.SetStateAction<boolean>>
}
const ChatCard: React.FC<IChatProps> = ({ chat,setUpdate }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const socket = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<any>(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [unsendOpen, setUnsendOpen] = useState(false);
  const [remoteUserId, setRemoteUserId] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [partnerId, setPartnerId] = useState<any>("");

  useEffect(() => {
    const socketUrl: any =process.env.NEXT_PUBLIC_API_SOCKET_URL_CHAT; 
    // const socketUrl: any ='http://localhost:8000';
    // socket.current = io(socketUrl);
    socket.current = io(socketUrl,{
      path: "/socket.io", // Ensure the correct path if you're using Nginx
    });
    const recieverId = chat.participants.find((id) => id !== currentUserId);
    setPartnerId(recieverId);
    socket.current.emit("addUser", recieverId);
    // socket.current.on('getUsers',(users)=>{
    //   setOnlineUsers(users);
    // })
    return () => {
      socket.current?.disconnect();
    };
  }, [currentUserId,chat.participants]);

  useEffect(() => {
    socket.current.on("userTyping", (username) => {
      toast.success(`${username} is typing...`);
      console.log(`${username} is typing...`);

      // Display typing status in the UI
    });
    socket.current.on("userStoppedTyping", (username) => {
      console.log(`${username} stopped typing`);
      // Remove typing status from the UI
    });

    return () => {
      socket.current.off("userTyping");
      socket.current.off("userStoppedTyping");
    };
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current?.on("receiveMessage", (data) => {
      console.log(
        "data received in client side from receive message socket",
        data
      );
      setMessages([...messages, data]);
    });
    console.log("recive mesg", messages);
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatId = chat._id;
        const userToken = localStorage.getItem("userToken");
        const result = await axiosInstance.post(
          "/getMessages",
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
  }, [trigger,chat._id]);

  useEffect(() => {
    if (receiveMessage != null && receiveMessage.chat === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage,chat._id,messages]);

  const handleMessageSent = async () => {
    if (message.length < 1) {
      toast.error("Please enter a message ");
      return;
    }
    try {
      setMessage("");

      const chatId = chat._id;
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.post(
        "/sendMessage",
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
        setUpdate((prev) => !prev);
        // toast.success(result.data.message);
        console.log("savedmessage in chat", result.data.savedmessage);
        setTrigger((prev) => !prev);
        // setMessages((prevMessages) => [...prevMessages, result.data.savedmessage]);
      }
    } catch (err) {
      console.log("Error occured in senting message in client side", err);
    }

    const receiverId = chat.participants.find((id) => id !== currentUserId);

    setSendMessage({ message, receiverId, sender: { _id: currentUserId } });
  };

  const handleDeleteMessages = () => {
    try {
      const result = axiosInstance.post("/delete-messages");
    } catch (err) {}
  };

  const handleUnsendOpen = (e: Event) => {
    e.preventDefault();
    setUnsendOpen(true);
  };

  const handleUnsendMessage = async (messageId: string, chatId: string) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.post(
        "/unsend-message",
        {
          messageId,
          chatId,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
        setTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error(
        "Error occured in during handleUnsendMessage in client side",
        err
      );
    }
  };

  const handleTyping = (text: string) => {
    setMessage(text);

    if (!isTyping) {
      setIsTyping(true);
      const recieverId = chat.participants.find((id) => id !== currentUserId);
      socket.current.emit("typing", { recieverId: recieverId });
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.current.emit("stopTyping", { username: "your-username" });
    }, 3000);
  };

  return (
    <div >
      <Toaster />
      <section className="bg-chatCardBlack md:w-[900px] h-screen flex flex-col">
        <header className="bg-gradient-to-r from-fuchsia-900 to-purple-900/60 h-20 mt-5 ml-5 mr-5 rounded-md flex overflow-hidden">
          <div className="flex mt-5 gap-3 ml-3 cursor-pointer">
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
          </div>
          <div className="flex ml-auto gap-6 mt-5 mr-5">
            <IoIosCall style={{ fontSize: "26px", cursor: "pointer" }} />
            {chat.participants[0]?._id === currentUserId ? (
              <Link href={`/call/${chat.participants[1]?.username}`}>
                <MdVideoCall style={{ fontSize: "26px", cursor: "pointer" }} />
              </Link>
            ) : (
              <Link href={`/call/${chat.participants[0]?.username}`}>
                <MdVideoCall style={{ fontSize: "26px", cursor: "pointer" }} />
              </Link>
            )}
            <span onClick={() => setIsOpen(!isOpen)}>
              {" "}
              <HiDotsVertical style={{ fontSize: "26px", cursor: "pointer" }} />
              {isOpen && (
                <div className="absolute mt-2 w-48 bg-postBox bg-transparent/80 text-white rounded-xl shadow-lg z-10 shadow-lightBlack">
                  <div
                    className="block px-4 py-2 text-sm hover:scale-110 cursor-pointer transition duration-200 hover:text-fuchsia-400  rounded-xl"
                    onClick={handleDeleteMessages}
                  >
                    Delete Messages
                  </div>
                  <div
                    className="block px-4 py-2 text-sm hover:scale-110 hover:text-red-600 cursor-pointer transition duration-200  rounded-xl"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Close
                  </div>
                </div>
              )}
            </span>
          </div>
        </header>

        <div className="flex justify-center mt-3">
          {/* <span>Yesterday, 7:14 pm</span> */}
        </div>

        <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide px-5">
          {messages &&
            messages.map((message:any, index) =>
              message.sender._id === currentUserId ? (
                <MessagePill
                key={index}
                  message={message}
                  index={index}
                  setTrigger={setTrigger}
                  chatId={chat._id}
                />
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
        {/* <div className="bg-red-400 text-center scrollbar-hide portrait: max-w-screen-lg ">
  <span className="flex flex-col t">Legos to new</span>
</div> */}
        <div className="mt-auto  mb-5 mx-5 flex gap-3">
          <InputEmoji
            background="#292929"
            borderColor="black"
            color="white"
            value={message}
            onChange={handleTyping}
            cleanOnEnter
            onEnter={handleMessageSent}
            placeholder="Type a message..." shouldReturn={false} shouldConvertEmojiToImage={false}          />
          {/* <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="w-full rounded-full bg-lightBlack border-none"
            type="text"
          /> */}
          <button
            onClick={handleMessageSent}
            className="bg-gradient-to-r from-fuchsia-900 to-purple-900 rounded-full px-3 text-[15px] h-10 mt-1"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatCard;

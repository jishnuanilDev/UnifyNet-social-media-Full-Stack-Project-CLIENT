"use client"
import React, { useEffect,useRef } from "react";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditCommunity from "./EditCommunity";
import { toast } from "react-hot-toast";

import {format} from'timeago.js'
import InputEmoji from "react-input-emoji";
import { io, Socket } from "socket.io-client";
import axiosInstance from "@/configs/axiosInstance";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CommunityMessagePill from "@/styled-components/chat/CommunityMessagePill";
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
  profilePic:string;
  isPremium: boolean;
}
interface IMessage {
  _id: string;
  chat: ICommunity["_id"];
  sender: IUser["_id"];
  message: string | any |null;
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
interface ICommunityProps {
  community: ICommunity;
  msg:boolean;
  
}
const CommunityChatCard: React.FC<ICommunityProps> = ({community,msg}) => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [modalOpen,setModalOpen] = useState(false);

//   const socket = useRef<Socket | null>(null);

//   const [sendMessage,setSendMessage] = useState(null);
//   const [receiveMessage,setReceiveMessage] = useState(null);


//   useEffect(() => {
//     socket.current = io("http://localhost:8000");
//     const recieverId = chat.participants.find((id)=>id!==currentUserId);
//     socket.current.emit("addUser", recieverId);
//     // socket.current.on('getUsers',(users)=>{
//     //   setOnlineUsers(users);
//     // })
//     return () => {
//       socket.current?.disconnect();
//     };
//   },[])

//   useEffect(()=>{
//     if(sendMessage!==null){
//       socket.current?.emit('sendMessage',sendMessage)
//     }
//   },[sendMessage])

//   useEffect(()=>{
//   socket.current?.on('receiveMessage',(data)=>{
//     console.log('data received in cliet side from receive message socket',data);
//     setMessages([...messages,data])
//   })
//  console.log('recive mesg',messages);
 
// },[messages])


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const communityId = community._id;
        const userToken = localStorage.getItem("userToken");
        const result = await axiosInstance.post(
          "/getCommunityMessages",
          {
            communityId,
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        );

        if (result) {
          console.log("community messages displaying", result.data);
          setMessages(result.data.communityChatMessages);

          setCurrentUserId(result.data.currentUserId);
        } else {
          console.log("whats");
        }
      } catch (err) {
        console.log("error occured in fetchmessages in client side", err);
      }
    };

    fetchMessages();
  }, [trigger,modalOpen,msg,community._id]);




//   useEffect(()=>{
//     if(receiveMessage!=null && receiveMessage.chat===chat._id){
//       setMessages([...messages,receiveMessage]);
//     }
//   },[receiveMessage])

  const handleMessageSent = async () => {
    if (message.length < 1) {
      toast.error("Please enter a message ");
      return;
    }
    try {
      setMessage("");

      const communityId = community._id;
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.post(
        "/communitySendMessage",
        {
         communityId,
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
        console.log("savedmessage in community", result.data.savedmessage);
        setTrigger((prev) => !prev);
        // setMessages((prevMessages) => [...prevMessages, result.data.savedmessage]);
      }
    } catch (err) {
      console.log("Error occured in senting message in client side", err);
    }

    // const receiverId = chat.participants.find((id)=>id!==currentUserId);
    
    // setSendMessage({message,receiverId,sender:{_id:currentUserId}})
    
  };
  return (
    <div>
      <Toaster />
      {
        modalOpen &&  <EditCommunity currentUserId={currentUserId} community={community} setModalOpen={setModalOpen}/>
      }
     
      <section className="bg-sidebarBlack w-[900px] h-screen flex flex-col">
        <header className="bg-gradient-to-r from-fuchsia-900 to-purple-900/60 h-20 mt-5 ml-5 mr-5 rounded-md flex overflow-hidden">
          <div className="flex mt-5 gap-3 ml-3 cursor-pointer">
          <AvatarGroup max={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />

    </AvatarGroup>
            <span className="rounded-full text-sm px-3 py-2 font-semibold" onClick={()=>setModalOpen(true)}>
  {community.name}
            </span>
           
          </div>
          <div className="flex ml-auto gap-6 mt-5 mr-5">
            <IoIosCall style={{ fontSize: "26px", cursor: "pointer" }} />
            <MdVideoCall style={{ fontSize: "26px", cursor: "pointer" }} />
            <HiDotsVertical style={{ fontSize: "26px", cursor: "pointer" }} />
          </div>
        </header>

        <div className="flex justify-center mt-3">
          {/* <span>Yesterday, 7:14 pm</span> */}
        </div>

        <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide px-5">
          {messages &&
            messages.map((message:any, index) =>
              message.sender._id === currentUserId ? (
                <CommunityMessagePill message={message} key={index} index={index} setTrigger={setTrigger} communityId = {community._id}/>
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
            background="#292929"
            borderColor="black"
            color="white"
            value={message}
            onChange={setMessage}
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
            className="bg-gradient-to-r from-fuchsia-900 to-purple-900  rounded-full px-3 text-[15px] h-10 mt-1"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default CommunityChatCard;

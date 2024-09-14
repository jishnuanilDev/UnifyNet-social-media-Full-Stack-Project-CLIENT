"use client"
import React, { SetStateAction, useCallback, useRef } from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { GoDotFill } from "react-icons/go";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NewCommunityAdd from "./NewCommunityChat";
import { setReduxCommunity } from "@/redux/communitySlice";
import { UseSelector,useDispatch } from "react-redux";
import axiosInstance from "@/configs/axiosInstance";
import { RootState,AppDispatch } from "@/redux/store";
// import { io, Socket } from "socket.io-client";
interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  profilePic: string;
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
  name: string;
  _id: string;
  participants: IUser[];
  admin: IUser;
  messages: IMessage[];
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}
interface OnlineUser {
  userId: string;
  socketId: string;
}
interface setMsgProps {
  setMsg:React.Dispatch<SetStateAction<boolean>>
}

const CommunityUsers: React.FC<setMsgProps> = ({ setMsg }) => {
  const [searchCard, setSearchCard] = useState(false);

  const [currentUserId, setCurrentUserId] = useState("");
  const [trigger,setTrigger] = useState(false);

  const router = useRouter();
const dispatch:AppDispatch = useDispatch();
const [communities, setCommunities] = useState<ICommunity[]>([]);
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          router.replace("/");
        }
        const result = await axiosInstance.get("/communities", {
          headers: {
            Authorization: userToken,
          },
        });
        if (result) {
          console.log("communities consoling..", result.data.communities);
          setCommunities(result.data.communities);
          setCurrentUserId(result.data.currentUserId);
          setTrigger(!true);
        }
      } catch (err) {
        console.error("Error occured in chat fetching in client side", err);
      }
    };

    fetchCommunities();
  }, [searchCard,router]);



  const handleSetCommunity = (community:ICommunity)=>{
    dispatch(setReduxCommunity(community))
    setMsg(prev=>!prev)
  }
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
          <span>New Community + </span>
        </div>
        {searchCard && <NewCommunityAdd currentUserId={currentUserId} setSearchCard={setSearchCard} />}

        <div className="ml-3 mt-5">
          {communities
            ? communities.map((community, index) =>
                community.participants.length >= 1 ? (
                  <div key={index}>
                    <div
                      key={index}
                      className="flex mt-8 gap-3 ml-3 cursor-pointer"
                      onClick={() => handleSetCommunity(community)}
                    >
                      <div className="">
                        <AvatarGroup max={2}>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                          />
                        </AvatarGroup>
                      </div>

                      <span className="rounded-full text-sm px-3 py-2 font-semibold" >
                        {community.name}
                      </span>

                      <div className="flex ml-auto mr-5 mt-2">
                        {" "}
                        <GoDotFill
                          style={{ color: "violet", fontSize: "22px" }}
                        />
                      </div>
                    </div>
                  <div className="ml-8">
                        <p className="ml-20 mt-[-10px] text-[12px] font-light">
                          last message
                        </p>
                  </div>
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

export default CommunityUsers;

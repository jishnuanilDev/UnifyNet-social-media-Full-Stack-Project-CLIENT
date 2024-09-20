"use client";
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/configs/axiosInstance";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import io from "socket.io-client";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

interface IUser {
  _id: string;
  profilePic: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  savedPost: string[];
  // Add other properties as needed
}
interface Ipost {
  _id: string;
  caption?: string;
  image?: {
    url: string;
  };
  user?: IUser;

  comments: [
    {
      _id: string;
      user: IUser;
      comment: string;
      replies: [
        {
          _id: string;
          user: string;
          commentReply: string;
        }
      ];
    }
  ];
  postId: string;
  likes: string[];
  createdAt: Date;
}

interface PostProps {
  post: Ipost;
  user: IUser | null;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
const SuggestionBox: React.FC<PostProps> = () => {
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [commentModal, setCommentModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axiosInstance.get("getUsers",{
            headers:{
                Authorization:userToken
            }
        });
        if (response.data) {
          setUsers(response.data.users);
          console.log(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Toaster />
      <section className="container bg-midBlack md:w-[400px] w-[310px] md:h-[350px] flex flex-col rounded-lg md:ml-[150px] ml-[10px] p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold ml-2">Suggested for you</span>
          <span className="text-sm font-semibold text-white/60 cursor-pointer">
            See all
          </span>
        </header>

        {/* Suggested User */}

        {users.length >= 1 ? (
          users.map((user, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-full bg-white">
                  <img
                    className="w-full h-full"
                    src={user.profilePic}
                    alt="img"
                  />
                </div>
                <div>
                  <span className="text-md font-semibold">{user.username}</span>
                  <div className="text-xs font-light text-white/70">
                    {user.fullname}
                  </div>
                </div>
              </div>
              <button className="text-sm font-semibold text-blue-500 cursor-pointer">
                Follow
              </button>
            </div>
          ))
        ) : (
          <div className="flex justify-center my-auto">
            <span className="font-semibold text-white/60">No Suggestions</span>
          </div>
        )}

        {/* More suggested users can be added here */}
      </section>
    </div>
  );
};

export default SuggestionBox;

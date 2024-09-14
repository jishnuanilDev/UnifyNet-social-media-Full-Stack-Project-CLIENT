"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/configs/axiosInstance";

const PostBox = dynamic(() => import("@/components/shared/user/PostBox"), {
  loading: () => <p>Loading Post Box...</p>, // Optional loading component
});

const UserPostModal = dynamic(() => import("@/utils/UserPostModal"), {
  loading: () => <p>Loading Post Modal...</p>, // Optional loading component
});
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
interface IProfileCardProps {
  user: IUser | null;
}
const UserPosts: React.FC = () => {
  const [userPosts, setUserPosts] = useState<Ipost[]>([]);
  const [savedPosts, setSavedPosts] = useState<Ipost[]>([]);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "savedPosts">("posts");
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axiosInstance.get("/user-posts", {
          headers: {
            Authorization: userToken,
          },
        });
        if (response) {
          console.log("user fetched posts response", response.data.posts);

          setUserPosts(response.data.posts);
          setUser(response.data.user);
        }
      } catch (err) {}
    };
    const fetchUserSavedPosts = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axiosInstance.get("/user-saved-posts", {
          headers: {
            Authorization: userToken,
          },
        });
        if (response) {
          console.log("user fetched posts response", response.data.savedPosts);

          setSavedPosts(response.data.savedPosts);
        }
      } catch (err) {}
    };
    fetchUserPosts();
    fetchUserSavedPosts();
  }, []);
  return (
    <div>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`px-4 py-2 font-medium rounded-full ${
            activeTab === "posts"
              ? "bg-fuchsia-900 text-white"
              : "bg-fuchsia-900/20 text-white"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-full ${
            activeTab === "savedPosts"
              ? "bg-fuchsia-900 text-white"
              : "bg-fuchsia-900/20 text-white"
          }`}
          onClick={() => setActiveTab("savedPosts")}
        >
          Saved Posts
        </button>
      </div>
      {activeTab == "posts" ? (
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
            {userPosts.map((userPost, index) => (
              <div
              key={index}
                className="w-80 h-80 bg-gray-300 rounded-lg"
                onClick={() => setUpdate(true)}
              >
                <UserPostModal
                  postImg={userPost.image.url}
                  user={user}
                  userPost={userPost}
                  update={update}
                  setUpdate={setUpdate}
                />
                <img
                  className="w-full h-full rounded-lg object-cover"
                  src={userPost.image.url}
                  alt="img"
                />
              </div>
            ))}
          </div>
          {userPosts.length === 0 ? (
            <div className="flex">
              <h1 className="font-mono  md:text-xl text-[14px] text-white/80">
                No Post Available
              </h1>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
            {savedPosts.map((savedPost, index) => (
              <div
              key={index}
                className="w-80 h-80 bg-gray-300 rounded-lg"
                onClick={() => setUpdate(true)}
              >
                <UserPostModal
                  key={index}
                  postImg={savedPost.image.url}
                  user={user}
                  userPost={savedPost}
                  update={update}
                  setUpdate={setUpdate}
                />
                <Image
                  className="w-full h-full rounded-lg object-cover"
                  src={savedPost.image.url}
                  alt="img"
                />
              </div>
            ))}
          </div>
          {savedPosts.length === 0 ? (
            <div className="flex">
              <h1 className="font-mono  md:text-xl text-[14px] text-white/80">
                No Post Available
              </h1>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default UserPosts;

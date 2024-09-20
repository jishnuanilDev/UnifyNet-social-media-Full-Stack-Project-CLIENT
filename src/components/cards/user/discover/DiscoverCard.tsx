"use client";
import axios from "axios";
import Image from 'next/image';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ProfileSidebar from "@/components/shared/user/ProfileSidebar";
import axiosInstance from "@/configs/axiosInstance";
import "@/styles/globals.css";
const PostBox = dynamic(() => import("@/components/shared/user/PostBox"), {
  loading: () => <p>Loading Post Box...</p>, // Optional loading component
});

const DiscoverPostModal = dynamic(() => import("@/utils/DiscoverModal"), {
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
const DiscoverPage: React.FC = () => {
  const [Posts, setPosts] = useState<Ipost[]>([]);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "savedPosts">("posts");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axiosInstance.get("/get-posts", {
          headers: {
            Authorization: userToken,
          },
        });
        if (response) {
          console.log("user fetched posts response", response.data.posts);

          setPosts(response.data.posts);
          setUser(response.data.user);
        }
      } catch (err) {}
    };

    fetchPosts();
  }, []);
  return (
    <div className="h-screen">
      <ProfileSidebar />
      <div>
        <div className=" grid grid-cols-1 md:grid-cols-4 ">
          {Posts.map((userPost, index) => (
            <div
            key={index}
              className="w-70 h-96 bg-gray-300  mt-2"
              onClick={() => setUpdate(true)}
            >
              <DiscoverPostModal
                postImg={userPost.image.url}
                user={user}
                userPost={userPost}
                update={update}
                setUpdate={setUpdate}
              />
       
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;

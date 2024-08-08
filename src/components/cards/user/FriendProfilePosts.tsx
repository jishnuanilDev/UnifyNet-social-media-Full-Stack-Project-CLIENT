"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const PostBox = dynamic(() => import("@/components/shared/user/PostBox"), {
  loading: () => <p>Loading Post Box...</p>, // Optional loading component
});

const UserPostModal = dynamic(() => import("@/utils/UserPostModal"), {
  loading: () => <p>Loading Post Modal...</p>, // Optional loading component
});
interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
}
interface Ipost {
  _id: string;
  caption: string;
  postId: string;
  image: {
    url: string;
  };

  comments: [
    {
      user: IUser;
      comment: string;
    }
  ];
  user: IUser;

  likes: string[];
}
interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  followers: [
    {
      user: IUser;
    }
  ];
  following: [
    {
      user: IUser;
    }
  ];
  posts: Ipost[];
  // Add other properties as needed
}
interface FriendProps {
  user: User | null;
}
const FriendProfilePosts: React.FC<FriendProps> = ({ user }) => {
  console.log("user in friendProfilePosts", user);
  const [update, setUpdate] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
        {
          user?.posts.map((post, index) => (
            <div
              className="w-80 h-80 bg-gray-300 rounded-lg"
              onClick={() => setUpdate(true)}
            >
              <UserPostModal
                postImg={post.image.url}
                user={user}
                userPost={post}
                update={update}
                setUpdate={setUpdate}
              />
              <img
                className="w-full h-full rounded-lg object-cover"
                src={post.image.url}
                alt="img"
              />
            </div>
          ))
       }
      </div>
      {
        user?.posts.length===0?(
          <div className="flex"><h1 className="font-mono  text-xl text-white/80">No Post Available</h1></div>
        ):''
      }
    </div>
  );
};

export default FriendProfilePosts;

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

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface IProfileCardProps {
  user: IUser | null;
}
const UserPosts: React.FC<IProfileCardProps> = ({ user }) => {
  const [userPosts, setUserPosts] = useState<Ipost[]>([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axios.get("http://localhost:5000/user-posts", {
          headers: {
            Authorization: userToken,
          },
        });
        if (response) {
          console.log("user fetched posts response", response.data.posts);

          setUserPosts(response.data.posts);
        }
      } catch (err) {}
    };
    fetchUserPosts();
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
        { 
          userPosts.map((userPost, index) => (
            <div
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
          ))
       }
      </div>
      {
        userPosts.length===0?(
          <div className="flex"><h1 className="font-mono  text-xl text-white/80">No Post Available</h1></div>
        ):''
      }
    </div>
  );
};

export default UserPosts;

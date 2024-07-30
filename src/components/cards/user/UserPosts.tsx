"use client";
import axios from "axios";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
const PostBox = dynamic(() => import('@/components/shared/user/PostBox'), {
  loading: () => <p>Loading Post Box...</p>, // Optional loading component
});

const UserPostModal = dynamic(() => import('@/utils/UserPostModal'), {
  loading: () => <p>Loading Post Modal...</p>, // Optional loading component
});

interface IPost {
  _id:string;
  caption: string;
  image: {
    url: string;
  };
  comments: [
    {
      user: User;
      comment: string;
    }
  ];
  username: string;
  postId: string;
  likes:[]
}

interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface IProfileCardProps {
  user: User | null;
}
const UserPosts:React.FC<IProfileCardProps>=({ user })=> {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const[update,setUpdate] = useState(false)
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 " >
        {userPosts.map((userPost, index) => (
          <div className="w-80 h-80 bg-gray-300 rounded-lg" onClick={()=>setUpdate(true)}>
             <UserPostModal postImg={userPost.image.url} user={user} userPost={userPost} update={update} setUpdate={setUpdate} />
            <img
              className="w-full h-full rounded-lg object-cover"
              src={userPost.image.url}
              alt="img"
            />
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;

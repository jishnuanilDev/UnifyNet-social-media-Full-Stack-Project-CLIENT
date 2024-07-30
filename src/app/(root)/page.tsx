/* eslint-disable react/react-in-jsx-scope */
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";


// Dynamic imports with ssr: false
const PostBox = dynamic(() => import("@/components/shared/user/PostBox"), {
  ssr: false,
});
const Topbar = dynamic(() => import("@/components/shared/user/TopBar"), {
  ssr: false,
});
const NewPostModal = dynamic(() => import("@/utils/NewPostModal"), {
  ssr: false,
});
const LeftSidebar = dynamic(
  () => import("@/components/shared/user/LeftSidebar"),
  { ssr: false }
);
const SampleModal = dynamic(() => import("@/utils/SampleModal"), {
  ssr: false,
});

import "flowbite";

interface Post {
  caption: string;
  image: {
    url: string;
  };
  username: string;
  postId: string;
  _id:string;
  likes:[];
  comments: [
    {
      user: User;
      comment: string;
    }
  ];
}

interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
function Home() {
  const [postStep, setPostStep] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("userToken");
      console.log("topbar re-rendering");
      if (userToken) {
        const result = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: userToken,
          },
        });
        if (result) {
          console.log("homepage:", result.data.user);
          setUser(result.data.user);
        }
      }
    };
    fetchUserData();
  }, [postStep]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await axios.get("http://localhost:5000/get-posts");
        if (result) {
          console.log("getPosts...", result.data.posts);
          setPosts(result.data.posts);
        }
      } catch (err) {
        console.log("posts fetching error in client", err);
      }
    };
    fetchPosts();
  }, [update, postStep]);

  return (
    <div>
      <div className="h-screen overflow-y-hidden">
        <LeftSidebar setPostStep={setPostStep} postStep={postStep} />

        {user ? <Topbar user={user} /> : <Topbar />}
        <NewPostModal postStep={postStep} setPostStep={setPostStep} />

        <main className="ml-14 grid grid-cols-1 h-screen  overflow-y-auto overflow-x-hidden ">
          {posts && posts.length >= 1 ? (
            posts.map((post, index) => (
              <PostBox
                key={index}
                post={post}
                user={user}
                update={update}
                setUpdate={setUpdate}
              />
            ))
          ) : (
          <>
              <div className=" mt-72">
                <div className="flex justify-center text-white/60 font-mono"><h1 className="">No post available</h1></div>
              <div className="flex justify-center mt-2">
                  <h1 className="font-bold text-white/60 font-mono text-2xl italic">
                    This space is waiting for your post!
                  </h1>
              </div>
              </div>
          </>
          )}
        </main>

        <footer className="mt-8 h-10 bg-black">
          <div></div>
        </footer>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axiosInstance from "@/configs/axiosInstance";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

const PostsDashCard:React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
        try {
          const result = await axiosInstance.get("/get-posts");
          if (result) {
            console.log('this is fetching posts in root page',result.data.posts);
            setPosts(result.data.posts);
          }
        } catch (err) {
          console.log("posts fetching error in client", err);
        }
      };
      fetchPosts();

  },[]);
  return (
    <div className="flex w-72 relative">
    <div className="flex w-full max-w-full flex-col break-words rounded-lg bg-midBlack text-white shadow-lg">
      <div className="p-3">
        <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-center text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-4 h-7 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="pt-1 text-right">
          <p className="text-sm font-light capitalize">Posts</p>
          <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
          {posts.length}
          </h4>
        </div>
      </div>
      <hr className="opacity-50" />
      <div className="p-4">
        <p className="font-light">
          <span className="text-sm font-bold text-red-600">-3% </span>
          vs last month
        </p>
      </div>
    </div>
  </div>
  );
};

export default PostsDashCard;

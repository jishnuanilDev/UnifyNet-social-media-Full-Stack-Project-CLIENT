"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AdminLeftSidebar = dynamic(
  () => import("@/components/shared/Admin/LeftSidebarAdmin"),
  {
    loading: () => <p>Loading Left Sidebar...</p>, // Optional loading component
  }
);

const Topbar = dynamic(() => import("@/components/shared/Admin/TopBarAdmin"), {
  loading: () => <p>Loading Topbar...</p>, // Optional loading component
});
import "@/styles/globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
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
  // Add other properties as needed
}
interface Ipost {
  _id: string;
  reports: [
    {
      user: IUser;
      report: string;
    }
  ];
  isUnlisted: boolean;
  caption?: string;
  image?: {
    url: string;
  };
  user?: string;

  postId: string;
  likes: IUser[];
}

interface PostProps {
  post: Ipost;
  user: IUser;
}
const AdminPanel = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Ipost[]>([]);
  useEffect(() => {
    const fetchReportedPosts = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          toast.error("Token not available");
          router.replace("/admin");
        }
        const response = await axios.get(
          "http://localhost:5000/admin/getReportPosts"
        );
        if (response) {
          setPosts(response.data.posts);
          console.log(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching reported posts in client:", error);
      }
    };

    fetchReportedPosts();
  }, []);

  const handleUnlist = async (postId: string) => {
    try {
      console.log("post id displaying for unlisting reported post in client");
      const response = await axios.post(
        "http://localhost:5000/admin/unlist-post",
        {
          postId,
        }
      );
      if (response) {
        toast.success(response.data.message);
        console.log("Unlisted response data", response);
      }
    } catch (err) {
      console.error("Error unlisting reported posts in client:", err);
    }
  };

  const handleList = async (postId: string) => {
    try {
      console.log("post id displaying for unlisting reported post in client");
      const response = await axios.post(
        "http://localhost:5000/admin/list-post",
        {
          postId,
        }
      );
      if (response) {
        toast.success(response.data.message);
        console.log("listed response data", response);
      }
    } catch (err) {
      console.error("Error unlisting reported posts in client:", err);
    }
  };

  return (
    <div>
      <div className="h-screen ">
        <AdminLeftSidebar />

        <Topbar />

        <main>
          <Toaster />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10  mr-5 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs uppercase bg-profileBlack text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Post
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reprted username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Report
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr
                    key={index}
                    className="odd:bg-purple-950 odd:dark:bg-violet-950/50 text-white even:bg-purple-950/60 even:dark:bg-customBlack border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap text-white font-semibold"
                    >
                      <img className="w-14 h-14" src={post.image?.url} alt="" />
                    </th>
                    <td>
                      {post.reports.map((report, index) => (
                        <p className="px-6 py-4 text-white">
                          {report.user.username}
                        </p>
                      ))}
                    </td>
                    <td>
                      {post.reports.map((report, index) => (
                        <p className="px-6 py-4 text-white">{report.report}</p>
                      ))}
                    </td>
                    {post.isUnlisted ? (
                      <td className="px-6 py-4 text-yellow-600">Unlisted</td>
                    ) : (
                      <td className="px-6 py-4 text-customGreen">Listed</td>
                    )}

                    <td className="px-6 py-4 text-white">
                      <button
                        className="bg-red-800 px-3 rounded-lg"
                        onClick={() => handleUnlist(post._id)}
                      >
                        UnList
                      </button>

                      <button
                        className="bg-red-800 px-3 rounded-lg"
                        onClick={() => handleList(post._id)}
                      >
                        List
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

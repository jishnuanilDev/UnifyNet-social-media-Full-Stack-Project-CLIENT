"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
import TopBarSkeleton from "@/styled-components/skeletons/TopBarSkeleton";
import Pagination from '@mui/material/Pagination';
import Swal from "sweetalert2";
import Image from 'next/image';
import Stack from '@mui/material/Stack';
const AdminLeftSidebar = dynamic(
  () => import("@/components/shared/Admin/LeftSidebarAdmin"),
  {
    loading: () => <LeftSidebarSkeleton/>, // Optional loading component
  }
);

const Topbar = dynamic(() => import("@/components/shared/Admin/TopBarAdmin"), {
  loading: () => <TopBarSkeleton/>, // Optional loading component
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
const AdminPanelReportPosts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Ipost[]>([]);
  const [trigger,setTrigger] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
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
  }, [trigger,router]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };



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
        setTrigger(prev=>!prev)
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
        setTrigger(prev=>!prev)
      }
    } catch (err) {
      console.error("Error unlisting reported posts in client:", err);
    }
  };
  const sweetAlertUnlist = (postId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleUnlist(postId);
      }
    });
  };

  const sweetAlertList = (postId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleList(postId);
      }
    });
  }
  return (
    <div>
        <Toaster />
      <div className="h-screen ">
        <AdminLeftSidebar />

        <Topbar />


        <nav className="flex mt-3" aria-label="Breadcrumb">
  <ol className=" ml-3 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <a href="/admin-panel" className="inline-flex items-center text-sm font-medium text-white hover:text-fuchsia-600 dark:text-gray-400 dark:hover:text-white">
        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
      </a>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Reported Posts</span>
      </div>
    </li>
  </ol>
</nav>

        <main>
        
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
                      <img  className="w-14 h-14" src={post.image?.url} alt="" />
                    </th>
                    <td>
                      {post.reports.map((report, index) => (
                        <p key={index} className="px-6 py-4 text-white">
                          {report.user.username}
                        </p>
                      ))}
                    </td>
                    <td>
                      {post.reports.map((report, index) => (
                        <p key={index} className="px-6 py-4 text-white">{report.report}</p>
                      ))}
                    </td>
                    {post.isUnlisted ? (
                      <td className="px-6 py-4 text-yellow-600">Unlisted</td>
                    ) : (
                      <td className="px-6 py-4 text-customGreen">Listed</td>
                    )}

                    <td className="px-6 py-4 text-white ">
                      {
                        post.isUnlisted ? (
                          <button
                          className="bg-red-800 px-3 rounded-lg ml-3"
                          onClick={() => sweetAlertList(post._id)}
                        >
                          List
                        </button>
                        ):(
                          <button
                          className="bg-red-800 px-3 rounded-lg"
                          onClick={() => sweetAlertUnlist(post._id)}
                        >
                          UnList
                        </button>
                        )
                      }
                    

               
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <div className="mt-5 flex justify-center text-white"> 
       <Stack spacing={2}>
      <Pagination  onChange={handlePageChange}  page={currentPage} className=" custom-pagination rounded-xl bg-purple-300" count={10} color="secondary" />
    </Stack>
       </div>
      </div>
    </div>
  );
};

export default AdminPanelReportPosts;

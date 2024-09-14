"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axiosInstance from "@/configs/axiosInstance";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
import TopBarSkeleton from "@/styled-components/skeletons/TopBarSkeleton";
import Swal from "sweetalert2";
const AdminLeftSidebar = dynamic(
  () => import("@/components/shared/Admin/LeftSidebarAdmin"),
  {
    loading: () => <LeftSidebarSkeleton />, // Optional loading component
  }
);

const Topbar = dynamic(() => import("@/components/shared/Admin/TopBarAdmin"), {
  loading: () => <TopBarSkeleton />, // Optional loading component
});
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import "@/styles/globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
  isBlocked: boolean;
}
const AdminPanel = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          router.replace("/admin");
        }
        const response = await axiosInstance.get("/admin/getUsers");
        if (response.data) {
          setUsers(response.data.users);
          console.log(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [trigger,router]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const sweetAlertBlock = (userId: string) => {
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
        await handleBlockUnBlockUser(userId);
      }
    });
  };
  const handleBlockUnBlockUser = async (userId: string) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        toast.error("Admin sign in required");
        return;
      }

      const result = await axiosInstance.post(
        "/admin/block-user",
        { userId },
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div>
      <div className="h-screen ">
        <AdminLeftSidebar />

        <Topbar />
        <Toaster />
        <main>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10  mr-5 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs uppercase bg-profileBlack text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Fullname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
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
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="odd:bg-purple-950 odd:dark:bg-violet-950/50 text-white even:bg-purple-950/60 even:dark:bg-customBlack border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4  whitespace-nowrap text-white font-semibold"
                    >
                      {user.fullname}
                    </th>
                    <td className="px-6 py-4 text-white">{user.username}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 text-customGreen">
                      {user.isBlocked ? "UnActive" : "Active"}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {user.isBlocked ? (
                        <button
                          className="bg-red-800 px-3 rounded-lg"
                          onClick={() => sweetAlertBlock(user._id)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="bg-red-800 px-3 rounded-lg"
                          onClick={() => sweetAlertBlock(user._id)}
                        >
                          Block
                        </button>
                      )}
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

export default AdminPanel;

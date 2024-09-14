"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import axiosInstance from "@/configs/axiosInstance";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
import TopBarSkeleton from "@/styled-components/skeletons/TopBarSkeleton";
import Pagination from '@mui/material/Pagination';
import Swal from "sweetalert2";
import Stack from '@mui/material/Stack';
const AdminLeftSidebar = dynamic(() => import('@/components/shared/Admin/LeftSidebarAdmin'), {
  loading: () => <LeftSidebarSkeleton/>, // Optional loading component
});

const Topbar = dynamic(() => import('@/components/shared/Admin/TopBarAdmin'), {
  loading: () => <TopBarSkeleton/>, // Optional loading component
});
import "@/styles/globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullname: string;
  user: {
    username:string;
  }
  phone: string;
  email: string;
}
const AdminPanel = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if(!adminToken){
          router.replace('/admin');
        }
        const response = await axiosInstance.get(
          "/admin/premium-users"
        );
        if (response.data) {
          setUsers(response.data.premiumUsers);
          console.log(response.data.premiumUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [router]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleBlockUsers=async(userId:string)=>{
    try{
       await axios.post(
        `http://localhost:5000/admin/blockUser?userId=${userId}`,
      );
      alert('Updated successfully')
    }catch (error) {
     
      console.error("Error fetching users:", error);
    
  }
}
  return (
    <div>
      <div className="h-screen ">
        <AdminLeftSidebar />

        <Topbar />

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
                 Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                  Premium Status
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
                    <td className="px-6 py-4 text-white">{user.user.username}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">address none</td>
                    <td className="px-6 py-4 text-customGreen">Premium Active</td>
                    <td className="px-6 py-4 text-customGreen">Active</td>
                    <td className="px-6 py-4 text-white ">
                <div className=" flex flex-col gap-2">
                        <button className="bg-red-800 px-3 rounded-lg " onClick={()=>handleBlockUsers(user._id)}>Block</button>
                        <button className="bg-red-800 px-3 rounded-lg " >Cancel premium </button>
                </div>
                      
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

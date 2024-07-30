"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const AdminLeftSidebar = dynamic(() => import('@/components/shared/Admin/LeftSidebarAdmin'), {
  loading: () => <p>Loading Left Sidebar...</p>, // Optional loading component
});

const Topbar = dynamic(() => import('@/components/shared/Admin/TopBarAdmin'), {
  loading: () => <p>Loading Topbar...</p>, // Optional loading component
});
import "@/styles/globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
}
const AdminPanel = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if(!adminToken){
          router.replace('/admin');
        }
        const response = await axios.get(
          "http://localhost:5000/admin/getUsers"
        );
        if (response.data) {
          setUsers(response.data.users);
          console.log(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
                    <td className="px-6 py-4 text-customGreen">Active</td>
                    <td className="px-6 py-4 text-white">
                    <button className="bg-red-800 px-3 rounded-lg" onClick={()=>handleBlockUsers(user._id)}>Block</button>
                        
                      
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

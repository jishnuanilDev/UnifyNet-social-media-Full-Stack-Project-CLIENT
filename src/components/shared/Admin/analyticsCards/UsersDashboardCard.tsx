import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axiosInstance from "@/configs/axiosInstance";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
interface User {
  _id: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
  isBlocked: boolean;
}
const UsersDashboardCard:React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
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
  },[router]);
  return (
    <div className="flex w-72 relative">
      <div className="flex w-full max-w-full flex-col break-words rounded-lg bg-midBlack text-gray-600 shadow-lg">
        <div className="p-3">
          <div className=" absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-fuchsia-700 to-pink-500 text-center text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 h-7 w-16 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="pt-1 text-right text-white">
            <p className="text-sm font-light capitalize">Users</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
              {users.length}
            </h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light text-white">
            <span className="text-sm font-bold text-green-600">+22% </span>
            vs last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboardCard;

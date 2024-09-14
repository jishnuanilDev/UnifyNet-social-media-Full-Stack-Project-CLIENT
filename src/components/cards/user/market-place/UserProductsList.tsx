"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ProfileSidebar from "@/components/shared/user/ProfileSidebar";
import axiosInstance from "@/configs/axiosInstance";
import "@/styles/globals.css";
import { BsSearch } from "react-icons/bs";
import CategoryDropdown from "@/styled-components/dropdowns/DropDown";
import EditProductForm from "@/components/forms/user/EditProductForm";
import UserListCard from "./UserListCard";

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
const UserProductList: React.FC = () => {
  const [userLists, setUserLists] = useState<Ipost[]>([]);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const result = await axiosInstance.get("/fetch-user-lists", {
          headers: {
            Authorization: userToken,
          },
        });
        if (result) {
          setUserLists(result.data.userLists);
        }
      } catch (err) {}
    };
    fetchUserLists();
  }, [update]);
  return (
    <div className="h-screen">
      <ProfileSidebar />
      <div>
        <header className="bg-sidebarBlack w-full h-20">
          <section>
            <div className="flex justify-around ">
              <div className="gap-4 flex mt-3">
                <div className="w-[450px] ">
                  <input
                    placeholder="search..."
                    className="rounded-full w-full border-0  font-sans bg-midBlack"
                    type="text"
                  />
                </div>

                <div className="bg-midBlack w-10 h-10 rounded-full cursor-pointer flex justify-center items-center">
                  <BsSearch style={{ fontSize: "20px", color: "fuchsia" }} />
                </div>
              </div>
            </div>
          </section>
        </header>
        <div className="flex justify-center mb-5 bg-midBlack mr-4"><h1 className="mb-4 mt-1 text-xl font-extrabold text-gray-900 dark:text-white md:text-xl italic lg:text-3xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your Lists</span></h1></div>
        {userLists.length >= 1 ? (
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-3 mr-2">
            {userLists.map((list, index) => (
              <UserListCard key={index} list={list}/>
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-56">
            <span className="text-3xl font-bold text-white/40">
              You have no lists available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProductList;

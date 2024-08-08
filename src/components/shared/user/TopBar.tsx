"use client";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { BsSearch } from "react-icons/bs";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { useRouter } from "next/navigation";
import UserSearchCard from "@/components/cards/user/UserSearchCard";
import axios from "axios";

import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
}
interface ITopBarProps {
  user?: User;
}
const Topbar: React.FC<ITopBarProps> = ({ user }) => {
  const router = useRouter();
  // const [user, setUser] = useState<User | null>(null);
  // const [userToken,setUserToken] = useState('');
  const [searchCard, setSearchCard] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [searchName, setSearchName] = useState("");
  const [users,setUsers] = useState([]);

  const profilePage = () => {
    try {
      router.push("/profile");
    } catch (err) {
      console.error("Error occured in client side profile view", err);
    }
  };
  const addAccount = () => {
    try {
      router.push("/sign-in");
    } catch (err) {
      console.error("Error occured in client add account", err);
    }
  };

  const handleSearch = async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    if(searchName.length<1){
      toast.error("Please enter a username to search!");
      return ;
    }

    try {
      const result = await axios.post("http://localhost:5000/search-name", {
        searchName,
      });
      if(result){
        setUsers(result.data.users);
      }
      setSearchCard(true);
    } catch (err) {
      console.log("Error occured in searching users in client side", err);
    }
  };
  return (
    <>
      <Toaster />
      <div className="bg-customBlack h-16  flex justify-end items-center gap-8">
        <div className="gap-4 flex">
          <div className="w-[450px] ">
            <input
              onChange={(e) => setSearchName(e.target.value)}
              value={searchName}
              placeholder="search..."
              className="rounded-full w-full border-0  font-sans bg-black"
              type="text"
            />
          </div>

          <div
            className="bg-black px-2.5 py-2 rounded-full cursor-pointer"
            onClick={handleSearch}
          >
            <BsSearch style={{ fontSize: "20px", color: "fuchsia" }} />
          </div>
        </div>
        {searchCard ? (
          <div className="flex justify-center">
            <UserSearchCard
              setSearchCard={setSearchCard}
              users={users}
            />
          </div>
        ) : (
          ""
        )}

        <div className="text-sm flex ">
          <span className="mr-2 ">
            <IoNotificationsCircleSharp
              style={{ fontSize: "27px", color: "#b438ba" }}
            />
          </span>
          <span className="mt-1 font-sans">Notifications</span>
        </div>
        <div className="md:mr-20 text-sm flex">
          <span className="mr-2">
            <IoIosPeople style={{ fontSize: "27px", color: "#b438ba" }} />
          </span>
          <span className="mt-1 font-sans">Peoples</span>
        </div>

        <div className="bg-profileBlack h-16 items-center justify-center md:w-[300px]  cursor-pointer ">
          {userToken ? (
            <div className="flex flex-col items-center mt-2 ">
              <div className="  md:ml-0 justify-center " onClick={profilePage}>
                <div className="flex">
                  <span className=" ml-2 md:ml-0 mr-4">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                  </span>

                  <span className="font-sans md:text-base text-[10px] hidden md:block font-semibold">
                    {user?.username}
                    <div className="text-[10px] font-thin hidden md:block mt-1 text-center">
                      {user?.fullname}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-3 ">
              <div className="flex md:ml-0 " onClick={addAccount}>
                <span className=" ml-2 md:ml-0 mr-2 md:mt-1 mt-2">
                  <IoMdPerson style={{ fontSize: "20px", color: "white" }} />
                </span>
                <span className="font-sans md:text-base text-[10px] hidden md:block ">
                  sign-in / sign-up
                </span>
              </div>
              <div className="text-[10px] text-center font-mono hidden md:block mt-1">
                Join Us and Start Your Journey
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;

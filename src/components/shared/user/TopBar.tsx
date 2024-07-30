"use client";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { useRouter } from "next/navigation";



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
  const userToken = localStorage.getItem("userToken");

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
  return (
    <>
      <div className="bg-customBlack h-16  flex justify-end items-center gap-8">
<div>
  <input className="rounded-full bg-black border" type="text" />
</div>
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

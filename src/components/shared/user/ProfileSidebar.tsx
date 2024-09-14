"use client";
import React from "react";
import { PiUniteLight } from "react-icons/pi";
import { RiHome7Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { PiChatsCircleFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiCodestream } from "react-icons/si";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { LiaToggleOnSolid } from "react-icons/lia";
import { IoLogIn } from "react-icons/io5";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import Spinner from "@/styled-components/loader/Spinner";

   
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import { useRouter } from "next/navigation";
const ProfileSidebar: React.FC = () => {
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setUserToken(userToken || "");
  }, []);

  const logoutClick = () => {
    console.log("user logout clicked");
    localStorage.removeItem("userToken");
    setUserToken("");
    localStorage.removeItem("user");
    router.replace("/");
  };

  const loginClick = () => {
    router.push("/sign-in");
  };

  const handleCommunity = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    router.push("/community");
  };

  const handleChats = ()=>{
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    router.push('/conversations');
  }

  const handleHome = ()=>{
setLoading(true);
router.push('/');
  }
  return (
    <div className="bg-sidebarBlack h-screen md:w-[250px] w-[50px] float-left md:mr-10 mr-3 ">
      <div>
      {
          loading? <Spinner/>:null
         }
        <div>
          <div
            className="mt-5 ml-2 md:ml-10 flex text-xl cursor-pointer"
            onClick={() => router.replace("/")}
          >
            <span className="text-sm">
              <PiUniteLight style={{ fontSize: "40px", color: "#b438ba" }} />
            </span>
            <span className=" flex-1 font-bold font-sans text-sidebarBlack md:text-white hidden md:block">
              UnifyNet
            </span>
          </div>
        </div>

        <div className="ml-3.5 sm:ml-8 md:ml-14 ">
          <div
            className="mt-9  flex cursor-pointer "
            onClick={handleHome}
          >
            <span className="">
              <RiHome7Fill style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block ">
              Home
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer  ">
            <span className="">
              <IoSearch style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Search
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer ">
            <span className="">
              <MdExplore style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Discover
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer">
            <span className="">
              <AiFillPlusCircle style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Create
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer "  onClick={handleChats}>
            <span className="">
              <PiChatsCircleFill
                style={{ fontSize: "26px", color: "d55adb" }}
              />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Chats
            </span>
          </div>

          <div className="mt-9 flex cursor-pointer " onClick={handleCommunity}>
            <span className="">
              <FaPeopleGroup style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Community
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer ">
            <span className="">
              <SiCodestream style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Go live
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer ">
            <span className="">
              <MdOutlineOndemandVideo
                style={{ fontSize: "26px", color: "d55adb" }}
              />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Video
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer  ">
            <span className="">
              <GiShop style={{ fontSize: "26px", color: "#d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Markerplace
            </span>
          </div>

          <div className="mt-14  flex cursor-pointer ">
            <span className="hidden md:block">
              <CgDarkMode style={{ fontSize: "26px" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Darkmode
            </span>
            <span className="mr-10 hidden md:block">
              <LiaToggleOnSolid style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
          </div>

          {userToken ? (
            <div
              className="mt-5 md:block hidden  bg-lightBlack md:w-[150px] w-[30px]p-1 rounded-md cursor-pointer hover:bg-red-600 transition ease-in"
              onClick={logoutClick}
            >
              <span className="float-start mr-4 ">
                <AiOutlineLogout
                  className="w-5 md:mt-0.5 md:ml-2"
                  style={{ fontSize: "26px" }}
                />
              </span>
              <span className="flex-1 ml-3 mt-1 md:p-1 text-sm font-sans font-bold hidden md:block">
                Logout
              </span>
            </div>
          ) : (
            <div
              className="mt-5  flex bg-fuchsia-900 w-[150px] p-1 rounded-md cursor-pointer hover:bg-fuchsia-400 transition ease-in"
              onClick={loginClick}
            >
              <span className="">
                <IoLogIn style={{ fontSize: "26px" }} />
              </span>
              <span className="flex-1 ml-3 mt-1 text-sm font-sans font-bold hidden md:block">
                Login
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

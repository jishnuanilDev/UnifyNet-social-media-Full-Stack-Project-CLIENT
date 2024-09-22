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
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
import { GiShop } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { LiaToggleOnSolid } from "react-icons/lia";
import { IoLogIn } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import Spinner from "@/styled-components/loader/Spinner";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);


interface setPoststepProps {
  setPostStep?: React.Dispatch<React.SetStateAction<number>>;
  postStep?:number;
}
const LeftSidebar: React.FC<setPoststepProps> = ({ setPostStep,postStep }) => {
  // const [userToken, setUserToken] = useState('');
  const router = useRouter();
  // useEffect(() => {

  //   const userToken = localStorage.getItem('userToken');
  //   setUserToken(userToken || '');
  // }, []);
  const searchParams = useSearchParams();
  const [searchStep,setSearchStep] = useState(false);
  const [loading, setLoading] = useState(false);

  const userToken = localStorage.getItem("userToken");
  const logoutClick = () => {
    console.log("user logout clicked");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    if (setPostStep) {
      setPostStep(0);
    }
    toast.success('Logout succesfully');
    setLoading(true);
    window.location.href = '/'
    // router.push("/");
  };
  const handleStep = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    if (setPostStep) {
      setPostStep(1);
    }
  };
  const loginClick = () => {
    
    router.push("/sign-in");
  };
  const handleChats = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    setLoading(true);

      router.push('/conversations')


  }

  const handleMarketPlace = ()=>{
    setLoading(true);
    router.push('/market-place')
  }

  const handleProfile = () => {
    try {
      setLoading(true);
      router.push("/profile");
    } catch (err) {
      console.error("Error occured in client side profile view", err);
    }
  };
  
  const handleDiscover = ()=>{
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    setLoading(true);
      router.push('/discover')

  }
    const handleCommunity = ()=>{
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    setLoading(true);
      router.push('/community')

  }
  return (
    <div className="bg-sidebarBlack h-screen md:w-[250px] w-[50px] float-left ">
         <Toaster />
         {
          loading? <Spinner/>:null
         }
      <div>
        <div>
          <div
            className="mt-5 ml-2 md:ml-10 flex text-xl cursor-pointer"
            onClick={() => router.replace("/")}
          >
            <span className="text-sm">
              <PiUniteLight style={{ fontSize: "40px", color: "#b438ba" }} />
            </span>
            <span className=" flex-1 font-bold font-sans text-sidebarBlack md:text-white">
              UnifyNet
            </span>
          </div>
        </div>

        <div className="ml-3.5 sm:ml-8 md:ml-14 ">
          <div
            className="mt-6  flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2  py-2 px-1 "
            onClick={() => router.push("/")}
          >
            <span className="">
              <RiHome7Fill style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block ">
              Home
            </span>
          </div>

          <div className="mt-6  flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2  py-2 px-1 "  onClick={handleDiscover}>
            <span className="">
              <MdExplore style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Discover
            </span>
          </div>

          <div className="mt-6  flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2 py-2 px-1 " onClick={handleStep}>
            <span className="">
              <AiFillPlusCircle style={{ fontSize: "26px", color: "d55adb" }} />
            </span>

            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Create
            </span>
          </div>

          <div className="mt-6  flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2  py-2 px-1 " onClick={handleChats}>
            <span className="">
              <PiChatsCircleFill
                style={{ fontSize: "26px", color: "d55adb" }}
              />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Chats
            </span>
          </div>
          
          <div className="mt-6 flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2  py-2 px-1   "  onClick={handleCommunity}>
            <span className="">
              <FaPeopleGroup style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Community
            </span>
          </div>

          <div className="mt-6  flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2  py-2 px-1   " onClick={handleProfile}>
            <span className="">
              <HiBadgeCheck style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Premium 
            </span>
          </div>

          <div className="mt-6  flex cursor-pointer hover:bg-fuchsia-950/55 rounded-lg mr-2  py-2 px-1   " onClick={handleProfile}>
            <span className="">
              <FaUserAlt
                style={{ fontSize: "26px", color: "d55adb" }}
              />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Profile
            </span>
          </div>

          <div className="mt-6 mb-14 flex cursor-pointer  hover:bg-fuchsia-900/55 rounded-lg mr-2  py-2 px-1   " onClick={handleMarketPlace}>
            <span className="">
              <GiShop style={{ fontSize: "26px", color: "#d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Markerplace
            </span>
          </div>

    <div className="mt-20">
            <div className="mt-14 md:mb-8 flex cursor-pointer ">
              <span className="hidden md:block">
                <CgDarkMode style={{ fontSize: "26px" }} />
              </span>
              <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
                Darkmode
              </span>
              <span className="mr-10  md:block">
                <LiaToggleOnSolid style={{ fontSize: "26px", color: "d55adb" }} />
              </span>
            </div>
  
            {userToken ? (
              <div
                className="mt-5 md:block h-8  bg-lightBlack md:w-[150px] w-[30px] p-1 rounded-md cursor-pointer hover:bg-red-600 transition ease-in"
                onClick={logoutClick}
              >
                <span className="float-start mr-4 ">
                  <AiOutlineLogout className="w-5" style={{ fontSize: "26px" }} />
                </span>
                <span className="flex-1 ml-3 mt-0.5 text-sm font-sans font-bold hidden md:block">
                  Logout
                </span>
              </div>
            ) : (
              <div
                className="mt-5  h-8  flex bg-fuchsia-900 w-[150px] p-1 rounded-md cursor-pointer hover:bg-fuchsia-400 transition ease-in"
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
    </div>
  );
};

export default LeftSidebar;

"use client";
import React from "react";
import { PiUniteLight } from "react-icons/pi";
import { RiHome7Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { PiChatsCircleFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiCodestream } from "react-icons/si";
import Link from "next/link";
import dynamic from "next/dynamic";   
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
const AdminLeftSidebar: React.FC = () => {

  const router = useRouter();
  const adminLogout = () => {
    console.log("admin logout clicked");
    localStorage.removeItem("adminToken");
    toast.success('Logout successfully');
    router.push("/admin");

  };

  
  return (
    <div className="bg-sidebarBlack h-screen md:w-[250px] w-[50px] float-left ">
         <Toaster />
      <div>
        <div>
          <div className="mt-5 ml-2 md:ml-10 flex text-xl ">
            <span className="text-sm">
              <PiUniteLight style={{ fontSize: "40px", color: "#b438ba" }} />
            </span>
            <span className=" flex-1 font-bold font-sans text-sidebarBlack md:text-white">
              UnifyNet <p className=" text-myViolet">Admin</p>
            </span>
          </div>
        </div>

        <div className="ml-3.5 sm:ml-8 md:ml-14 cursor-pointer" onClick={()=>window.location.href = '/admin-panel'}>
          <div className="mt-9  flex ">
            <span className="">
              <RiHome7Fill style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
          <Link href='/admin-panel'>
              <span className="flex-1 ml-3 mt-1 text-sm hidden md:block ">
                Home
              </span>
          </Link>
          </div>

          <div className="mt-9  flex cursor-pointer" >
            <span className="">
              <FaPeopleGroup style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
          <Link href='/admin-panel/users'>
              <span className="flex-1 ml-3 mt-1 text-sm hidden md:block" onClick={()=>window.location.href = '/admin-panel/users'}>
                User{" "}
              </span>
          </Link>
          </div>

          <div className="mt-9  flex cursor-pointer">
            <span className="">
              <MdExplore style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
           <Link href='/admin-panel/reported-post'>
              <span className="flex-1 ml-3 mt-1 text-sm hidden md:block"  onClick={()=>window.location.href = '/admin-panel/reported-post'}>
                Reported Posts{" "}
              </span>
           </Link>
          </div>

          <div className="mt-9  flex cursor-pointer " >
            <span className="">
            <FaPeopleGroup style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
         <Link href='/admin-panel/premium-users'>
              <span className="flex-1 ml-3 mt-1 text-sm hidden md:block"  onClick={()=>window.location.href = '/admin-panel/premium-users'}>
             Premium Users
              </span>
         </Link>
          </div>

          <div className="mt-9  flex "onClick={()=>window.location.href = '/admin-panel/market-place'}>
            <span className="">
              <PiChatsCircleFill
                style={{ fontSize: "26px", color: "d55adb" }}
              />
            </span>
      <Link href='/admin-panel/market-place'>
              <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
                Market{" "}
              </span>
      </Link>
          </div>

          {/* <div className="mt-9 flex ">
            <span className="">
              <FaPeopleGroup style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Category{" "}
            </span>
          </div>

          <div className="mt-9  flex ">
            <span className="">
              <SiCodestream style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Condition{" "}
            </span>
          </div> */}
          <div
              className="mt-5 md:block h-8  bg-lightBlack md:w-[150px] w-[30px] p-1 rounded-md cursor-pointer hover:bg-red-600 transition ease-in"
           onClick={adminLogout}
           >
              <span className="float-start mr-4 ">
                <AiOutlineLogout className="w-5" style={{ fontSize: "26px" }} />
              </span>
              <span className="flex-1 ml-3 mt-0.5 text-sm font-sans font-bold hidden md:block">
                Logout
              </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftSidebar;

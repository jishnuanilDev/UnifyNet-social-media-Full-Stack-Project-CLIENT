"use client";
import React from "react";
import { PiUniteLight } from "react-icons/pi";
import { RiHome7Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

import { MdExplore } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { PiChatsCircleFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiCodestream } from "react-icons/si";

const AdminLeftSidebar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-sidebarBlack h-screen md:w-[250px] w-[50px] float-left ">
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

        <div className="ml-3.5 sm:ml-8 md:ml-14">
          <div className="mt-9  flex ">
            <span className="">
              <RiHome7Fill style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block ">
              Home
            </span>
          </div>

          <div className="mt-9  flex ">
            <span className="">
              <FaPeopleGroup style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              User{" "}
            </span>
          </div>

          <div className="mt-9  flex cursor-pointer" onClick={()=>router.push('/admin-panel/reported-post')}>
            <span className="">
              <MdExplore style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Reported Post{" "}
            </span>
          </div>

          <div className="mt-9  flex ">
            <span className="">
              <AiFillPlusCircle style={{ fontSize: "26px", color: "d55adb" }} />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Video{" "}
            </span>
          </div>

          <div className="mt-9  flex ">
            <span className="">
              <PiChatsCircleFill
                style={{ fontSize: "26px", color: "d55adb" }}
              />
            </span>
            <span className="flex-1 ml-3 mt-1 text-sm hidden md:block">
              Market{" "}
            </span>
          </div>

          <div className="mt-9 flex ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftSidebar;

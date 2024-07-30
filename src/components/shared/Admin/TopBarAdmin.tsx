import React from "react";

import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
const Topbar: React.FC = () => {
  return (
    <>
      <div className="bg-customBlack h-16  flex justify-end items-center gap-8  ">
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

        <div className="bg-profileBlack h-16 items-center justify-center md:w-[300px]   ">
          <div className="flex flex-col items-center mt-3 ">
            <div className="flex md:ml-0 ">
              <span className=" ml-2 md:ml-0 mr-2 md:mt-0 mt-2">
                <IoMdPerson style={{ fontSize: "20px", color: "white" }} />
              </span>
              <span className="font-sans md:text-base text-[10px] hidden md:block ">
                Admin
              </span>
            </div>
            <div className="text-[10px] font-thin hidden md:block"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;

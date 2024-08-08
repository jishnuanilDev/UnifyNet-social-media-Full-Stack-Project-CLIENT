import React from "react";
import Avatar from "@mui/material/Avatar";
import { IoIosCall } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";


const NoChatLayout:React.FC= ()=> {
  return (
    <div>
      <section className="bg-sidebarBlack w-[900px] h-screen flex flex-col">
  
 <div className="flex justify-center items-center my-auto"><h2 className="font-semibold font-sans text-fuchsia-600/60 text-2xl italic"><div className="text-center">Open a Chat &</div> <div className="text-center">Start a Conversation</div></h2></div>

        
      </section>
    </div>
  );
}

export default NoChatLayout;

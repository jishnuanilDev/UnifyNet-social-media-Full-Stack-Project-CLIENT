import React, { useState } from "react";
import { format } from "timeago.js";
import axiosInstance from "@/configs/axiosInstance";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
const CommunityMessagePill = ({ message, index, setTrigger, communityId }) => {
  const [unsendOpen, setUnsendOpen] = useState(false);
  const handleUnsendOpen = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setUnsendOpen(true);
  };

  const handleUnsendMessage = async (messageId: string) => {
    try {
      console.log("community id for usnend in community client", communityId);
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.post(
        "/unsend-community-message",
        {
          messageId,
          communityId,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
        setTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error(
        "Error occured in during handleUnsendMessage in client side",
        err
      );
    }
  };

  return (
    <>
      <div key={index} className="flex flex-col mt-6 gap-1 items-end">
        <div className="flex gap-3 cursor-pointer relative">
          {/* Message Container */}
          <span
            className="bg-gradient-to-r from-fuchsia-900 to-pink-900 rounded-full text-sm px-3 py-2.5"
            onContextMenu={handleUnsendOpen}
          >
            {message.message}
          </span>

          {/* Modal overlay */}
          {unsendOpen && (
            <div
              className="absolute top-0 left-0 mt-8 w-48 transition-all ease-in-out duration-300 transform bg-postBox bg-transparent/80 text-white rounded-xl shadow-lg z-10 shadow-lightBlack"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <div
                className="block px-4 py-2 text-sm hover:scale-110 cursor-pointer transition duration-200 hover:text-fuchsia-400 rounded-xl"
                onClick={() => handleUnsendMessage(message._id)}
              >
                Unsend
              </div>
              <div
                className="block px-4 py-2 text-sm hover:scale-110 hover:text-red-600 cursor-pointer transition duration-200 rounded-xl"
                onClick={() => {
                  setUnsendOpen(false);
                }}
              >
                Close
              </div>
            </div>
          )}
        </div>

        <div className="mr-2">
          <span className="text-[10px] text-white/40 font-sans">
            {format(message.createdAt)}{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default CommunityMessagePill;

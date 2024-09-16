"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Suspense } from "react";
import ReadyToCallLayout from "@/components/cards/user/video-call/ReadyToCallPage";
import Spinner from "@/styled-components/loader/Spinner";
import GeminiButton from "@/components/buttons/GeminiButton";
import io from "socket.io-client";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface Params {
  username: string;
}
const socketUrl: any ='https://unifynetserver.jisonline.site'; 
// const socketUrl: any ='http://localhost:8000'; 
// socket.current = io(socketUrl); socket.current = io(socketUrl,{ path: "/socket.io", // Ensure the correct path if you're using Nginx });

const webrtcSocketUrl = process.env.NEXT_PUBLIC_API_SOCKET_URL_WEBRTC
const socket = io(webrtcSocketUrl);
const ReadyToCallPage = ({ params }: { params: Params }) => {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  socket.on("callEnded", () => {
    console.log("hello call ended in webrtc unifyNet");
    toast.success('Call Ended');
  });


  return (
    <>
      <div>
        {showComponent ? (
     <>
            <ReadyToCallLayout params={params} />
     </>
        ) : (
          // Optional: Display a loader or placeholder while waiting
          <div className="w-screen h-screen">
            {" "}
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default ReadyToCallPage;

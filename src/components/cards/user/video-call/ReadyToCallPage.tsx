"use client";
import React, { useEffect } from "react";
import "@/styles/globals.css";
import Link from "next/link";
import VideoCallLayout from "../chat/individual/VideoCallLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/configs/axiosInstance";
import { Button } from "@nextui-org/react";
import io from "socket.io-client";
import SimplePeer, { Instance } from "simple-peer";
import Spinner from "@/styled-components/loader/Spinner";
interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface Params {
  username: string;
}
const webrtcSocketUrl = process.env.NEXT_PUBLIC_API_SOCKET_URL_WEBRTC
const socket = io(webrtcSocketUrl,{
  path: "/webrtcSocket.io",
});
const ReadyToCallLayout = ({ params }: { params: Params }) => {
  const [videoLayout, setVideoLayout] = useState(false);
  const [me, setMe] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [name, setName] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [forCall, setForCall] = useState(false);
  const [forAnswer, setForAnswer] = useState(false);

  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.push("/");
      return;
    }
    const fetchUserData = async () => {
      try {
        console.log("topbar re-rendering");
        const result = await axiosInstance.get("/profile", {
          headers: {
            Authorization: userToken,
          },
        });
        if (result) {
          console.log("call page:", result.data.user.username);
          if (result.data.user.isBlocked) {
            localStorage.removeItem("userToken");
            router.replace("/");
            return;
          }
          setUser(result.data.user);
          socket.emit("addUser", result.data.user.username);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw error; // This will trigger the custom error page
        }
      }
    };

    fetchUserData();
    console.log("user from useeffect", user);
    // socket.on("receiver", (callerSocketId: string) => {
    //   console.log("Incoming call from:", callerSocketId);
    //   // Handle the incoming call (e.g., display a modal to accept/reject the call)
    //   alert(`Incoming call from ${callerSocketId}`);
    //   // If accepted, start the WebRTC connection
    //   // If rejected, send a reject message back
    // });

    socket.on("callUsr", (data) => {
      console.log("machane... call user recieve call vannu", data);
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.off("receiver");
    };
  }, [receivingCall,user,router]);

  const handleCallAccept = () => {
    setForAnswer(true);
    setVideoLayout(true);
  };

  const handleStartCall = () => {
    setForCall(true);
    setVideoLayout(true);
  };

  const handleBackToHome = ()=>{
    setSpinnerLoading(true);
    router.push('/')
  }

  const handleBackToChat = ()=>{
    setSpinnerLoading(true);
    router.push('/conversations')
  }
  return (
    <>
      {videoLayout && (
        <VideoCallLayout
          callerSignal={callerSignal}
          caller={caller}
          forCall={forCall}
          forAnswer={forAnswer}
          setVideoLayout={setVideoLayout}
          username={params.username}
          currentUsername={user.username}
          setReceivingCall={setReceivingCall}
          setCaller={setCaller}
          setCallerSignal={setCallerSignal}
          setName={setName}
        />
      )}

      {!videoLayout && (
        <>
          {receivingCall && !callAccepted ? (
            <div>
              <div className="flex justify-center">
                {" "}
                <h1>{name} is calling...</h1>
              </div>
              <div
                className="flex justify-center mt-2"
                onClick={handleCallAccept}
              >
                <button className="bg-customGreen px-3  py-1 rounded-full">
                  Answer
                </button>
              </div>
            </div>
          ) : null}

        <div className="h-screen ">
              <div className="flex gap-5 justify-center items-center ">
                {spinnerLoading ? <Spinner /> : null}
                <section className="bg-midBlack h-[350px] w-[600px] rounded-lg flex items-center justify-center mt-40">
                  <div className="justify-center ml-4">
                    <h1 className="text-white font-semibold font-mono">
                      Allow UnifyNet to use your camera and microphone so that
                    </h1>
                    <div className="flex justify-center">
                      <h1 className="text-white font-semibold font-mono">
                        others can see and hear you
                      </h1>
                    </div>
                    <div className="flex justify-center mt-3">
                      <Link href="#" className="text-blue-500 hover:underline">
                        Use camera and microphone
                      </Link>
                    </div>
                  </div>
                </section>
    
                <section className="bg-midBlack h-[350px] w-[400px] rounded-lg mt-40">
                  <div className="flex justify-center mt-14">
                    <div className="bg-lightBlack w-20 h-20 rounded-full  "></div>
                  </div>
    
                  <div className="flex justify-center mt-5">
                    <span className="font-bold text-xl">{params.username}</span>
                  </div>
                  <div className="flex justify-center mt-2">
                    <span className="text-[15px] text-white/70">
                      Ready to call?
                    </span>
                  </div>
    
                  <div className="flex justify-center mt-16">
                    {receivingCall && !callAccepted ? (
                      <button
                        onClick={handleCallAccept}
                        className="bg-fuchsia-800 rounded-full px-4 py-1 hover:bg-fuchsia-700 transition ease-in hover:shadow-sm hover:scale-110"
                      >
                        Answer Call
                      </button>
                    ) : (
                      <button
                        onClick={handleStartCall}
                        className="bg-fuchsia-800 rounded-full px-4 py-1 hover:bg-fuchsia-700 transition ease-in hover:shadow-sm hover:scale-110"
                      >
                        Start Call
                      </button>
                    )}
                  </div>
                </section>
         
              </div>
              <div className="flex gap-5 mt-8 justify-center mr-96"> 
                <Button onClick={handleBackToHome} size="sm" color="secondary" variant="light">&larr; Back to home</Button>
                <Button onClick={handleBackToChat} size="sm"  color="secondary" variant="light">Go to chat &rarr;</Button>
               </div>
        </div>
        </>
      )}
    </>
  );
};

export default ReadyToCallLayout;

"use client";
import React, { useEffect, useState, useRef } from "react";
import "@/styles/globals.css";
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { IoMdMicOff } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import { IoCall } from "react-icons/io5";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import SimplePeer, { Instance } from "simple-peer";
interface videoCallLayoutProps {
  setVideoLayout: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  currentUsername: string;
  forCall: boolean;
  forAnswer: boolean;
  caller: any;
  callerSignal: any;
  setReceivingCall: React.Dispatch<React.SetStateAction<boolean>>;
  setCaller: React.Dispatch<React.SetStateAction<string>>;
  setCallerSignal: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
const webrtcSocketUrl = process.env.NEXT_PUBLIC_API_SOCKET_URL_WEBRTC
const socket = io(webrtcSocketUrl,{
  path: "/webrtcSocket.io",
});
const VideoCallLayout: React.FC<videoCallLayoutProps> = ({
  currentUsername,
  setVideoLayout,
  username,
  forCall,
  forAnswer,
  caller,
  callerSignal,
  setReceivingCall,
  setCaller,
  setCallerSignal,
  setName,
}) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdCallToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [currentUserVideo, setCurrentUserVideo] = useState<MediaStream | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const otherUserVideoRef = useRef<HTMLVideoElement>(null);
  const UserVideoRef = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>();
  const router = useRouter();
  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(localStream);
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
        if (UserVideoRef.current) {
          UserVideoRef.current.srcObject = localStream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    startVideoStream();
    socket.on("me", (id) => {
      setMe(id);
    });
  }, []);
  const toggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        alert("no audio tracks available");
        return;
      }
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
        setMicOn(track.enabled);
      });
    }
  };
  const toggleVideo = () => {
    if (stream) {
      // Get the video tracks from the stream
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled; // Toggle the video track
        setVideoOn(videoTrack.enabled); // Update state based on track status
      }
    }
  };
  useEffect(() => {
    const callUser = (id: string) => {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: id,
          name: currentUsername,
        });
      });

      peer.on("stream", (remoteStream) => {
        if (otherUserVideoRef.current) {
          otherUserVideoRef.current.srcObject = remoteStream;
        }
      });

      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    };
    if (forCall) callUser(username);
  }, [currentUsername,forCall,stream,username]);

  useEffect(() => {
    const answerCall = () => {
      setCallAccepted(true);
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: caller });
      });

      peer.on("stream", (remoteStream) => {
        console.log("peer remote stream jishn implemention", remoteStream);
        if (otherUserVideoRef.current) {
          otherUserVideoRef.current.srcObject = remoteStream;
        }
      });
      peer.on("error", (err) => {
        console.error("Peer error: jishnu", err);
      });

      peer.signal(callerSignal);
      connectionRef.current = peer;
    };
    if (forAnswer) answerCall();
  }, [caller,callerSignal,forAnswer,stream]);

  useEffect(() => {
    socket.on("callEnded", () => {
      console.log("hello call ended in webrtc unifyNet");
      toast.success('Call Ended')
      setTimeout(() => {
        setVideoLayout(false);
      },3000);
    
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }

      // Clean up the state
      setCallEnded(true);
      setReceivingCall(false);
      setCaller(null);
      setCallerSignal(null);
      setStream(null);
      setMe(null);
      setName(null);

      // Optionally update UI to reflect call ended state
      setVideoLayout(false);
    });

    // Clean up listener on unmount
    return () => {
      socket.off("callEnded");
    };
  }, [setCaller,setCallerSignal,setName,setReceivingCall,setVideoLayout]);

  const leaveCall = () => {
    // Destroy the peer connection
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    // Stop all media streams
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    // Notify the other peer (optional)
    socket.emit("endCall", { to: username });

    // Clean up the state
    setCallEnded(true);
    setReceivingCall(false);
    setCaller(null);
    setCallerSignal(null);
    setStream(null);
    setMe(null);
    setName(null);

    // Optionally update UI to reflect call ended state
    // window.location.href = `/call/${username}`;
    setVideoLayout(false);
  };

  return (
    <>
       <Toaster />
      <div className="flex justify-center ml-96">
        <section className="bg-sidebarBlack h-screen w-[700px] rounded-md relative">
          {callAccepted && !callEnded ? (
            <video
              ref={UserVideoRef}
              playsInline
              autoPlay
              muted
              className="w-full h-full rounded-lg"
            ></video>
          ) : null}

          {/* Icons placed over the video */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <span className="bg-lightBlack h-28 w-28 rounded-full"></span>
            <h1 className="text-white mt-4">Calling...</h1>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-10">
   <div>
              {videoOn ? (
                <span className="bg-midBlack h-10 w-10 rounded-full flex justify-center items-center cursor-pointer">
                  <FaVideo style={{ fontSize: "22px", color: "white" }} />
                </span>
              ) : (
                <span className="bg-lightBlack h-10 w-10 rounded-full flex justify-center items-center cursor-pointer">
                  <FaVideoSlash style={{ fontSize: "22px", color: "white" }} />
                </span>
              )}
   </div>

            <div onClick={toggleMic}>
              {micOn ? (
                <span className="bg-midBlack h-10 w-10 rounded-full flex justify-center items-center cursor-pointer">
                  <IoMdMic style={{ fontSize: "22px", color: "white" }} />
                </span>
              ) : (
                <span className="bg-lightBlack h-10 w-10 rounded-full flex justify-center items-center cursor-pointer">
                  <IoMdMicOff style={{ fontSize: "22px", color: "white" }} />
                </span>
              )}
            </div>

            <span
              className="bg-red-700 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer"
              onClick={leaveCall}
            >
              <IoCall style={{ fontSize: "22px", color: "white" }} />
            </span>
          </div>
        </section>

        <section className="bg-sidebarBlack h-[300px] w-[300px] rounded-lg mt-auto ml-auto mr-2 mb-2 relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full rounded-lg"
          ></video>
        </section>
      </div>
    </>
  );
};

export default VideoCallLayout;

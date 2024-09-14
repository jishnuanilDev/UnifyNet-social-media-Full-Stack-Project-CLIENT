"use client";
import { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { BsSearch } from "react-icons/bs";
import dayjs from "dayjs";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { useRouter } from "next/navigation";
import UserSearchCard from "@/components/cards/user/UserSearchCard";
import axios from "axios";
import axiosInstance from "@/configs/axiosInstance";
import dynamic from "next/dynamic";
import Spinner from "@/styled-components/loader/Spinner";
import NotificationModal from "@/components/cards/user/notification/NotificationModal";
import { toast } from "react-hot-toast";

import io from "socket.io-client";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface User {
  _id: string;
  profilePic:string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
}
interface ITopBarProps {
  user?: User;
}
const Topbar: React.FC<ITopBarProps> = ({ user }) => {
  const router = useRouter();
  const socket = useRef(null);
  // const [user, setUser] = useState<User | null>(null);
  // const [userToken,setUserToken] = useState('');
  const [searchCard, setSearchCard] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState<any>([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState<any>(false);
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const userToken = localStorage.getItem("userToken");
  //       if (userToken) {
  //         const result = await axiosInstance.get("/get-notifications", {
  //           headers: {
  //             Authorization: userToken,
  //           },
  //         });
  //         if (result) {
  //           // console.log('notifications in clientside',result.data.notifications);
  //           setNotifications(result.data.notifications);
  //         }
  //       }
  //     } catch (err) {
  //       console.log("Error occured in fetchNotifications in client side", err);
  //     }
  //   };
  //   fetchNotifications();
  // }, []);
  const profilePage = () => {
    try {
      setLoading(true);
      router.push("/profile");
    } catch (err) {
      console.error("Error occured in client side profile view", err);
    }
  };
  const addAccount = () => {
    try {
      setLoading(true);
      router.push("/sign-in");
    } catch (err) {
      console.error("Error occured in client add account", err);
    }
  };

  const handleSearch = async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    if (searchName.length < 1) {
      toast.error("Please enter a username to search!");
      return;
    }

    try {
      const result = await axiosInstance.post("/search-name", {
        searchName,
      });
      if (result) {
        setUsers(result.data.users);
      }
      setSearchCard(true);
    } catch (err) {
      console.log("Error occured in searching users in client side", err);
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:9000");
    if (user) {
      socket.current.emit("addUser", user._id);
    }
    socket.current.on("receiveNotification", (notification) => {
      const formattedDate = dayjs(notification.createdAt).format(
        "dddd, MMMM D, YYYY - h:mm A"
      );
      console.log("New notification:", notification);
      sonnerToast.info(notification.message, {
        description: formattedDate,
      });
      setTrigger((prev) => !prev);
    });
    socket.current.on("receiveNotificationLike", (notification) => {
      const formattedDate = dayjs(notification.createdAt).format(
        "dddd, MMMM D, YYYY - h:mm A"
      );
      console.log("New notification:", notification);
      sonnerToast.info(notification.message, {
        description: formattedDate,
      });
      setTrigger((prev) => !prev);
    });
    socket.current.on("followNotify", (notification) => {
      const formattedDate = dayjs(notification.createdAt).format(
        "dddd, MMMM D, YYYY - h:mm A"
      );
      console.log("New notification:", notification);
      sonnerToast.info(notification.message, {
        description: formattedDate,
      });
      setTrigger((prev) => !prev);
    });
    setUpdate((prev) => !prev);
    return () => {
      socket.current.disconnect();
    };
  }, [user]);
  return (
    <>
      <SonnerToaster
        style={{ backgroundColor: "red" }}
        richColors
        expand={true}
        position="bottom-right"
        closeButton
      />
      <Toaster />
      {loading ? <Spinner /> : null}
      <div className="bg-gradient-to-r from-sidebarBlack to-fuchsia-900/10 h-16  flex justify-end items-center gap-8">
        <div className="gap-4 flex">
          <div className="w-[450px] ">
            <input
              onChange={(e) => setSearchName(e.target.value)}
              value={searchName}
              placeholder="search..."
              className="rounded-full w-full border-0  font-sans bg-midBlack"
              type="text"
            />
          </div>

          <div
            className="bg-midBlack px-2.5 py-2 rounded-full cursor-pointer"
            onClick={handleSearch}
          >
            <BsSearch style={{ fontSize: "20px", color: "fuchsia" }} />
          </div>
        </div>
        {searchCard ? (
          <div className="flex justify-center">
            <UserSearchCard setSearchCard={setSearchCard} users={users} />
          </div>
        ) : (
          ""
        )}
        {/* 
        <div className="text-sm flex cursor-pointer">
          <span className="mr-2 ">
            <IoNotificationsCircleSharp
              style={{ fontSize: "27px", color: "#b438ba" }}
            />
          </span>
          <span className="mt-1 font-sans">Notifications<NotificationModal/></span>
        </div> */}
        <NotificationModal trigger={trigger} />

        <div className="md:mr-20 text-sm flex">
          <span className="mr-2">
            <IoIosPeople style={{ fontSize: "27px", color: "#b438ba" }} />
          </span>
          <span className="mt-1 font-sans">Peoples</span>
        </div>

        <div className="bg-gradient-to-r from-fuchsia-900/5 to-purple-900/20 h-16 items-center justify-center md:w-[300px]  cursor-pointer ">
          {userToken ? (
            <div className="flex flex-col items-center mt-2 ">
              <div className="  md:ml-0 justify-center " onClick={profilePage}>
                <div className="flex">
                  <span className=" ml-2 md:ml-0 mr-4">
                    {user && user.profilePic ? (
                      <Avatar alt="Remy Sharp" src={user.profilePic} />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                      />
                    )}
                  </span>

                  <span className="font-sans md:text-base text-[10px] hidden md:block font-semibold">
                    {user?.username}
                    <div className="text-[10px] font-thin hidden md:block mt-1 text-center">
                      {user?.fullname}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-3 ">
              <div className="flex md:ml-0 " onClick={addAccount}>
                <span className=" ml-2 md:ml-0 mr-2 md:mt-1 mt-2">
                  <IoMdPerson style={{ fontSize: "20px", color: "white" }} />
                </span>
                <span className="font-sans md:text-base text-[10px] hidden md:block ">
                  sign-in / sign-up
                </span>
              </div>
              <div className="text-[10px] text-center font-mono hidden md:block mt-1">
                Join Us and Start Your Journey
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;

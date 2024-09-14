"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import axiosInstance from "@/configs/axiosInstance";
import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
const Avatar = dynamic(() => import("@mui/material/Avatar"));
interface NotificationModalProps {
    trigger:React.Dispatch<SetStateAction<boolean>>
}
const NotificationModal: React.FC<NotificationModalProps> = ({ trigger }) => {
  // console.log("notifications in notifications modal ", notifications);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [notifications, setNotifications] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (userToken) {
          const result = await axiosInstance.get("/get-notifications", {
            headers: {
              Authorization: userToken,
            },
          });
          if (result) {
            // console.log('notifications in clientside',result.data.notifications);
            setNotifications(result.data.notifications);
          }
        }
      } catch (err) {
        console.log("Error occured in fetchNotifications in client side", err);
      }
    };
    fetchNotifications();
  }, [update, trigger]);
  const handleOpen = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("sign in required");
      return;
    }
    onOpen();
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.patch(
        "/mark-as-read",
        { notificationId },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      console.log("Error occured in handle mark as read in client side ", err);
    }
  };

  const handleClear = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.put(
        "/clearAllNotifications",
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        alert(result.data.message);
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      console.error(
        "Error occured in handle clear notifications in client side",
        err
      );
    }
  };

  return (
    <>
      <Toaster />
      <div className="text-sm flex cursor-pointer" onClick={handleOpen}>
        <span className="mr-2 ">
          <IoNotificationsCircleSharp
            style={{ fontSize: "27px", color: "#b438ba" }}
          />
        </span>
        <span className="mt-1 font-sans">Notifications</span>
      </div>

      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        className="bg-midBlack"
        backdrop="opaque"
        isOpen={isOpen}
        size="md"
        onOpenChange={onOpenChange}
        placement="top"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="h-96">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Notifications
                {notifications.length >= 1 && (
                  <div className="flex justify-end mr-[-6px]">
                    <Button
                      onClick={handleClear}
                      size="sm"
                      radius="full"
                      color="primary"
                      variant="flat"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="overflow-y-auto scrollbar-hide">
                {notifications.length >= 1 ? (
                  <>
                    {notifications.map((notification, index) => (
                      <>
                        <div key={index} className="flex gap-2 items-center">
                          <span>
                            {notification.sender.profilePic ? (
                              <Avatar
                                style={{ height: "25px", width: "25px" }}
                                alt="Remy Sharp"
                                src={notification.sender.profilePic}
                              />
                            ) : (
                              <Avatar
                                style={{ height: "25px", width: "25px" }}
                                alt="Remy Sharp"
                                src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg"
                              />
                            )}
                          </span>
                          <span className="text-[15px]">
                            {notification.message}
                          </span>
                          <div className="flex ml-auto">
                            {" "}
                            {notification.post && (
                              <div className="bg-white w-10 h-10">
                                <img
                                  className="w-full h-full"
                                  src={notification.post?.image.url}
                                  alt="img"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end mt-[-5px] cursor-pointer ">
                          {" "}
                          <span
                            className=" text-blue-500 text-[13px]"
                            onClick={() => handleMarkAsRead(notification._id)}
                          >
                            Mark as read
                          </span>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <div className="flex gap-2 items-center justify-center mb-2">
                    <h1 className="text-white/60">No notifications</h1>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationModal;

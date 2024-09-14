"use client";

import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import AddUsersCommunity from "./AddUsersCommunity";
import "flowbite";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axiosInstance from "@/configs/axiosInstance";
import { toast } from "react-hot-toast";
import { removeUserFromCommunity } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  isPremium: boolean;
  // Add other properties as needed
}
interface IMessage {
  _id: string;
  chat: ICommunity["_id"];
  sender: IUser["_id"];
  message: string;
  status: "seen" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}
interface ICommunity {
  _id: string;
  name: string;
  participants: IUser[];
  admin: IUser;
  messages: IMessage[];
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}
interface ICommunityProps {
  // triggerComm: boolean;
  currentUserId: string;
  community: ICommunity;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setTriggerComm: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditCommunity: React.FC<ICommunityProps> = ({
  currentUserId,
  community,
  setModalOpen,
}) => {
  const [searchCard, setSearchCard] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [noUsers, setNoUsers] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [addUserModal, setAddUserModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxCommunity: ICommunity | null = useSelector(
    (state: RootState) => state.community
  );

  useEffect(() => {
    if (reduxCommunity) {
      setCommunityName(reduxCommunity.name);
    }
  }, [reduxCommunity, addUserModal]);

  const handleSubmit = async () => {
    try {
      if (communityName.length < 1) {
        toast.error("Please enter a name to change ");
        return;
      } else if (communityName.length <= 5) {
        toast.error("Please enter a name minimun 5 characters ");
        return;
      }
      const userToken = localStorage.getItem("userToken");

      const communityId = community._id;
      const response = await axiosInstance.put(
        "/edit-community-name",
        {
          communityId,
          communityName,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (err) {}
  };
  const handleRemoveUser = async (memberName: string, memberId: string) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const communityId = community._id;
      const result = await axiosInstance.post(
        "/remove-user-from-community",
        {
          communityId,
          memberId,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (result) {
        dispatch(removeUserFromCommunity(memberId));
        toast.success(`${result.data.message} ${memberName}`);
      }
    } catch (err) {}
  };

  const handleExit = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const communityId = community._id;
      const result = await axiosInstance.post(
        "/exit-community",
        {
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
        setTimeout(() => {
          window.location.href='/community'
        }, 1000);
        
      }
    } catch (err) {}
  };

  return (
    <div className="w-[500px] relative ">
      <div className="fixed top-0 left-0 w-full h-full bg-black/25 bg-opacity-50 backdrop-blur-sm z-40"></div>

      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="  flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <section className="flex justify-center">
          <div className="bg-sidebarBlack w-full h-[600px] flex flex-col items-center  rounded-2xl ">
            <Link href="#">
              {" "}
              <div
                className="ml-[700px] mt-4 mr-10"
                onClick={() => setModalOpen(false)}
              >
                <IoMdClose style={{ fontSize: "30px" }} />
              </div>
            </Link>
            <div className="flex justify-center items-center w-[500px] bg-gradient-to-r from-purple-900/15 to-fuchsia-600/15 h-8 rounded-3xl">
              <span className="font-extrabold italic">Community Details</span>
            </div>

            <div className="flex mt-16 gap-4">
              <input
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Edit Name"
                className="bg-lightBlack w-[500px] h-8 rounded-full p-3 text-[12px]"
                type="text"
              />

              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-fuchsia-950 font-sans italic px-3 rounded-lg py-1"
              >
                Submit
              </button>
            </div>

            <div className="mt-8 bg-black h-60 w-[80%] rounded-xl overflow-y-scroll scrollbar-hide">
              <div className="mt-5">
                {reduxCommunity.participants?.map((member, index) =>
                  currentUserId === member._id ? (
                    <div key={index} className="flex justify-between mt-4 ">
                      <div className="flex gap-3">
                        <span className=" ml-4 font-semibold italic bg-fuchsia-950 rounded-full px-2 text-[14px]">
                          {index + 1}: {member.username}
                        </span>
                        <span className="bg-white/5 px-2 rounded-full italic text-green-400">
                          You
                        </span>
                      </div>
                      <button
                        onClick={handleExit}
                        className="text-[14px] mr-3 text-red-700"
                      >
                        Exit
                      </button>
                    </div>
                  ) : (
                    <div key={index} className="flex justify-between mt-4 ">
                      <span className=" ml-4 font-semibold italic bg-fuchsia-950 rounded-full px-2 text-[14px]">
                        {index + 1}: {member.username}{" "}
                      </span>
                      <button
                        onClick={() =>
                          handleRemoveUser(member.username, member._id)
                        }
                        className="text-[14px] mr-3 text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
            {addUserModal && (
              <AddUsersCommunity
                setAddUserModal={setAddUserModal}
                communityId={community._id}
              />
            )}

            <div
              onClick={() => setAddUserModal(true)}
              className="flex justify-center mt-3"
            >
              <button className="bg-fuchsia-950 font-sans italic px-3 rounded-lg py-1">
                Add User +
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditCommunity;

"use client";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { useRouter } from "next/navigation";
import AlertDialog from "@/utils/paymentConfirm";
import PricingModal from "./Pricingcard";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

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
  isPremium:boolean;
}

interface Ipost {
  _id: string;
  caption: string;
  postId: string;
  image: {
    url: string;
  };

  comments: [
    {
      user: IUser;
      comment: string;
    }
  ];
  user: IUser;

  likes: string[];
}
interface User {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  isPremium:boolean;
  followers: [
    {
      user: IUser;
    }
  ];
  following: [
    {
      user: IUser;
    }
  ];

  posts: Ipost[];
  // Add other properties as needed
}
interface UserProps {
  friend: User | null;
  user: User | null;
}
const FriendProfileCard: React.FC<UserProps> = ({ friend, user }) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [follow, setFollow] = useState(false);
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    if (friend?.followers && user) {
      const following = friend.followers.some(
        (following) => following === user?._id
      );
      const follower = user.followers.some(
        (follower) => follower === friend._id
      );

      if (following && follower) {
        setFollow(true);
      } else if (!following && follower) {
        setAccept(true);
      }
    }
  }, [user]);

  const handleFollow = async () => {
    try {
      setFollow(true);
      const userToken = localStorage.getItem("userToken");
      const username = friend?.username;
      const result = await axios.post(
        "http://localhost:5000/follow",
        { username },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
      }
    } catch (err) {
      console.log("Error occured in handlefollow in client side", err);
    }
  };



  const handleUnFollow = async () => {
    try {
      setFollow(false);
      const userToken = localStorage.getItem("userToken");
      const username = friend?.username;
      const result = await axios.post(
        "http://localhost:5000/unFollow",
        { username },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
      }
    } catch (err) {
      console.log("Error occured in handlefollow in client side", err);
    }
  };

  const handleAccept=async ()=>{
    try {
      setFollow(true);
      const userToken = localStorage.getItem("userToken");
      const username = friend?.username;
      const result = await axios.post(
        "http://localhost:5000/follow",
        { username },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
      }
    } catch (err) {
      console.log("Error occured in handlefollow in client side", err);
    }
  }

  return (
    <>
      <Toaster />
      <div className="bg-gradient-to-b from-fuchsia-800/20 to-fuchsia-950/0 md:h-80 h-44  flex md:mr-10 mr-3 md:mt-7 mt-4 rounded-xl  ">
        <div className="h-full">
          <div className="flex justify-center md:mt-14 mt-6 md:ml-14 ml-6">
            <div className="relative w-28 h-28">
              <div className="md:w-28 md:h-28 w-20 h-20 bg-white rounded-full overflow-hidden">
                {profilePic ? (
                  <img
                    src={`http://localhost:5000/uploads/${profilePic}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>No Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:ml-20 md:mt-14 mt-1 font-sm ">
          <div className="flex md:gap-7 ">
            {
              friend?.isPremium?(
            <div className="flex gap-2">
                  <span className="mt-0.5">
                  <MdVerified style={{color:'#4d6afa',fontSize:'20px'}}/>
                </span>
                  <span className=" md:text-xl font-bold">{friend?.username}</span>
            </div>
              ):(<span className=" md:text-xl font-bold">{friend?.username}</span>)
            }
            

            <span className=" text-sm  h-5 ml-10">
              {follow ? (
                <button
                  className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-900 px-8 py-3 rounded-full hover:bg-fuchsia-800 transition ease-in"
                  onClick={handleUnFollow}
                >
                  Unfollow
                </button>
              ) : accept ? (
                <button className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-900 px-10 py-3 rounded-full hover:bg-fuchsia-800 transition ease-in"
                onClick={handleAccept}
                >
                  
                  Accept
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-900 px-10 py-3 rounded-full hover:bg-fuchsia-800 transition ease-in"
                  onClick={handleFollow}
                >
                  Follow
                </button>
              )}
            </span>
            <span className="text-sm  h-5">
              <button className=" border-fuchsia-800 px-7 py-3 rounded-full hover:border-fuchsia-400 border-2 transition ease-in">
                Message
              </button>
            </span>
          </div>

          <div className="flex gap-7 mt-10">
            <span className=" text-sm  flex">
              {" "}
              <GoDotFill className="mr-2 mt-0.5" />
              {friend?.posts.length} Posts
            </span>
            <span className=" text-sm  flex">
              <GoDotFill className="mr-2 mt-0.5" />
              {friend?.followers.length} followers
            </span>
            <span className=" text-sm  flex">
              <GoDotFill className="mr-2 mt-0.5" />
              {friend?.following.length} following
            </span>
          </div>
          <div className="flex gap-7 mt-5">
            <span className=" text-sm font-thin text-white/60 ">
              {friend?.fullname}
            </span>
          </div>
          <div className="flex gap-7 mt-5">
            <span className=" text-sm font-bold italic">{friend?.bio}</span>
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4  bg-gray-100 border-0 rounded md:my-10 dark:bg-lightBlack" />
    </>
  );
};

export default FriendProfileCard;

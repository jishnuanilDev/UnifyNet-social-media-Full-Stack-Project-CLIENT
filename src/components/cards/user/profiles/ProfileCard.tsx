"use client";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import AlertDialog from "@/utils/paymentConfirm";
import PricingModal from "../payment/Pricingcard";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import axiosInstance from "@/configs/axiosInstance";
import { useBreakpoint } from "@/hooks/TailwindResponsive";
import KycForm from "@/components/forms/user/Kycform";
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
  phone:number;
  profilePic:string;
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
const ProfileCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [cardOpen, setCardOpen] = React.useState(false);
  const [trigger,setTrigger] = useState(true);
  const [kycOpen,setKycOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          router.replace("/");
        }

        const result = await axiosInstance.get("/profile", {
          headers: {
            Authorization: userToken,
          },
        });

        if (result) {
          console.log("profile fetched:", result.data.user);
          setUser(result.data.user);
          setProfileImg(result.data.user.profilePic);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchProfile();
  }, [trigger,router]);


  const cancelPremium = async ()=>{
    try{
const userToken = localStorage.getItem('userToken');
const result =  await axiosInstance.patch('/cancel-premium',{},{
  headers:{
    Authorization:userToken
  }
})
if(result){
toast.success('Premium cancelled');
setUser(result.data.user);
setTrigger(!true)
}
    }catch(err){
      console.log('Error occured in client side for cancel premium',err);
    }
  }
  return (
    <>
          <Toaster />
      <div className="bg-gradient-to-b from-fuchsia-800/20 to-fuchsia-950/0 md:h-80 h-44  flex md:mr-10 mr-3 md:mt-7 mt-4 rounded-xl  ">
        <div className="h-full">
          <div className="flex justify-center md:mt-14 mt-6 md:ml-14 ml-2">
            <div className="relative w-28 h-28">
              <div className="md:w-28 md:h-28 w-16 h-16  bg-white rounded-full overflow-hidden">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
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
        <div className="md:ml-20 md:mt-14 mt-2 font-sm ml-[-40px]">
          <div className="flex md:gap-7 md:flex-row flex-col">
            {user?.isPremium ? (
              <div className="flex gap-2">
                <span className="mt-0.5">
                  <MdVerified style={{color:'#4d6afa',fontSize:'20px'}}/>
                </span>
                <span className=" md:text-xl  font-bold">{user?.username}</span>
              </div>
            ) : (
              <span className=" md:text-xl text-[14px] font-extrabold">{user?.username}</span>
            )}

      <div className="flex gap-2 mt-3 md:mt-0 ">
              <span
                className=" md:text-sm text-[12px] h-5 md:ml-10 "
                onClick={() => router.push("/profile/edit-profile")}
              >
                <button className="bg-purple-900 md:px-4 px-2 md:py-1 rounded-full">
                  Edit Profile
                </button>
              </span>
              <span className="md:text-sm text-[12px] h-5">
                <button
                  className="bg-purple-900 md:px-4 px-2 md:py-1 rounded-full"
                  onClick={() => router.push("/profile/change-password")}
                >
                  Change Password
                </button>
              </span>
      </div>

            <span className="md:text-sm text-[12px] h-5 md:mt-0 mt-4">
              {user?.isPremium ? (
                <button className="bg-gradient-to-r from-yellow-300 to-yellow-600 md:px-4 px-2 md:py-1 rounded-full font-semibold" onClick={cancelPremium}>
                  <div className="flex gap-1">
                    <span className="mt-0.5">
                      {" "}
                      <MdVerified />
                    </span>
                    <span> Cancel premium</span>
                  </div>
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-yellow-300 to-yellow-600 md:px-4 px-2 md:py-1 rounded-full font-semibold"
                  onClick={() => setOpen(true)}
                >
                  <div className="flex gap-1">
                    <span className="mt-0.5">
                      {" "}
                      <MdVerified />
                    </span>
                    <span> Activate premium</span>
                  </div>
                </button>
              )}
            </span>
      
          </div>

          <div className="flex md:gap-7 gap-2 md:mt-10 mt-5 md:ml-0 ml-[-30px]">
            <span className=" md:text-sm text-[12px] flex">
              {" "}
              <GoDotFill className="mr-2 mt-0.5" />
              {user?.posts.length} Posts
            </span>
            <span className=" md:text-sm text-[12px]  flex">
              <GoDotFill className="mr-2 mt-0.5" />
              {user?.followers.length} followers
            </span>
            <span className=" md:text-sm text-[12px]  flex">
              <GoDotFill className="mr-2 mt-0.5" />
              {user?.following.length} following
            </span>
          </div>
          <div className="flex justify-center">
            {" "}
            
            <AlertDialog
              setKycOpen={setKycOpen}
              open={open}
              setOpen={setOpen}
            />
            {
              kycOpen &&  <KycForm 
              fullname={user?.fullname}
              phone={user?.phone}
              email={user?.email}
              cardOpen={cardOpen}
              setKycOpen={setKycOpen}/>
            }
           
          </div>
          <div className="flex gap-7 md:mt-5 mt-2 md:ml-0 ml-[-20px]">
            <span className=" md:text-sm  text-[10px] font-thin text-white/60 ">
              {user?.fullname}
            </span>
          </div>
          <div className="flex gap-7 md:mt-5 mt-2 ml-[-70px]">
            <span className=" md:text-sm text-[10px] font-bold italic">{user?.bio}</span>
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4 mt-10 md:mt-0 bg-gray-100 border-0 rounded md:my-10 dark:bg-lightBlack" />
    </>
  );
};

export default ProfileCard;

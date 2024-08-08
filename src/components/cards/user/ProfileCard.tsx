"use client";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { useRouter } from "next/navigation";
import AlertDialog from "@/utils/paymentConfirm";
import PricingModal from "./Pricingcard";

interface User {
  id: string;
  fullName: string;
  username: string;
  bio: string;
  email: string;
  phone: number;
  isPremium: boolean;
  // Add other properties as needed
}
const ProfileCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [cardOpen, setCardOpen] = React.useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          router.replace("/");
        }

        const result = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: userToken,
          },
        });

        if (result) {
          console.log("profile fetched:", result.data.user);
          setUser(result.data.user);
          setProfilePic(result.data.user.profilePic);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchProfile();
  }, []);
  return (
    <>
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
            {user?.isPremium ? (
              <div className="flex gap-2">
                <span className="mt-0.5">
                  <MdVerified style={{color:'#4d6afa',fontSize:'20px'}}/>
                </span>
                <span className=" md:text-xl font-bold">{user?.username}</span>
              </div>
            ) : (
              <span className=" md:text-xl font-bold">{user?.username}</span>
            )}

            <span
              className=" text-sm  h-5 ml-10"
              onClick={() => router.push("/profile/edit-profile")}
            >
              <button className="bg-purple-900 px-4 py-1 rounded-full">
                Edit Profile
              </button>
            </span>
            <span className="text-sm  h-5">
              <button
                className="bg-purple-900 px-4 py-1 rounded-full"
                onClick={() => router.push("/profile/change-password")}
              >
                Change Password
              </button>
            </span>

            <span className="text-sm  h-5">
              {user?.isPremium ? (
                <button className="bg-gradient-to-r from-yellow-300 to-yellow-600 px-4 py-1 rounded-full font-semibold">
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
                  className="bg-gradient-to-r from-yellow-300 to-yellow-600 px-4 py-1 rounded-full font-semibold"
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
            <PricingModal
              username={user?.username}
              phone={user?.phone}
              email={user?.email}
              cardOpen={cardOpen}
              setCardOpen={setCardOpen}
            />
          </div>

          <div className="flex gap-7 mt-10">
            <span className=" text-sm  flex">
              {" "}
              <GoDotFill className="mr-2 mt-0.5" />
              15 Posts
            </span>
            <span className=" text-sm  flex">
              <GoDotFill className="mr-2 mt-0.5" />
              386 followers
            </span>
            <span className=" text-sm  flex">
              <GoDotFill className="mr-2 mt-0.5" />
              412 following
            </span>
          </div>
          <div className="flex justify-center">
            {" "}
            <AlertDialog
              setCardOpen={setCardOpen}
              open={open}
              setOpen={setOpen}
            />
          </div>
          <div className="flex gap-7 mt-5">
            <span className=" text-sm font-thin text-white/60 ">
              {user?.fullName}
            </span>
          </div>
          <div className="flex gap-7 mt-5">
            <span className=" text-sm font-bold italic">{user?.bio}</span>
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4  bg-gray-100 border-0 rounded md:my-10 dark:bg-lightBlack" />
    </>
  );
};

export default ProfileCard;

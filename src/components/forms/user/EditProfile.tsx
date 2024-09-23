"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import axiosInstance from "@/configs/axiosInstance";
import Spinner from "@/styled-components/loader/Spinner";


const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

// interface User {
//     id: string;
//     fullName: string;
//     username: string;
//     bio: string;
//     email: string;
//     // Add other properties as needed
//   }
export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [user,setUser] = useState<User | null >(null);

  const router = useRouter();

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
     
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    try {
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

            setUsername(result.data.user.username);
            setFullname(result.data.user.fullname);
            setBio(result.data.user.bio);
            setProfilePic(result.data.user.profilePic);
          }
        } catch (err) {
          console.error("Error fetching user profile", err);
        }
      };
      fetchProfile();
    } catch (err) {
      console.error("Error fetching user profile in profile edit", err);
    }
  }, [router]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        alert("File is too large. Maximum size is 5MB.");
        return;
      }

      if (!validImageTypes.includes(selectedFile.type)) {
        alert("Invalid file type. Please upload a JPEG, PNG, or GIF.");
        return;
      }

      try {
        const base64Image = await convertToBase64(selectedFile);
        setImage(base64Image);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };
  const handleDeleteImg = ()=>{
    setImage('');
  }

  const handleCancel = ()=>{
setLoading(true);
router.replace("/profile")
  }
  const handleSubmit = async () => {
    try {
      setLoading(true);


      const formData = new FormData();


      const userToken = localStorage.getItem("userToken");
      const res = await axiosInstance
        .put(
          "/edit-profile",
          {
            username,
            fullname,
            bio,
            image,
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setTimeout(() => {
            router.replace("/profile");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.error("Error occured in post edited profile data in client", err);
    }
  };
  return (
    <>
      <Toaster />
      {loading? <Spinner/>:null}
      <div className="flex justify-center md:items-center h-screen">
        <main className="bg-sidebarBlack md:w-[800px] w-80  md:mt-10 rounded-xl">
          <header className="flex justify-center md:mt-14 mt-4">
            <div className="flex justify-center md:mt-14">
              <div className="relative w-28 h-28">
                <div className="w-28 h-28 bg-white rounded-full overflow-hidden">
                  {profilePic || image ? (
                    <img
                      src={profilePic?profilePic:image?image:''}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-0"
                />
              </div>
            </div>
          </header>
          <div className="mt-5 flex justify-center gap-8 mb-8">
            <span className="font-semibold cursor-pointer text-sm hover:bg-red-600 bg-red-800 px-3 rounded-lg transition ease-in-out" onClick={handleDeleteImg}>
              Delete
            </span>
            {/* <span onChange={handleFileChange}  className="font-semibold cursor-pointer text-sm hover:bg-purple-600 bg-purple-800 px-3 rounded-lg transition ease-in-out">
              Change
            </span> */}
          </div>

          <div>
            <div className="flex justify-center md:-ml-[430px] -ml-60 mb-3">
              {" "}
              <label className=" text-sm text-white/70">Username</label>
            </div>
            <div className="flex justify-center mb-5">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-[500px] h-10 rounded-full border-0 p-3 bg-black text-[13px] placeholder-white/30  "
                id="username"
                placeholder="eg: john_doe123"
                value={username}
              />
            </div>

            <div className="flex justify-center md:-ml-[440px] -ml-60 mb-3">
              {" "}
              <label className=" text-sm text-white/70">Fullname</label>
            </div>
            <div className="flex justify-center mb-5">
              <input
                onChange={(e) => setFullname(e.target.value)}
                type="text"
                className="w-[500px] border-0 h-10 rounded-full p-3 bg-black text-[13px] placeholder-white/30"
                id="username"
                placeholder="eg: John Doe"
                value={fullname}
              />
            </div>

            <div className="flex justify-center md:-ml-[470px] -ml-72 mb-3">
              <label className=" text-sm text-white/70">Bio</label>
            </div>
            <div className="flex justify-center mb-5">
              <textarea
                placeholder="eg: Artist"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                className="w-[500px] border-none h-28 rounded-xl p-3 bg-black text-[13px] resize-none placeholder-white/30"
                name=""
                id=""
              ></textarea>
            </div>
          </div>
          <div className="mt-12 flex justify-center gap-10 mb-10">
            <button
              onClick={handleCancel}
              className="bg-gradient-to-r from-red-600/25 to-red-600 px-4 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-700 to-purple-900 px-4 rounded-full"
            >
              Submit
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

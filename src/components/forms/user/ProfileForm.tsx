"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import axiosInstance from "@/configs/axiosInstance";
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false });;
import Spinner from "@/styled-components/loader/Spinner";

const ProfileForm: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState<any | null>(null);
  const [image,setImage] = useState('');
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    error?: string;
    password?: string;
  }>({});

  
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFullname(user.fullname);
      setEmail(user.email);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("token verifying");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
     
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        toast.error('File is too large. Maximum size is 5MB.')

        return;
      }

      if (!validImageTypes.includes(selectedFile.type)) {
        toast.error('Invalid file type. Please upload a JPEG, PNG, or GIF.')
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
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!fullname || !username || !phone || !bio || !gender || !email ) newErrors.error = "Please fill out the fields";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = () => {
    if (validate()) {
      setErrors({});
    } else {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
setLoading(true);
    try {
      e.preventDefault();
      if (!validate()) return;

      const res = await axiosInstance.post("/create-profile", {
        email,
        username,
        phone,
        bio,
        gender,
        image
      }).then((res)=>{
        console.log("client create-profile res:", res.data);
        localStorage.setItem("userToken", res.data.userToken);
        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/");
        },1000);
       
      }).catch((err)=>{
        toast.error(err.response.data.message);
        setLoading(false);
      })
    } catch (err) {
      console.error("Error occured during client create-profile", err);
    }
  };

  return (
    <div>
        <Toaster />
        {loading? <Spinner/>:null}
      <section className=" flex items-center justify-center h-screen">
        <div className="bg-customBlack md:w-[700px] w-[330px] h-[600px] flex justify-center rounded-md mt-[-100px] md:mt-0 ">
          <div>
            <div className="text-purple-700 font-extrabold mt-8 italic mb-5 flex justify-center">
              <h2>Create Your Profile</h2>
            </div>

            <header className="flex justify-center mt-4 mb-8">
            <div className="flex justify-center ">
              <div className="relative w-28 h-28">
                <div className="w-28 h-28 bg-white rounded-full overflow-hidden">
                  {image ? (
                    <img
                      src={image?image:''}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <img  src="https://i.pinimg.com/originals/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg" alt="" />
                     
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

            <form action="" onSubmit={handleSubmit}>
            {errors.error && <p className="text-center mb-2" style={{ color: "red" }}>{errors.error}</p>}
              <div className="mb-4 flex justify-center ">
                <input
                 onClick={handleChange}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  className=" border-0 md:w-[500px] w-72  h-8 rounded-full p-3 bg-midBlack text-[13px] placeholder:text-white/30"
                  id="username"
                  placeholder="Fullname"
                  value={fullname}
                />
              </div>
              <div className="mb-4 flex justify-center">
                <input
                 onClick={handleChange}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className=" border-0 md:w-[500px] w-72  h-8 rounded-full p-3 bg-midBlack text-[13px] placeholder:text-white/30"
                  id="username"
                  placeholder="Username"
                  value={username}
                />
              </div>
              <div className="mb-4 flex justify-center">
                <input
                 onClick={handleChange}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  className=" border-0 md:w-[500px]  w-72  h-8 rounded-full p-3 bg-midBlack text-[13px] placeholder:text-white/30"
                  id="username"
                  placeholder="Phone"
                  value={phone}
                />
              </div>
              <div className="mb-4 flex justify-center">
                <input
                 onClick={handleChange}
                  onChange={(e) => setBio(e.target.value)}
                  type="text"
                  className="border-0 md:w-[500px] w-72  h-20 rounded-lg p-3 bg-midBlack text-[13px] text-gray-300 placeholder:text-white/30"
                  id="username"
                  placeholder="Bio"
                  value={bio}
                />
              </div>
              <div className="flex justify-center">
                <input
                 onClick={handleChange}
                  onChange={(e) => setGender(e.target.value)}
                  type="text"
                  className="border-0 md:w-[500px] w-72  h-8 rounded-full p-3 bg-midBlack text-[13px] placeholder:text-white/30"
                  id="username"
                  placeholder="Gender"
                  value={gender}
                />
              </div>
              <p className="md:text-[11px] text-[10px] font-light font-sans text-white/50">
                This wont be part of your public profile
              </p>

            
              <div className="flex justify-center">
             
                <button className="bg-gradient-to-tr from-purple-600 to-purple-950 px-4 md:py-1 md:w-20 rounded-3xl  hover:scale-110 transition ease-in  duration-200 mt-8 md:mt-0">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileForm;

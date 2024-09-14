import React, { useState } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { headers } from "next/headers";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa6";
const Avatar = dynamic(() => import('@mui/material/Avatar'));
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface User {
    _id: string;
    fullname: string;
    username: string;
    phone: string;
    email: string;
  }

  interface IsearchStepProps{
    searchStep:boolean;
    setSearchStep:React.Dispatch<React.SetStateAction<boolean>>
    setPostStep:React.Dispatch<React.SetStateAction<number>>
  }
const UserSearchModal: React.FC<IsearchStepProps> = ({searchStep,setSearchStep,setPostStep}) => {
  const [report, setReport] = useState("");
  const [users, setUsers] = useState<User[]>([]);


  useEffect(()=>{
    try{
        const fetchUsers=async ()=>{
            const response = await axios.get(
                "http://localhost:5000/admin/getUsers"
              );
              if (response.data) {
                setUsers(response.data.users);
                console.log(response.data.users);
              }
        }
        fetchUsers();

    }catch(err){

    }
  },[])


  const  handleFalse = ()=>{
    setSearchStep(false);
    setPostStep(0);
  }
  const handleReport = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        toast.error("Sign in Required");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/report-post",
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response) {
        console.log("response in client report posted", response);
        toast.success(response.data.message);
        setTimeout(() => {}, 800);
      }
    } catch (err: any) {
      console.error("Error occured in during report post report client", err);
      toast.error(err.response.data.message);
    }
  };
if(searchStep){
    return (
        <div className="w-[500px] relative ">
          <Toaster />
          <div className="fixed top-0 left-0 w-full h-full bg-black/25 bg-opacity-50 z-40"></div>
    
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="  flex overflow-y-auto overflow-x-hidden fixed  left-0 z-50  md:inset-0 h-[calc(100%-1rem)] "
          >
            <section className="flex justify-center">
              <div className="bg-sidebarBlack w-[200px] h-[400px] mt-16 ml-10 flex flex-col items-center  rounded-mg ">
                <div className=" mt-4 ">
                  <div className="flex justify-center items-center w-[500px] bg-gradient-to-r from-purple-900/10 to-fuchsia-600/10 h-8 rounded-3xl">
                    <span className="font-extrabold italic">Search user</span>
                  </div>
                  <div
                  className="flex ml-4 cursor-pointer "
                  onClick={handleFalse}
                >
                  <IoMdClose style={{ fontSize: "30px" }} />
                </div>
                  <div className="flex mt-6 justify-center mb-4 gap-6">
                    <input
                      onChange={(e) => setReport(e.target.value)}
                      value={report}
                      placeholder="search user"
                      className="bg-black flex w-[400px] h-8 rounded-full p-3 text-[12px] "
                      type="text"
                    />
    
    <button className="bg-fuchsia-900/20 rounded-full px-2 text-[12px] ml-2 text-white/15">
                    <FaLocationArrow style={{ fontSize: "18px" }} />
                  </button>
                  </div>
                  <div className=" flex gap-10 ml-10 mt-10 justify-items-end ">
                        <div className="bg-white/85 w-8 h-8 rounded-full mr-7 gap-6">
                          <Avatar
                            alt="Remy Sharp"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                          />
                        </div>
                        {
                            users.map((user,index)=>(
                                <div key={index} className="text-[12px] font-semibold mr-auto ">
                                {user.username}
                                </div>
                            ))
                        }
                     
                   
                        {/* <div className="text-end ml-auto text-[12px]">Like</div> */}
                      </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
}
  
};

export default UserSearchModal;

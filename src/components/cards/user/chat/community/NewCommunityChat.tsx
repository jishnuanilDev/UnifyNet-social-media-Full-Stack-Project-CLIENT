import React from "react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import axiosInstance from "@/configs/axiosInstance";
import axios from "axios";
import { useEffect } from "react";
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
  isPremium: boolean;
  // Add other properties as needed
}
interface ISearchCardProps {
  currentUserId:string;
  setSearchCard: React.Dispatch<React.SetStateAction<boolean>>;

}
const NewCommunityAdd: React.FC<ISearchCardProps> = ({
  currentUserId,
  setSearchCard,
}) => {
    const[users,setUsers] = useState<IUser[]>([]);
    const [searchName, setSearchName] = useState("");
    const [noUsers,setNoUsers] = useState(false);
    const[communityName,setCommunityName] = useState('')
   
    const handleSearch = async () => {
        if(searchName.length<1){
          toast.error("Please enter a username to search!");
          return ;
        }
    
        try {
          const result = await axiosInstance.post("/search-name", {
            searchName,
          });
          if(result.data.users.length>=1){
            setUsers(result.data.users);
            setNoUsers(false);
          }else{
            setNoUsers(true);
          }
        } catch (err) {
          console.log("Error occured in searching users in client side", err);
        }
      };

      const  handleNewChat=async(participantId: string)=>{
        try{
            if(communityName.length<1){
                toast.error('Please enter your community name');
                return;
            }else if(communityName.length<5){
                toast.error('Please enter your community name with minimum 5 characters');
                return;
            }else if(currentUserId===participantId){
              toast.error("You can't add yourself");
              return;
            }
            const userToken = localStorage.getItem('userToken');
 await axiosInstance.post('/create-community',{
    participantId,
    communityName
},
    {
        headers:{
            Authorization:userToken
        }
    }
).then((res)=>{
    toast.success(res.data.message);
setTimeout(() => {
    setSearchCard(false);
}, 800);
    
}).catch((err)=>{
    toast.error(err.response.data.message);
})

        }catch(err){
            console.log("Error occured in creating new chat in client side", err);
        }
      }
  return (
    <div>
           <Toaster />
      <div
        id="crypto-modal"
        aria-hidden="true"
        className="ml-[76.5%] mt-12 overflow-y-auto overflow-x-hidden fixed  top-0 z-50 justify-center items-center w-[25%] md:inset-0 h-[calc(100%-1rem)] max-h-full "
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-sidebarBlack rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                Find users
              </h3>
              
              <button
                onClick={() => setSearchCard(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crypto-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            
            </div>
            <div className="flex justify-center w-[100%] mt-3 mr-2"><input value={communityName} onChange={(e)=>setCommunityName(e.target.value)} className='bg-black rounded-full w-[95%] border-none text-white' placeholder='Groupname...' type="text" name="" id="" /></div>
            <div className='flex justify-center mt-3 w-[95%] ml-2 gap-2'><input value={searchName} onChange={(e)=>setSearchName(e.target.value)} className='bg-black rounded-full w-full border-none text-white' placeholder='Add user...' type="text" name="" id="" />
            <div
            className="bg-black px-2.5 py-2 rounded-full cursor-pointer"
        onClick={handleSearch}
          >
            <BsSearch style={{ fontSize: "20px", color: "fuchsia" }} />
          </div>
          </div>
            <div className="p-4 md:p-5">
                
              {noUsers? (
                <h3 className="text-lg font-semibold text-white dark:text-white">
                  No users found
                </h3>
              ) : (
                users.map((user, index) => (
                  <Link key={index} href='#'onClick={()=>handleNewChat(user._id)}>
                    <li className="list-none">
                      <a
                        href="#"
                        className="flex items-center mb-3 p-3 text-base font-medium text-white/90 rounded-lg hover:bg-lightBlack group hover:shadow dark:bg-gray-600 dark:hover:bg-white dark:text-white"
                      >
                        {user.isPremium ? (
                          <div className="flex ">
                            <Avatar
                              alt="Remy Sharp"
                              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                            <span className="mt-0.5 ml-2">
                              <MdVerified
                                style={{ color: "#4d6afa", fontSize: "20px" }}
                              />
                            </span>
                            <span className="flex-1 ml-1 whitespace-nowrap">
                              {user.username}
                            </span>
                          </div>
                        ) : (
                          <div className="flex ">
                            <Avatar
                              alt="Remy Sharp"
                              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                              {user.username}
                            </span>
                          </div>
                        )}
                      </a>
                    </li>
                  </Link>
                ))
              )}
            
     
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCommunityAdd;

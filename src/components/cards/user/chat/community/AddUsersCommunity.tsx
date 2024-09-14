import React, { useState } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { BsHandIndex, BsSearch } from "react-icons/bs";
import axiosInstance from "@/configs/axiosInstance";
import { MdVerified } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { addUserToCommunity } from "@/redux/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import Link from "next/link";
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

interface IAddUserProps{
    communityId:string;
    setAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
 
}
const AddUsersCommunity:React.FC<IAddUserProps> = ({communityId,setAddUserModal})=> {
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [noUsers, setNoUsers] = useState(false);
  const reduxCommunity = useSelector((state:RootState)=>state.community);
  const dispatch = useDispatch();
  const handleSearch = async () => {
    if (searchName.length < 1) {
      toast.error("Please enter a username to search!");
      return;
    }

    try {
      const result = await axiosInstance.post("/search-name", {
        searchName,
      });
      if (result.data.users.length >= 1) {
        setUsers(result.data.users);
        setNoUsers(false);
      } else {
        setNoUsers(true);
      }
    } catch (err) {
      console.log("Error occured in searching users in client side", err);
    }
  };
  const addNewUser = async (participantId?: string,username?:string) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axiosInstance
        .post(
          "/add-user-to-community",
          {
            communityId,
            participantId,
          },
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setAddUserModal(false);
          const newUser = {
            _id: participantId,
            username: username,
          }
          dispatch(addUserToCommunity(newUser))
          
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.log("Error occured in creating new chat in client side", err);
    }
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
        <div >
          <Toaster />
          <div
            id="crypto-modal"
            aria-hidden="true"
            className="mx-[auto] mt-64 overflow-y-auto overflow-x-hidden fixed  top-0 z-50 justify-center items-center w-[25%] md:inset-0 h-[calc(100%-1rem)] max-h-full "
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-sidebarBlack rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-white dark:text-white">
                    Add users
                  </h3>
                  <button
                onClick={() => setAddUserModal(false)}
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
                {/* <div className="flex justify-center w-[100%] mt-3 mr-2"><input className='bg-black rounded-full w-[95%] border-none text-white' placeholder='Groupname...' type="text" name="" id="" /></div> */}
                <div className="flex justify-center mt-3 w-[95%] ml-2 gap-2">
                  <input
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="bg-black rounded-full w-full border-none text-white"
                    placeholder="Add user..."
                    type="text"
                    name=""
                    id=""
                  />
                  <div
                    className="bg-black px-2.5 py-2 rounded-full cursor-pointer"
                    onClick={handleSearch}
                  >
                    <BsSearch style={{ fontSize: "20px", color: "fuchsia" }} />
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  {noUsers ? (
                    <h3 className="text-lg font-semibold text-white dark:text-white">
                      No users found
                    </h3>
                  ) : (
                    users.map((user, index) => (
                      <Link key={index} href="#" onClick={() => addNewUser(user._id,user.username)}>
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
                                    style={{
                                      color: "#4d6afa",
                                      fontSize: "20px",
                                    }}
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
      </div>
    </div>
  );
}

export default AddUsersCommunity;

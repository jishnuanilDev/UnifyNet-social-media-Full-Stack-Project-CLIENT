import React from "react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
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
  setSearchCard: React.Dispatch<React.SetStateAction<boolean>>;
  users: IUser[];
}
const UserSearchCard: React.FC<ISearchCardProps> = ({
  setSearchCard,
  users,
}) => {
  return (
    <div>
      <div
        id="crypto-modal"
        aria-hidden="true"
        className="ml-80 mt-14 overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/20 "
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

            <div className="p-4 md:p-5">
              <p className="text-sm font-normal text-white dark:text-white mb-2">
                Connect with Others & Make your conversation
              </p>
              {users.length == 0 ? (
                <h3 className="text-lg font-semibold text-white dark:text-white">
                  No users found
                </h3>
              ) : (
                users.map((user, index) => (
                  <Link key={index} href={`/user-profile/${user.username}`}>
                    <li className="list-none">
                      <a
                        href="#"
                        className="flex items-center mb-3 p-3 text-base font-bold text-white rounded-lg bg-black hover:bg-lightBlack group hover:shadow dark:bg-gray-600 dark:hover:bg-white dark:text-white"
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
                            <span className="flex-1 ms-3 whitespace-nowrap">
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
              <ul className="my-4 space-y-3"></ul>
              <div>
                <Link
                  href="#"
                  className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    className="w-3 h-3 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Enhance your profile? Go to your profile & Activate Premium
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchCard;

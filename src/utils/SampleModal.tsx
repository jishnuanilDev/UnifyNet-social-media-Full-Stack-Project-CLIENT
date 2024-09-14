"use client";

import "@/styles/globals.css";
import React from "react";
import Link from "next/link";

import "flowbite";

const SampleModal: React.FC = () => {

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
              <Link href='#'>
                {" "}
                <div
                  className="ml-[700px] mt-4 mr-10"
                 
                >
                
                </div>
              </Link>
              <div className="flex justify-center items-center w-[500px] bg-gradient-to-r from-purple-900/15 to-fuchsia-600/15 h-8 rounded-3xl">
                <span className="font-extrabold italic">Create New Post</span>
              </div>
             
              <div>
        
                  <label className="flex justify-center items-center w-[500px] h-64 rounded-xl mt-20 cursor-pointer bg-lightBlack dark:hover:bg-fuchsia-950/50 dark:bg-gradient-to-r from-purple-900 to-gray-900 hover:bg-black dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-white dark:text-white/80">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-white/50 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                     
                    />
                  </label>
               

                <div className="flex mt-16 ">
                  <input
                    placeholder="Add caption"
                    className="bg-lightBlack w-[500px] h-8 rounded-full p-3 text-[12px]"
                    type="text"
                 
                 
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


export default SampleModal;

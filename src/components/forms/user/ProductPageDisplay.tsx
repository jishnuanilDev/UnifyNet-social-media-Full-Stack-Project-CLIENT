"use client";
import "@/styles/globals.css";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import axiosInstance from "@/configs/axiosInstance";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

export default function ProductPageDisplay() {
  const { isOpen,onOpen, onOpenChange } = useDisclosure();

//   const handleOpen = () => {
//     const userToken = localStorage.getItem("userToken");
//     if (!userToken) {
//       toast.error("Sign-in Required");
//       return;
//     }
//     onOpen();
//   };


  return (
    <>
  
      <Toaster />
      <Modal
        className="bg-midBlack "
        backdrop="opaque"
        isOpen={isOpen}
        size="3xl"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <section className="flex justify-center items-center ">
                  <div className="bg-midBlack w-[900px] h-[700px] mt-8 rounded-lg">
                    <div className="bg-lightBlack w-[500px] h-52 mt-4 mx-auto rounded-lg"></div>
                    <div className="ml-52 mt-4">
                      <h1>
                        Lorem ipsum is a filler text commonly used in the
                        publishing.
                      </h1>
                      <h2>30,000</h2>
                      <span>
                        Listed 23 hrs ago . <span>Kochi, KL</span>
                      </span>
                    </div>

                    <div className="flex gap-8 justify-center mt-6">
                      <div className="bg-lightBlack w-9 h-9 rounded-full"></div>
                      <div className="bg-lightBlack w-9 h-9 rounded-full"></div>
                      <div className="bg-lightBlack w-9 h-9 rounded-full"></div>
                    </div>

                    <div className="ml-52 mt-4">
                      <h1>Description</h1>
                    </div>
                    <div className="ml-52 mt-4 w-[500px]">
                      <h2>
                        Lorem ipsum is a filler text commonly used in the
                        publishing and graphic design industries to showcase the
                        visual effects of a document or a typeface without the
                        distraction of readable text. Its origins can be traced
                        back to a scrambled version of a passage from
                      </h2>
                    </div>

                    <div className="ml-52 mt-4">
                      <h1>Seller</h1>
                    </div>
                    <div className="ml-52 mt-4">
                      <span>username</span>
                    </div>
                    <div className="ml-52 mt-4">
                      <span>Kochi, KL,India</span>
                    </div>
                  </div>
                </section>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import EditProductForm from "@/components/forms/user/EditProductForm";
import axiosInstance from "@/configs/axiosInstance";
import Image from 'next/image';
import { BsCart2 } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function UserWishlistCard({ list ,setUpdate}) {
  const [remove, setRemove] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const productRemoveWishlist = async () => {
    try {
      const listId = list._id;
      const userToken = localStorage.getItem("userToken");
      const wishlistId = list.wishlistId;
      const result = await axiosInstance.patch(
        "/remove-from-wishlist",
        { listId,wishlistId},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result.data.success) {
        // toast.success('Removed from your Wishlist')
        setRemove(true);
        setUpdate(prev=>!prev)
      }
    } catch (err) {
      console.error("Error occured in handle sold client side", err);
    }
  };
  return (
<div>
      <div className="w-70 h-80 bg-white/5 rounded-xl  ">
        <div className="bg-black h-44 w-64 rounded-lg mt-4 mx-auto cursor-pointer" onClick={onOpen}>
          <img
            className="object-cover w-full h-full rounded-lg"
            src={list.images[0]}
            alt="img"
          />
        </div>
  
        <div className="flex gap-3 justify-center mt-4 ">
          <button
          onClick={productRemoveWishlist}
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Remove from wishlist
          </button>
        </div>
      </div>
      <>
        <Toaster />
        <Modal
          className="bg-midBlack overflow-y-hidden scrollbar-hide"
          backdrop="opaque"
          isOpen={isOpen}
          size="4xl"
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
                <ModalBody className="overflow-y-hidden">
                  <section className="flex justify-center items-center overflow-y-hidden ">
                    <div className="bg-midBlack w-[900px] h-[680px] rounded-lg">
                      <div className="bg-lightBlack w-[500px] h-52  mx-auto rounded-lg">
                        <img
                          className="w-full h-full object-cover rounded-lg"
                          src={list.images[0]}
                          alt="img"
                        />
                      </div>
                      <div className="ml-44 mt-4">
                        <h1 className="text-xl font-extrabold ">
                          {list.title}
                        </h1>
                        <h2 className="font-bold text-lg">
                          &#8377;{list.price}
                        </h2>
                        <span>
                          Listed {list.createdAt}{" "}
                          <span>{list.location}</span>
                        </span>
                      </div>

                      <div className="flex gap-8 justify-center mt-6">
                        <div className="bg-lightBlack cursor-pointer w-12 h-12 hover:bg-stone-900 rounded-full flex justify-center items-center">
                          <span>
                            <BiMessageRoundedDetail
                              style={{ fontSize: "25px" }}
                            />
                          </span>
                        </div>

                        <div className="bg-lightBlack cursor-pointer hover:bg-stone-900 w-12 h-12 rounded-full flex justify-center items-center">
                          <span>
                            <BsCart2 style={{ fontSize: "25px" }} />
                          </span>
                        </div>
                      </div>

                      <div className="ml-44 mt-4">
                        <h1 className="font-bold">Description</h1>
                      </div>
                      <div className="ml-44 mt-4 w-[500px]">
                        <h2>{list.description}</h2>
                      </div>

                      <div className="ml-44 mt-4">
                        <h1 className="font-bold">Seller Details (contact)</h1>
                      </div>
                      <div className="ml-44 mt-4">
                        <span className="font-semibold italic ">
                          {list.sellerId.username}
                        </span>
                      </div>

                      <div className="ml-44 mt-3">
                        <span>{list.sellerId.phone}</span>
                      </div>
                      <div className="ml-44 mt-3">
                        <span>{list.location}</span>
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
</div>
  );
}

export default UserWishlistCard;

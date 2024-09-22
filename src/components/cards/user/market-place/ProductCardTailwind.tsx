"use client";
import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
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
import Spinner from "@/styled-components/loader/Spinner";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

function ProductCardTailwind({ product }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [update, setUpdate] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleProductPage = () => {
    setUpdate(true);
  };

  const handleWishList = async (productId: string) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.post(
        "/add-to-wishlist",
        { productId },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result) {
        toast.success(result.data.message);
      }
    } catch (err) {
      console.error("Error occured in adding wishlist client side", err);
    }
  };

  const handleYourWishlist = () => {
    setLoading(true);
    router.push("/market-place/wishlist");
  };
  return (
    <div>
      {loading && <Spinner />}
      <div className="w-full max-w-sm bg-gradient-to-r from-purple-900/80 to-slate-900 rounded-lg shadow backdrop-blur-md cursor-pointer">
        <div
          className="w-full h-64 overflow-hidden rounded-t-lg"
          onClick={onOpen}
        >
          <img
            className="w-full h-full object-cover"
            src={product.images[0]}
            alt="product image"
          />
        </div>
        <div className="px-5 pb-5 mt-2">
          <h5
            className="text-xl font-extrabold tracking-tight text-white mb-3"
            onClick={onOpen}
          >
            {product.title}
          </h5>
          <h5 className="text-sm italic line-clamp-1 tracking-tight text-white mb-3">
            {product.description}
          </h5>

          <div className="flex items-center justify-between ">
            <span className="text-2xl font-bold text-white">
              &#8377;{product.price}
            </span>
            {product.isWishlisted ? (
              <span
                onClick={handleYourWishlist}
                className="text-white bg-gradient-to-r from-yellow-200 via-purple-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                In Wishlist
              </span>
            ) : (
              <span
                onClick={() => handleWishList(product._id)}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to Wishlist
              </span>
            )}
          </div>
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
                          src={product.images[0]}
                          alt="img"
                        />
                      </div>
                      <div className="ml-44 mt-4">
                        <h1 className="text-xl font-extrabold ">
                          {product.title}
                        </h1>
                        <h2 className="font-bold text-lg">
                          &#8377;{product.price}
                        </h2>
                        <span>
                          Listed {product.createdAt}{" "}
                          <span>{product.location}</span>
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
                        <h2>{product.description}</h2>
                      </div>

                      <div className="ml-44 mt-4">
                        <h1 className="font-bold">Seller Details (contact)</h1>
                      </div>
                      <div className="ml-44 mt-4">
                        <span className="font-semibold italic ">
                          {product.sellerId.username}
                        </span>
                      </div>

                      <div className="ml-44 mt-3">
                        <span>{product.sellerId.phone}</span>
                      </div>
                      <div className="ml-44 mt-3">
                        <span>{product.location}</span>
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

export default ProductCardTailwind;

"use client";
import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import axiosInstance from "@/configs/axiosInstance";
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), { ssr: false });;

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
interface Iproduct {
  title: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  images: string[];
  description: string;
}
export default function EditProductForm({ list,setUpdate }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [trigger,setTrigger] = useState(false);
  const [product, setProduct] = useState<Iproduct>({
    title: list.title,
    price: list.price,
    category: list.category,
    condition: list.condition,
    location: list.location,
    images:[],
    description: list.description,
  });
  useEffect(()=>{

  },[trigger])
  const [errors, setErrors] = useState<{
    all?: string;
    title?: string;
    price?: string;
    category?: string;
    condition?: string;
    location?: string;
    images?: string;
    description?: string;
  }>({});
  const validate = () => {
    const newErrors: typeof errors = {};
    if (
      !product.title &&
      !product.price &&
      !product.category &&
      !product.condition &&
      !product.location &&
      !product.images &&
      !product.description
    )
      newErrors.all = "Please fill out the fields";
    else if (!product.title) newErrors.title = "Title is required";
    else if (!product.price) newErrors.price = "Price is required";
    else if (!product.category) newErrors.category = "Category is required";
    else if (!product.condition) newErrors.condition = "Condition is required";
    else if (!product.location) newErrors.location = "Location is required";
    else if (!product.images) newErrors.images = "Images is required";
    else if (!product.location)
      newErrors.description = "description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const base64Images = await Promise.all(
        files.map(async (file) => {
          if (file.size > maxSizeInBytes) {
            toast.error(`File ${file.name} is too large`);
            return null;
          }
          return await convertToBase64(file);
        })
      );

      const validBase64Images = base64Images.filter(
        (image) => image !== null
      ) as string[];

      setProduct((prevProduct) => ({
        ...prevProduct,
        images: validBase64Images,
      }));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleNewSell = async (onClose) => {
    try {
      const listId = list._id;
      if (!validate()) return;
      const userToken = localStorage.getItem("userToken");
      const response = await axiosInstance.put(
        "/edit-product",
        {listId,
          title: product.title,
          price: product.price,
          category: product.category,
          condition: product.condition,
          location: product.location,
          description: product.description,
          images: product.images,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (response) {
        toast.success('Producted edited successfully');
        console.log("Product Edited:", response.data.message);
        onClose();
        setTrigger((prev) => !prev)
        setUpdate((prev) => !prev);
        // setProduct({
        //   title: "",
        //   price: "",
        //   category: "",
        //   condition: "",
        //   location: "",
        //   images: [],
        //   description: "",
        // });
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
  return (
    <>
      <button
        onClick={onOpen}
        type="button"
        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
      >
        Edit
      </button>
      <Toaster />
      <Modal
        className="bg-midBlack"
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
              <ModalHeader className="flex flex-col gap-1">
                Edit Product Details
              </ModalHeader>
              <ModalBody>
                <form action="post">
                  <div className="flex flex-col  items-center gap-4">
                    <div className="flex-1">
                      <input
                        value={product.title}
                        onChange={(e) =>
                          setProduct({ ...product, title: e.target.value })
                        }
                        placeholder="Title"
                        className="bg-lightBlack text-white rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        value={product.price}
                        onChange={(e) =>
                          setProduct({ ...product, price: e.target.value })
                        }
                        placeholder="Price"
                        className="bg-lightBlack  rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        value={product.category}
                        onChange={(e) =>
                          setProduct({ ...product, category: e.target.value })
                        }
                        placeholder="Category"
                        className="bg-lightBlack rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        value={product.condition}
                        onChange={(e) =>
                          setProduct({ ...product, condition: e.target.value })
                        }
                        placeholder="Condition"
                        className="bg-lightBlack  rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        value={product.location}
                        onChange={(e) =>
                          setProduct({ ...product, location: e.target.value })
                        }
                        placeholder="Location"
                        className="bg-lightBlack rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        onChange={handleFileChange}
                        placeholder="Image"
                        type="file"
                        multiple
                        className="bg-lightBlack  rounded-xl border-none w-[500px] h-24"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={product.description}
                        onChange={(e) =>
                          setProduct({ ...product, description: e.target.value })
                        }
                        placeholder="Description"
                        className="bg-lightBlack  rounded-xl border-none w-[500px]"
                        name=""
                        id=""
                      ></textarea>
                    </div>

                    {/* <div className="flex-1">
                      {" "}
                      <button
                        type="button"
                        className="mt-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                      Publish
                      </button>
                    </div> */}
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" onClick={() => handleNewSell(onClose)}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

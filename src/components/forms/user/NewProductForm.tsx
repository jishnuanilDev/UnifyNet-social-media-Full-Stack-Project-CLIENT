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

interface Iproduct {
  title: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  images: string[];
  description: string;
}

interface IImage {
  image: File[];
}
export default function NewProductForm({ setUpdate }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [product, setProduct] = useState<Iproduct>({
    title: "",
    price: "",
    category: "",
    condition: "",
    location: "",
    images: [],
    description: "",
  });
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
  //   const[title,setTitle] = useState('');
  //   const[price,setPrice] = useState('');
  //   const[category,setCategory] = useState('');
  //   const[condition,setCondition] = useState('');
  //   const[location,setLocation] = useState('')
  //   const[description,setDescript] = useState('')
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

  const [images, setImages] = useState<any>(null);
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleOpen = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    onOpen();
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
            alert(`File ${file.name} is too large`);
            return null;
          }
          return await convertToBase64(file);
        })
      );

      // Filter out any null values resulting from invalid files
      const validBase64Images = base64Images.filter(
        (image) => image !== null
      ) as string[];

      setProduct((prevProduct) => ({
        ...prevProduct,
        images: validBase64Images,
      }));
    }
  };

  const handleNewSell = async (onClose) => {
    try {
      if (!validate()) return;
      const userToken = localStorage.getItem("userToken");
      const response = await axiosInstance.post(
        "/sell-new-product",
        {
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
        console.log("Product added:", response.data.message);
        onClose();
        setUpdate((prev) => !prev);
        setProduct({
          title: "",
          price: "",
          category: "",
          condition: "",
          location: "",
          images: [],
          description: "",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-fuchsia-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Sell +
        </span>
      </button>
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
              <ModalHeader className="flex flex-col gap-1">
                Add Product Details
              </ModalHeader>
              <ModalBody>
                <form action="post">
                  <div className="flex flex-col  items-center gap-4">
                    <div className="flex-1">
                      {errors.all && (
                        <p style={{ color: "red" }}>{errors.all}</p>
                      )}
                      <input
                        value={product.title}
                        onChange={(e) =>
                          setProduct({ ...product, title: e.target.value })
                        }
                        placeholder="Title"
                        className="bg-lightBlack text-white rounded-full border-none w-[500px]"
                        type="text"
                        pattern="[A-Za-z ]+"
                        id="textInput"
                        name="textInput"
                        required
                        title="Please enter only letters and spaces"
                      />
                      {errors.title && (
                        <p style={{ color: "red" }}>{errors.title}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        value={product.price}
                        onChange={(e) =>
                          setProduct({ ...product, price: e.target.value })
                        }
                        placeholder="Price"
                        className="bg-lightBlack  rounded-full border-none w-[500px]"
                        type="number"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                        id=""
                      />
                      {errors.price && (
                        <p style={{ color: "red" }}>{errors.price}</p>
                      )}
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
                      {errors.category && (
                        <p style={{ color: "red" }}>{errors.category}</p>
                      )}
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
                      {errors.condition && (
                        <p style={{ color: "red" }}>{errors.condition}</p>
                      )}
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
                      {errors.location && (
                        <p style={{ color: "red" }}>{errors.location}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        onChange={handleFileChange}
                        placeholder="Image"
                        className="bg-lightBlack  rounded-xl border-none w-[500px] h-24"
                        type="file"
                        multiple
                        name=""
                        id=""
                      />
                      {errors.images && (
                        <p style={{ color: "red" }}>{errors.images}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={product.description}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                        className="bg-lightBlack  rounded-xl border-none w-[500px]"
                        name=""
                        id=""
                      ></textarea>
                      {errors.description && (
                        <p style={{ color: "red" }}>{errors.description}</p>
                      )}
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
                <Button
                  color="secondary"
                  onClick={() => handleNewSell(onClose)}
                >
                  Publish
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

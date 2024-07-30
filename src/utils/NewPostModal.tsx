"use client";
import { usePathname, useSearchParams } from "next/navigation";
import "@/styles/globals.css";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import dynamic from 'next/dynamic';
import { Area } from "react-easy-crop";
import { getCroppedImg } from "./getCroppedImage";
import Cropper from "react-easy-crop";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const LinearLoading = dynamic(() => import('@/styled-components/LinearLoading'), {
  loading: () => <p>Loading...</p>, // Optional loading component
});

import "flowbite";
import axios from "axios";
interface postStepProps {
  postStep: number;
  setPostStep: React.Dispatch<React.SetStateAction<number>>;
}
const NewPostModal: React.FC<postStepProps> = ({ postStep, setPostStep }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const modal = searchParams.get("modal");
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [caption, setCaption] = useState<string>("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [postImage, setPostImage] = useState("");
  const [disable, setDisable] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seletectedFile = event.target.files?.[0];
    if (seletectedFile) {
      console.log("selectedFile:", seletectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(seletectedFile);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    }
  };

  const handleCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImageBase64 = await getCroppedImg(
          imageSrc,
          croppedAreaPixels
        );
        setPostImage(croppedImageBase64); // Set the base64 data URL directly
        setCroppedImageUrl(croppedImageBase64); // Set the base64 data URL directly
        toast.success("Image cropped successfully");
      } catch (error) {
        toast.error("Error cropping image");
      }
    }
  };

  const handleAllClose = () => {
    setPostImage("");
    setPostStep(0);
    // setImageSrc('')
    setCaption("");
  };

  const newPostSubmit = async () => {
    try {
      if (!postImage) {
        toast.error("No image selected");
        return;
      }
      setDisable(true);
      const userToken = localStorage.getItem("userToken");
      // const formData = new FormData();
      // formData.append("postImage", postImage);
      // formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:5000/create-post",
        { caption, postImage },

        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log("post uploading status:", response.data);
      toast.success(response.data.message);

      setTimeout(() => {
        handleAllClose();
        setImageSrc("");
        setDisable(false);
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Error occurred in create-post in client", err);
    }
  };
  if (postStep == 1) {
    return (
      <div className="w-[500px] relative ">
        <div className="fixed top-0 left-0 w-full h-full bg-black/25 bg-opacity-50 backdrop-blur-sm z-40"></div>

        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <section className="flex justify-center">
            <div className="bg-sidebarBlack w-full h-[600px] flex flex-col items-center  rounded-2xl ">
              <Link href={pathname}>
                {" "}
                <div className="ml-[700px] mt-4 mr-10" onClick={handleAllClose}>
                  <IoMdClose style={{ fontSize: "30px" }} />
                </div>
              </Link>
              <div className="flex justify-center items-center w-[500px] bg-gradient-to-r from-purple-900/15 to-fuchsia-600/15 h-8 rounded-3xl">
                <span className="font-extrabold italic">Create New Post</span>
              </div>
              <Toaster />
              <div>
                {imageSrc && !postImage ? (
                  <>
                    <div className="">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={6 / 5}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>

                    <div className="absolute right-0 bottom-0">
                      <Stack spacing={2} direction="row" className="mr-10">
                        <Button onClick={handleCrop} variant="contained">
                          Crop
                        </Button>
                        <Button
                          onClick={() => setImageSrc("")}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </div>
                  </>
                ) : postImage ? (
                  <div className="bg-sidebarBlack w-full  flex flex-col items-center rounded-2xl">
                    <div className="mt-4 flex flex-col items-center">
                      <div className="w-[500px] h-auto">
                        {croppedImageUrl && (
                          <img
                            src={croppedImageUrl}
                            alt="Cropped"
                            className="rounded-md w-full max-w-full"
                          />
                        )}
                      </div>

                      <div className="flex mt-10 w-[500px]">
                        <input
                          placeholder="Add caption"
                          className="bg-lightBlack w-full h-8 rounded-full p-3 text-[12px]"
                          type="text"
                          onChange={(e) => setCaption(e.target.value)}
                          value={caption}
                        />
                      </div>

                      <div className="mt-5">
                        {disable ? (
                          <LinearLoading />
                        ) : (
                          <button
                            onClick={newPostSubmit}
                            type="submit"
                            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
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
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
};

export default NewPostModal;

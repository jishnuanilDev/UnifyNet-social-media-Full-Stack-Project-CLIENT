import React, { useState } from "react";
import EditProductForm from "@/components/forms/user/EditProductForm";
import axiosInstance from "@/configs/axiosInstance";
import Image from 'next/image';
function UserWishlistCard({ list ,setUpdate}) {
  const [remove, setRemove] = useState(false);
  const productRemoveWishlist = async () => {
    try {
      const listId = list._id;
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.patch(
        "/remove-from-wishlist",
        { listId },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result.data.success) {
        setRemove(true);
        setUpdate(prev=>!prev)
      }
    } catch (err) {
      console.error("Error occured in handle sold client side", err);
    }
  };
  return (
    <div className="w-70 h-80 bg-white/5 rounded-xl  ">
      <div className="bg-black h-44 w-64 rounded-lg mt-4 mx-auto">
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
  );
}

export default UserWishlistCard;

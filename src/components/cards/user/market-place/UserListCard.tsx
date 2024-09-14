import React, { useState } from "react";
import EditProductForm from "@/components/forms/user/EditProductForm";
import axiosInstance from "@/configs/axiosInstance";
import Image from 'next/image';
function UserListCard({ list }) {
  const [sold, setSold] = useState(false);
  const handleSold = async () => {
    try {
      const listId = list._id;
      const userToken = localStorage.getItem("userToken");
      const result = await axiosInstance.post(
        "/mark-as-sold",
        { listId },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (result.data.success) {
        setSold(true);
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
      <div className="flex justify-center mt-3">
        {sold || list.isSold ? (
          <button
            disabled
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Sold &#x2714;
          </button>
        ) : (
          <button
            onClick={handleSold}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Mark as sold
          </button>
        )}
      </div>
      <div className="flex gap-3 justify-center mt-4 ">
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
        {sold || list.isSold ? "" : <EditProductForm />}
      </div>
    </div>
  );
}

export default UserListCard;

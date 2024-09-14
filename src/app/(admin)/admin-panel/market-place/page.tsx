"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axiosInstance from "@/configs/axiosInstance";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
import TopBarSkeleton from "@/styled-components/skeletons/TopBarSkeleton";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Spinner from "@/styled-components/loader/Spinner";
const AdminLeftSidebar = dynamic(
  () => import("@/components/shared/Admin/LeftSidebarAdmin"),
  {
    loading: () => <LeftSidebarSkeleton />, // Optional loading component
  }
);

const Topbar = dynamic(() => import("@/components/shared/Admin/TopBarAdmin"), {
  loading: () => <TopBarSkeleton />, // Optional loading component
});
import "@/styles/globals.css";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import Link from "next/link";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface Ipost {
  _id: string;
  reports: [
    {
      user: IUser;
      report: string;
    }
  ];
  isUnlisted: boolean;
  caption?: string;
  image?: {
    url: string;
  };
  user?: string;

  postId: string;
  likes: IUser[];
}

interface PostProps {
  post: Ipost;
  user: IUser;
}
const AdminPanelMarketPlace = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          toast.error("Token not available");
          router.replace("/admin");
        }
        const response = await axiosInstance.get("/admin/get-products");
        if (response) {
          setProducts(response.data.products);
          console.log(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching reported posts in client:", error);
      }
    };

    fetchProducts();
  }, [trigger, router]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleUnlist = async (productId: string) => {
    try {
      console.log("post id displaying for unlisting reported post in client");
      const response = await axiosInstance.post("/admin/unlist-product", {
        productId,
      });
      if (response) {
        toast.success(response.data.message);
        console.log("Unlisted response data", response);
        setTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error("Error unlisting products in client:", err);
    }
  };

  const handleList = async (productId: string) => {
    try {
      console.log("post id displaying for unlisting reported post in client");
      const response = await axiosInstance.post("/admin/list-product", {
        productId,
      });
      if (response) {
        toast.success(response.data.message);
        console.log("listed response data", response);
        setTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error("Error listing products in client:", err);
    }
  };
  const sweetAlertUnlist = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleUnlist(productId);
      }
    });
  };

  const sweetAlertList = (postId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleList(postId);
      }
    });
  };

  const handleHome = () => {};
  return (
    <div>
      <Toaster />
      <div className="h-screen ">
        <AdminLeftSidebar />

        <Topbar />

        <nav className="flex mt-3" aria-label="Breadcrumb">
          <ol className=" ml-3 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-white hover:text-fuchsia-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
          </ol>
        </nav>

        <main>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10  mr-5 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs uppercase bg-profileBlack text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Condition
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="odd:bg-purple-950 odd:dark:bg-violet-950/50 text-white even:bg-purple-950/60 even:dark:bg-customBlack border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap text-white font-semibold"
                    >
                      <img
                        className="w-14 h-14"
                        src={product.images[0]}
                        alt=""
                      />
                    </th>
                    <td className="px-6 py-4">{product.title}</td>
                    <td className="px-6 py-4">{product.price}</td>

                    <td className="px-6 py-4 "> {product.category}</td>

                    <td className="px-6 py-4"> {product.condition}</td>
                    <td className="px-6 py-4"> {product.location}</td>
                    {product.isListed ? (
                      <td className="px-6 py-4 text-customGreen">Listed</td>
                    ) : (
                      <td className="px-6 py-4 text-yellow-600">Unlisted</td>
                    )}

                    <td className="px-6 py-4 text-white ">
                      {product.isListed ? (
                        <button
                          className="bg-red-800 px-3 rounded-lg"
                          onClick={() => sweetAlertUnlist(product._id)}
                        >
                          UnList
                        </button>
                      ) : (
                        <button
                          className="bg-red-800 px-3 rounded-lg ml-3"
                          onClick={() => sweetAlertList(product._id)}
                        >
                          List
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <div className="mt-5 flex justify-center text-white">
          <Stack spacing={2}>
            <Pagination
              onChange={handlePageChange}
              page={currentPage}
              className=" custom-pagination rounded-xl bg-purple-300"
              count={10}
              color="secondary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelMarketPlace;

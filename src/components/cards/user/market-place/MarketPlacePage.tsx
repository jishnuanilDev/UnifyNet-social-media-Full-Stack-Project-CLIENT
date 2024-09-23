"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ProfileSidebar from "@/components/shared/user/ProfileSidebar";
import axiosInstance from "@/configs/axiosInstance";
import "@/styles/globals.css";
import { BsSearch } from "react-icons/bs";
import CategoryDropdown from "@/styled-components/dropdowns/DropDown";
import NewProductForm from "@/components/forms/user/NewProductForm";
import Spinner from "@/styled-components/loader/Spinner";
import { useRouter } from "next/navigation";
import ProductCardTailwind from "./ProductCardTailwind";
import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface Ipost {
  _id: string;
  caption: string;
  postId: string;
  image: {
    url: string;
  };

  comments: [
    {
      user: IUser;
      comment: string;
    }
  ];
  user: IUser;

  likes: string[];
}

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface IProfileCardProps {
  user: IUser | null;
}
const MarketPlaceCard: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "savedPosts">("posts");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const handleYourLists = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Sign-in Required");
      return;
    }
    setLoading(true);
    router.push("/market-place/your-lists");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axiosInstance.get("/fetch-products");
        if (result) {
          setProducts(result.data.products);
        }
      } catch (err) {}
    };
    fetchProducts();
  }, [update]);

  const handleYourWishlist = ()=>{
  setLoading(true);
  router.push('/market-place/wishlist')
  }
  return (
    <div className="h-screen">
      <ProfileSidebar />
      <div>
        <Toaster />
        <header className="bg-gradient-to-b from-violet-900/20 to-stone-900/10 w-full h-20">
          <section>
            <div className="flex justify-around ">
              <NewProductForm setUpdate={setUpdate} />
              {loading && <Spinner />}

              <button
                onClick={handleYourLists}
                type="button"
                className="mt-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Your lists -&gt;
              </button>
              <div className="gap-4 flex mt-3">
                <div className="w-[450px] ">
                  <input
                    placeholder="search..."
                    className=" placeholder:text-white/75 placeholder:italic rounded-full w-full border-0  font-sans bg-gradient-to-r from-indigo-700/80 to-indigo-950"
                    type="text"
                  />
                </div>

                <div className="bg-gradient-to-r from-indigo-700/80 to-indigo-950  w-10 h-10 rounded-full cursor-pointer flex justify-center items-center">
                  <BsSearch style={{ fontSize: "20px", color: "white" }} />
                </div>
              </div>
              <button
                onClick={handleYourWishlist}
                type="button"
                className="mt-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                your Wishlist-&gt;
              </button>
              {/* <div className="mt-3">
                <CategoryDropdown />
              </div> */}
            </div>
          </section>
        </header>
        {products.length >= 1 ? (
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-3 mr-2">
            {products.map((product, index) => (
              <ProductCardTailwind key={index} product={product} setUpdate={setUpdate} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-56 mx-auto">
            <span className="text-3xl font-bold text-white/40">
              No Products Found
            </span>
      
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlaceCard;

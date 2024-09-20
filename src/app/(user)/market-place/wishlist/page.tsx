"use client";
import React, { useEffect } from "react";
import UserProductList from "@/components/cards/user/market-place/UserProductsList";
import UserProductWishlist from "@/components/cards/user/market-place/UserWishlist";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
function Wishlist() {
  const router = useRouter();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.replace("/");
    }
  }, [router]);
  return (
    <NextUIProvider>
      <div className="h-screen">
        <UserProductWishlist />
      </div>
    </NextUIProvider>
  );
}

export default Wishlist;

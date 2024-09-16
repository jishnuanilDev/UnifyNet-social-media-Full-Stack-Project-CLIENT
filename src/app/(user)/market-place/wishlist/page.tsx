"use client"
import React, { useEffect } from 'react'
import UserProductList from '@/components/cards/user/market-place/UserProductsList'
import UserProductWishlist from '@/components/cards/user/market-place/UserWishlist'
import { useRouter } from 'next/navigation';
function Wishlist() {
  const router = useRouter();
  useEffect(()=>{
    const userToken = localStorage.getItem('userToken');
    if(!userToken){
      router.replace('/')
    }
     },[router])
  return (
    <div className='h-screen'>
      <UserProductWishlist/>
    </div>
  )
}

export default Wishlist
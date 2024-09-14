"use client"
import React from 'react'
import UserProductList from '@/components/cards/user/market-place/UserProductsList'
import UserProductWishlist from '@/components/cards/user/market-place/UserWishlist'
function Wishlist() {
  return (
    <div className='h-screen'>
      <UserProductWishlist/>
    </div>
  )
}

export default Wishlist

import React, { useEffect } from 'react'
import UserProductList from '@/components/cards/user/market-place/UserProductsList'
import { useRouter } from 'next/navigation';
import { NextUIProvider } from "@nextui-org/react";
function UserProLists() {
  return (
    <NextUIProvider>
    <div className='h-screen'>
      <UserProductList/>
    </div>
    </NextUIProvider>
  )
}

export default UserProLists
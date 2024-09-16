
import React, { useEffect } from 'react'
import UserProductList from '@/components/cards/user/market-place/UserProductsList'
import { useRouter } from 'next/navigation';

function UserProLists() {
  return (
    <div className='h-screen'>
      <UserProductList/>
    </div>
  )
}

export default UserProLists
"use client"
import React, { useEffect } from 'react'
import '@/styles/globals.css'
import dynamic from "next/dynamic";
import rg from '@/components/forms/user/ChangePasword'
import { useRouter } from 'next/navigation';
const LeftSidebar = dynamic(()=>import('@/components/shared/user/LeftSidebar'))
const ChangePassword = dynamic(()=>import('@/components/forms/user/ChangePasword'))
function ChangePasswordPage() {
  const router = useRouter();
  useEffect(()=>{
    const userToken = localStorage.getItem('userToken');
    if(!userToken){
      router.replace('/')
    }
     },[router])
  return (
    <div>
       <LeftSidebar />
      <ChangePassword/>
    </div>
  )
}

export default ChangePasswordPage

import React from 'react'
import '@/styles/globals.css'
import dynamic from "next/dynamic";
import rg from '@/components/forms/user/ChangePasword'
const LeftSidebar = dynamic(()=>import('@/components/shared/user/LeftSidebar'))
const ChangePassword = dynamic(()=>import('@/components/forms/user/ChangePasword'))
function ChangePasswordPage() {
  return (
    <div>
       <LeftSidebar />
      <ChangePassword/>
    </div>
  )
}

export default ChangePasswordPage

import React from 'react'
import dynamic from 'next/dynamic';
import { NextUIProvider } from "@nextui-org/react";
const ResetPasswordForm = dynamic(() => import('@/components/forms/user/ResetPassword'),{ssr:false,});

function ResetPassword() {
  return (
    <div>
      <NextUIProvider>
      <ResetPasswordForm/>
      </NextUIProvider>
    </div>
  )
}

export default ResetPassword

import React from 'react'
import dynamic from 'next/dynamic';
const ForgotPassword = dynamic(() => import('@/components/forms/user/ForgotPassword'),{ssr:false,});
import { NextUIProvider } from "@nextui-org/react";
function ForgotPassPage() {
  return (
    <div>
      <NextUIProvider>
      <ForgotPassword/>
      </NextUIProvider>
    
    </div>
  )
}

export default ForgotPassPage;

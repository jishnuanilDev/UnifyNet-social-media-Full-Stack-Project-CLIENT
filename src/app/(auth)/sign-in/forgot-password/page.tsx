import React from 'react'
import dynamic from 'next/dynamic';
const ForgotPassword = dynamic(() => import('@/components/forms/user/ForgotPassword'),{ssr:false,});

function ForgotPassPage() {
  return (
    <div>
      <ForgotPassword/>
    </div>
  )
}

export default ForgotPassPage;

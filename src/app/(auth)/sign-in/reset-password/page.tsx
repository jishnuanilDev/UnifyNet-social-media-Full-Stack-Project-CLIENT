import React from 'react'
import dynamic from 'next/dynamic';

const ResetPasswordForm = dynamic(() => import('@/components/forms/user/ResetPassword'),{ssr:false,});

function ResetPassword() {
  return (
    <div>
      <ResetPasswordForm/>
    </div>
  )
}

export default ResetPassword

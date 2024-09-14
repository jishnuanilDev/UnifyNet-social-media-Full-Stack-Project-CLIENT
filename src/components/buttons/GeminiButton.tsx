import React from 'react'
import { SiGooglegemini } from "react-icons/si";
function GeminiButton() {
  return (
    <div className='flex gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'>
      <button type="button" className="">Generate caption  </button>
      <SiGooglegemini />
    </div>
  )
}

export default GeminiButton

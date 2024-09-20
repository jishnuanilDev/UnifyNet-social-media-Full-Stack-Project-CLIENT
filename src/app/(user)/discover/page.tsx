import React from 'react'
import "@/styles/globals.css";
import DiscoverPage from '@/components/cards/user/discover/DiscoverCard'
import { NextUIProvider } from "@nextui-org/react";
function Discover() {
  return (
    <NextUIProvider>
    <div>
      <DiscoverPage/>
    </div>
    </NextUIProvider>
  )
}

export default Discover

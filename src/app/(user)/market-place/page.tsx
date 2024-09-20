import React from 'react'
import "@/styles/globals.css";
import MarketPlaceCard from '@/components/cards/user/market-place/MarketPlacePage';
import { NextUIProvider } from "@nextui-org/react";
const MarketPlace = ()=> {
  return (
    <NextUIProvider>
    <div>
      <MarketPlaceCard/>
    </div>
    </NextUIProvider>
  )
}

export default MarketPlace;

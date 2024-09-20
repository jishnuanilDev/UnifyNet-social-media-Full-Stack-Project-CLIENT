import React from 'react'
import ProductViewpage from '@/components/cards/user/market-place/ProductViewpage'
import { NextUIProvider } from "@nextui-org/react";
function ProductPage() {
  return (
    <NextUIProvider>
    <div>
      <ProductViewpage/>
    </div>
    </NextUIProvider>
  )
}

export default ProductPage

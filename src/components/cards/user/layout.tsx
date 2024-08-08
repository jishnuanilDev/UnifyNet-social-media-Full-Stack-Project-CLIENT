/* eslint-disable react/react-in-jsx-scope */

import "@/styles/globals.css";
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'UnifyNet',
  description: 'unifynet social media application',
}
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <head>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={inter.className}>
        
      {children}
      </body>
    </html>
  );
}

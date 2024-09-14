/* eslint-disable react/react-in-jsx-scope */

import "@/styles/globals.css";
import { Metadata } from "next";
import Head from "next/head"; // Import Head from next/head

export const metadata: Metadata = {
  title: "UnifyNet",
  description: "unifynet social media application",
};
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

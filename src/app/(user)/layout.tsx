import "@/styles/globals.css";
import { Metadata } from "next";
import ReduxProvider from "@/utils/ReduxProvider";
import Providers from "./providers";

import { Inter } from "next/font/google";

// Set up metadata for the app
export const metadata: Metadata = {
  title: "UnifyNet",
  description: "UnifyNet social media application",
};

// Load the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/default-photoaidcom-cropped (1).png" />
      </head>
      <body className={inter.className}>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}

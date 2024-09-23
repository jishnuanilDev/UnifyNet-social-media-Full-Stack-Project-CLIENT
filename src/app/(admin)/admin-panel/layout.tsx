/* eslint-disable react/react-in-jsx-scope */
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "UnifyNet Admin",
  description: "UnifyNet social media application",
};

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
      <body>{children}</body>
    </html>
  );
}

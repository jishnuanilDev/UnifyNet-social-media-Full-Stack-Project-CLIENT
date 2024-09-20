import React, { Suspense } from "react";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { NextUIProvider } from "@nextui-org/react";
const EditProfile = dynamic(
  () => import("@/components/forms/user/EditProfile"),
  {
    ssr: false,
  }
);
const LeftSidebar = dynamic(
  () => import("@/components/shared/user/LeftSidebar"),
  {
    ssr: false,
  }
);

export default function EditProfilePage() {
  return (
    <NextUIProvider>
    <div>
      <Suspense>
        <LeftSidebar />
      </Suspense>

      <EditProfile />
    </div>
    </NextUIProvider>
  );
}

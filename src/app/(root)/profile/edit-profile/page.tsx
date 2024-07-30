import React, { Suspense } from "react";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
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
    <div>
      <Suspense>
        <LeftSidebar />
      </Suspense>

      <EditProfile />
    </div>
  );
}

import React from "react";
import "../../../../styles/globals.css";
import dynamic from "next/dynamic";

const ProfileForm = dynamic(
  () => import("@/components/forms/user/ProfileForm"),
  {
    loading: () => <p>Loading...</p>, // Optional loading component
  }
);

export const metadata = {
  title: "Create Profile",
  description: "Create a profile for UnifyNet social media",
};
const CreateProfile: React.FC = () => {
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default CreateProfile;

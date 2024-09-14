"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
const MyBarChart = dynamic(() => import("@/components/charts/BarCharts"), {
  loading: () => <h1>Hey loading charts..</h1>, // Optional loading component
});
const UsersDashboardCard = dynamic(
  () => import("@/components/shared/Admin/analyticsCards/UsersDashboardCard"),
  {
    loading: () => <h1>Hey loading usersDashboardCard..</h1>, // Optional loading component
  }
);
const PremiumUsersDashCard = dynamic(
  () => import("@/components/shared/Admin/analyticsCards/PremiumUsersDashCard"),
  {
    loading: () => <h1>Hey loading PremiumUsersDashCard..</h1>, // Optional loading component
  }
);
const PostsDashCard = dynamic(
  () => import("@/components/shared/Admin/analyticsCards/PostsDashCard"),
  {
    loading: () => <h1>Hey loading PostsDashCard..</h1>, // Optional loading component
  }
);
const CommentsDashCard = dynamic(
  () => import("@/components/shared/Admin/analyticsCards/CommentsDashCard"),
  {
    loading: () => <h1>Hey loading CommentsDashCard..</h1>, // Optional loading component
  }
);

interface User {
  _id: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
  isBlocked: boolean;
}
const AnalyticsCard: React.FC = () => {
  return (
    <div>
      <Toaster />
      <div className="flex  gap-x-4 gap-y-12 px-4 py-20 lg:px-20">
        <UsersDashboardCard />
        <PremiumUsersDashCard />
        <PostsDashCard />
        <CommentsDashCard />
      </div>
    </div>
  );
};

export default AnalyticsCard;

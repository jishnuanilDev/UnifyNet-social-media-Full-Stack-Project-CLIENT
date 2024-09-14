"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import dynamic from "next/dynamic";
import LeftSidebarSkeleton from "@/styled-components/skeletons/LeftSidebarSkeleton";
import TopBarSkeleton from "@/styled-components/skeletons/TopBarSkeleton";
const AnalyticsCard = dynamic(
  () => import("@/components/cards/admin/AnalyticsCard"),
  {
    loading: () => <h1>Hey loading cards</h1>, // Optional loading component
  }
);
const MyBarChart = dynamic(() => import("@/components/charts/BarCharts"), {
  loading: () => <h1>Hey loading charts..</h1>, // Optional loading component
});

const MyLineChart = dynamic(() => import("@/components/charts/LineChart"), {
  loading: () => <h1>Hey loading charts..</h1>, // Optional loading component
});
const AdminLeftSidebar = dynamic(
  () => import("@/components/shared/Admin/LeftSidebarAdmin"),
  {
    loading: () => <LeftSidebarSkeleton />, // Optional loading component
  }
);

const Topbar = dynamic(() => import("@/components/shared/Admin/TopBarAdmin"), {
  loading: () => <TopBarSkeleton />, // Optional loading component
});
import "@/styles/globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  bio: string;
  email: string;
  // Add other properties as needed
}
interface Ipost {
  _id: string;
  reports: [
    {
      user: IUser;
      report: string;
    }
  ];
  isUnlisted: boolean;
  caption?: string;
  image?: {
    url: string;
  };
  user?: string;

  postId: string;
  likes: IUser[];
}

const AdminPanel = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Ipost[]>([]);
  const [trigger, setTrigger] = useState(false);

  return (
    <div>
      <Toaster />
      <div className=" h-screen overflow-y-hidden overflow-x-hidden">
        <AdminLeftSidebar />

        <Topbar />

        <nav className="flex mt-3 mb-3" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse  ml-3">
            <li aria-current="page">
              <div className="flex items-center cursor-pointer">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium  text-white md:ms-2 dark:text-white-400">
                  Home Dashboard
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <main className="h-screen scrollbar-hide  overflow-y-auto overflow-x-hidden mb-6">
          <AnalyticsCard />

          <MyBarChart />
          <MyLineChart />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

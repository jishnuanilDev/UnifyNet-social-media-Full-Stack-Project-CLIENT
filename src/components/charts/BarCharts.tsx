"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import axiosInstance from "@/configs/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for yearly, monthly, and weekly transactions
const dataYearly = [
  { name: "2021", transactions: 4000, revenue: 2400 },
  { name: "2022", transactions: 3000, revenue: 2210 },
  { name: "2023", transactions: 5000, revenue: 3200 },
];

const dataMonthly = [
  { name: "Jan", transactions: 400, revenue: 240 },
  { name: "Feb", transactions: 300, revenue: 221 },
  { name: "Mar", transactions: 500, revenue: 320 },
  { name: "Apr", transactions: 700, revenue: 410 },
  { name: "May", transactions: 600, revenue: 380 },
  { name: "Jun", transactions: 800, revenue: 450 },
  { name: "Jul", transactions: 900, revenue: 490 },
  { name: "Aug", transactions: 750, revenue: 430 },
  { name: "Sep", transactions: 650, revenue: 400 },
  { name: "Oct", transactions: 850, revenue: 460 },
  { name: "Nov", transactions: 950, revenue: 500 },
  { name: "Dec", transactions: 1050, revenue: 560 },
];

const dataWeekly = [{ count: 2, _id: { week: 43, year: 2024 } }];

const MyBarChart = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/admin/premium-users/count/${timeFrame}`
        );
        console.log("userPerWeek data", response.data.data);
        const resData = response.data.data;
        const formatData = resData.map((item) => {
          if (item._id && item._id.week !== undefined) {
            return {
              name: `Week ${item._id.week}`,
              transactions: item.count,
              revenue: 2400,
            };
          } else if (item._id && item._id.month !== undefined) {
            // Handle the case where 'week' does not exist (e.g., monthly or yearly data)
            // You can return a different structure or skip the item
            return {
              name: `Month ${item._id.month}`,
              transactions: item.count,
              revenue: 2400,
            };
          } else {
            return {
              name: `Year ${item._id.year}`,
              transactions: item.count,
              revenue: 2400,
            };
          }
        });

        setData(formatData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [timeFrame]);
  // const getData = () => {
  //   switch (timeFrame) {
  //     case 'yearly':
  //       return dataYearly;
  //     case 'monthly':
  //       return dataMonthly;
  //     case 'weekly':
  //       return dataWeekly;
  //     default:
  //       return dataYearly;
  //   }
  // };

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="font-mono">Transaction Details</h2>
      </div>
      <div className="flex justify-end mr-4 mb-4">
        <Dropdown
          className="bg-midBlack border-0"
          label="Select time range"
          dismissOnClick={false}
        >
          <Dropdown.Item
            className="text-white hover:bg-lightBlack"
            onClick={() => setTimeFrame("weekly")}
          >
            Weekly
          </Dropdown.Item>
          <Dropdown.Item
            className="text-white hover:bg-lightBlack"
            onClick={() => setTimeFrame("monthly")}
          >
            Monthly
          </Dropdown.Item>
          <Dropdown.Item
            className="text-white hover:bg-lightBlack"
            onClick={() => setTimeFrame("yearly")}
          >
            Yearly
          </Dropdown.Item>
        </Dropdown>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="transactions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;

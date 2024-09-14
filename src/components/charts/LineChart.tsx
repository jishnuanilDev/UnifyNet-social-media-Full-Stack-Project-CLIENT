"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import axiosInstance from "@/configs/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for yearly, monthly, and weekly transactions



const dataWeekly = [
  { name: "Week 1", transactions: 100, revenue: 60 },
  { name: "Week 2", transactions: 150, revenue: 90 },
  { name: "Week 3", transactions: 200, revenue: 120 },
  { name: "Week 4", transactions: 250, revenue: 150 },
];

const MyLineChart = () => {
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
              revenue: 500*item.count,
            };
          } else if (item._id && item._id.month !== undefined) {
            // Handle the case where 'week' does not exist (e.g., monthly or yearly data)
            // You can return a different structure or skip the item
            return {
              name: `Month ${item._id.month}`,
              transactions: item.count,
              revenue: 500*item.count,
            };
          } else {
            return {
              name: `Year ${item._id.year}`,
              transactions: item.count,
              revenue: 500*item.count,
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

  return (
    <div className="mb-32">
      <div className="flex justify-end mr-4 mb-4">
            <Dropdown
              className="bg-midBlack border-0"
              label="Select time range"
              dismissOnClick={false}
            >
              <Dropdown.Item className="text-white hover:bg-lightBlack" onClick={() => setTimeFrame('weekly')}>
                Weekly
              </Dropdown.Item>
              <Dropdown.Item className="text-white hover:bg-lightBlack" onClick={() => setTimeFrame('monthly')}>
                Monthly
              </Dropdown.Item>
              <Dropdown.Item className="text-white hover:bg-lightBlack" onClick={() => setTimeFrame('yearly')}>
                Yearly
              </Dropdown.Item>
            </Dropdown>
          </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
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
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineChart;

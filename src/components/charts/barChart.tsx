"use client";
import { jobsPubClosThreeMonths } from "@/api/adminStats/jobsPubClosThreeMonths";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
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

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
  }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white shadow-lg flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Published Jobs:
          <span className="ml-2">{payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Completed Jobs:
          <span className="ml-2">{payload[1].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

const BarChartComponent: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get jobs posted and closed"],
    queryFn: () => jobsPubClosThreeMonths(),
  });

  const salesData = useMemo(() => {
    if (!data || !data.data) {
      return [];
    }

    return Object.keys(data.data)
      ?.reverse()
      .map((key) => ({
        name: key,
        publishedJobs: data.data[key].publishedJobs,
        completedJobs: data.data[key].completedJobs,
      }));
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="publishedJobs" fill="#87207D" />
        <Bar dataKey="completedJobs" fill="#F97316" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

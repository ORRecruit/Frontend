"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { jobsPubClosThreeMonths } from "@/api/adminStats/jobsPubClosThreeMonths";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    dataKey: string;
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
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className={`text-sm ${
              entry.dataKey === "Published"
                ? "text-blue-400"
                : "text-indigo-400"
            }`}
          >
            {entry.dataKey} Jobs:
            <span className="ml-2">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const BarChartComponent: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get jobs posted and closed"],
    queryFn: jobsPubClosThreeMonths,
  });

  const salesData = useMemo(() => {
    if (!data || !data.data) {
      return [];
    }

    return Object.entries(data.data)
      .reverse()
      .map(([key, value]) => ({
        name: key,
        Published: value.publishedJobs,
        Completed: value.completedJobs,
      }));
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
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
        <Bar dataKey="Published" fill="#87207D" />
        <Bar dataKey="Completed" fill="#F97316" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

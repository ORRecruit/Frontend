"use client";
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
import { getCandidatesForLastSixMonths } from "@/api/adminStats/getCreatedCandidatesSixMonths";

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
        {payload.map((entry) => (
          <p
            key={entry.dataKey}
            className={`text-sm ${
              entry.dataKey === "Candidates"
                ? "text-blue-400"
                : "text-green-400"
            }`}
          >
            {entry.dataKey}:<span className="ml-2">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const BarChartComponent: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get candidates and applicants for last six months"],
    queryFn: () => getCandidatesForLastSixMonths(),
  });

  const chartData = useMemo(() => {
    if (!data || !data.data) {
      return [];
    }

    return Object.keys(data.data)
      ?.reverse()
      .map((key) => ({
        name: key?.slice(0, -4),
        Candidates: data.data[key].newCandidates,
        Applicants: data.data[key].newApplicants,
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
        data={chartData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Candidates" fill="#F97316" />
        <Bar dataKey="Applicants" fill="#22C55E" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

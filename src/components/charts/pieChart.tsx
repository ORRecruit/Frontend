"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { getIndustryStats } from "@/api/adminStats/industryStats";
import CustomLoader from "@/components/customLoader";

export default function PieChart() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get industry stats"],
    queryFn: getIndustryStats,
  });

  const pieChartData = useMemo(() => {
    const baseData = [
      [
        "Category",
        "Count",
        { role: "tooltip", type: "string", p: { html: true } },
      ],
    ];

    if (!data) return baseData;

    const sortedData = Object.entries(data).sort(([keyA], [keyB]) => {
      if (keyA === "Other") return 1;
      if (keyB === "Other") return -1;
      return 0;
    });

    return [
      ...baseData,
      ...sortedData.map(([key, value]) => [
        key,
        value,
        `<div>${key} - ${value}</div>`,
      ]),
    ];
  }, [data]);

  const options = {
    title: "Jobs based on Industries",
    tooltip: { isHtml: true },
    pieSliceText: "value",
  };

  if (isLoading) return <CustomLoader />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Chart
        chartType="PieChart"
        data={pieChartData}
        options={options}
        width="100%"
        height="100%"
      />
    </div>
  );
}

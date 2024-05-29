"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { getIndustryStats } from "@/api/adminStats/industryStats";
import CustomLoader from "@/components/customLoader";

export default function PieChart() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get industry stats"],
    queryFn: () => getIndustryStats(),
  });

  const pieChartData: any[] = [
    [
      "Category",
      "Count",
      { role: "tooltip", type: "string", p: { html: true } },
    ],
  ];

  if (data) {
    for (const [key, value] of Object.entries(data)) {
      pieChartData.push([key, value, `<div>${key} - ${value}</div>`]);
    }
  }

  const options = {
    title: "Jobs based on Industries",
    tooltip: { isHtml: true },
    pieSliceText: "value",
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={options}
          width={"100%"}
          height={"300px"}
        />
      )}
    </div>
  );
}

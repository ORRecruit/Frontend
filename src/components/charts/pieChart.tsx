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
    const sortedData = Object.entries(data).sort(([keyA], [keyB]) => {
      if (keyA === "Other") return 1;
      if (keyB === "Other") return -1;
      return 0;
    });

    for (const [key, value] of sortedData) {
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
    <div className="w-full h-[100%] flex justify-center items-center">
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={options}
          width={"100%"}
          height={"500px"} // Increase the height
        />
      )}
    </div>
  );
}

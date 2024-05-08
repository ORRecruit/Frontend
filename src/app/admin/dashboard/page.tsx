"use client";
import React from "react";
import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";
import { useQuery } from "@tanstack/react-query";
import { jobOverview } from "@/api/jobs/jobsOverview";

const page = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get overview details"],
    queryFn: () => jobOverview(),
  });

  const details = [
    {
      iconUrl: "/overviewAdmin1.svg",
      heading: "Open Positions",
      rating: data?.data?.openPositions || 0,
    },
    {
      iconUrl: "/overviewAdmin2.svg",
      heading: "Closed Positions",
      rating: data?.data?.closedPositions || 0,
    },
    {
      iconUrl: "/overviewAdmin3.svg",
      heading: "Time to Fill",
      rating: "10h, 2m",
    },
    {
      iconUrl: "/overviewAdmin4.svg",
      heading: "Acceptance Rate",
      rating: "34%",
    },
    {
      iconUrl: "/overviewAdmin5.svg",
      heading: "Revenue Generate",
      rating: "230k",
    },
  ];
  return (
    <div>
      <DashboardContent details={details} />
    </div>
  );
};

export default page;

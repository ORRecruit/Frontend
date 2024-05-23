"use client";
import React from "react";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";
import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";
import { useQuery } from "@tanstack/react-query";
import { jobOverview } from "@/api/jobs/jobsOverview";

const page = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get overview details"],
    queryFn: () => jobOverview(),
  });
  console.log("data", data);
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
      heading: "Covered Countries",
      rating: "Canada, USA",
    },
    {
      iconUrl: "/overviewAdmin4.svg",
      heading: "Industries",
      rating: "IT, Tourism",
    },
    {
      iconUrl: "/overviewAdmin5.svg",
      heading: "Total Candidates",
      rating: "50+",
    },
  ];
  const sidebarDetails = [
    {
      iconUrl: "/adminSidebar1.svg",
      text: "Overview",
      href: "#",
    },
    {
      iconUrl: "/adminSidebar2.svg",
      text: "Job Board",
      href: "/admin/dashboard/jobBoard",
    },
    {
      iconUrl: "/adminSidebar3.svg",
      text: "Users",
      href: "#",
    },
    {
      iconUrl: "/adminSidebar4.svg",
      text: "Activity Tracking",
      href: "#",
    },
    {
      iconUrl: "/adminSidebar5.svg",
      text: "Leads",
      href: "#",
    },
  ];
  return (
    <div className="bg-dashboard w-full">
      {/* <DashboardNavbar /> */}
      <div className="flex">
        {/* <DashboardSidebar sidebarDetails={sidebarDetails} /> */}
        <DashboardContent details={details} />
      </div>
    </div>
  );
};

export default page;

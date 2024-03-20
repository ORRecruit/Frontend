import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";
import React from "react";

const overview = () => {
  const details = [
    {
      iconUrl: "/overview1.svg",
      heading: "Jobs Applied",
      rating: "$163.4k",
    },
    {
      iconUrl: "/overview2.svg",
      heading: "AI Searches",
      rating: "$82.1k",
    },
    {
      iconUrl: "/overview3.svg",
      heading: "Profile Views",
      rating: "$81.3k",
    },
    {
      iconUrl: "/overview4.svg",
      heading: "Interviews",
      rating: "68",
    },
  ];
  return (
    <div className="bg-dashboard h-screen w-full">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <DashboardContent details={details} />
      </div>
    </div>
  );
};

export default overview;

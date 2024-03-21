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
  const sidebarDetails = [
    {
      iconUrl: "/talendSidebar1.svg",
      text: "Overview",
      href: "#",
    },
    {
      iconUrl: "/talendSidebar2.svg",
      text: "Job Board",
      href: "#",
    },
    {
      iconUrl: "/talendSidebar3.svg",
      text: "My Resume",
      href: "#",
    },
    {
      iconUrl: "/talendSidebar4.svg",
      text: "Application Status",
      href: "#",
    },
    {
      iconUrl: "/talendSidebar5.svg",
      text: "Interviews",
      href: "#",
    },
  ];
  return (
    <div className="bg-dashboard h-screen w-full">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar sidebarDetails={sidebarDetails} />
        <DashboardContent details={details} />
      </div>
    </div>
  );
};

export default overview;

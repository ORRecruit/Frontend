import React from "react";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";
import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";

const page = () => {
  const details = [
    {
      iconUrl: "/overviewAdmin1.svg",
      heading: "Open Positions",
      rating: "123",
    },
    {
      iconUrl: "/overviewAdmin2.svg",
      heading: "Closed Positions",
      rating: "2134",
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
  const sidebarDetails = [
    {
      iconUrl: "/adminSidebar1.svg",
      text: "Overview",
      href: "#",
    },
    {
      iconUrl: "/adminSidebar2.svg",
      text: "Job Board",
      href: "/dashboard/adminDashboard/jobBoard",
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

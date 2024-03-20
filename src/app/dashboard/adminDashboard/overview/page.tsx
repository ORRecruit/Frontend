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

export default page;

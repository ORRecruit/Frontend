import React from "react";
import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";

const page = () => {
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
    <div>
      <DashboardContent details={details} />
    </div>
  );
};

export default page;

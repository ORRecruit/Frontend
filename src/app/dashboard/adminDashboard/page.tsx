import React from "react";
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
    <div>
      <DashboardContent details={details} />
    </div>
  );
};

export default page;

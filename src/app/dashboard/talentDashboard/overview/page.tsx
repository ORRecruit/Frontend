import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";
import React from "react";

const overview = () => {
  return (
    <div className="bg-dashboard h-screen w-full">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default overview;

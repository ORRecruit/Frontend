"use client";
import React from "react";
import DashboardContent from "@/components/dashboard/dashboardContent/dashboardContent";
import { useQuery } from "@tanstack/react-query";
import { jobOverview } from "@/api/jobs/jobsOverview";
import { totalCandidates } from "@/api/adminStats/totalCandidates";

const Page = () => {
  const {
    data: jobOverviewData,
    error: jobOverviewError,
    isLoading: isJobOverviewLoading,
    refetch: refetchJobOverview,
  } = useQuery({
    queryKey: ["get overview details"],
    queryFn: () => jobOverview(),
  });

  const {
    data: totalCandidatesData,
    error: totalCandidatesError,
    isLoading: isTotalCandidatesLoading,
    refetch: refetchTotalCandidates,
  } = useQuery({
    queryKey: ["get total candidates"],
    queryFn: () => totalCandidates(),
  });

  if (isJobOverviewLoading || isTotalCandidatesLoading) {
    return <div>Loading...</div>;
  }

  if (jobOverviewError || totalCandidatesError) {
    return (
      <div>
        Error: {jobOverviewError?.message || totalCandidatesError?.message}
      </div>
    );
  }

  const details = [
    {
      iconUrl: "/overviewAdmin1.svg",
      heading: "Open Positions",
      rating: jobOverviewData?.data?.openPositions || 0,
    },
    {
      iconUrl: "/overviewAdmin2.svg",
      heading: "Closed Positions",
      rating: jobOverviewData?.data?.closedPositions || 0,
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
      rating: `${totalCandidatesData?.totalCandidates || 0}`,
    },
  ];

  return (
    <div className="bg-dashboard w-full">
      <div className="flex">
        <DashboardContent details={details} />
      </div>
    </div>
  );
};

export default Page;

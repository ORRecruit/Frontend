// import AreaChart from "@/components/charts/areaCharts";
// import LineChart from "@/components/charts/lineChart";
"use client";
import BarChart from "@/components/charts/barChart";
import PieChart from "@/components/charts/pieChart";
import TierChart from "@/components/charts/tierChart";
import BarChartCreatedClients from "@/components/charts/barChartCreatedCandidates";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface OverviewInterface {
  details: {
    iconUrl: string;
    heading: string;
    rating: number | string;
  }[];
}

const DashboardContent: React.FC<OverviewInterface> = ({ details }) => {
  const pathname = usePathname();

  return (
    <div className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] h-[90%] overflow-auto">
      <div className="flex w-[99%] gap-4 flex-wrap lg:flex-nowrap">
        {details?.map((item, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-1"
          >
            <Image
              width={30}
              height={30}
              src={item.iconUrl}
              alt="icon"
              className="mb-4"
            />
            <Link href="#">
              <p>{item.heading}</p>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.rating}
              </h5>
            </Link>
          </div>
        ))}
      </div>
      {pathname?.includes("talent/dashboard") ? (
        <div></div>
      ) : (
        <div className="w-[99%] flex justify-between flex-wrap">
          <div className="w-[49%] mt-4">
            <GridItem title="Jobs Summary">
              <BarChart />
            </GridItem>
          </div>
          <div className="w-[49%] mt-4">
            <GridItem title="Jobs per Tiers">
              <TierChart />
            </GridItem>
          </div>
          <div className="w-[49%] mt-4">
            <GridItem title="Jobs per Industries">
              <PieChart />
            </GridItem>
          </div>
          <div className="w-[49%] mt-4">
            <GridItem title="Total Candidates Count">
              <BarChartCreatedClients />
            </GridItem>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;

interface GridItemProps {
  title: string;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-white h-[400px]">
      <h3 className="text-2xl font-semibold text-black mb-4">{title}</h3>
      {children}
    </div>
  );
};

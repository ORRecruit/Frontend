import React from "react";
import { useQuery } from "@tanstack/react-query";
import { winLoseStatsApi } from "@/api/statistics/winLoseApi";
import { PieChart, Pie, Cell } from "recharts";

const WinLoseDonutChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["win lose jobs stats"],
    queryFn: winLoseStatsApi,
  });

  if (isLoading) return <div>Loading...</div>;

  const chartData = data?.data;
  if (!chartData) return <div>No data available</div>;

  const roundedWinPercentage = Math.round(parseFloat(chartData.winPercentage));
  const roundedLosePercentage = 100 - roundedWinPercentage;

  const winLoseData = [
    { name: "Win", value: roundedWinPercentage },
    { name: "Lose", value: roundedLosePercentage },
  ];

  const COLORS = ["#FFA500", "#FFD700"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Jobs Win/Lose Statistics
      </h2>
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-lg font-semibold">Completed Jobs</p>
          <p className="text-4xl font-bold">{chartData.totalCompletedJobs}</p>
        </div>
        <div className="relative">
          <PieChart width={200} height={200}>
            <Pie
              data={winLoseData}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {winLoseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-sm font-semibold">Win Rate</p>
            <p className="text-xl font-bold">{roundedWinPercentage}%</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Success Rate</p>
          <p className="text-4xl font-bold text-green-500">
            {roundedWinPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinLoseDonutChart;

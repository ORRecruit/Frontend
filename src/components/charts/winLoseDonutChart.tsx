import { winLoseStatsApi } from "@/api/statistics/winLoseApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const WinLoseDonutChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["win lose jobs stats"],
    queryFn: () => winLoseStatsApi(),
  });

  useEffect(() => {
    if (data) {
      setChartData(data?.data);
    }
  }, [data]);

  if (!chartData) return <div>Loading...</div>;

  const winLoseData = [
    { name: "Win", value: parseFloat(chartData.winPercentage) },
    { name: "Lose", value: parseFloat(chartData.losePercentage) },
  ];

  const COLORS = ["#FFA500", "#FFD700"];

  return (
    <div className="flex items-center justify-center bg-white p-4 rounded-lg w-full max-w-3xl">
      <div className="flex-1 text-right pr-4">
        <p className="text-lg font-semibold">Completed Jobs</p>
        <p className="text-3xl font-bold">{chartData.totalCompletedJobs}</p>
      </div>
      <div className="relative">
        <PieChart width={200} height={200}>
          <Pie
            data={winLoseData}
            cx={100}
            cy={100}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {winLoseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-sm font-semibold">Win Rate</p>
          <p className="text-xl font-bold">{chartData.winPercentage}%</p>
        </div>
      </div>
      <div className="flex-1 text-left pl-4">
        <p className="text-lg font-semibold">Success Rate</p>
        <p className="text-3xl font-bold text-green-500">
          {chartData.winPercentage}%
        </p>
      </div>
    </div>
  );
};

export default WinLoseDonutChart;

import React from "react";

const stats = [
  { count: "73m+", label: "Jobs" },
  { count: "1B+", label: "Talented Individuals" },
  { count: "4M+", label: "Recruiters" },
];

const StatsComponent = () => {
  return (
    <div className="flex justify-center items-center space-x-10 py-4 bg-light-gray h-80">
      <div className="2xl:w-4/12 xl:w-4/12 lg:w-4/12 flex justify-between items-center">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-4xl font-bold">{stat.count}</p>
            <p className="text-xl text-text-gray">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsComponent;

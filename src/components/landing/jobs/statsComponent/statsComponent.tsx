import React from "react";

const stats = [
  { count: "73m+", label: "Jobs" },
  { count: "1B+", label: "Talented Individuals" },
  { count: "4M+", label: "Recruiters" },
];

const StatsComponent = () => {
  return (
    <section className="bg-light-gray my-[50px]">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold text-black">
                {stat.count}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default StatsComponent;

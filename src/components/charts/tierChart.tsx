"use client";
import React from "react";

const data = [
  { name: "Application", value: 6 },
  { name: "Phone Screen", value: 7 },
  { name: "Mgr Interview", value: 8 },
  { name: "Onsite Interview", value: 1 },
  { name: "Offer", value: 0 },
];

const colors = ["#1f77b4", "#ff7f0e", "#c7c7c7", "#ffbb78", "#1f77b4"];

const CustomBarChart = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <p
            className="bg-[#87207D] text-white font-bold py-4 px-6 flex justify-center items-center w-24 h-24"
            id="application"
          >
            6
          </p>
          <p className="text-lg mt-2 font-semibold text-black">Tier 1</p>
        </div>
        <div className="flex flex-col items-center">
          <p
            className="bg-orange-500 text-white font-bold py-4 px-6 flex justify-center items-center w-24 h-24"
            id="phone-screen"
          >
            7
          </p>
          <p className="text-lg mt-2 font-semibold text-black">Tier 2</p>
        </div>
        <div className="flex flex-col items-center">
          <p
            className="bg-[#16BDCA] text-white font-bold py-4 px-6 flex justify-center items-center w-24 h-24"
            id="mgr-interview"
          >
            8
          </p>
          <p className="text-lg mt-2 font-semibold text-black">Tier 3</p>
        </div>
        <div className="flex flex-col items-center">
          <p
            className="bg-[#1A56DB] text-white font-bold py-4 px-6 flex justify-center items-center w-24 h-24"
            id="mgr-interview"
          >
            12
          </p>
          <p className="text-lg mt-2 font-semibold text-black">Tier 3</p>
        </div>
      </div>
    </div>
  );
};

export default CustomBarChart;

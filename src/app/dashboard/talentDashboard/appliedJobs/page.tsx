import React from "react";
import JobsList from "./jobsList/jobsList";

const page = () => {
  return (
    <div className="bg-dashboard h-screen w-full">
      <div className="flex">
        <JobsList />
      </div>
    </div>
  );
};

export default page;

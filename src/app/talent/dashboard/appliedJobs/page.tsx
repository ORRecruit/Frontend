import React from "react";
import JobsList from "./jobsList/jobsList";

const page = () => {
  return (
    <div className="bg-dashboard h-fit w-full border border-red-500">
      <div className="flex">
        <JobsList />
      </div>
    </div>
  );
};

export default page;

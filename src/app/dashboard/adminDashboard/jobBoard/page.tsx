import React from "react";
import JobList from "./jobsList/jobList";

const page = () => {
  return (
    <div className="bg-dashboard w-full">
      <div className="flex">
        <JobList />
      </div>
    </div>
  );
};

export default page;

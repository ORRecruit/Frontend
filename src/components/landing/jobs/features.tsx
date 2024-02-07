import React from "react";
import JobCard from "./jobCard/jobCard";

const features = () => {
  const paragraphs: string[] = [
    "Highlight your company’s remote culture and specific hiring needs.",
    "Craft detailed remote job descriptions with our user-friendly tools.",
    "Receive a curated list of top candidates best suited for remote work.",
    "Review profiles, initiate conversations, and manage remote interviews all through our platform.",
  ];
  const titles: string[] = [
    "Create Your Employer Profile",
    "Post Remote Job Listings",
    "AI-Enhanced Matches",
    "Efficient Candidate Engagement",
  ];
  return (
    <>
      <div className="w-full mx-auto bg-bg-service py-28 mt-20">
        <div className="w-4/5 mx-auto 2xl:w-4/5">
          <div className="mb-12">
            <p className="text-3xl	font-bold mb-2">How it Works</p>
            <p className="w-4/5	text-xl font-normal">
              Seamlessly Navigate Your Remote Hiring Journey:
            </p>
          </div>
          <div className="flex flex-wrap	justify-between">
            {paragraphs.map((paragraph, index) => (
              <JobCard paragraphText={paragraph} title={titles[index]} />
            ))}
          </div>
          <button
            type="button"
            className="ml-4 w-40 h-14 flex justify-between items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-orange-600 my-3"
          >
            Get started
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-base font-medium"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default features;

import { createMarkup, removeDoubleQuotes } from "@/utils/utils";
import React from "react";

type JobModalProps = {
  data: any;
  closeDialog: () => void;
};

const jobDetailModal: React.FC<JobModalProps> = ({ data, closeDialog }) => {
  return (
    <div className="relative bg-white px-2 sm:px-5 p-5 rounded-lg max-w-4xl w-full border border-black-400 overflow-hidden py-8">
      <div className="bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-black">{data?.title}</h1>
          </div>
          <div className="text-lg font-semibold text-black dark:text-black">
            ORR-
            {data?.industry?.slice(0, 4)}
            -00
            {data?.id}
          </div>

          <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
            {data?.type}
          </span>
        </div>

        <div className="mb-5">
          <p className="text-gray-600">{data?.location}</p>
          <p className="text-lg font-extrabold text-gray-900 dark:text-white">
            {removeDoubleQuotes(data.salaryOffered) + " "}
            {data.currencyType} / {data.jobType}
          </p>
          <p className="font-light text-gray-500 dark:text-gray-400">
            {data?.qualification}
          </p>
          <p className="font-light text-gray-500 dark:text-gray-400">
            {data?.contractType}
          </p>
          <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
            {data?.experienceRequired} Yrs
          </p>
        </div>

        <div className="overflow-y-auto max-h-[320px]">
          <h2 className="text-lg text-gray-700 font-bold mb-2">
            Job Description
          </h2>
          <div className="text-gray-700 mb-2">
            <p dangerouslySetInnerHTML={createMarkup(data?.description)} />
            <br />
          </div>

          <h3 className="text-lg text-gray-700 font-bold mb-2">
            Responsibilities
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-2">
            <p dangerouslySetInnerHTML={createMarkup(data?.responsibilities)} />
          </ul>
          <div className="text-gray-700 mb-2">
            <h3 className="text-lg font-bold mb-2">Requirements</h3>
            <p
              className="list-disc list-inside text-gray-700 mb-2"
              dangerouslySetInnerHTML={createMarkup(data?.requirements)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={closeDialog}
        className="absolute top-0 right-0 p-8 text-black bg-transparent text-2xl"
      >
        &times;{" "}
      </button>
    </div>
  );
};

export default jobDetailModal;

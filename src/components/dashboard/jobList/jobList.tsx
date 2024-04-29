import React from "react";

const JobList: React.FC<any> = ({ data, closeDialog }) => {
  console.log("data", data);
  return (
    <div>
      <div className="relative bg-white p-5 rounded-lg max-w-3xl w-full border border-black-400">
        <div className="bg-white rounded-lg">
          <div className="mb-5">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">
                ORR-
                {data?.industry?.slice(0, 4)}
                -00
                {data?.id}
              </h1>
            </div>
            <div className="font-light text-lg font-semibold text-gray-500 dark:text-gray-400">
              {data?.title}
            </div>

            <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
              {data?.type}
            </span>
          </div>

          <div className="mb-5">
            <p className="text-gray-600">{data?.location}</p>
            <p className="text-lg font-extrabold text-gray-900 dark:text-white">
              {data?.saleryOffered + " "}
              {data?.currencyType} /{" "}
              {data?.jobType?.slice(0, data?.jobType?.length - 2)}
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

          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <div className="text-gray-700 mb-2">
            <p>{data?.description}</p>
            <br />
          </div>

          <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 mb-2">
            <p>{data?.responsibilities}</p>
          </ul>
          <div className="text-gray-700 mb-2">
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              {data?.requirements}
            </ul>
          </div>
        </div>
        {closeDialog && (
          <button
            onClick={closeDialog}
            className="absolute top-0 right-0 p-8 text-lg text-black bg-transparent text-2xl"
          >
            &times;{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobList;

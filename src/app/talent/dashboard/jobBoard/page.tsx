"use client";
import React, { useEffect, useState } from "react";
import FilterHeaderJobBoard from "@/components/landing/filterHeaderJobBoard/filterHeaderJobBoard";
import { getAllJobs } from "@/api/jobs/getAllJobs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { applyJob as applyJobApi } from "@/api/talent/applyJob";

const page = () => {
  const [appliedRes, setAppliedRes] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<any>({});
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getAllJobs(),
  });

  const searchParams = useSearchParams();

  const params = searchParams.get("jobId");
  console.log("params...", params);

  const applyJobMutation = useMutation({
    mutationFn: (data: any) => applyJobApi(data),
  });

  useEffect(() => {
    // const candidateId = localStorage.getItem("candidateId");
    // if (!candidateId) {
    //   router.push("/dashboard/talentForm/resume-upload");
    //   return;
    // }
    console.log("data....", data?.data);
    if (params) {
      const queryJobData = data?.data?.filter((item: any) => item.id == params);
      queryJobData?.length
        ? setSelectedValue(queryJobData[0])
        : setSelectedValue(data?.data[0]);
    } else {
      setSelectedValue(data?.data[0]);
    }
  }, [data]);

  const selectedJob = (item: any) => {
    console.log("item...", item);
    setSelectedValue(item);
  };

  const applyJob = async (jobId: any) => {
    const response = await applyJobMutation.mutateAsync(jobId);
    if (response) {
      console.log("response", response);
      setAppliedRes(true);
      setSuccessMessage(response.message);
      setTimeout(() => {
        setAppliedRes(false);
        setSuccessMessage("");
      }, 2000);
    }
  };

  return (
    <div className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <FilterHeaderJobBoard />
      <div className="max-w-screen-xl sm:flex items-start justify-between mx-auto p-4 relative">
        {appliedRes ? (
          <p className="absolute top-0 right-[40%] w-[330px] px-8 py-2 rounded-2xl text-base shadow-lg z-10 mt-2 text-black bg-white">
            {successMessage}
          </p>
        ) : (
          ""
        )}
        <div className="sm:w-[29%] h-[350px] sm:h-auto overflow-auto mt-12 max-h-[65rem]">
          {data?.data?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() => selectedJob(item)}
                className="self-center w-full border border-black-400 p-4 mb-6 rounded-2xl hover:bg-gray-200 hover:cursor-pointer"
              >
                <div className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </div>
                <div className="font-light text-gray-500 dark:text-gray-400">
                  {item.location}
                </div>
                <div className="mb-4 text-lg font-extrabold text-gray-900 dark:text-white">
                  {item.saleryOffered}k
                </div>

                <div className="mb-5">
                  <button
                    type="button"
                    className="text-black-400 hover:text-white border border-gray-800 bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    {item.type}
                  </button>
                  <button
                    type="button"
                    className="text-black-400 hover:text-white border border-gray-800 bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    {item.location}
                  </button>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="p-8 bg-white rounded-lg mt-8 sm:w-[68%]">
          <div className="mb-5">
            <h1 className="text-3xl font-bold">{selectedValue?.title}</h1>
            <div className="mb-0 text-xl font-semibold text-gray-900 dark:text-white">
              ORR-{selectedValue?.industry?.slice(0, 4)}-00{selectedValue?.id}
            </div>
            <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
              {selectedValue?.type}
            </span>
          </div>
          <button
            type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[120px] h-[40px] mt-[20px] sm:w-fit sm:h-fit sm:mt-0"
            onClick={() => applyJob(selectedValue?.id)}
          >
            Apply Now
          </button>

          <div className="mb-5">
            <p className="text-gray-600">{selectedValue?.location}</p>
            <p className="text-gray-600">{selectedValue?.type}</p>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {selectedValue?.contractType}
            </p>
            <p className="font-semibold text-gray-900">
              {selectedValue?.saleryOffered}k
            </p>
          </div>

          <h2 className="text-lg font-semibold mb-4">Job Description</h2>
          <p className="text-gray-700 mb-8">{selectedValue?.description}</p>

          <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 mb-8">
            <p>{selectedValue?.responsibilities}</p>
          </ul>

          <h3 className="text-lg font-semibold mb-3">Requirements</h3>
          <ul className="list-disc list-inside text-gray-700 mb-8">
            <p>{selectedValue?.requirements}</p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;

"use client";
import React, { useEffect, useState } from "react";
import FilterHeaderJobBoard from "@/components/landing/filterHeaderJobBoard/filterHeaderJobBoard";
import { getAllJobs } from "@/api/jobs/getAllJobs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { applyJob as applyJobApi } from "@/api/talent/applyJob";
import CustomLoader from "@/components/customLoader";
import { createMarkup, formatString } from "@/utils/utils";
import { RiCloseLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const page = () => {
  const [appliedRes, setAppliedRes] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<any>({});
  const [title, setTitle] = useState<string>("");
  const [publishDialog, setPublishDialog] = useState<any>(false);
  const [applyNow, setApplyNow] = useState<boolean>(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getAllJobs(`title=${title}`),
  });

  const searchParams = useSearchParams();

  const params = searchParams.get("jobId");
  console.log("params...", params);

  const applyJobMutation = useMutation({
    mutationFn: (data: any) => applyJobApi(data),
  });

  useEffect(() => {
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
    try {
      setApplyNow(!applyNow);
      const response = await applyJobMutation.mutateAsync(jobId?.id);
      if (response) {
        console.log("response", response);
        setPublishDialog(!publishDialog);
        setApplyNow(!applyNow);
        toast.success("You have applied to the job successfully.");
      }
    } catch (err: any) {
      if (err?.message) {
        console.log("err.message", err);
        toast.error(err?.response?.data?.message);
      }
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
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className="max-w-screen-xl sm:flex sm:items-start sm:justify-between mx-auto p-4">
            <div className="sm:w-[29%] h-[350px] sm:h-auto overflow-auto mt-6 max-h-[65rem]">
              {data?.data?.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="border border-black-400 p-4 mb-6 rounded-2xl bg-white hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => selectedJob(item)}
                  >
                    <div className="mb-0 text-xl font-semibold text-gray-900 dark:text-white">
                      {item?.title}{" "}
                    </div>
                    <div className="font-light text-lg text-gray-500 dark:text-gray-400">
                      ORR-{item?.industry?.slice(0, 4)}-00{item?.id}
                    </div>
                    <div className="inline-block font-light text-gray-500 dark:text-gray-400 bg-primary-orange text-white w-fit px-2 py-1 rounded-2xl my-2 mr-2">
                      {formatString(`${item.jobVenue}`)}
                    </div>
                    <div className="inline-block font-light text-gray-500 dark:text-gray-400 bg-primary-orange text-white w-fit px-2 py-1 rounded-2xl my-2">
                      {formatString(`${item.contractType}`)}
                    </div>
                    <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {item.salaryOffered?.replace(/"/g, "") + " "}{" "}
                      {item.currencyType} / {item.jobType}
                    </div>
                    <div className="font-light text-gray-500 dark:text-gray-400">
                      {item.location}
                    </div>
                    <div className="mb-4 font-light text-gray-500 dark:text-gray-400">
                      {item.experienceRequired} Yrs
                    </div>
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      dangerouslySetInnerHTML={createMarkup(
                        item?.description?.slice(0, 200)
                      )}
                    />
                  </div>
                );
              })}
            </div>
            {selectedValue ? (
              <div className="bg-white rounded-lg mt-4 sm:w-[68%] sm:p-8">
                <div className="mb-5">
                  <div className="flex justify-between relative">
                    <h1 className="text-3xl font-bold">
                      {selectedValue?.title}
                    </h1>
                    <button
                      type="button"
                      className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[135px] h-[40px] mt-[20px] sm:w-fit sm:h-fit sm:mt-0 sm:w-[150px]"
                      onClick={() => setPublishDialog(!publishDialog)}
                    >
                      Apply Now
                    </button>
                  </div>
                  <div className="font-light text-xl font-semibold text-gray-500 dark:text-gray-400">
                    ORR-{selectedValue?.industry?.slice(0, 4)}-00
                    {selectedValue?.id}
                  </div>
                </div>

                {publishDialog && (
                  <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                      <div className="absolute top-2 right-3">
                        <RiCloseLine
                          size={25}
                          onClick={() => {
                            setPublishDialog(!publishDialog);
                            setApplyNow(false);
                          }}
                        />
                      </div>
                      <div className="bg-white rounded-lg flex flex-col items-center">
                        <p className="text-gray-600 text-xl mb-4">
                          Are You Sure Want To Apply For The Job?
                        </p>
                        <div>
                          {!applyNow ? (
                            <button
                              onClick={() => applyJob(selectedValue)}
                              className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                            >
                              Yes
                            </button>
                          ) : (
                            <div className="mt-4">
                              <RotatingLines
                                visible={true}
                                width="50"
                                strokeColor="orange"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-5">
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {selectedValue?.salaryOffered?.replace(/"/g, "") + " "}{" "}
                    {selectedValue?.currencyType} / {selectedValue?.jobType}
                  </p>
                  <p className="inline-block font-light text-gray-500 dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                    {formatString(`${selectedValue?.jobVenue}`)}
                  </p>
                  <p className="inline-block font-light text-gray-500 dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                    {formatString(`${selectedValue?.contractType}`)}
                  </p>
                  <p className="font-light text-gray-500 dark:text-gray-400">
                    {selectedValue?.location}
                  </p>
                  <p className="font-light text-gray-500 dark:text-gray-400">
                    {selectedValue?.qualification}
                  </p>
                  <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                    {selectedValue?.experienceRequired} Yrs
                  </p>
                </div>

                <h2 className="text-lg font-semibold mb-4">Job Description</h2>
                <div
                  className="text-gray-700 mb-8 job-description-content"
                  dangerouslySetInnerHTML={createMarkup(
                    selectedValue?.description
                  )}
                />

                <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                <div
                  className="text-gray-700 mb-8 job-description-content"
                  dangerouslySetInnerHTML={createMarkup(
                    selectedValue?.responsibilities
                  )}
                />
                <div className="text-gray-700 mb-8">
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <div
                    className="text-gray-700 mb-8 job-description-content"
                    dangerouslySetInnerHTML={createMarkup(
                      selectedValue?.requirements
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full mt-20">
                <p className="text-2xl font-semibold my-3 text-center text-black">
                  No job found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

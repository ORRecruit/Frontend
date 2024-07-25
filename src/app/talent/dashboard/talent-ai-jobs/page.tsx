"use client";
import React, { useState } from "react";
import CustomLoader from "@/components/customLoader";
import { formatString } from "@/utils/utils";
import JobDetailModal from "@/components/modals/jobDetailModal";
import { getMatchingJobsCandidate } from "@/api/applicants/getMatchingJobsCandidates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RiCloseLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { applyJob as applyJobApi } from "@/api/talent/applyJob";
import toast from "react-hot-toast";
import useToggleStore from "@/app/toggleStore";

const page = () => {
  const [candidateId, setCandidateId] = React.useState<any>(null);
  React.useEffect(() => {
    const id: any = localStorage.getItem("candidateId");
    setCandidateId(parseInt(id));
  }, []);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getMatchingJobsCandidate(candidateId),
  });
  console.log("datadatadatadata", data);

  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [applyNow, setApplyNow] = React.useState(false);
  const [publishDialog, setPublishDialog] = useState<any>(false);
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);

  const openDetailModal = (item: any) => {
    setIsDialogOpen(!isDialogOpen);
    setSelectedItem(item);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const applyJobMutation = useMutation({
    mutationFn: (data: any) => applyJobApi(data),
  });

  const applyJob = async (jobId: any) => {
    console.log("id..id...", jobId);
    try {
      setApplyNow(!applyNow);
      const response = await applyJobMutation.mutateAsync(jobId);
      if (response) {
        console.log("response", response);
        setApplyNow(false);
        setPublishDialog(!publishDialog);
        toast.success("You have applied to the job successfully.");
      }
    } catch (err: any) {
      if (err) {
        console.log("err.message", err);
        toast.error(err?.response?.data?.message);
        setApplyNow(false);
        setPublishDialog(false);
      }
    }
  };

  const applyNowFunction = (job: any) => {
    setPublishDialog(!publishDialog);
    setSelectedItem(job?.job);
  };

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-y-auto overflow-x-hidden bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[20px]"
      }`}
    >
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="mx-auto w-full px-4 lg:px-12">
          <div className="relative sm:rounded-lg overflow-hidden w-full">
            {data?.matchingJobResults
              ?.sort(
                (a: any, b: any) =>
                  b?.result?.relevancy_score - a?.result?.relevancy_score
              )
              ?.map((job: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full mx-auto max-h-[300px] mb-4 px-16"
                  >
                    <div className="flex">
                      <div className="w-[30%]">
                        <p
                          className="text-2xl font-bold cursor-pointer"
                          onClick={() => openDetailModal(job?.job)}
                        >
                          {job?.job?.title}
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {job?.job?.salaryOffered?.replace(/"/g, "") + " "}{" "}
                          {job?.job?.currencyType} / {job?.job?.jobType}
                        </p>
                        <p className="inline-block font-light dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                          {formatString(`${job?.job?.jobVenue}`)}
                        </p>
                        <p className="inline-block font-light dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                          {formatString(`${job?.job?.contractType}`)}
                        </p>

                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {job?.job?.companyName}
                        </p>
                      </div>
                      <div className="w-[65%] mx-auto relative">
                        <button
                          type="button"
                          className="text-white font-small rounded-lg text-sm sm:px-2 sm:py-2 text-center bg-primary-orange w-[90px] h-[28px] mt-[20px] sm:h-fit sm:mt-0 sm:w-[150px] absolute right-0 top-0"
                          onClick={() => applyNowFunction(job)}
                        >
                          Apply Now
                        </button>
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
                                      onClick={() => applyJob(selectedItem?.id)}
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
                        <div className="text-lg font-semibold mb-1">
                          AI Feedback
                        </div>
                        <div>
                          <div>
                            <span className="text-base font-semibold mb-1">
                              Relevancy Score:
                            </span>
                            <span className="text-gray-600 mb-4">
                              {" " + job?.result.relevancy_score}%
                            </span>
                          </div>
                          <div>
                            <span className="text-base font-semibold mb-1">
                              Recommendation:
                            </span>
                            <span className="text-gray-600 mb-4">
                              {"" + job?.result?.recommended === "yes"
                                ? "Yes"
                                : "No"}
                            </span>
                          </div>
                          <div>
                            <span className="text-base font-semibold mb-1">
                              Reason:
                            </span>
                            <span className="text-gray-600 mb-4">
                              {" " + job?.result.explanation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {isDialogOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
              <JobDetailModal data={selectedItem} closeDialog={closeDialog} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;

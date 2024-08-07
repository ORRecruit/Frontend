"use client";
import React, { useEffect, useRef, useState } from "react";
import About from "@/components/landing/about/about";
import Footer from "@/components/landing/footer/footer";
import { getAllJobs } from "@/api/jobs/getAllJobs";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import CustomLoader from "@/components/customLoader";
import { isAuthTokenExpired } from "../isAuthTokenExpired";
import DOMPurify from "dompurify";
import { formatString } from "@/utils/utils";
import JobDetailModal from "@/components/modals/jobDetailModal";

const useMediaQuery = (query: any) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobIdFromURL: any = useRef(searchParams.get("jobId"));

  const [title, setTitle] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [filter, setFilter] = useState<boolean>(false);
  const [jobVenue, setJobVenue] = useState<string>("");
  const [contractType, setContractType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const locations = ["USA", "Canada", "Dubai"];
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 639px)");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian", title, contractType, jobVenue, location],
    queryFn: () =>
      getAllJobs(
        `title=${title}`,
        `contractType=${contractType}`,
        `jobVenue=${jobVenue}`,
        `location=${location}`
      ),
  });

  const [showOptions, setShowOptions] = useState<string | null | any>(null);

  useEffect(() => {
    if (data?.data) {
      if (jobIdFromURL.current) {
        const jobToSelect = jobIdFromURL.current
          ? data.data.find((job) => job.id.toString() === jobIdFromURL.current)
          : data.data[0];
        setSelectedValue(jobToSelect);
        router.push(`/job-board?jobId=${jobIdFromURL.current}`);
      } else {
        setSelectedValue(data.data[0]);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("value updated", selectedValue, jobIdFromURL.current);
  }, [selectedValue]);

  const selectedJob = (item: any) => {
    setSelectedValue(item);
    setIsDialogOpen(!isDialogOpen);
    jobIdFromURL.current = item?.id.toString();
    router.push(`/job-board?jobId=${item?.id}`);
  };

  const applyJob = (item: any) => {
    const role = localStorage.getItem("role");
    const authToken = localStorage.getItem("authToken");
    if (role === "candidate" && !isAuthTokenExpired(authToken!)) {
      router.push(`/talent/dashboard/jobBoard?jobId=${item?.id}`);
    } else {
      router.push(`/auth/signin`);
    }
  };

  const easyApply = (jobId: any) => {
    router.push(`/easy-apply?jobId=${jobId}`);
  };

  const createMarkup = (htmlContent: any) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filterJobs = (e: any) => {
    setTitle(e.target.value);
    refetch();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    refetch();
  };

  const resetFilters = () => {
    setTitle("");
    setContractType("");
    setJobVenue("");
    setLocation("");
    refetch();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div>
        <div>
          <section className="flex">
            <div className="w-full max-w-screen-xl px-4 mx-auto">
              <div className="relative px-0 sm:px-4 bg-white dark:bg-gray-800 sm:rounded-lg">
                <div className="flex items-center justify-between pt-0 sm:pt-4 pb-2 sm:pb-0 md:pb-4">
                  <div className="flex items-center justify-center sm:justify-start flex-1 space-x-2">
                    <h5>
                      <span className="text-black dark:text-white">
                        Find Jobs
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="flex flex-col items-stretch justify-between pb-4 space-y-3 sm:flex-row sm:items-center sm:space-y-0">
                  <div className="flex flex-col w-full space-y-3 lg:w-2/3 sm:space-y-0 sm:flex-row sm:items-center">
                    <form className="flex-1 w-full sm:max-w-sm sm:mr-4">
                      <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="default-search"
                          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search..."
                          onChange={filterJobs}
                          value={title}
                        />
                      </div>
                    </form>
                    <div className="flex items-center sm:space-x-4">
                      <div className="w-full">
                        <button
                          id="filterDropdownButton"
                          data-dropdown-toggle="filterDropdown"
                          type="button"
                          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          onClick={() => setFilter(!filter)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                            />
                          </svg>
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {filter && (
                  <div className="flex mt-2 mb-2">
                    <div className="flex items-center">
                      <select
                        id="jobVenue"
                        name="jobVenue"
                        className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={jobVenue}
                        onChange={(e) => setJobVenue(e.target.value)}
                      >
                        <option disabled value="">
                          Job Venue
                        </option>
                        <option value="onsite">On Site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <select
                        id="contractType"
                        name="contractType"
                        className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                      >
                        <option disabled value="">
                          Contract Type
                        </option>
                        <option value="partTime">Part Time</option>
                        <option value="fullTime">Full Time</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <select
                        id="location"
                        name="location"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={location}
                        onChange={handleLocationChange}
                      >
                        <option disabled value="">
                          Location
                        </option>
                        {locations?.map((loc, index) => (
                          <option key={index} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="text-white font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[135px] h-[40px] ml-2 mt-[20px] sm:w-fit sm:mt-0 sm:w-[150px]"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap pt-1 pb-4 border-t dark:border-gray-700"></div>
              </div>
            </div>
          </section>
        </div>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className="max-w-screen-xl sm:flex sm:items-start sm:justify-between mx-auto px-2 sm:px-4 py-4">
            <div className="custom-scrollbar sm:w-[29%] h-auto overflow-auto mt-12 max-h-[65rem]">
              {data?.data
                ?.sort((a, b) => b.id - a.id)
                ?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="border border-black-400 p-4 mb-6 rounded-2xl hover:bg-gray-200 hover:cursor-pointer"
                      onClick={() => selectedJob(item)}
                    >
                      <div className="mb-0 text-xl font-semibold text-gray-900 dark:text-white">
                        {item?.title}{" "}
                      </div>
                      <div className="font-light text-lg text-gray-500 dark:text-gray-400">
                        ORR-{item?.industry?.slice(0, 4)}-00{item?.id}
                      </div>
                      <div className="font-light text-white dark:text-gray-400 bg-primary-orange w-fit px-2 py-1 rounded-2xl my-2 hidden sm:inline-block">
                        {formatString(`${item.jobVenue}`)}
                      </div>
                      <div className="inline-block font-light text-white dark:text-gray-400 bg-primary-orange w-fit px-2 py-1 rounded-2xl my-2 mr-2">
                        {formatString(`${item.contractType}`)}
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowOptions(
                            showOptions === item.id ? null : item.id
                          );
                          setSelectedValue(item);
                        }}
                        className="relative inline-block font-light text-white dark:text-gray-400 bg-primary-orange w-fit px-2 py-1 rounded-2xl my-2 sm:hidden"
                      >
                        Apply Now
                        {showOptions === item.id && (
                          <div className="absolute right-0 mt-2 w-[210px] top-[30px] sm:top-[45px]">
                            <button
                              type="button"
                              className="text-orange font-medium rounded-lg text-xs sm:text-sm px-0 sm:px-5 py-2 text-center border-2 border-orange-600 bg-gray-100 w-[150px] mb-1"
                              onClick={() => easyApply(selectedValue?.id)}
                            >
                              Easy Apply
                            </button>
                            <button
                              type="button"
                              className="text-orange font-medium rounded-lg text-xs sm:text-sm px-0 sm:px-5 py-2 text-center border-2 border-orange-600 bg-gray-100 w-[150px]"
                              onClick={() => {
                                applyJob(selectedValue);
                              }}
                            >
                              Apply from Account
                            </button>
                          </div>
                        )}
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
            {isDialogOpen && isMobile && (
              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                <JobDetailModal
                  data={selectedValue}
                  closeDialog={closeDialog}
                />
              </div>
            )}
            {selectedValue ? (
              <div className="bg-white rounded-lg mt-4 sm:w-[68%] sm:p-8 hidden sm:block">
                <div className="mb-5">
                  <div className="flex justify-between relative">
                    <h1 className="text-3xl font-bold">
                      {selectedValue?.title}
                    </h1>
                    <button
                      type="button"
                      className="text-white font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[135px] h-[40px] mt-[20px] sm:w-fit sm:h-fit sm:mt-0 sm:w-[150px]"
                      onClick={() =>
                        setShowOptions(
                          showOptions === selectedValue.id
                            ? null
                            : selectedValue.id
                        )
                      }
                    >
                      Apply Now
                    </button>
                    {showOptions === selectedValue.id && (
                      <div className="absolute right-0 mt-2 w-[210px] top-[60px] sm:top-[45px]">
                        <button
                          type="button"
                          className="text-orange font-medium rounded-lg text-sm px-5 py-2 text-center border-2 border-orange-600 bg-gray-100 w-[200px] mb-1"
                          onClick={() => easyApply(selectedValue?.id)}
                        >
                          Easy Apply
                        </button>
                        <button
                          type="button"
                          className="text-orange font-medium rounded-lg text-sm px-5 py-2 text-center border-2 border-orange-600 bg-gray-100 w-[200px]"
                          onClick={() => {
                            applyJob(selectedValue);
                          }}
                        >
                          Apply from Account
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                    ORR-{selectedValue?.industry?.slice(0, 4)}-00
                    {selectedValue?.id}
                  </div>
                </div>
                <div className="mb-5">
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {selectedValue?.salaryOffered?.replace(/"/g, "") + " "}{" "}
                    {selectedValue?.currencyType} / {selectedValue?.jobType}
                  </p>
                  <p className="text-lg font-base text-gray-500 dark:text-gray-400">
                    {selectedValue?.companyName}
                  </p>
                  <p className="inline-block font-light dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
                    {formatString(`${selectedValue?.jobVenue}`)}
                  </p>
                  <p className="inline-block font-light dark:text-gray-400 bg-primary-orange text-white w-fit px-6 py-1 rounded-2xl my-2 mr-2">
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
        <About height="473px" backgroundImage="" />
        <Footer />
      </div>
    </div>
  );
};

export default page;

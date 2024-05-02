"use client";
import Navbar from "@/components/landing/navbar/navbar";
import React, { useEffect, useRef, useState } from "react";
import FilterHeaderJobBoard from "@/components/landing/filterHeaderJobBoard/filterHeaderJobBoard";
import About from "@/components/landing/about/about";
import Footer from "@/components/landing/footer/footer";
import { getAllJobs } from "@/api/jobs/getAllJobs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CustomLoader from "@/components/customLoader";
import { isAuthTokenExpired } from "../isAuthTokenExpired";
import DOMPurify from "dompurify";
const page = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<any>({});
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getAllJobs(),
  });

  const staticSalary = ["20 - 40 CAD / Hour", "60K AED / Month"];

  useEffect(() => {
    console.log("data....", data?.data);
    setSelectedValue(data?.data[0]);
  }, [data]);

  const selectedJob = (item: any) => {
    console.log("item...", item);
    setSelectedValue(item);
  };

  const applyJob = (item: any) => {
    const role = localStorage.getItem("role");
    const authToken = localStorage.getItem("authToken");
    if (role === "Candidate" && !isAuthTokenExpired(authToken!)) {
      router.push("/talent/dashboard");
    } else {
      router.push(`/auth/signin`);
    }
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

  return (
    <div>
      <div>
        <Navbar scrollToBottom={scrollToBottom} />
        <FilterHeaderJobBoard />
        {isLoading ? (
          <CustomLoader />
        ) : (
          <div className="max-w-screen-xl sm:flex sm:items-start sm:justify-between mx-auto p-4">
            <div className="sm:w-[29%] h-[350px] sm:h-auto overflow-auto mt-12 max-h-[65rem]">
              {data?.data?.map((item: any, index: any) => {
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
                    <div className="font-light text-gray-500 dark:text-gray-400">
                      {item.jobVenue} - {item.contractType}
                    </div>
                    <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {item.salaryOffered.replace(/"/g, '') + " "} {item.currencyType} /{" "}
                      {item.jobType}
                    </div>
                    <div className="font-light text-gray-500 dark:text-gray-400">
                      {item.qualification}
                    </div>
                    <div className="mb-4 font-light text-gray-500 dark:text-gray-400">
                      {item.experienceRequired} Yrs
                    </div>

                    <div className="mb-5">
                      <button
                        type="button"
                        className="text-black-400 hover:text-white border border-gray-800 bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                      >
                        {item.jobVenue}
                      </button>
                      <button
                        type="button"
                        className="text-black-400 hover:text-white border border-gray-800 bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                      >
                        {item.contractType}
                      </button>
                    </div>

                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      dangerouslySetInnerHTML={createMarkup(
                        selectedValue?.description?.slice(0, 200)
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-white rounded-lg mt-4 sm:w-[68%] sm:p-8">
              <div className="mb-5">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold">{selectedValue?.title}</h1>
                  <button
                    type="button"
                    className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[135px] h-[40px] mt-[20px] sm:w-fit sm:h-fit sm:mt-0"
                    onClick={() => applyJob(selectedValue)}
                  >
                    Apply Now
                  </button>
                </div>
                <div className="font-light text-xl font-semibold text-gray-500 dark:text-gray-400">
                  ORR-{selectedValue?.industry?.slice(0, 4)}-00
                  {selectedValue?.id}
                </div>

                {/* <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
                  {selectedValue?.type}
                </span> */}
              </div>

              <div className="mb-5">
              <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {selectedValue?.salaryOffered.replace(/"/g, '') + " "} {selectedValue?.currencyType} /{" "}
                      {selectedValue?.jobType}
                </p>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  {/* {selectedValue?.salaryOffered + " "}{" "}
                  {selectedValue?.currencyType} /{" "}
                  {selectedValue?.jobType?.slice(
                    0,
                    selectedValue?.jobType?.length - 2
                  )} */}
                  {/* {staticSalary[selectedValue?.id - 1]} */}
                  {selectedValue?.jobVenue} - {selectedValue?.contractType}
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
              <ul className="list-disc list-inside text-gray-700 mb-8">
                <p>{selectedValue?.responsibilities}</p>
              </ul>
              <div className="text-gray-700 mb-8">
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 mb-8">
                  {selectedValue?.requirements}
                </ul>
              </div>
            </div>
          </div>
        )}
        <About height="473px" backgroundImage="" />
        <Footer />
      </div>
    </div>
  );
};

export default page;

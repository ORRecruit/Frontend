"use client";
import React, { useState } from "react";
import useToggleStore from "@/app/toggleStore";
import { useMutation } from "@tanstack/react-query";
import CustomLoader from "@/components/customLoader";
import { scrapMatchResume } from "@/api/Scrapping/scrapMatchResume";
import toast from "react-hot-toast";
import Link from "next/link";
import ResumeTemplate from "@/components/templates/ResumeTemplate";
import { pdf } from "@react-pdf/renderer";
import saveAs from "file-saver";
import { geoIds } from "@/constants/geoIds";

const Page = () => {
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);
  const [toggleCards, setToggleCards] = React.useState<boolean>(false);
  const [jobsData, setJobsData] = React.useState<any>(null);
  const [viewDetails, setViewDetails] = useState<any>(null);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [itemReason, setItemReason] = React.useState<any>(null);

  const viewReason = (item: any) => {
    console.log("item,.....", item, viewDetails);
    setSelectedItem(item?.profile);
    setViewDetails(
      viewDetails === item?.profile?.id ? null : item?.profile?.id
    );
    setItemReason(item?.result);
    console.log("item", selectedItem, viewDetails, itemReason);
  };

  const closeResaonDialog = () => {
    setViewDetails(false);
  };

  const [formData, setFormData] = useState<any>({
    field: "",
    geoId: "",
    page: "",
    sortBy: "day",
    jobType: "temporary",
    expLevel: "internship",
    workType: "temporary",
    resume: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const scrapMatchResumeMutation = useMutation({
    mutationFn: (formData: FormData) => scrapMatchResume(formData),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleScrap = async () => {
    const payloadData = new FormData();

    payloadData.append("field", formData.field);
    payloadData.append("geoid", formData.geoId);
    payloadData.append("page", formData.page);
    payloadData.append("sort_by", formData.sortBy);
    payloadData.append("job_type", formData.jobType);
    payloadData.append("exp_level", formData.expLevel);
    payloadData.append("work_type", formData.workType);
    payloadData.append("resumes", formData.resume);

    try {
      setToggleCards(!toggleCards);
      const response = await scrapMatchResumeMutation.mutateAsync(payloadData);
      console.log("response response", response);
      setJobsData(response?.data[0]?.matchingScores?.matchingJobResults);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    handleChange({
      target: {
        name: "resume",
        value: file,
      },
    });
  };

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobsData
    ? jobsData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = jobsData ? Math.ceil(jobsData.length / itemsPerPage) : 0;

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-y-auto overflow-x-hidden bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative bg-white px-4 rounded mr-4 shadow-lg">
        {!toggleCards && (
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold pb-2"></h1>
              <div className="mr-4">
                <button
                  onClick={handleScrap}
                  className="mt-4 bg-primary-orange text-white px-4 py-2 rounded-xl"
                >
                  Find Jobs
                </button>
              </div>
            </div>
            <div className="flex flex-wrap w-[80%] md:w-[99%] sm:w-[60%]">
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Field*
                </label>
                <input
                  type="text"
                  name="field"
                  id="field"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Field"
                  value={formData.field}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Geoid
                </label>
                <select
                  id="geoId"
                  name="geoId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.geoId}
                  onChange={handleChange}
                >
                  <option value="temporary">Select geoId</option>
                  {geoIds &&
                    geoIds.map((item: any, index: any) => (
                      <option key={index} value={item?.geoId}>
                        {item?.location}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Page*
                </label>
                <input
                  type="text"
                  name="page"
                  id="page"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="page"
                  value={formData.page}
                  onChange={handleChange}
                  required={true}
                />
              </div>

              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  name="sortBy"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.sortBy}
                  onChange={handleChange}
                >
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </select>
              </div>

              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="temporary">temporary</option>
                  <option value="contract">contract</option>
                  <option value="volunteer">volunteer</option>
                  <option value="full_time">full_time</option>
                  <option value="part_time">part_time</option>
                </select>
              </div>

              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Experience Level
                </label>
                <select
                  id="expLevel"
                  name="expLevel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.expLevel}
                  onChange={handleChange}
                >
                  <option value="internship">internship</option>
                  <option value="entry_level">entry_level</option>
                  <option value="associate">associate</option>
                  <option value="mid_senior_level">mid_senior_level</option>
                  <option value="director">director</option>
                </select>
              </div>

              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Work Type
                </label>
                <select
                  id="workType"
                  name="workType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.workType}
                  onChange={handleChange}
                >
                  <option value="temporary">temporary</option>
                  <option value="at_work">at_work</option>
                  <option value="remote">remote</option>
                  <option value="hybrid">hybrid</option>
                </select>
              </div>

              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
                {formData.resume && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    File selected: {formData.resume.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {toggleCards && (
          <div className="w-full">
            {jobsData && jobsData?.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Job ID
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Company Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 max-w-[4rem] text-center"
                        >
                          AI Matching
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Recommended
                        </th>
                        <th scope="col" className="px-4 py-3">
                          AI Feedback
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Company Profile
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Job Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems
                        ?.sort(
                          (a: any, b: any) =>
                            b?.result?.relevancy_score -
                            a?.result?.relevancy_score
                        )
                        ?.map((item: any, index: any) => {
                          return (
                            <tr
                              key={index}
                              className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              <td className="px-4 py-2 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label className="sr-only">checkbox</label>
                                </div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="py-2 font-medium whitespace-nowrap flex items-center">
                                  {item?.job?.job_id}
                                </span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="py-2 font-medium whitespace-nowrap flex items-center">
                                  {item?.job?.job_position}
                                </span>
                              </td>
                              <th
                                scope="row"
                                className="pt-4 font-medium whitespace-nowrap flex items-center"
                              >
                                {item?.job?.company_name}
                              </th>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {item?.job?.job_location}
                              </td>
                              <td className="px-4 py-2 font-medium whitespace-nowrap w-[40px] text-center">
                                <span>{item?.result?.relevancy_score}%</span>
                              </td>
                              <td className="px-4 py-2 font-medium whitespace-nowrap w-[20px] text-center">
                                <span>
                                  {item?.result?.recommended
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    item?.result?.recommended?.slice(1)}
                                </span>
                              </td>
                              <td
                                className="px-4 py-2 font-medium whitespace-nowrap"
                                onClick={viewReason}
                              >
                                <span>View Details</span>
                              </td>
                              <td className="text-blue-600 border-b-2 cursor-pointer w-[20px] text-center">
                                <Link href={item?.job?.company_profile}>
                                  View
                                </Link>
                              </td>
                              <td className="text-blue-600 border-b-2 cursor-pointer">
                                <Link href={item?.job?.job_link}>
                                  Apply Job
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {indexOfFirstItem + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(indexOfLastItem, jobsData.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">{jobsData.length}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span>Previous</span>
                        </button>
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span>Next</span>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <CustomLoader />
            )}
          </div>
        )}
      </div>
      {viewDetails && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-xl w-full border border-black-400 cursor-auto">
            <div className="bg-white rounded-lg relative">
              <button
                onClick={closeResaonDialog}
                className="absolute top-0 right-0 text-black bg-transparent text-2xl cursor-pointer pr-2"
              >
                &times;
              </button>
              <div>
                <div className="text-center text-3xl font-bold text-black my-4">
                  AI Feedback
                </div>
                <div className="flex justify-between items-center w-[80%] mx-auto my-2">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-black px-3 py-1 text-lg">
                      AI Matching
                    </p>
                    <p className="ml-2 border-[3px] border-orange-400 rounded-xl p-2 w-[150px] text-center text-base">
                      {itemReason?.relevancy_score?.slice(0, -3)}%
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-black px-3 py-1 text-lg">
                      Recommended
                    </p>
                    <p className="ml-2 border-[3px] border-orange-400 rounded-xl p-2 w-[150px] text-center text-base">
                      {typeof itemReason?.recommended === "boolean"
                        ? itemReason.recommended
                          ? "Yes"
                          : "No"
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="mb-3 w-[80%] mx-auto">
                  <p className="font-bold text-black px-3 py-1 text-lg">
                    Reason
                  </p>
                  <p className="ml-2 border-[3px] border-orange-400 rounded-xl p-2 text-base text-center">
                    {itemReason?.explanation?.length
                      ? itemReason?.explanation
                      : "No details found for the talent"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";
import React, { useState } from "react";
import useToggleStore from "@/app/toggleStore";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "@/components/customLoader";
import { getLinkedinJobs } from "@/api/statistics/linkedinScrap";

const Page = () => {
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);
  const [toggleCards, setToggleCards] = React.useState<boolean>(false);

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
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all talents"],
    queryFn: () =>
      getLinkedinJobs(
        `${formData.field}`,
        `${formData.geoId}`,
        `${formData.page}`,
        `${formData.sortBy}`,
        `${formData.jobType}`,
        `${formData.expLevel}`,
        `${formData.workType}`
      ),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleScrap = () => {
    setToggleCards(!toggleCards);
    console.log(formData);
    refetch();
    console.log("data abc data", data);
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
                  LinkedIn Scrap
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
                  GeoId*
                </label>
                <input
                  type="number"
                  name="geoId"
                  id="geoId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="GeoId"
                  value={formData.geoId}
                  onChange={handleChange}
                  required={true}
                />
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
            <div className="flex justify-between items-center">
              <div className="mr-4 mb-4">
                <Image
                  src="/arrowLeft.svg"
                  alt="back-icon"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                  onClick={() => setToggleCards(!toggleCards)}
                />
              </div>
            </div>
            {!isLoading ? (
              <div>
                {data?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="w-full px-4 mb-8 flex justify-evenly items-center"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full w-full">
                        <div className="bg-orange-500 p-4">
                          <h2 className="text-white text-xl font-semibold truncate">
                            {item?.job_position}
                          </h2>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 mb-2">
                            {item?.company_name}
                          </p>
                          <p className="text-gray-600 mb-2">
                            {item?.job_location}
                          </p>
                          <p className="text-gray-600 mb-4">
                            Posted on: {item?.job_posting_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <CustomLoader />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

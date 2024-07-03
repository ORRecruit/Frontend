"use client";
import { getAllJobsForAdmin } from "@/api/jobs/getAllJobs";
import { formatDate, formatString } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import JobDetailModal from "@/components/modals/jobDetailModal";

const page = () => {
  const [title, setTitle] = useState<string>("");
  const [contractType, setContractType] = useState<string>("");
  const [jobVenue, setJobVenue] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filter, setFilter] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const router = useRouter();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian", title, contractType, jobVenue, location],
    queryFn: () =>
      getAllJobsForAdmin(
        `title=${title}`,
        `contractType=${contractType}`,
        `jobVenue=${jobVenue}`,
        `location=${location}`
      ),
  });

  const filteredJobs = data?.data?.filter((job: any) => {
    // switch (selectedFilter) {
    //   case "PENDING":
    //     return job.jobStatus === "PENDING";
    //   case "PUBLISHED":
    //     return job.jobStatus === "PUBLISHED";
    //   case "COMPLETED":
    //     return job.jobStatus === "COMPLETED";
    //   default:
    return true;
    // }
  });

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };

  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const routeToAiMatching = (jobId: any) => {
    router.push(`/admin/dashboard/ai-magic/match-ai-talents?job-id=${jobId}`);
  };

  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative bg-white px-4 rounded mr-4 shadow-lg">
        <div className="w-full">
          <div className="border-b dark:border-gray-700 mx-4">
            <div className="flex items-center justify-between space-x-4 pt-3">
              <div className="flex-1 flex items-center space-x-3">
                <h5 className="dark:text-white font-semibold text-2xl">
                  AI Magic
                </h5>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative">
              <div className="w-full">
                <div className="w-full lg:w-2/3 flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center">
                  <div className="w-full md:max-w-sm flex-1 md:mr-4">
                    <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image
                          src="/search-icon.svg"
                          width={15}
                          height={15}
                          alt="search-icon"
                        />
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search..."
                        // onChange={handleInputChange}
                        // value={localTitle}
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-0 bottom-0 top-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="borer-2 border-black flex items-center space-x-0 sm:space-x-4">
                    <div className="border- border-green-500">
                      <button
                        id="filterDropdownButton"
                        data-dropdown-toggle="filterDropdown"
                        type="button"
                        className="w-[100px] sm:w-full md:w-auto flex items-center justify-center py-2 px-2 sm:px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => setFilter(!filter)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          />
                        </svg>
                        Filter
                        <svg
                          className="-mr-1 ml-1.5 w-5 h-5"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
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
                          // onChange={handleLocationChange}
                        >
                          <option disabled value="">
                            Location
                          </option>
                          {/* {locations?.map((loc, index) => (
                                <option key={index} value={loc}>
                                  {loc}
                                </option>
                              ))} */}
                        </select>
                      </div>
                      <button
                        type="button"
                        className="text-white font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[135px] h-[40px] ml-2 mt-[20px] sm:w-fit sm:mt-0 sm:w-[150px]"
                        // onClick={resetFilters}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 pb-3 flex flex-wrap">
            <div className="hidden md:flex items-center text-sm font-medium text-gray-900 dark:text-white mr-4 mt-3">
              Show only:
            </div>
            <div className="flex flex-wrap">
              <div className="flex items-center mt-3 mr-4">
                <input
                  id="all-tasks"
                  type="radio"
                  value="ALL"
                  name="show-only"
                  // onChange={handleFilterChange}
                  // checked={selectedFilter === "ALL"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  All
                </label>
              </div>
              <div className="flex items-center mr-4 mt-3">
                <input
                  id="in-progress"
                  type="radio"
                  value="PENDING"
                  name="show-only"
                  // onChange={handleFilterChange}
                  // checked={selectedFilter === "PENDING"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Pending/Draft
                </label>
              </div>

              <div className="flex items-center mr-4 mt-3">
                <input
                  id="publish"
                  type="radio"
                  value="PUBLISHED"
                  name="show-only"
                  // onChange={handleFilterChange}
                  // checked={selectedFilter === "PUBLISHED"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Published
                </label>
              </div>

              <div className="flex items-center mr-4 mt-3">
                <input
                  id="completed"
                  type="radio"
                  value="COMPLETED"
                  name="show-only"
                  // onChange={handleFilterChange}
                  // checked={selectedFilter === "COMPLETED"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Completed
                </label>
              </div>
            </div>
          </div>

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
                    Opportunity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Client
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Experience
                  </th>
                  <th scope="col" className="px-4 py-3 min-w-[6rem]">
                    Industry
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Ai Matching
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs &&
                  filteredJobs
                    ?.sort((a: any, b: any) => b.id - a.id)
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
                          <td
                            className="pr-4 py-2 whitespace-nowrap"
                            onClick={() => handleRowClick(item)}
                          >
                            <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                              ORR-{item?.industry?.slice(0, 4)}-00{item?.id}
                            </span>
                          </td>
                          <td
                            className="pr-4 py-2 whitespace-nowrap"
                            onClick={() => handleRowClick(item)}
                          >
                            <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                              {item.title}
                            </span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="pr-4 py-2 whitespace-nowrap"
                          >
                            <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                              {item.companyName}
                            </span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            <span>{item.experienceRequired} Yrs</span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 font-medium whitespace-nowrap"
                          >
                            <span>{formatString(`${item.industry}`)}</span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <span>{formatDate(item?.createdAt)}</span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <span>{item.jobStatus}</span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span
                              onClick={() => routeToAiMatching(item?.id)}
                              className="bg-primary-100 text-blue-600 text-sm font-medium px-2.5 py-0.5 rounded"
                            >
                              View Talents
                            </span>
                          </td>
                          {isDialogOpen && (
                            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                              <JobDetailModal
                                data={selectedItem}
                                closeDialog={closeDialog}
                              />
                            </div>
                          )}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default page;

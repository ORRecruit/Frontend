"use client";
import Image from "next/image";
import React from "react";
import { appliedJobs } from "@/api/talent/showAppliedJobs";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidateJobs } from "@/api/jobs/fetchCandidateJobs";
import { formatDate, formatString } from "@/utils/utils";
import JobDetailModal from "@/components/modals/jobDetailModal";

const jobsList = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const candidateId = localStorage.getItem("candidateId");
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get jobs for candidates"],
    queryFn: () => fetchCandidateJobs(`${candidateId}`),
  });
  console.log("data", data);

  React.useEffect(() => {
    (async () => {
      try {
        const candidateId = localStorage.getItem("candidateId");
        const response = await appliedJobs(candidateId);
        if (response) {
          console.log(response);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <section className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 h-[90%] overflow-y-auto">
      <div className="mx-auto w-full px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="border-b dark:border-gray-700 mx-4">
            <div className="flex items-center justify-between space-x-4 pt-3">
              <div className="flex-1 flex items-center space-x-3">
                <h5 className="dark:text-white font-semibold">
                  Application Status
                </h5>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative">
              <div className="w-full lg:w-2/3 flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center">
                <form className="w-full md:max-w-sm flex-1 md:mr-4">
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
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-0 bottom-0 top-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row mb-3 md:mb-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add new task
                </button>
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
                  value=""
                  name="show-only"
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Direct Applied
                </label>
              </div>
              <div className="flex items-center mr-4 mt-3">
                <input
                  id="in-progress"
                  type="radio"
                  value=""
                  name="show-only"
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  AI Matches
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
                    Opportunity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Company
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Industry
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Contract Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Req. Experience
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Job Venue
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.applications?.map((item: any, index: any) => {
                  return (
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
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
                      <th
                        onClick={() => handleRowClick(item)}
                        scope="row"
                        className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.title}
                      </th>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="py-2 whitespace-nowrap"
                      >
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {item.companyName}
                        </span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="pl-4 py-2 text-xs font-medium"
                      >
                        <span>{item.industry}</span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="pl-4 py-2 text-xs font-medium"
                      >
                        <span>{item.location}</span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="pl-4 py-2 text-xs font-medium"
                      >
                        <span>{formatString(item.contractType)}</span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="pl-4 py-2 text-xs font-medium"
                      >
                        <span>{item.experienceRequired} Years</span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="pl-4 py-2 text-xs font-medium"
                      >
                        <span>
                          {item.jobVenue.charAt(0).toUpperCase() +
                            item.jobVenue.slice(1)}
                        </span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="px-4 py-2 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {formatDate(item?.applicationCreatedAt)}
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
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default jobsList;

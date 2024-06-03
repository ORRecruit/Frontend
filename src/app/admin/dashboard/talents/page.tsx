"use client";
import Image from "next/image";
import React, { useState } from "react";
import { getAllTalents } from "@/api/talent/getAllTalents";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const page = () => {
  const [name, setName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    console.log("cloase", isDialogOpen);
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all talents"],
    queryFn: () => getAllTalents(`Candidate%20Name=${name}`),
  });
  console.log("data", data);

  const filterCandidateFunction = (e: any) => {
    console.log("e.target", e.target.value);
    setName(e.target.value);
    refetch();
    if (!data?.data?.length) {
      toast.success("No Talents Found");
    }
  };

  return (
    <div className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 h-[90%] overflow-y-auto">
      <div className="mx-auto w-full px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="border-b dark:border-gray-700 mx-4">
            <div className="flex items-center justify-between space-x-4 pt-3">
              <div className="flex-1 flex items-center space-x-3">
                <h5 className="dark:text-white font-semibold">Talents</h5>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative">
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
                      onChange={filterCandidateFunction}
                      value={name}
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-0 bottom-0 top-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-0 sm:space-x-4">
                  <div>
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      type="button"
                      className="bg-orange-400 w-[100px] sm:w-full md:w-auto flex items-center justify-center py-2 px-2 sm:px-4 text-sm font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-4 w-4 mr-2 text-white"
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
                    {/* These are some filter options */}
                    <div
                      id="filterDropdown"
                      className="z-10 hidden p-3 bg-white rounded-lg shadow w-56 dark:bg-gray-700"
                    >
                      <h6 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        By status
                      </h6>
                      <ul
                        className="space-y-2 text-sm"
                        aria-labelledby="filterDropdownButton"
                      >
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            In progress
                          </label>
                        </li>
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            In review
                          </label>
                        </li>
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            Completed
                          </label>
                        </li>
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            Canceled
                          </label>
                        </li>
                      </ul>
                      <h6 className="mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        By number of users
                      </h6>
                      <ul
                        className="space-y-2 text-sm"
                        aria-labelledby="dropdownDefault"
                      >
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            5-10 peoples
                          </label>
                        </li>
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            10+ peoples
                          </label>
                        </li>
                        <li>
                          <label className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md px-1.5 py-1 w-full">
                            <input
                              type="checkbox"
                              value=""
                              className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            More than 10 peoples
                          </label>
                        </li>
                      </ul>
                      <a
                        href="#"
                        className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline mt-4 ml-1.5"
                      >
                        Apply to all projects
                      </a>
                    </div>
                  </div>
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
                  //   onChange={handleFilterChange}
                  //   checked={selectedFilter === "ALL"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  All
                </label>
              </div>
              {/* <div className="flex items-center mr-4 mt-3">
                <input
                  id="in-progress"
                  type="radio"
                  value="PENDING"
                  name="show-only"
                  //   onChange={handleFilterChange}
                  //   checked={selectedFilter === "PENDING"}
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
                  //   onChange={handleFilterChange}
                  //   checked={selectedFilter === "PUBLISHED"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Published
                </label>
              </div> */}

              {/* <div className="flex items-center mr-4 mt-3">
                <input
                  id="completed"
                  type="radio"
                  value="COMPLETED"
                  name="show-only"
                  //   onChange={handleFilterChange}
                  //   checked={selectedFilter === "COMPLETED"}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Completed
                </label>
              </div> */}
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
                    Talent ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Industry
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.data?.map((item: any, index: any) => {
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
                          onClick={() => handleRowClick(item)}
                          className="px-4 py-2 whitespace-nowrap"
                        >
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {`ORR-USR-00${item?.id}`}
                          </span>
                        </td>
                        <th
                          onClick={() => handleRowClick(item)}
                          scope="row"
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                        >
                          {item?.fullName}
                        </th>
                        <td
                          onClick={() => handleRowClick(item)}
                          className="px-4 py-2 whitespace-nowrap"
                        >
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {item?.email}
                          </span>
                        </td>
                        <td
                          onClick={() => handleRowClick(item)}
                          className="px-4 py-2 whitespace-nowrap"
                        >
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {item?.industry}
                          </span>
                        </td>
                        <td
                          onClick={() => handleRowClick(item)}
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <span>{item?.country}</span>
                        </td>
                        <td className="px-4 py-2 relative">
                          <button
                            id="-dropdown-button"
                            type="button"
                            data-dropdown-toggle="-dropdown"
                            className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </td>
                        {isDialogOpen && (
                          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                            <div className="relative bg-white p-5 rounded-lg max-w-2xl w-full border border-black-400">
                              <div className="bg-white rounded-lg">
                                <div className="mb-5">
                                  <div className="flex justify-between">
                                    <h1 className="text-3xl font-bold">
                                      {selectedItem?.fullName}
                                    </h1>
                                  </div>
                                  <div className="font-light text-lg font-semibold text-gray-500 dark:text-gray-400">
                                    ORR-
                                    {selectedItem?.industry?.slice(0, 4)}
                                    -00
                                    {selectedItem?.id}
                                  </div>

                                  <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
                                    {selectedItem?.email}
                                  </span>
                                </div>

                                <div className="mb-5">
                                  <p className="text-gray-600">
                                    {selectedItem?.country}
                                  </p>
                                  <p className="font-light text-gray-500 dark:text-gray-400">
                                    {selectedItem?.location}
                                  </p>

                                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                                    {selectedItem?.skills?.map((item: any) => {
                                      <span>{item}</span>;
                                    })}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={closeDialog}
                                className="absolute top-0 right-0 p-8 text-lg text-black bg-transparent text-2xl"
                              >
                                &times;{" "}
                              </button>
                            </div>
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
    </div>
  );
};

export default page;

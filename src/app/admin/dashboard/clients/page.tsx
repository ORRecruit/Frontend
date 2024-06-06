"use client";
import { getAllClients } from "@/api/recruiter/getAllClients";
import { formatDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getAllClients(),
  });
  console.log("clientsclientsclietns", data);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative bg-white px-4 rounded mr-4">
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
                  className="w-[100px] sm:w-full md:w-auto flex items-center justify-center py-2 px-2 sm:px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  // onClick={() => setFilter(!filter)}
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
              <div>
                <div
                  id="configurationDropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="configurationDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        By Category
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        By Brand
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Reset
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute right-0">
                <Link href="/admin/dashboard/clients/create-client">
                  <button className="bg-primary-orange text-sm text-white w-24 sm:w-40 py-2 mr-4 rounded-xl hover:shadow-xl">
                    Create Client
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-2 mr-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
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
                Client ID
              </th>
              <th scope="col" className="px-4 py-3">
                Industry
              </th>
              <th scope="col" className="px-4 py-3">
                Company Name
              </th>
              <th scope="col" className="px-4 py-3">
                No. Of Employees
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3 min-w-[6rem]">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((item: any, index: any) => {
                return (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                        ORR-{item?.sector?.slice(0, 4).toUpperCase()}-00
                        {item?.id}
                      </span>
                    </td>
                    <td
                      className="pr-4 py-2 whitespace-nowrap"
                      onClick={() => handleRowClick(item)}
                    >
                      <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                        {item.sector}
                      </span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="px-4 py-2 whitespace-nowrap"
                    >
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {item.companyName}
                      </span>
                    </td>
                    <td
                      className="px-4 py-2 whitespace-nowrap"
                      onClick={() => handleRowClick(item)}
                    >
                      <span
                        // onClick={() => routeToAiMatching(item?.id)}
                        className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
                      >
                        {item?.numberOfEmployees}
                      </span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="px-4 py-2 whitespace-nowrap"
                    >
                      <span>{item.email}</span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="px-4 py-2 font-medium whitespace-nowrap"
                    >
                      <span>{formatDate(item.created_at)}</span>
                    </td>
                    {isDialogOpen && (
                      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                        <div className="relative bg-white p-5 rounded-lg max-w-2xl w-full border border-black-400">
                          <div className="bg-white rounded-lg">
                            <div className="mb-5">
                              <div className="flex justify-between">
                                <h1 className="text-3xl font-bold">
                                  {selectedItem?.companyName}
                                </h1>
                              </div>
                              <div className="font-light text-lg font-semibold text-gray-500 dark:text-gray-400">
                                ORR-
                                {selectedItem?.sector?.slice(0, 4)}
                                -00
                                {selectedItem?.id}
                              </div>
                            </div>

                            <div className="mb-5">
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.firstName}
                              </p>
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.lastName}
                              </p>
                              <p className="text-gray-600">
                                {selectedItem?.sector}
                              </p>
                              <p className="text-gray-600">
                                Employees: {selectedItem?.numberOfEmployees}
                              </p>
                              <h1 className="text-xl font-bold my-3">
                                Contact Information:
                              </h1>
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                Address: {selectedItem?.address}
                              </p>

                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.email}
                              </p>
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.phoneNumber}
                              </p>
                              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.website} Yrs
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={closeDialog} // This closes the modal when clicked
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
    </div>
  );
};

export default page;

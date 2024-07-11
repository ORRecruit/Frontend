"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getAllTalents } from "@/api/talent/getAllTalents";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/utils";
import TalentDetailModal from "@/components/modals/talentDetailModal";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };

  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    console.log("close", isDialogOpen);
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all talents", name, currentPage],
    queryFn: () => getAllTalents(`Candidate%20Name=${name}`),
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const filterCandidateFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target", e.target.value);
    setName(e.target.value);
    setCurrentPage(1);
    refetch();
    if (!data?.data?.length) {
      toast.success("No Talents Found");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages: any = Math.ceil((data?.data?.length || 0) / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  All
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
                    Talent Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item: any, index: number) => (
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
                      <span className="py-2 font-medium whitespace-nowrap flex items-center">
                        {`ORR-USR-00${item?.id}`}
                      </span>
                    </td>
                    <th
                      onClick={() => handleRowClick(item)}
                      scope="row"
                      className="px-4 py-2 font-medium whitespace-nowrap flex items-center"
                    >
                      {item?.fullName}
                    </th>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="pl-4 py-2 whitespace-nowrap"
                    >
                      <span className="py-2 font-medium whitespace-nowrap flex items-center">
                        {item?.email}
                      </span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="pl-4 py-2 whitespace-nowrap"
                    >
                      <span className="py-2 font-medium whitespace-nowrap flex items-center">
                        {item?.industry}
                      </span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="pl-4 py-2 whitespace-nowrap"
                    >
                      <span className="py-2 font-medium whitespace-nowrap flex items-center">
                        {/* {item?.userType?.charAt(0)?.toUpperCase() +
                          item?.userType?.slice(1)} */}
                        N/A
                      </span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="px-4 py-2 font-medium whitespace-nowrap"
                    >
                      <span>{item?.country}</span>
                    </td>
                    <td
                      onClick={() => handleRowClick(item)}
                      className="pl-4 py-2"
                    >
                      <span className="py-2 font-medium whitespace-nowrap flex items-center">
                        {formatDate(item?.createdAt)}
                      </span>
                    </td>
                  </tr>
                ))}
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
                {" "}
                {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, data?.data?.length || 0)}{" "}
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                {" "}
                {data?.data?.length || 0}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
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
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, number) => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                      currentPage === number + 1
                        ? "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
          <TalentDetailModal data={selectedItem} closeDialog={closeDialog} />
        </div>
      )}
    </div>
  );
};

export default Page;

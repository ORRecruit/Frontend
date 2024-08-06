"use client";
import { getIndeedJobs } from "@/api/statistics/indeedScrap";
import useToggleStore from "@/app/toggleStore";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomLoader from "@/components/customLoader";

const Page = () => {
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);
  const [field, setField] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState("1");
  const [resData, setResData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const scrapMatchResumeMutation = useMutation({
    mutationFn: (obj: any) => getIndeedJobs(obj),
    onSuccess: (data) => {
      console.log("data", data);
      setResData(data);
      setIsLoading(false);
      setCurrentPage(1);
      setMaxPageNumberLimit(5);
      setMinPageNumberLimit(0);
    },
    onError: () => {
      setResData([]);
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!field || !location || !page) {
      console.log({ field, location, page });
      toast.error("please provide all mandatory details");
      return;
    }
    setIsLoading(true);
    try {
      await scrapMatchResumeMutation.mutateAsync({
        field,
        location,
        page,
      });
    } catch (err) {
      console.log("error error", err);
      setResData([]);
      setIsLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = resData
    ? resData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <tr className="max-h-[300px] text-xl">
          <td colSpan={6} className="text-center max-h-[300px]">
            <CustomLoader />
          </td>
        </tr>
      );
    }

    if (resData === null) {
      return (
        <tr className="h-[300px] text-xl">
          <td colSpan={6} className="text-center py-4">
            Please search to get jobs
          </td>
        </tr>
      );
    }

    if (resData.length === 0) {
      return (
        <tr className="h-[300px] text-xl">
          <td colSpan={6} className="text-center py-4">
            No jobs found. Try different search criteria.
          </td>
        </tr>
      );
    }

    return currentItems.map((item: any, index: any) => (
      <tr
        key={index}
        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
      >
        <td className="px-4 py-3 w-4">
          <div className="flex items-center">
            <input
              id={`checkbox-table-search-${index}`}
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="sr-only">checkbox</label>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span className="font-medium">{item?.jobID}</span>
        </td>
        <td className="px-4 py-3">
          <span className="font-medium line-clamp-2 max-w-[200px]">
            {item?.jobTitle}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="line-clamp-1 max-w-[200px]">
            {item?.companyName}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="line-clamp-1 max-w-[250px]">
            {item?.companyLocation}
          </span>
        </td>
        <td className="px-4 py-3 text-blue-600 cursor-pointer">
          <Link
            href={item?.jobLink ? item?.jobLink : ""}
            className="hover:underline"
          >
            Apply Job
          </Link>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => {
    if (!resData || resData.length <= itemsPerPage) return null;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(resData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={handlePrevBtn}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Prev
              </button>
            </li>
            {pageNumbers.map((number) => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              ) {
                return (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight ${
                        currentPage === number
                          ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                          : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                      } border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      {number}
                    </button>
                  </li>
                );
              } else {
                return null;
              }
            })}
            <li>
              <button
                onClick={handleNextBtn}
                disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-y-auto overflow-x-hidden bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
      <div
        className={`flex flex-col-reverse md:flex-row justify-between md:space-x-4 py-3 relative px-4 mr-4 h-full ${
          toggleMenu ? "bg-white" : ""
        }`}
      >
        <div className="w-full px-8 h-screen bg-white">
          <div className="flex justify-between items-center mt-8">
            <h1 className="text-xl font-bold">Indeed Job Search</h1>
            <p
              onClick={handleSubmit}
              className="bg-orange-500 text-white py-2 px-4 rounded-2xl cursor-pointer"
            >
              Find Jobs
            </p>
          </div>
          <div className="py-4 flex justify-between w-full">
            <div className="flex flex-col mb-4 w-[32%]">
              <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-white">
                Field*
              </label>
              <input
                type="text"
                id="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Field"
                required
              />
            </div>
            <div className="flex flex-col mb-4 w-[32%]">
              <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-white">
                Location*
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Location"
                required
              />
            </div>
            <div className="flex flex-col mb-4 w-[32%]">
              <label className="block mb-1 text-sm font-medium text-gray-500 dark:text-white">
                Page*
              </label>
              <input
                type="number"
                id="page"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold mb-4">Indeed Jobs</h1>
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
                    <th scope="col" className="px-4 py-3">
                      Job Link
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableContent()}</tbody>
              </table>
            </div>
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

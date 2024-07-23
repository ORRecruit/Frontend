"use client";
import { getAllLeadOwners } from "@/api/leadOwner/getAllLeadOwners";
import useToggleStore from "@/app/toggleStore";
import { formatDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all lead owners"],
    queryFn: () => getAllLeadOwners(),
  });

  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-auto bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
      <div className="py-4 flex justify-end bg-white mb-4">
        <Link href="/admin/dashboard/leadOwner/create-lead-owner">
          <button
            type="submit"
            className="text-white bg-primary-orange rounded-xl font-medium text-sm px-4 py-2 mr-8"
          >
            Create Lead Owner
          </button>
        </Link>
      </div>
      <div>
        <table className="w-full text-sm text-left text-white dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <p className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="sr-only">checkbox</label>
                </p>
              </th>
              <th scope="col" className="px-4 py-3">
                Lead Owner ID
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Designation
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Contact Number
              </th>
              <th scope="col" className="px-4 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item: any, index: any) => {
              return (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black"
                >
                  <td className="px-4 py-2 w-4">
                    <p className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="sr-only">checkbox</label>
                    </p>
                  </td>
                  <td className="pr-4 py-2 whitespace-nowrap">
                    <span className="px-4 py-2 font-medium whitespace-nowrap flex items-center">
                      {`ORR-OWN-00${item?.id}`}
                    </span>
                  </td>
                  <td className="pr-4 py-2 whitespace-nowrap">
                    <span className="px-4 py-2 font-medium whitespace-nowrap flex items-center">
                      {item?.name}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="py-2 font-medium whitespace-nowrap flex items-center">
                      {item?.designation}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="py-2 font-medium whitespace-nowrap flex items-center">
                      {item?.email}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="py-2 font-medium whitespace-nowrap flex items-center">
                      {item?.contactNumber}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="py-2 font-medium whitespace-nowrap flex items-center">
                      {formatDate(item?.created_at)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex flex-col md:flex-row bg-white justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)}
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalItems}
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span>Previous</span>
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight ${
                    currentPage === index + 1
                      ? "text-primary-600 bg-gray-200"
                      : "text-gray-500 bg-white"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  <span>{index + 1}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default page;

"use client";
import { aiMatchingAllTalents } from "@/api/jobs/aiMatchingAllTalents";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import CustomLoader from "@/components/customLoader";
import TalentDetailModal from "@/components/modals/talentDetailModal";
import ResumeTemplate from "@/components/templates/ResumeTemplate";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import useToggleStore from "@/app/toggleStore";

const ITEMS_PER_PAGE = 10;

const AIMatchingContent = () => {
  const param = useSearchParams();
  const jobId = param.get("job-id");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [viewDetails, setViewDetails] = useState<any>(null);
  const [itemReason, setItemReason] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);

  const handleRowClick = (item: any) => {
    setSelectedItem(item?.profile);
    setIsDialogOpen(!isDialogOpen);
  };

  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const { isLoading, refetch } = useQuery({
    queryKey: ["get jobs for candidates", jobId],
    queryFn: () => aiMatchingAllTalents(`${jobId}`),
    enabled: false,
  });

  useEffect(() => {
    setData(null);
    refetch().then((result) => {
      setData(result.data);
    });
  }, [jobId, refetch]);

  console.log("datadatadata", data);

  const downloadResume = async (item: any) => {
    console.log("downloaddownload", item);
    if (item?.profile?.resume_file && item?.profile?.resume_file.length > 0) {
      window.open(item?.profile?.resumePath, "_blank");
    } else if (
      item?.profile?.resumePath &&
      item?.profile?.resumePath.length > 0
    ) {
      window.open(item?.profile?.resumePath, "_blank");
    } else {
      console.log("downloaddownload else", item);

      try {
        const blob = await pdf(<ResumeTemplate user={item.profile} />).toBlob();
        if (item?.profile?.fullName) {
          saveAs(blob, `${item?.profile?.fullName}_Resume.pdf`);
        } else if (item?.profile?.firstName) {
          saveAs(blob, `${item?.profile?.firstName}_Resume.pdf`);
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  };

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

  // Pagination logic
  const totalPages = Math.ceil((data?.data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedData = data?.data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-y-auto overflow-x-hidden bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="mx-auto w-full px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="border-b dark:border-gray-700 mx-4">
              <div className="mt-4">
                <Link href="/admin/dashboard/ai-magic">
                  <Image
                    src="/arrowLeft.svg"
                    alt="back-icon"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
              <div className="flex items-center justify-between space-x-4 pt-3">
                <div className="flex-1 flex items-center space-x-3">
                  <h5 className="dark:text-white font-semibold">
                    Matching AI Talents
                  </h5>
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
                      />
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
                    <th scope="col" className="px-4 py-3 min-w-[6rem]">
                      AI Matching
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Recommended
                    </th>
                    <th scope="col" className="px-4 py-3">
                      AI Feedback
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Resume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData
                    ?.sort(
                      (a: any, b: any) =>
                        b?.result?.relevancy_score?.slice(0, -3) -
                        a?.result?.relevancy_score?.slice(0, -3)
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
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            <span className="py-2 font-medium whitespace-nowrap flex items-center">
                              {item?.userType == "applicant"
                                ? `ORR-USR-00${item?.profile?.id}`
                                : `ORR-CAD-00${item?.profile?.id}`}
                            </span>
                          </td>
                          <th
                            onClick={() => handleRowClick(item)}
                            scope="row"
                            className="pt-4 font-medium whitespace-nowrap flex items-center"
                          >
                            {item?.profile?.fullName
                              ? item?.profile?.fullName
                              : `${item?.profile?.firstName} ${item?.profile?.lastName}`}
                          </th>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            <span className="py-2 font-medium whitespace-nowrap flex items-center">
                              {item?.profile?.email}
                            </span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            <span className="py-2 font-medium whitespace-nowrap flex items-center">
                              {item?.profile?.industry}
                            </span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            <span className="py-2 font-medium whitespace-nowrap flex items-center">
                              {item?.userType?.charAt(0)?.toUpperCase() +
                                item?.userType?.slice(1)}
                            </span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            <span>{item?.profile?.location}</span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 font-medium whitespace-nowrap"
                          >
                            <span>
                              {item?.result?.relevancy_score?.slice(0, -3)}%
                            </span>
                          </td>
                          <td
                            onClick={() => handleRowClick(item)}
                            className="px-4 py-2 font-medium whitespace-nowrap"
                          >
                            <span>
                              {typeof item?.result?.recommended === "boolean"
                                ? item.result.recommended
                                  ? "Yes"
                                  : "No"
                                : ""}{" "}
                            </span>
                          </td>
                          <td
                            onClick={() => viewReason(item)}
                            className="px-4 py-2 font-medium whitespace-nowrap"
                          >
                            <span>View Details</span>
                          </td>
                          <td
                            onClick={() => downloadResume(item)}
                            className="text-blue-600 border-b-2 cursor-pointer"
                          >
                            Download
                          </td>
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
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  data?.data?.length || 0
                )}{" "}
                of {data?.data?.length || 0}
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => handlePageChange(number + 1)}
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
          <TalentDetailModal data={selectedItem} closeDialog={closeDialog} />
        </div>
      )}
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
                <div className="mb-3 w-[80%] mx-auto flex justify-center items-center">
                  <p
                    onClick={() => downloadResume(selectedItem)}
                    className="text-blue-600 cursor-pointer border-b-[1px] border-blue-500 text-base my-2"
                  >
                    Download Resume
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

const Page = () => {
  return (
    <Suspense fallback={<CustomLoader />}>
      <AIMatchingContent />
    </Suspense>
  );
};

export default Page;

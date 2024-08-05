"use client";
import { getIndeedJobs } from "@/api/statistics/indeedScrap";
import useToggleStore from "@/app/toggleStore";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);
  const [field, setField] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [page, setPage] = React.useState("1");
  const [resData, setResData] = React.useState<any>(null);

  const scrapMatchResumeMutation = useMutation({
    mutationFn: (obj: any) => getIndeedJobs(obj),
    onSuccess: (data) => {
      console.log("data", data);
      setResData(data);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!field || !location || !page) {
      console.log({ field, location, page });
      toast.error("please provide all mandatory details");
      return;
    }
    try {
      const response = await scrapMatchResumeMutation.mutateAsync({
        field,
        location,
        page,
      });
      console.log("response response...", response);
    } catch (err) {
      console.log("error error", err);
    }
  };

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-y-auto overflow-x-hidden bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
      <div
        className={`flex flex-col-reverse md:flex-row justify-between md:space-x-4 py-3 relative px-4 mr-4 h-full {toggleCards? "bg-white":""}`}
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
            <div>
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
                <tbody>
                  {resData?.map((item: any, index: any) => {
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
                            {item?.jobID}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="py-2 font-medium whitespace-nowrap flex items-center max-w-[200px] overflow-x-hidden">
                            {item?.jobTitle}
                          </span>
                        </td>
                        <td className="px-4 font-medium whitespace-nowrap flex items-center max-w-[200px] overflow-x-hidden">
                          {item?.companyName}
                        </td>
                        <td className="px-4 font-medium whitespace-nowrap max-w-[250px]">
                          {item?.companyLocation}
                        </td>
                        <td className="text-blue-600 cursor-pointer">
                          <Link href={item?.jobLink ? item?.jobLink : ""}>
                            Apply Job
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

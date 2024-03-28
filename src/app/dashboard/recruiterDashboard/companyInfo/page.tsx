"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "@/api/recruiter/createProfile";

const page = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const createProfileMutation = useMutation({
    mutationFn: (body: any) => createProfile(companyName, location, industry),
  });

  const handleSubmit = async (e: any) => {
    console.log("submit.....", companyName, location, industry);
    e?.preventDefault();
    if (companyName && location && industry) {
      const response = await createProfileMutation.mutateAsync({
        companyName,
        location,
        industry,
      });
      console.log("response...", companyName, location, industry, response);
    }
  };

  const handleCompanyNameChange = (event: any) => {
    setCompanyName(event.target.value);
  };
  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };
  const handleIndustryChange = (event: any) => {
    setIndustry(event.target.value);
  };

  return (
    <div>
      <section className="h-screen flex justify-center items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
          <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 text-black font-sans">
              Company Info
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Tell us about your company
            </p>
            <form className="mt-4" action="#">
              <div className="grid gap-6 sm:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required={true}
                    value={companyName}
                    onChange={handleCompanyNameChange}
                  />
                </div>
                <div className="flex flex-2 justify-between">
                  <div className="w-[48%]">
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                      No. Of Employees
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>20-50</option>
                      <option value="US">0-10</option>
                      <option value="CA">11-50</option>
                      <option value="FR">51-200</option>
                      <option value="DE">200+</option>
                    </select>
                  </div>
                  <div className="w-[48%]">
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                      Sector
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={industry}
                      onChange={handleIndustryChange}
                    >
                      <option>IT Industry</option>
                      <option value="US">IT Industry</option>
                      <option value="CA">IT Industry</option>
                      <option value="FR">IT Industry</option>
                      <option value="DE">IT Industry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    About Company
                  </label>
                  <input
                    type="text"
                    name="about"
                    id="about"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                    value={location}
                    onChange={handleLocationChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <div className="text-sm w-full mb-[20px]">
                    <label className="font-light text-gray-500 dark:text-gray-300 opacity-0">
                      By signing up, you are creating a Sendinblue account, and
                      you agree to Sendinblue's
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Upload Your Logo
                            </span>
                          </p>
                          <Link
                            href="#"
                            className="text-sm text-gray-500 dark:text-gray-400 text-blue-700"
                          >
                            or browse for files
                          </Link>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </form>
          </div>
          <div className="mr-auto place-self-center lg:col-span-6">
            <Image
              width={400}
              height={400}
              className="hidden mx-auto lg:flex"
              src="/sign-up.svg"
              alt="illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;

"use client";
import { createProfile } from "@/api/recruiter/createProfile";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const page = () => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    sector: "",
    numberOfEmployees: null,
    website: "",
    address: "",
  });
  const router = useRouter();
  const [applyNow, setApplyNow] = useState<boolean>(false);

  const createCliMutation = useMutation({
    mutationFn: (data: any) => createProfile(data),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "numberOfEmployees" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    console.log("formDataformData", formData);
    try {
      setApplyNow(!applyNow);
      if (
        !formData.companyName ||
        !formData.sector ||
        !formData.numberOfEmployees ||
        !formData.address ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phoneNumber
      ) {
        toast.error("please provide all details");
        return;
      }
      const response = await createCliMutation.mutateAsync(formData);
      console.log("response..", response);
      if (response) {
        toast.success("Client Created Successfully!");
        router.push("/admin/dashboard/clients");
        setApplyNow(false);
      } else {
        toast.error("Something went wrong");
        setOpenConfirmation(!openConfirmation);
        setApplyNow(false);
      }
    } catch (err: any) {
      console.log("error", err.message);
      toast.error(err?.response?.data?.message);
      setApplyNow(false);
    }
  };

  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="flex items-center justify-between py-3 relative bg-white px-4 rounded">
        <div className="w-full">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <Link href="/admin/dashboard/clients">
              <Image
                src="/arrowLeft.svg"
                alt="back-icon"
                width={20}
                height={20}
              />
            </Link>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold py-2">Company Information:</h1>
              <div className="mr-4">
                <button
                  onClick={() => setOpenConfirmation(!openConfirmation)}
                  className="bg-primary-orange text-sm text-white w-24 sm:w-40 py-2 mr-4 rounded-xl hover:shadow-xl"
                >
                  Create Client
                </button>
              </div>
            </div>
            <div className="flex flex-wrap w-[80%] md:w-[99%] sm:w-[60%]">
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Company Name*
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Input Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Industry*
                </label>
                <select
                  id="sector"
                  name="sector"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.sector}
                  onChange={handleChange}
                >
                  <option value="Technology">Technology</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Number Of Employees*
                </label>
                <input
                  type="number"
                  name="numberOfEmployees"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Input Number of Employees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Website URL"
                  value={formData.website}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Your Address With Country"
                  value={formData.address}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <h1 className="text-lg font-bold pb-2">Contact Person:</h1>
            <div className="flex flex-wrap w-[80%] sm:w-[60%]">
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Email*
                </label>
                <input
                  type="text"
                  name="email"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Phone Number*
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        {openConfirmation && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-5 rounded-lg border border-black-500">
              <button
                onClick={() => {
                  setOpenConfirmation(!openConfirmation);
                  setApplyNow(false);
                }}
                className="absolute top-0 right-3 pb-1 text-black bg-transparent text-2xl"
              >
                &times;
              </button>
              <div className="bg-white rounded-lg flex flex-col items-center py-2">
                <p className="text-lg leading-5 text-gray-500 mt-3">
                  Are you sure want to create the client?
                </p>
                <div className="mt-5 sm:mt-6">
                  {!applyNow ? (
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Yes
                    </button>
                  ) : (
                    <div className="mt-4">
                      <RotatingLines
                        visible={true}
                        width="50"
                        strokeColor="orange"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

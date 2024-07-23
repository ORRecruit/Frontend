"use client";
import { createLeadOwner } from "@/api/leadOwner/createLeadOwner";
import useToggleStore from "@/app/toggleStore";
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
    name: "",
    designation: "",
    email: "",
    contactNumber: "",
  });
  const router = useRouter();
  const [applyNow, setApplyNow] = useState<boolean>(false);
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);

  const createLeadOwnerMutation = useMutation({
    mutationFn: (data: any) => createLeadOwner(data),
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
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
      const response = await createLeadOwnerMutation.mutateAsync(formData);
      console.log("response..", response);
      if (response) {
        toast.success("Client Created Successfully!");
        router.push("/admin/dashboard/leadOwner");
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

  const openConfirmationModal = () => {
    if (
      !formData.name ||
      !formData.designation ||
      !formData.email ||
      !formData.contactNumber
    ) {
      toast.error("please provide all details");
      return;
    }
    setOpenConfirmation(!openConfirmation);
  };

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-auto bg-gray-50 ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
      <div className="flex items-center justify-between py-3 relative bg-white px-4 rounded">
        <div className="w-full">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <Link href="/admin/dashboard/leadOwner">
              <Image
                src="/arrowLeft.svg"
                alt="back-icon"
                width={20}
                height={20}
              />
            </Link>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold py-2">
                Lead Owner Information:
              </h1>
              <div className="mr-4">
                <button
                  onClick={() => openConfirmationModal()}
                  className="bg-primary-orange text-sm text-white w-24 sm:w-40 py-2 mr-4 rounded-xl hover:shadow-xl"
                >
                  Create Lead Owner
                </button>
              </div>
            </div>
            <div className="flex flex-wrap w-[80%] sm:w-full">
              <div className="w-[28%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Lead Owner Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[28%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Designation*
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Lead Owner Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[28%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Email*
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Lead Owner Email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[28%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Phone Number*
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Lead Owner Phone Number"
                  value={formData.contactNumber}
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
                  Are you sure want to create lead owner?
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

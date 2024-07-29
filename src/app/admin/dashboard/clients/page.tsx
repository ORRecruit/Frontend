"use client";
import { editClient } from "@/api/recruiter/editClient";
import { getAllClients } from "@/api/recruiter/getAllClients";
import useToggleStore from "@/app/toggleStore";
import { formatDate } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const page = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getAllClients(),
  });
  console.log("clientsclientsclietns", data);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editDialogItem, setEditDialogItem] = useState<any>(null);
  const toggleEditDialog = (itemId: any) => {
    setEditDialogItem((prev: any) => (prev === itemId ? null : itemId));
  };
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const patchAndOpenDialog = (item: any) => {
    console.log("itemitemitem,item", item);
    setFormData({
      companyName: item?.companyName,
      sector: item?.sector,
      numberOfEmployees: item?.numberOfEmployees,
      website: item?.website,
      address: item?.address,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      phoneNumber: item?.phoneNumber,
    });
    setEditDialog(!editDialog);
  };
  const [applyNow, setApplyNow] = useState<boolean>(false);
  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);
  const router = useRouter();
  const [isViewContract, setIsViewContract] = React.useState<boolean>(false);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const downloadContract = (item: any, event: React.MouseEvent) => {
    console.log("itemitemitem...", item, selectedItem);
    if (item?.contract) {
      if (event.ctrlKey) {
        window.open(item.contract, "_blank");
      } else {
        router.push(item.contract);
      }
    }
  };

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

  const editCliMutation = useMutation({
    mutationFn: (data: any) => editClient(editDialogItem, data),
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
    console.log("formDataformData", formData, editDialogItem);
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
      const response = await editCliMutation.mutateAsync(formData);
      console.log("response..", response);
      if (response) {
        toast.success("Client Created Successfully!");
        setOpenConfirmation(false);
        setEditDialog(false);
        setApplyNow(false);
        refetch();
      } else {
        toast.error("Something went wrong");
        setOpenConfirmation(!openConfirmation);
        setEditDialog(false);
        setApplyNow(false);
      }
    } catch (err: any) {
      console.log("error", err.message);
      toast.error(err?.response?.data?.message);
      setOpenConfirmation(false);
      setEditDialog(false);
      setApplyNow(false);
    }
  };

  // Pagination states and logic
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-auto ${
        toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
      }`}
    >
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
              <th scope="col" className="px-4 py-3">
                Contract
              </th>
              <th scope="col" className="px-4 py-3">
                Contract
              </th>
              <th scope="col" className="px-4 py-3 min-w-[6rem]">
                Created At
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData &&
              paginatedData
                ?.sort((a: any, b: any) => b.id - a.id)
                ?.map((item: any, index: any) => {
                  return (
                    <tr
                      key={index}
                      className="border-b bg-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                      <td
                        className="pr-4 py-2 whitespace-nowrap"
                        onClick={() => handleRowClick(item)}
                      >
                        <span className="px-4 py-2 font-medium whitespace-nowrap flex items-center">
                          ORR-{item?.sector?.slice(0, 4).toUpperCase()}-00
                          {item?.id}
                        </span>
                      </td>
                      <td
                        className="pr-4 py-2 whitespace-nowrap"
                        onClick={() => handleRowClick(item)}
                      >
                        <span className="px-4 py-2 font-medium whitespace-nowrap flex items-center">
                          {item.sector}
                        </span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="px-4 py-2 whitespace-nowrap"
                      >
                        <span className="py-2 font-medium whitespace-nowrap flex items-center">
                          {item.companyName}
                        </span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap"
                        onClick={() => handleRowClick(item)}
                      >
                        <span className="py-2 font-medium whitespace-nowrap flex items-center">
                          {item?.numberOfEmployees}
                        </span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="py-2 font-medium whitespace-nowrap flex items-center"
                      >
                        <span>{item.email}</span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap"
                        onClick={() => {
                          setIsViewContract(!isViewContract);
                          setSelectedItem(item);
                          console.log(
                            "selectedItem selectedItem",
                            selectedItem
                          );
                        }}
                      >
                        <span className="py-2 font-medium whitespace-nowrap flex items-center">
                          View
                        </span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap"
                        onClick={(event) => downloadContract(item, event)}
                      >
                        <span className="py-2 font-medium whitespace-nowrap flex items-center">
                          Download
                        </span>
                      </td>
                      <td
                        onClick={() => handleRowClick(item)}
                        className="px-4 py-2 font-medium whitespace-nowrap"
                      >
                        <span>{formatDate(item.created_at)}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap relative">
                        <svg
                          onClick={() => toggleEditDialog(item.id)}
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        {editDialogItem === item.id && (
                          <p
                            onClick={() => patchAndOpenDialog(item)}
                            className="absolute right-0 border border-gray-300 w-[130px] h-[40px] flex justify-start items-center font-[14px] pl-2 bg-white text-black rounded-sm"
                          >
                            Edit
                          </p>
                        )}
                      </td>
                      {editDialog && (
                        <p className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                          <p className="relative bg-white p-5 rounded-lg max-w-2xl w-full border border-black-400">
                            <div className="flex items-center justify-between py-3 relative bg-white px-4 rounded">
                              <div className="w-full">
                                <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                  <div className="flex justify-between items-center">
                                    <h1 className="text-lg font-bold pb-2">
                                      Company Information:
                                    </h1>
                                    <div className="mr-4">
                                      <button
                                        onClick={() =>
                                          setOpenConfirmation(!openConfirmation)
                                        }
                                        className="bg-primary-orange text-sm text-white w-24 sm:w-40 py-2 mr-4 rounded-xl hover:shadow-xl"
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap w-[100%] md:w-[99%] sm:w-[60%]">
                                    <div className="w-[30%] mr-2">
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
                                    <div className="w-[30%] mr-2">
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
                                        <option value="Technology">
                                          Technology
                                        </option>
                                        <option value="Tourism">Tourism</option>
                                        <option value="Hospitality">
                                          Hospitality
                                        </option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                    <div className="w-[30%] mr-2">
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
                                    <div className="w-[30%] mr-2">
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
                                    <div className="w-[30%] mr-2">
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
                                  <h1 className="text-lg font-bold pb-2">
                                    Contact Person:
                                  </h1>
                                  <div className="flex flex-wrap w-[100%]">
                                    <div className="w-[40%] mr-4">
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
                                    <div className="w-[40%] mr-4">
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
                                    <div className="w-[40%] mr-4">
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
                                    <div className="w-[40%] mr-4">
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
                                      onClick={() =>
                                        setOpenConfirmation(!openConfirmation)
                                      }
                                      className="absolute top-0 right-3 pb-1 text-black bg-transparent text-2xl"
                                    >
                                      &times;
                                    </button>
                                    <div className="bg-white rounded-lg flex flex-col items-center">
                                      <p className="text-sm leading-5 text-gray-500 mt-3">
                                        Are you sure want to edit the client?
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

                            <button
                              onClick={() => setEditDialog(false)}
                              className="absolute top-0 right-0 p-8 text-black bg-transparent text-2xl"
                            >
                              &times;{" "}
                            </button>
                          </p>
                        </p>
                      )}
                      {isDialogOpen && (
                        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                          <div className="relative bg-white px-10 py-5 rounded-lg max-w-4xl w-full border border-gray-300 shadow-lg overflow-hidden">
                            <div className="rounded-lg p-6">
                              <div className="mb-3">
                                <div className="flex items-center mb-4">
                                  {selectedItem?.logo ? (
                                    <Image
                                      src={selectedItem?.logo}
                                      alt="company logo"
                                      width={60}
                                      height={60}
                                      className="w-[60px] h-[60px] object-cover rounded-full mr-4 shadow-md transition-transform transform hover:scale-105"
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <h1 className="text-4xl font-bold transition-colors duration-300 hover:text-orange-800">
                                    {selectedItem?.companyName}
                                  </h1>
                                </div>
                                <div className="font-semibold text-lg text-gray-700">
                                  <span className="bg-[#FF6800] text-white px-2 py-1 rounded shadow-sm">{`ORR-${selectedItem?.sector?.slice(
                                    0,
                                    4
                                  )}-00${selectedItem?.id}`}</span>
                                </div>
                                <div className="font-semibold text-lg text-gray-700 mt-2">
                                  <span className="bg-[#FF6800] text-white px-2 py-1 rounded shadow-sm">
                                    {selectedItem?.sector}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="font-light text-gray-700">
                                  <span className="font-medium text-gray-900">
                                    No Of Employees:
                                  </span>{" "}
                                  {selectedItem?.numberOfEmployees}
                                </div>
                                <div className="font-light text-gray-700 mt-2">
                                  <span className="font-medium text-gray-900">
                                    Address:
                                  </span>{" "}
                                  {selectedItem?.address}
                                </div>
                                <div className="font-light text-gray-700 mt-2">
                                  <span className="font-medium text-gray-900">
                                    Website:
                                  </span>{" "}
                                  <a
                                    href={selectedItem?.website}
                                    className="text-[#FF6800] underline hover:text-orange-800 transition-colors duration-300"
                                  >
                                    {selectedItem?.website}
                                  </a>
                                </div>

                                <h1 className="text-2xl font-bold mt-6 text-[#FF6800] border-b-2 border-[#FF6800] pb-2">
                                  Contact Information
                                </h1>
                                <div className="font-light text-gray-700 mt-2">
                                  <span className="font-medium text-gray-900">
                                    {selectedItem?.firstName}{" "}
                                    {selectedItem?.lastName}
                                  </span>
                                </div>

                                <div className="font-light text-gray-700 mt-2">
                                  <span className="font-medium text-gray-900">
                                    {selectedItem?.email}
                                  </span>
                                </div>
                                <div className="font-light text-gray-700 mt-2">
                                  <span className="font-medium text-gray-900">
                                    {selectedItem?.phoneNumber}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={closeDialog}
                              className="absolute top-0 right-0 m-4 p-2 text-[#FF6800] bg-transparent text-2xl focus:outline-none hover:text-orange-800 transition duration-200"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      )}
                      {isViewContract && (
                        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                          <div className="relative bg-white px-10 py-5 rounded-lg max-w-4xl w-full border border-black-400">
                            <div className="bg-white rounded-lg">
                              {selectedItem?.contract ? (
                                <div className="mt-5">
                                  <h2 className="text-xl font-bold mb-2">
                                    Contract Preview
                                  </h2>
                                  <iframe
                                    src={`${selectedItem?.contract}#toolbar=0&navpanes=0&scrollbar=0`}
                                    width="100%"
                                    height="500px"
                                    className="border-0 overflow-x-hidden"
                                  />
                                </div>
                              ) : (
                                <div className="text-center text-xl">
                                  No contract to show
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => setIsViewContract(false)}
                              className="absolute top-0 right-0 p-8 text-black bg-transparent text-2xl"
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
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 bg-white"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage * itemsPerPage - itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, data?.length || 0)}
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.length || 0}
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
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
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
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
  );
};

export default page;

"use client";
import { editClient } from "@/api/recruiter/editClient";
import { getAllClients } from "@/api/recruiter/getAllClients";
import { formatDate } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

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

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };
  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  // Content for the edit client mechanism
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

  const createCliMutation = useMutation({
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
        setOpenConfirmation(false);
        setEditDialog(false);
      } else {
        toast.error("Something went wrong");
        setOpenConfirmation(!openConfirmation);
        setEditDialog(false);
      }
    } catch (err: any) {
      console.log("error", err.message);
      toast.error(err?.response?.data?.message);
      setOpenConfirmation(false);
      setEditDialog(false);
    }
  };
  // Content for the edit client mechanism

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
              {/* <div className="border- border-green-500">
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  type="button"
                  className="w-[100px] sm:w-full md:w-auto flex items-center justify-center py-2 px-2 sm:px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
              </div> */}
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
              <th scope="col" className="px-4 py-3 min-w-[6rem]">
                Created At
              </th>
              <th scope="col" className="px-4 py-3"></th>
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
                    <td className="px-4 py-2 whitespace-nowrap relative">
                      <Image
                        onClick={() => toggleEditDialog(item.id)}
                        width={20}
                        height={20}
                        src="/three-dot.svg"
                        alt="illustration"
                      />
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
                                      Edit Client
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
                                    className="absolute top-0 right-3 pb-1 text-lg text-black bg-transparent text-2xl"
                                  >
                                    &times;
                                  </button>
                                  <div className="bg-white rounded-lg flex flex-col items-center">
                                    <p className="text-sm leading-5 text-gray-500 mt-3">
                                      Are you sure want to edit the client?
                                    </p>
                                    <div className="mt-5 sm:mt-6">
                                      <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                        onClick={handleSubmit}
                                      >
                                        Yes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => setEditDialog(false)} // This closes the modal when clicked
                            className="absolute top-0 right-0 p-8 text-black bg-transparent text-2xl"
                          >
                            &times;{" "}
                          </button>
                        </p>
                      </p>
                    )}
                    {isDialogOpen && (
                      <p className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                        <p className="relative bg-white p-5 rounded-lg max-w-2xl w-full border border-black-400">
                          <p className="bg-white rounded-lg">
                            <p className="mb-5">
                              <p className="flex justify-between">
                                <h1 className="text-3xl font-bold">
                                  {selectedItem?.companyName}
                                </h1>
                              </p>
                              <p className="font-semibold text-lg text-gray-500 dark:text-gray-400">
                                ORR-
                                {selectedItem?.sector?.slice(0, 4)}
                                -00
                                {selectedItem?.id}
                              </p>
                              <p className="font-semibold text-lg text-gray-500 dark:text-gray-400">
                                {selectedItem?.sector}
                              </p>
                            </p>

                            <p className="mb-5">
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                No Of Employees:{" "}
                                {selectedItem?.numberOfEmployees}
                              </p>
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                Address: {selectedItem?.address}
                              </p>
                              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                                Website: {selectedItem?.website}
                              </p>

                              <h1 className="text-xl font-bold my-3">
                                Contact Information:
                              </h1>
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.firstName}{" "}
                                {selectedItem?.lastName}
                              </p>

                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.email}
                              </p>
                              <p className="font-light text-gray-500 dark:text-gray-400">
                                {selectedItem?.phoneNumber}
                              </p>
                            </p>
                          </p>
                          <button
                            onClick={closeDialog} // This closes the modal when clicked
                            className="absolute top-0 right-0 p-8 text-lg text-black bg-transparent text-2xl"
                          >
                            &times;{" "}
                          </button>
                        </p>
                      </p>
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
              1-10
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <a
                href="#"
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
              </a>
            </li>
            <li>
              <a
                href="#"
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
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default page;

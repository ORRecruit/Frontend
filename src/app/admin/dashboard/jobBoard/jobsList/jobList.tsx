"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAllJobsForAdmin } from "@/api/jobs/getAllJobs";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "@/components/customLoader";
import { DeleteJob } from "@/api/jobs/deleteJob";
import { useMutation } from "@tanstack/react-query";
import { editJob as editJobApi } from "@/api/jobs/editJob";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { RiCloseLine } from "react-icons/ri";
import { jobPublishApi } from "@/api/jobs/isPublishApi";
import { jobCompleteApi } from "@/api/jobs/markComplete";
import QuillTextEditor from "@/components/dashboard/quilEditor/QuillTextEditor";
import SkillsInput from "@/components/dashboard/skillsInput/SkillsInput";
import { createMarkup, formatString } from "@/utils/utils";

const jobList = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [activeOptionsIndex, setActiveOptionsIndex] = useState<number | null>(
    null
  );
  const [skills, setSkills] = useState<string[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<any>(false);
  const [publishDialog, setPublishDialog] = useState<any>(false);
  const [completeDialog, setCompleteDialog] = useState<any>(false);
  const [publishItem, setPublishItem] = useState<any>(null);
  const [completeItem, setCompleteItem] = useState<any>(null);
  const [editDialog, setEditDialog] = useState<any>(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    location: "",
    type: "",
    industry: "Technology",
    skillsRequired: [],
    experienceRequired: "4",
    companyName: "",
    qualification: "Middle",
    salaryOffered: "5",
    requirements: "",
    responsibilities: "",
    jobType: "Hourly",
    currencyType: "USD",
    contractType: "",
    jobVenue: "",
  });
  const [editId, setEditId] = useState<any>(null);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [filterString, setFilterString] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [filter, setFilter] = useState<boolean>(false);
  const [jobType, setJobType] = useState<string>("");
  const [contractType, setContractType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobVenue, setJobVenue] = useState<string>("");
  const locations = ["USA", "Canada", "Dubai"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const deleteJobMutation = useMutation({
    mutationFn: (id: any) => DeleteJob(id),
  });
  const editJobMutation = useMutation({
    mutationFn: (data: any) => editJobApi(editId, data),
  });

  const jobPublish = useMutation({
    mutationFn: (data: any) => jobPublishApi(data),
  });
  const jobComplete = useMutation({
    mutationFn: (data: any) => jobCompleteApi(data),
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian", title, contractType, jobType, location],
    queryFn: () =>
      getAllJobsForAdmin(
        `title=${title}`,
        `contractType=${contractType}`,
        `jobType=${jobType}`,
        `location=${location}`
      ),
  });

  useEffect(() => {
    console.log("data....", data?.data);
  }, [data]);

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("Skills inside useEffect:", skills);
    setFormData((prevFormData: any) => {
      console.log(
        "Previous formData in setFormData:",
        prevFormData.skillsRequired
      );
      return {
        ...prevFormData,
        skillsRequired: skills,
      };
    });
  }, [skills]);

  useEffect(() => {
    console.log("Updated formData in useEffect:", formData.skillsRequired);
  }, [formData.skillsRequired]); // Logs every time formData.skillsRequired changes

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveOptionsIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(!isDialogOpen);
  };
  console.log("skills inside my parent component >>>>", skills);

  const handleSkillsChange = (newSkills: string[]) => {
    console.log("newSKills", newSkills);
    setSkills(newSkills);
  };

  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    console.log("cloase", isDialogOpen);
  };
  const closeEditDialog = () => {
    setEditDialog(!editDialog);
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault();

    console.log("Form Data just before if>>>>", formData);
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.industry ||
      !formData.skillsRequired ||
      !formData.experienceRequired ||
      !formData.companyName ||
      !formData.qualification ||
      !formData.salaryOffered ||
      !formData.requirements ||
      !formData.responsibilities ||
      !formData.currencyType ||
      !formData.jobType ||
      !formData.contractType
    ) {
      console.log("Please Provide All Details");
      toast.error("Please Provide All Details");
      return;
    }
    console.log("formDAtaaaaa-----", formData);

    const response = await editJobMutation.mutateAsync(formData);
    if (response) {
      toast.success("You have updated the Job Successfully.");
      router.push("/admin/dashboard");
    } else {
      toast.error("Please Provide All Details");
    }
  };

  const toggleShowOptions = (index: number) => {
    setActiveOptionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const deleteJob = async (item: any) => {
    console.log("item...", item);
    setDeleteDialog(!deleteDialog);
  };
  const editJob = (item: any) => {
    console.log("edit", item);
    setEditId(item?.id);
    setFormData({
      title: item?.title,
      description: item?.description,
      location: item?.location,
      type: item?.type,
      industry: item?.industry,
      skillsRequired: item?.skillsRequired,
      experienceRequired: item?.experienceRequired,
      companyName: item?.companyName,
      qualification: item?.qualification,
      salaryOffered: item?.salaryOffered?.replace(/"/g, ""),
      requirements: item?.requirements,
      responsibilities: item?.responsibilities,
      jobType: item?.jobType,
      currencyType: item?.currencyType,
      contractType: item?.contractType,
      jobVenue: item?.jobVenue,
    });
    setSkills(item?.skillsRequired);
    setEditDialog(!editDialog);
  };

  const handlePublishJob = async (item: any) => {
    console.log("This Job is going to Publish >>>", item);
    setPublishItem(item);
    setPublishDialog(!publishDialog);
  };

  const handleCompleteJob = (item: any) => {
    console.log("inside handle complete Job>>", item);
    setCompleteItem(item);
    setCompleteDialog(!completeDialog);
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("formdata...name, value", name, value);
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("formdata...", formData);

  const closeDeleteDialog = async (job: any) => {
    const response = await deleteJobMutation.mutateAsync(job.id);
    if (response?.success) {
      console.log("responlse.....", response);

      setDeleteDialog(!deleteDialog);
      refetch();
    }
  };
  const closePublishDialog = async (job: any) => {
    console.log("job", publishItem?.id);
    const obj = {
      isPublished: true,
      jobId: publishItem?.id,
    };
    const response = await jobPublish.mutateAsync(obj);
    console.log("response....", response);

    if (response?.success) {
      console.log("responlse.....", response);

      setPublishDialog(!publishDialog);
      refetch();

      setPublishItem(null);
    }
  };
  const closeCompleteDialog = async (job: any) => {
    console.log("job", completeItem?.id);
    const obj = {
      isCompleted: true,
      jobId: completeItem?.id,
    };
    const response = await jobComplete.mutateAsync(obj);
    console.log("response....", response);

    if (response?.success) {
      console.log("responlse.....", response);

      setCompleteDialog(!completeDialog);
      refetch();

      setCompleteItem(null);
    }
  };

  const openEditConfirmation = () => {
    setConfirmationDialog(!confirmationDialog);
  };

  // Handle input change immediately
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    debouncedFetchJobs(e.target.value);
  };

  // Debounced function for fetching jobs
  const debouncedFetchJobs = useCallback(
    debounce((value: string) => {
      setTitle(value);
      refetch();
    }, 500),
    []
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(e.target.value);
    refetch();
  };

  console.log("response get from the API", data?.data);
  const filteredJobs = data?.data?.filter((job: any) => {
    switch (selectedFilter) {
      case "PENDING":
        return job.jobStatus === "PENDING";
      case "PUBLISHED":
        return job.jobStatus === "PUBLISHED";
      case "COMPLETED":
        return job.jobStatus === "COMPLETED";
      default:
        return true;
    }
  });
  console.log("The value of filteredJobs >>>", filteredJobs);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    refetch();
  };

  const resetFilters = () => {
    setTitle("");
    setContractType("");
    setJobVenue("");
    setLocation("");
    // refetch();
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <section className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 h-[90%] overflow-y-auto">
          <div className="mx-auto w-full px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="border-b dark:border-gray-700 mx-4">
                <div className="flex items-center justify-between space-x-4 pt-3">
                  <div className="flex-1 flex items-center space-x-3">
                    <h5 className="dark:text-white font-semibold">Jobs</h5>
                  </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3 relative">
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
                            onChange={handleInputChange}
                            value={localTitle}
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
                        <div className="border- border-green-500">
                          <button
                            id="filterDropdownButton"
                            data-dropdown-toggle="filterDropdown"
                            type="button"
                            className="w-[100px] sm:w-full md:w-auto flex items-center justify-center py-2 px-2 sm:px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => setFilter(!filter)}
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
                          {/* These are some filter options */}
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
                        </div>
                        <div>
                          {/* <button
                            id="configurationDropdownButton"
                            data-dropdown-toggle="configurationDropdown"
                            type="button"
                            className="w-34 sm:w-full md:w-auto flex items-center justify-center py-2 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            <Image
                              src="/talendSidebar4.svg"
                              width={15}
                              height={15}
                              alt="search-icon"
                              className="mr-2"
                            />
                            Export CSV
                          </button> */}
                          {/* filtered options from Export CSV */}
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
                          <Link href="/admin/dashboard/newJob">
                            <button className="bg-primary-orange text-sm text-white w-24 sm:w-40 py-2 rounded-xl hover:shadow-xl">
                              Post New Job
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {/* {filter && (
                        <div className="flex items-center mt-6 mb-2">
                          <div className="flex items-center">
                            <label className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
                              Job Type:
                            </label>
                            <div className="flex flex-wrap">
                              <label className="mr-4">
                                <input
                                  type="radio"
                                  name="jobType"
                                  value="Hour"
                                  checked={jobType === "Hour"}
                                  onChange={(e) => setJobType(e.target.value)}
                                />
                                Hour
                              </label>
                              <label className="mr-4">
                                <input
                                  type="radio"
                                  name="jobType"
                                  value="Month"
                                  checked={jobType === "Month"}
                                  onChange={(e) => setJobType(e.target.value)}
                                />
                                Month
                              </label>
                              <label className="mr-4">
                                <input
                                  type="radio"
                                  name="jobType"
                                  value="Year"
                                  checked={jobType === "Year"}
                                  onChange={(e) => setJobType(e.target.value)}
                                />
                                Year
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <select
                              id="contractType"
                              name="contractType"
                              className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={contractType}
                              onChange={(e) => setContractType(e.target.value)}
                            >
                              <option disabled value="">
                                Contract Type
                              </option>
                              <option value="partTime">Part Time</option>
                              <option value="fullTime">Full Time</option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <select
                              id="location"
                              name="location"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={location}
                              onChange={handleLocationChange}
                            >
                              <option disabled value="">
                                Location
                              </option>
                              {locations.map((loc, index) => (
                                <option key={index} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )} */}
                      {filter && (
                        <div className="flex mt-2 mb-2">
                          <div className="flex items-center">
                            <select
                              id="jobVenue"
                              name="jobVenue"
                              className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={jobVenue}
                              onChange={(e) => setJobVenue(e.target.value)}
                            >
                              <option disabled value="">
                                Job Venue
                              </option>
                              <option value="onsite">On Site</option>
                              <option value="remote">Remote</option>
                              <option value="hybrid">Hybrid</option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <select
                              id="contractType"
                              name="contractType"
                              className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={contractType}
                              onChange={(e) => setContractType(e.target.value)}
                            >
                              <option disabled value="">
                                Contract Type
                              </option>
                              <option value="partTime">Part Time</option>
                              <option value="fullTime">Full Time</option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <select
                              id="location"
                              name="location"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={location}
                              onChange={handleLocationChange}
                            >
                              <option disabled value="">
                                Location
                              </option>
                              {locations.map((loc, index) => (
                                <option key={index} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="button"
                            className="text-white font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[135px] h-[40px] ml-2 mt-[20px] sm:w-fit sm:mt-0 sm:w-[150px]"
                            onClick={resetFilters}
                          >
                            Reset Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row mb-3 md:mb-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button
                      type="button"
                      className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <svg
                        className="h-3.5 w-3.5 mr-2"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                      </svg>
                      Add new task
                    </button>
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
                      onChange={handleFilterChange}
                      checked={selectedFilter === "ALL"}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      All
                    </label>
                  </div>
                  <div className="flex items-center mr-4 mt-3">
                    <input
                      id="in-progress"
                      type="radio"
                      value="PENDING"
                      name="show-only"
                      onChange={handleFilterChange}
                      checked={selectedFilter === "PENDING"}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Pending/Draft
                    </label>
                  </div>

                  <div className="flex items-center mr-4 mt-3">
                    <input
                      id="publish"
                      type="radio"
                      value="PUBLISHED"
                      name="show-only"
                      onChange={handleFilterChange}
                      checked={selectedFilter === "PUBLISHED"}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Published
                    </label>
                  </div>

                  <div className="flex items-center mr-4 mt-3">
                    <input
                      id="completed"
                      type="radio"
                      value="COMPLETED"
                      name="show-only"
                      onChange={handleFilterChange}
                      checked={selectedFilter === "COMPLETED"}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Completed
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
                        Job ID
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Opportunity
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Recruiter
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Talent Applied
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Experience
                      </th>
                      <th scope="col" className="px-4 py-3 min-w-[6rem]">
                        Job Type
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs &&
                      filteredJobs?.map((item: any, index: any) => {
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
                              // scope="row"
                              className="pr-4 py-2 whitespace-nowrap"
                              onClick={() => handleRowClick(item)}
                            >
                              <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                ORR-{item?.industry?.slice(0, 4)}-00{item?.id}
                              </span>
                            </td>
                            <td
                              // scope="row"
                              className="pr-4 py-2 whitespace-nowrap"
                              onClick={() => handleRowClick(item)}
                            >
                              <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                {item.title}
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
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                <Link href="/admin/dashboard/jobBoard/ai-matching">
                                  {item?.applicationsCount}
                                </Link>
                              </span>
                            </td>
                            <td
                              onClick={() => handleRowClick(item)}
                              className="px-4 py-2 whitespace-nowrap"
                            >
                              <span>{item.experienceRequired} Yrs</span>
                            </td>
                            <td
                              onClick={() => handleRowClick(item)}
                              className="px-4 py-2 font-medium whitespace-nowrap"
                            >
                              <span>{formatString(`${item.jobVenue}`)}</span>
                            </td>
                            <td
                              onClick={() => handleRowClick(item)}
                              className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <span>13/02/2024</span>
                            </td>
                            <td
                              onClick={() => handleRowClick(item)}
                              className="px-4 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <span>{item.jobStatus}</span>
                            </td>
                            <td className="px-4 py-2 relative">
                              <button
                                id="-dropdown-button"
                                type="button"
                                data-dropdown-toggle="-dropdown"
                                className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleShowOptions(index);
                                }}
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              </button>
                              {activeOptionsIndex === index && (
                                <div
                                  id="-dropdown"
                                  ref={dropdownRef}
                                  className="cursor-pointer z-10 w-44 bg-white rounded divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                >
                                  {(() => {
                                    switch (item.jobStatus) {
                                      case "PENDING":
                                        return (
                                          <>
                                            <div
                                              onClick={() => editJob(item)}
                                              className="py-1"
                                            >
                                              <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Edit
                                              </p>
                                            </div>
                                            <div
                                              onClick={() => deleteJob(item)}
                                              className="py-1"
                                            >
                                              <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Delete
                                              </p>
                                            </div>
                                            <div
                                              onClick={() =>
                                                handlePublishJob(item)
                                              }
                                              className="py-1"
                                            >
                                              <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Publish
                                              </p>
                                            </div>
                                          </>
                                        );
                                      case "PUBLISHED":
                                        return (
                                          <>
                                            <div
                                              onClick={() => editJob(item)}
                                              className="py-1"
                                            >
                                              <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Edit
                                              </p>
                                            </div>
                                            <div
                                              onClick={() => deleteJob(item)}
                                              className="py-1"
                                            >
                                              <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Delete
                                              </p>
                                            </div>
                                            <div
                                              onClick={() =>
                                                handleCompleteJob(item)
                                              }
                                              className="py-1"
                                            >
                                              <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                Mark as Complete
                                              </p>
                                            </div>
                                          </>
                                        );
                                      case "COMPLETED":
                                        return (
                                          <div
                                            onClick={() => deleteJob(item)}
                                            className="py-1"
                                          >
                                            <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                              Delete
                                            </p>
                                          </div>
                                        );
                                      default:
                                        return null;
                                    }
                                  })()}
                                </div>
                              )}
                            </td>
                            {isDialogOpen && (
                              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                <div className="relative bg-white p-5 rounded-lg max-w-2xl w-full border border-black-400">
                                  <div className="bg-white rounded-lg">
                                    <div className="mb-5">
                                      <div className="flex justify-between">
                                        <h1 className="text-3xl font-bold">
                                          {selectedItem?.title}
                                        </h1>
                                      </div>
                                      <div className="font-light text-lg font-semibold text-gray-500 dark:text-gray-400">
                                        ORR-
                                        {selectedItem?.industry?.slice(0, 4)}
                                        -00
                                        {selectedItem?.id}
                                      </div>

                                      <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
                                        {selectedItem?.type}
                                      </span>
                                    </div>

                                    <div className="mb-5">
                                      <p className="text-gray-600">
                                        {selectedItem?.location}
                                      </p>
                                      <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                                        {selectedItem.salaryOffered + " "}
                                        {selectedItem.currencyType} /{" "}
                                        {selectedItem.jobType}
                                      </p>
                                      <p className="font-light text-gray-500 dark:text-gray-400">
                                        {selectedItem?.qualification}
                                      </p>
                                      <p className="font-light text-gray-500 dark:text-gray-400">
                                        {selectedItem?.contractType}
                                      </p>
                                      <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                                        {selectedItem?.experienceRequired} Yrs
                                      </p>
                                    </div>

                                    <h2 className="text-lg text-gray-700 font-bold mb-2">
                                      Job Description
                                    </h2>
                                    <div className="text-gray-700 mb-2">
                                      <p
                                        dangerouslySetInnerHTML={createMarkup(
                                          selectedItem?.description
                                        )}
                                      />
                                      <br />
                                    </div>

                                    <h3 className="text-lg text-gray-700 font-bold mb-2">
                                      Responsibilities
                                    </h3>
                                    <ul className="list-disc list-inside text-gray-700 mb-2">
                                      <p
                                        dangerouslySetInnerHTML={createMarkup(
                                          selectedItem?.responsibilities
                                        )}
                                      />
                                    </ul>
                                    <div className="text-gray-700 mb-2">
                                      <h3 className="text-lg font-bold mb-2">
                                        Requirements
                                      </h3>
                                      <p
                                        className="list-disc list-inside text-gray-700 mb-2"
                                        dangerouslySetInnerHTML={createMarkup(
                                          selectedItem?.requirements
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <button
                                    onClick={closeDialog} // This closes the modal when clicked
                                    className="absolute top-0 right-0 p-8 text-lg text-black bg-transparent text-2xl"
                                  >
                                    &times;{" "}
                                  </button>
                                </div>
                              </div>
                            )}
                            {deleteDialog && (
                              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                                  <div className="absolute top-2 right-3">
                                    <RiCloseLine
                                      size={25}
                                      onClick={() =>
                                        setDeleteDialog(!deleteDialog)
                                      }
                                    />
                                  </div>
                                  <div className="bg-white rounded-lg flex flex-col items-center">
                                    <p className="text-gray-600 text-xl mb-4">
                                      Are You Sure Want To Delete The Job?
                                    </p>
                                    <div>
                                      <button
                                        onClick={() => closeDeleteDialog(item)}
                                        className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                                      >
                                        Yes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {publishDialog && (
                              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                                  <div className="absolute top-2 right-3">
                                    <RiCloseLine
                                      size={25}
                                      onClick={() =>
                                        setPublishDialog(!publishDialog)
                                      }
                                    />
                                  </div>
                                  <div className="bg-white rounded-lg flex flex-col items-center">
                                    <p className="text-gray-600 text-xl mb-4">
                                      Are You Sure Want To Publish The Job?
                                    </p>
                                    <div>
                                      <button
                                        onClick={() => closePublishDialog(item)}
                                        className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                                      >
                                        Yes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {completeDialog && (
                              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                                  <div className="absolute top-2 right-3">
                                    <RiCloseLine
                                      size={25}
                                      onClick={() =>
                                        setCompleteDialog(!completeDialog)
                                      }
                                    />
                                  </div>
                                  <div className="bg-white rounded-lg flex flex-col items-center">
                                    <p className="text-gray-600 text-xl mb-4">
                                      Are You Sure Want To Complete The Job?
                                    </p>
                                    <div>
                                      <button
                                        onClick={() =>
                                          closeCompleteDialog(item)
                                        }
                                        className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                                      >
                                        Yes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {editDialog && (
                              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                <div className="relative bg-white p-5 rounded-lg w-[60%] h-[80%] overflow-y-scroll border border-black-500">
                                  <div className="bg-white rounded-lg flex flex-col items-center">
                                    <div className="w-full relative">
                                      <button
                                        onClick={closeEditDialog}
                                        className="absolute right-0 pb-1 text-lg text-black bg-transparent text-2xl"
                                      >
                                        &times;{" "}
                                      </button>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Company Info
                                        </h1>
                                        <div className="flex justify-between w-[80%] sm:w-[60%]">
                                          <div className="w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Company Name*
                                            </label>
                                            <input
                                              type="text"
                                              name="companyName"
                                              id="brand"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              placeholder="Input text"
                                              value={formData.companyName}
                                              onChange={handleChange}
                                              required={true}
                                            />
                                          </div>
                                          <div className="w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Enter Your Location*
                                            </label>
                                            <input
                                              type="text"
                                              name="location"
                                              id="price"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              placeholder="Enter Your Location"
                                              value={formData.location}
                                              onChange={handleChange}
                                              required={true}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Basic Info
                                        </h1>
                                        <div className="flex justify-between w-[98%] sm:w-[90%]">
                                          <div className="w-[32%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Job Title*
                                            </label>
                                            <input
                                              type="text"
                                              name="title"
                                              id="brand"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              placeholder="Input text"
                                              value={formData.title}
                                              onChange={handleChange}
                                              required={true}
                                            />
                                          </div>
                                          <div className="w-[32%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Industry*
                                            </label>
                                            <select
                                              id="industry"
                                              name="industry"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              value={formData.industry}
                                              onChange={handleChange}
                                            >
                                              <option>Input Text</option>
                                              <option value="Technology">
                                                Technology
                                              </option>
                                              <option value="Tourism">
                                                Tourism
                                              </option>
                                              <option value="Hospitality">
                                                Hospitality
                                              </option>
                                              <option value="Staffing & Recruiting">
                                                Staffing & Recruiting
                                              </option>
                                            </select>
                                          </div>
                                          <div className="w-[32%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Req. Qualification*
                                            </label>
                                            <select
                                              id="qualification"
                                              name="qualification"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              value={formData.qualification}
                                              onChange={handleChange}
                                            >
                                              <option value="Bachelor">
                                                Bachelor
                                              </option>
                                              <option value="Master">
                                                Master
                                              </option>
                                              <option value="Ph.D">Ph.D</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Skills Required*
                                        </h1>
                                        <div className="mb-2 w-[90%]">
                                          <SkillsInput
                                            onSkillsChange={handleSkillsChange}
                                            initialSkills={skills}
                                          />
                                          {/* <input
                                              type="text"
                                              id="default-input"
                                              name="skillsRequired"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                              value={formData.skillsRequired}
                                              onChange={handleChange}
                                              required={true}
                                            /> */}
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Experience*
                                        </h1>
                                        <div className="mb-2 w-[90%]">
                                          <div className="text-base mt-4 font-medium text-gray-800 dark:text-white absolute inset-0 flex justify-center">
                                            <p className="absolute left-[130px] text-white bg-primary-orange border border-black-300 pt-[2px] h-8 px-8 rounded-2xl bg-gray-300">
                                              {formData.experienceRequired +
                                                " "}
                                              Years
                                            </p>
                                          </div>
                                          <div className="relative mb-6">
                                            <input
                                              id="labels-range-input"
                                              type="range"
                                              min="1"
                                              max="10"
                                              name="experienceRequired"
                                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                              value={
                                                formData.experienceRequired
                                              }
                                              onChange={handleChange}
                                            />
                                            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                                              1+ Years
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                                              4+ Years
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                                              7+ Years
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                                              10 Years
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Salary Offered (Monthly)*
                                        </h1>
                                        <div className="flex justify-between w-[90%]">
                                          <div className="w-[32%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Payment Intervals*
                                            </label>
                                            <select
                                              id="jobType"
                                              name="jobType"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              value={formData.jobType}
                                              onChange={handleChange}
                                            >
                                              <option value="Hour">Hour</option>
                                              <option value="Month">
                                                Month
                                              </option>
                                              <option value="Year">Year</option>
                                            </select>
                                          </div>
                                          <div className="w-[32%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Currency*
                                            </label>
                                            <select
                                              id="currencyType"
                                              name="currencyType"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              value={formData.currencyType}
                                              onChange={handleChange}
                                            >
                                              <option value="USD">USD</option>
                                              <option value="CAD">CAD</option>
                                              <option value="AED">AED</option>
                                            </select>
                                          </div>
                                          <div className="w-[32%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Salary Offered*
                                            </label>
                                            <input
                                              type="text"
                                              name="salaryOffered"
                                              id="brand"
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                              placeholder="Input text"
                                              value={formData.salaryOffered}
                                              onChange={handleChange}
                                              required={true}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Work Environment*
                                        </h1>

                                        <div
                                          key={formData.jobVenue}
                                          className="flex"
                                        >
                                          <div className="flex me-4 mr-16">
                                            <input
                                              id="inline-radio"
                                              type="radio"
                                              className="w-4 h-4 bg-gray-100 border-gray-300"
                                              name="jobVenue"
                                              value="hybrid"
                                              onChange={handleChange}
                                              required={true}
                                              checked={
                                                formData.jobVenue === "hybrid"
                                              }
                                            />
                                            <div>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Hybrid
                                              </p>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Can work on site and remote
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex me-4 mr-16">
                                            <input
                                              id="inline-2-radio"
                                              type="radio"
                                              className="w-4 h-4 bg-gray-100 border-gray-300"
                                              name="jobVenue"
                                              value="remote"
                                              onChange={handleChange}
                                              checked={
                                                formData.jobVenue === "remote"
                                              }
                                            />
                                            <div>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Remote
                                              </p>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Will only work from remote
                                                setting
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex me-4 mr-16">
                                            <input
                                              id="inline-checked-radio"
                                              type="radio"
                                              className="w-4 h-4 bg-gray-100 border-gray-300"
                                              name="jobVenue"
                                              value="onsite"
                                              onChange={handleChange}
                                              checked={
                                                formData.jobVenue === "onsite"
                                              }
                                            />
                                            <div>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                On Site
                                              </p>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Will only work from your office
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Contract Type*
                                        </h1>
                                        <div
                                          key={formData.contractType}
                                          className="flex"
                                        >
                                          <div className="flex me-4 mr-16">
                                            <input
                                              id="inline-radio"
                                              type="radio"
                                              className="w-4 h-4 bg-gray-100 border-gray-300"
                                              name="contractType"
                                              value="fullTime"
                                              onChange={handleChange}
                                              required={true}
                                              checked={
                                                formData.contractType ===
                                                "fullTime"
                                              }
                                            />
                                            <div>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Full Time
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex me-4 mr-16">
                                            <input
                                              id="inline-2-radio"
                                              type="radio"
                                              className="w-4 h-4 bg-gray-100 border-gray-300"
                                              name="contractType"
                                              value="partTime"
                                              onChange={handleChange}
                                              checked={
                                                formData.contractType ===
                                                "partTime"
                                              }
                                            />
                                            <div>
                                              <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Part Time
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Description*
                                        </h1>
                                        <div className="mb-2 w-[90%]">
                                          <QuillTextEditor
                                            value={formData.description}
                                            onChange={(value) =>
                                              setFormData({
                                                ...formData,
                                                description: value,
                                              })
                                            }
                                            placeholder="Type Description here..."
                                          />
                                        </div>
                                      </div>
                                      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                        <h1 className="text-lg font-bold pb-2">
                                          Requirements & Responsibilities
                                        </h1>
                                        <div className="flex justify-between w-[80%] sm:w-[90%]">
                                          <div className="w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Requirements*
                                            </label>
                                            <QuillTextEditor
                                              value={formData.requirements}
                                              onChange={(value) =>
                                                setFormData({
                                                  ...formData,
                                                  requirements: value,
                                                })
                                              }
                                              placeholder="Specify the job requirements..."
                                            />
                                          </div>
                                          <div className="w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                              Responsibilities*
                                            </label>
                                            <QuillTextEditor
                                              value={formData.responsibilities}
                                              onChange={(value) =>
                                                setFormData({
                                                  ...formData,
                                                  responsibilities: value,
                                                })
                                              }
                                              placeholder="List the responsibilities..."
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <button
                                          onClick={openEditConfirmation}
                                          className="w-full mt-[20px] sm:mt-[0px] bg-orange-600 text-white font-medium rounded-lg px-5 py-2.5 text-center"
                                        >
                                          Post Job
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {confirmationDialog && (
                              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                <div className="relative bg-white p-5 rounded-lg border border-black-500">
                                  <button
                                    onClick={openEditConfirmation}
                                    className="absolute top-0 right-3 pb-1 text-lg text-black bg-transparent text-2xl"
                                  >
                                    &times;{" "}
                                  </button>
                                  <div className="bg-white rounded-lg flex flex-col items-center">
                                    <p className="text-sm leading-5 text-gray-500 mt-3">
                                      Are you sure want to Edit the Job?
                                    </p>
                                    <div className="mt-5 sm:mt-6">
                                      <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                        onClick={handleSubmit}
                                      >
                                        Post
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
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
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      100
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
        </section>
      )}
    </>
  );
};

export default jobList;

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
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
import { formatDate, formatString } from "@/utils/utils";
import { getAllClients } from "@/api/recruiter/getAllClients";
import { RotatingLines } from "react-loader-spinner";
import JobDetailModal from "@/components/modals/jobDetailModal";
import useToggleStore from "@/app/toggleStore";
import { getAllLeadOwners } from "@/api/leadOwner/getAllLeadOwners";

const jobList = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [activeOptionsIndex, setActiveOptionsIndex] = React.useState<
    number | null
  >(null);
  const [skills, setSkills] = React.useState<string[]>([]);
  const [deleteDialog, setDeleteDialog] = React.useState<any>(false);
  const [publishDialog, setPublishDialog] = React.useState<any>(false);
  const [completeDialog, setCompleteDialog] = React.useState<any>(false);
  const [publishItem, setPublishItem] = React.useState<any>(null);
  const [completeItem, setCompleteItem] = React.useState<any>(null);
  const [editDialog, setEditDialog] = React.useState<any>(false);
  const [formData, setFormData] = React.useState<any>({
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
    client_id: "",
    tier: "1",
    leadowner_id: "",
  });
  const [editId, setEditId] = React.useState<any>(null);
  const [confirmationDialog, setConfirmationDialog] =
    React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [localTitle, setLocalTitle] = React.useState<string>("");
  const [selectedFilter, setSelectedFilter] = React.useState("ALL");
  const [filter, setFilter] = React.useState<boolean>(false);
  const [contractType, setContractType] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [jobVenue, setJobVenue] = React.useState<string>("");
  const locations = ["USA", "Canada", "Dubai"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [deleteItem, setDeleteItem] = React.useState<any>(null);
  const [winLoseDialog, setWinLoseDialog] = React.useState<boolean>(false);
  const [selection, setSelection] = React.useState(null);
  const [winLoseReason, setWinLoseReason] = React.useState("");

  // Loaders for confirmation
  const [loaderMarkComp, setLoaderMarkComp] = React.useState<boolean>(false);
  const [loaderDelete, setLoaderDelete] = React.useState<boolean>(false);
  const [loaderPublish, setLoaderPublish] = React.useState<boolean>(false);
  const [applyNow, setApplyNow] = React.useState<boolean>(false);

  const handleSelect = (option: any) => {
    setSelection(option);
  };

  const handleChangeWinLose = (event: any) => {
    setWinLoseReason(event.target.value);
  };

  const submitWinLose = () => {
    console.log("win lose reason", selection, winLoseReason);
  };

  const toggleMenu = useToggleStore((state) => state.isSidebarOpen);

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
    queryKey: ["get all naukrian", title, contractType, jobVenue, location],
    queryFn: () =>
      getAllJobsForAdmin(
        `title=${title}`,
        `contractType=${contractType}`,
        `jobVenue=${jobVenue}`,
        `location=${location}`
      ),
  });

  const {
    data: clientsData,
    error: clientsError,
    isLoading: clientsLoading,
  } = useQuery({
    queryKey: ["getAllClients"],
    queryFn: () => getAllClients(),
  });

  const {
    data: leadOwnerData,
    error: leadOwnerError,
    isLoading: leadOwnerIsLoading,
    refetch: leadOwnerRefetch,
  } = useQuery({
    queryKey: ["get all lead owners"],
    queryFn: () => getAllLeadOwners(),
  });

  useEffect(() => {}, [data]);

  useEffect(() => {
    if (clientsData && clientsData.length) {
    }
  }, [clientsData]);

  useEffect(() => {}, [formData]);

  useEffect(() => {
    setFormData((prevFormData: any) => {
      return {
        ...prevFormData,
        skillsRequired: skills,
      };
    });
  }, [skills]);

  useEffect(() => {}, [formData.skillsRequired]);

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

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
  };

  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const closeEditDialog = () => {
    setEditDialog(!editDialog);
  };

  const handleSubmit = async (e: any) => {
    setApplyNow(!applyNow);
    e?.preventDefault();

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
      !formData.contractType ||
      !formData.client_id ||
      !formData.tier ||
      !formData.leadowner_id
    ) {
      toast.error("Please Provide All Details");
      console.log("formData error details", formData);
      setApplyNow(false);
      return;
    }

    const data = {
      ...formData,
      leadowner_id: Number(formData?.leadowner_id),
    };

    const response = await editJobMutation.mutateAsync(data);
    if (response) {
      toast.success("You have updated the Job Successfully.");
      router.push("/admin/dashboard");
      setApplyNow(false);
    } else {
      toast.error("Please Provide All Details");
      setApplyNow(false);
    }
  };

  const toggleShowOptions = (index: number) => {
    setActiveOptionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const deleteJob = async (item: any) => {
    setDeleteItem(item);
    setDeleteDialog(!deleteDialog);
  };
  const editJob = (item: any) => {
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
      tier: item?.tier,
      client_id: item?.client_id,
      leadowner_id: item?.leadowner_id,
    });
    setSkills(item?.skillsRequired);
    setEditDialog(!editDialog);
    setActiveOptionsIndex(null);
  };

  const handlePublishJob = async (item: any) => {
    setPublishItem(item);
    setPublishDialog(!publishDialog);
  };

  const handleCompleteJob = (item: any) => {
    setCompleteItem(item);
    setCompleteDialog(!completeDialog);
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: name === "client_id" ? Number(value) : value,
    }));
  };

  const closeDeleteDialog = async () => {
    setLoaderDelete(!loaderDelete);
    const response = await deleteJobMutation.mutateAsync(deleteItem?.id);
    if (response?.success) {
      setLoaderDelete(false);
      setDeleteDialog(!deleteDialog);
      refetch();
    } else {
      setLoaderDelete(false);
    }
  };
  const closePublishDialog = async (job: any) => {
    setLoaderPublish(!loaderPublish);
    const obj = {
      isPublished: true,
      jobId: publishItem?.id,
    };
    const response = await jobPublish.mutateAsync(obj);

    if (response?.success) {
      setLoaderPublish(false);

      setPublishDialog(!publishDialog);
      refetch();

      setPublishItem(null);
    } else {
      setLoaderPublish(false);
    }
  };
  const closeCompleteDialog = async (job: any) => {
    setLoaderMarkComp(!loaderMarkComp);
    const obj = {
      isCompleted: true,
      jobId: completeItem?.id,
    };
    const response = await jobComplete.mutateAsync(obj);

    if (response?.success) {
      setLoaderMarkComp(false);
      setCompleteDialog(!completeDialog);
      refetch();
      setCompleteItem(null);
      setWinLoseDialog(!winLoseDialog);
    } else {
      setLoaderMarkComp(false);
    }
  };

  const openEditConfirmation = () => {
    setConfirmationDialog(!confirmationDialog);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    debouncedFetchJobs(e.target.value);
  };

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

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    refetch();
  };

  const resetFilters = () => {
    setTitle("");
    setContractType("");
    setJobVenue("");
    setLocation("");
  };

  const routeToAiMatching = (jobId: any) => {
    router.push(`/admin/dashboard/jobBoard/ai-matching?jobId=${jobId}`);
  };

  // Pagination states and logic
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((filteredJobs?.length || 0) / itemsPerPage);

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

  const paginatedData = filteredJobs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <section
        className={`fixed top-[60px] w-[-webkit-fill-available] h-[90%] overflow-auto bg-gray-50 ${
          toggleMenu ? "sm:left-[272px]" : "sm:left-[75px]"
        }`}
      >
        {isLoading ? (
          <CustomLoader />
        ) : (
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
                              {locations?.map((loc, index) => (
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
                        Client
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Talent Applied
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Experience
                      </th>
                      <th scope="col" className="px-4 py-3 min-w-[6rem]">
                        Industry
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
                    {paginatedData &&
                      paginatedData
                        ?.sort((a, b) => b.id - a.id)
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
                                className="pr-4 py-2 whitespace-nowrap"
                                onClick={() => handleRowClick(item)}
                              >
                                <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                  ORR-{item?.industry?.slice(0, 4)}-00{item?.id}
                                </span>
                              </td>
                              <td
                                className="pr-4 py-2 whitespace-nowrap"
                                onClick={() => handleRowClick(item)}
                              >
                                <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                  {item.title}
                                </span>
                              </td>
                              <td
                                onClick={() => handleRowClick(item)}
                                className="pr-4 py-2 whitespace-nowrap"
                              >
                                <span className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                  {item.companyName}
                                </span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span
                                  onClick={() => routeToAiMatching(item?.id)}
                                  className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
                                >
                                  {item?.applicationsCount}
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
                                <span>{formatString(`${item.industry}`)}</span>
                              </td>
                              <td
                                onClick={() => handleRowClick(item)}
                                className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <span>{formatDate(item?.createdAt)}</span>
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
                                  className="inline-flex items-center z-0 p-1 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
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
                                    className="absolute right-11 cursor-pointer w-44 bg-white rounded divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
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
                                  <JobDetailModal
                                    data={selectedItem}
                                    closeDialog={closeDialog}
                                  />
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
                                        {!loaderDelete ? (
                                          <button
                                            onClick={() => closeDeleteDialog()}
                                            className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
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
                                        {!loaderPublish ? (
                                          <button
                                            onClick={() =>
                                              closePublishDialog(item)
                                            }
                                            className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
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
                                        {!loaderMarkComp ? (
                                          <button
                                            onClick={() =>
                                              closeCompleteDialog(item)
                                            }
                                            className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
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
                              {editDialog && (
                                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                                  <div className="relative bg-white p-5 rounded-lg w-[60%] h-[80%] overflow-y-scroll border border-black-500">
                                    <div className="bg-white rounded-lg flex flex-col items-center">
                                      <div className="w-full relative">
                                        <button
                                          onClick={closeEditDialog}
                                          className="absolute right-0 pb-1 text-black bg-transparent text-2xl"
                                        >
                                          &times;{" "}
                                        </button>
                                        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                          <h1 className="text-lg font-bold pb-2">
                                            Company Info
                                          </h1>
                                          <div className="flex justify-between w-[80%] sm:w-[90%] flex-wrap">
                                            <div className="w-[30%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                            <div className="w-[30%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                            <div className="w-[30%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                                                Client*
                                              </label>
                                              <select
                                                id="client_id"
                                                name="client_id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={formData.client_id}
                                                onChange={handleChange}
                                              >
                                                <option>Select Option</option>
                                                {clientsData?.map(
                                                  (client: any, index: any) => (
                                                    <option
                                                      key={index}
                                                      value={client?.id}
                                                    >
                                                      {client?.companyName}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                            <div className="w-[30%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                                                Tier*
                                              </label>
                                              <select
                                                id="tier"
                                                name="tier"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={formData.tier}
                                                onChange={handleChange}
                                              >
                                                <option>Select Option</option>
                                                <option value="1">
                                                  Tier 1
                                                </option>
                                                <option value="2">
                                                  Tier 2
                                                </option>
                                                <option value="3">
                                                  Tier 3
                                                </option>
                                              </select>
                                            </div>
                                            <div className="w-[30%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                                                Lead Owner*
                                              </label>
                                              <select
                                                id="leadowner_id"
                                                name="leadowner_id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={formData.leadowner_id}
                                                onChange={handleChange}
                                              >
                                                <option>Select Option</option>
                                                {leadOwnerData?.map(
                                                  (
                                                    leadOwner: any,
                                                    index: any
                                                  ) => (
                                                    <option
                                                      key={index}
                                                      value={leadOwner?.id}
                                                    >
                                                      {leadOwner?.name}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
                                          <h1 className="text-lg font-bold pb-2">
                                            Basic Info
                                          </h1>
                                          <div className="flex justify-between w-[98%] sm:w-[90%]">
                                            <div className="w-[32%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                                <option value="Other">
                                                  Other
                                                </option>
                                              </select>
                                            </div>
                                            <div className="w-[32%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                                <option
                                                  value="
                                                         
                                                         "
                                                >
                                                  Master
                                                </option>
                                                <option value="Ph.D">
                                                  Ph.D
                                                </option>
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
                                              onSkillsChange={
                                                handleSkillsChange
                                              }
                                              initialSkills={skills}
                                            />
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
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                                                Payment Intervals*
                                              </label>
                                              <select
                                                id="jobType"
                                                name="jobType"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={formData.jobType}
                                                onChange={handleChange}
                                              >
                                                <option value="Hour">
                                                  Hour
                                                </option>
                                                <option value="Month">
                                                  Month
                                                </option>
                                                <option value="Year">
                                                  Year
                                                </option>
                                              </select>
                                            </div>
                                            <div className="w-[32%]">
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                                  Will only work from your
                                                  office
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
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
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
                                              <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                                                Responsibilities*
                                              </label>
                                              <QuillTextEditor
                                                value={
                                                  formData.responsibilities
                                                }
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
                                            Save Changes
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
                                      className="absolute top-0 right-3 pb-1 text-black bg-transparent text-2xl"
                                    >
                                      &times;{" "}
                                    </button>
                                    <div className="bg-white rounded-lg flex flex-col items-center">
                                      <p className="text-sm leading-5 text-gray-500 mt-3">
                                        Are you sure want to save changes?
                                      </p>
                                      <div className="mt-5 sm:mt-6">
                                        {!applyNow ? (
                                          <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                            onClick={handleSubmit}
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
                              {winLoseDialog && (
                                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center border border-red-700">
                                  <div className="relative bg-white p-5 rounded-lg border border-black-500 w-[500px] py-12">
                                    <button
                                      onClick={() => setWinLoseDialog(false)}
                                      className="absolute top-0 right-3 pb-1 text-black bg-transparent text-2xl"
                                    >
                                      &times;
                                    </button>
                                    <div className="bg-white rounded-lg flex flex-col items-center">
                                      <div className="text-[20px]">
                                        What is the Conclusion of the Job?
                                      </div>
                                      <div className="flex justify-evenly items-center w-[400px] mt-[15px]">
                                        <div
                                          onClick={() => handleSelect("win")}
                                          className={`h-[40px] flex justify-center items-center w-[30%] border border-[#FF6800] rounded-xl cursor-pointer ${
                                            selection === "win"
                                              ? "bg-[#FF6800] text-white"
                                              : "hover:bg-[#FF6800] hover:text-white"
                                          }`}
                                        >
                                          Win
                                        </div>
                                        <div
                                          onClick={() => handleSelect("lose")}
                                          className={`h-[40px] flex justify-center items-center w-[30%] border border-[#FF6800] rounded-xl cursor-pointer ${
                                            selection === "lose"
                                              ? "bg-[#FF6800] text-white"
                                              : "hover:bg-[#FF6800] hover:text-white"
                                          }`}
                                        >
                                          Lose
                                        </div>
                                      </div>
                                      <div className="flex justify-evenly items-center w-[400px] mt-[15px]">
                                        <textarea
                                          name="winLoseReason"
                                          id="winLoseReason"
                                          className="w-[74%] h-[225px] resize-none border p-[8px] rounded-xl"
                                          placeholder="What's the reason for the job completion?"
                                          onChange={handleChangeWinLose}
                                          value={winLoseReason}
                                        />
                                      </div>
                                      <div className="w-[60%] mt-[15px] mx-auto flex justify-center items-center">
                                        <button
                                          onClick={submitWinLose}
                                          className="w-full border border-[#FF6800] py-[10px] rounded-xl bg-primary-orange text-white"
                                        >
                                          Save Changes
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
                    {currentPage * itemsPerPage - itemsPerPage + 1}-
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredJobs?.length || 0
                    )}
                  </span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredJobs?.length || 0}
                  </span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNextPage}
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
      </section>
    </>
  );
};

export default jobList;

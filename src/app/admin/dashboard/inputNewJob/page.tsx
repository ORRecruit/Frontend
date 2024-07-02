"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import QuillTextEditor from "@/components/dashboard/quilEditor/QuillTextEditor";
import SkillsInput from "@/components/dashboard/skillsInput/SkillsInput";
import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "@/api/recruiter/getAllClients";

const page = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({
    title: "",
    location: "",
    industry: "Technology",
    experienceRequired: "4",
    companyName: "",
    qualification: "Bachelor",
    salaryOffered: "5",
    requirements: "",
    responsibilities: "",
    jobType: "Hour",
    currencyType: "USD",
    contractType: "fullTime",
    jobVenue: "",
    description: "",
    tier: "",
    client_id: "",
  });

  const [validationErrors, setValidationErrors] = useState<any>({});

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get all naukrian"],
    queryFn: () => getAllClients(),
  });

  useEffect(() => {
    const loadJobData = () => {
      try {
        const storedJob = localStorage.getItem("postJob");
        if (storedJob) {
          const jobData = JSON.parse(storedJob);
          setFormData({
            companyName: jobData.companyName || "",
            location: jobData.location || "",
            client_id: jobData.client_id || "",
            tier: jobData.tier || "",
            title: jobData.title || "",
            industry: jobData.industry || "Technology",
            qualification: jobData.qualification || "Bachelor",
            experienceRequired: jobData.experienceRequired || "4",
            jobType: jobData.jobType || "Hour",
            currencyType: jobData.currencyType || "USD",
            salaryOffered: jobData.salaryOffered || "5",
            jobVenue: jobData.jobVenue || "",
            contractType: jobData.contractType || "fullTime",
            description: jobData.description || "",
            requirements: jobData.requirements || "",
            responsibilities: jobData.responsibilities || "",
          });
          if (jobData.skillsRequired) {
            setSkillsRequired(jobData.skillsRequired);
          }
        }
      } catch (error) {
        console.error("Failed to load job data from local storage:", error);
      }
    };

    loadJobData();
  }, []);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
      setValidationErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: false,
      }));
    },
    []
  );

  const handleSkillsChange = (newSkills: string[]) => {
    setSkillsRequired(newSkills);
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      skillsRequired: false,
    }));
  };

  const handleEditorChange = (name: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: value === "<p><br></p>",
    }));
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e?.preventDefault();

      const errors: any = {};
      const requiredFields = [
        "title",
        "location",
        "industry",
        "experienceRequired",
        "companyName",
        "qualification",
        "salaryOffered",
        "requirements",
        "responsibilities",
        "jobType",
        "currencyType",
        "contractType",
        "jobVenue",
        "description",
        "tier",
        "client_id",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          errors[field] = true;
        }
      });

      if (!skillsRequired.length) {
        errors.skillsRequired = true;
      }

      if (formData?.description === "<p><br></p>") {
        errors.description = true;
      }
      if (formData?.responsibilities === "<p><br></p>") {
        errors.responsibilities = true;
      }
      if (formData?.requirements === "<p><br></p>") {
        errors.requirements = true;
      }

      if (Object.keys(errors).length) {
        setValidationErrors(errors);
        setErrorMessage("Please provide all details to post the job!");
        return;
      }

      setErrorMessage("");
      const data = {
        ...formData,
        skillsRequired,
      };
      localStorage.setItem("postJob", JSON.stringify(data));
      router.push("/admin/dashboard/previewJob");
    },
    [formData, skillsRequired, router]
  );

  return (
    <div className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%]">
        <div className="p-4 ">
          <div>
            <Link href="/admin/dashboard/newJob">
              <Image
                src="/arrowLeft.svg"
                alt="back-icon"
                width={20}
                height={20}
              />
            </Link>
          </div>
          {errorMessage?.length ? (
            <p className="text-center text-red-500">{errorMessage}</p>
          ) : (
            ""
          )}
          <div className="absolute right-2 top-5">
            <button
              onClick={handleSubmit}
              className="bg-primary-orange hover:bg-orange-600 focus:bg-orange-600 text-sm text-white w-40 py-2 rounded-xl hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        </div>
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div>
            <h5 className="mr-3 font-semibold dark:text-white">Post New Job</h5>
            <p className="text-gray-500 dark:text-gray-400">
              Upload your job description below or start entering your
              information manually from “start manually” button
            </p>
          </div>
        </div>
      </div>
      <form action="">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1 className="text-lg font-bold pb-2">Company Info</h1>
          <div className="flex justify-between w-[80%] sm:w-[60%] flex-wrap">
            <div className="w-[48%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.companyName
                    ? "text-red-500"
                    : "text-gray-500"
                } dark:text-white`}
              >
                Company Name (to display)*
              </label>
              <input
                type="text"
                name="companyName"
                id="brand"
                className={`bg-gray-50 border ${
                  validationErrors.companyName
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Input text"
                value={formData.companyName}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="w-[48%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.location ? "text-red-500" : "text-gray-500"
                } dark:text-white`}
              >
                Enter Your Location*
              </label>
              <input
                type="text"
                name="location"
                id="price"
                className={`bg-gray-50 border ${
                  validationErrors.location
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter Your Location"
                value={formData.location}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="w-[48%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.client_id ? "text-red-500" : "text-gray-500"
                } dark:text-white`}
              >
                Client*
              </label>
              <select
                id="client_id"
                name="client_id"
                className={`bg-gray-50 border ${
                  validationErrors.client_id
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.client_id}
                onChange={handleChange}
              >
                <option>Select Option</option>
                {data?.map((client: any, index: any) => (
                  <option key={index} value={client?.id}>
                    {client?.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[48%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.tier ? "text-red-500" : "text-gray-500"
                } dark:text-white`}
              >
                Tier*
              </label>
              <select
                id="tier"
                name="tier"
                className={`bg-gray-50 border ${
                  validationErrors.tier ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.tier}
                onChange={handleChange}
              >
                <option>Select Option</option>
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1 className="text-lg font-bold pb-2">Basic Info</h1>
          <div className="flex justify-between w-[98%] sm:w-[90%]">
            <div className="w-[32%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.title ? "text-red-500" : "text-gray-500"
                } dark:text-white`}
              >
                Job Title*
              </label>
              <input
                type="text"
                name="title"
                id="brand"
                className={`bg-gray-50 border ${
                  validationErrors.title ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Input text"
                value={formData.title}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="w-[32%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.industry ? "text-red-500" : "text-gray-500"
                } dark:text-white`}
              >
                Industry*
              </label>
              <select
                id="industry"
                name="industry"
                className={`bg-gray-50 border ${
                  validationErrors.industry
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.industry}
                onChange={handleChange}
              >
                <option>Input Text</option>
                <option value="Technology">Technology</option>
                <option value="Tourism">Tourism</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-[32%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.qualification
                    ? "text-red-500"
                    : "text-gray-500"
                } dark:text-white`}
              >
                Req. Qualification*
              </label>
              <select
                id="category"
                name="qualification"
                className={`bg-gray-50 border ${
                  validationErrors.qualification
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.qualification}
                onChange={handleChange}
              >
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Ph.D">Ph.D</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1
            className={`text-lg font-bold pb-2 ${
              validationErrors.skillsRequired ? "text-red-500" : "text-gray-500"
            }`}
          >
            Skills Required*
          </h1>
          <div key={skillsRequired.length} className="mb-2 w-[90%]">
            <SkillsInput
              onSkillsChange={handleSkillsChange}
              initialSkills={skillsRequired}
            />
          </div>
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1 className="text-lg font-bold pb-2">Experience*</h1>
          <div className="mb-2 w-[90%]">
            <div className="text-base mt-4 font-medium text-gray-800 dark:text-white absolute inset-0 flex justify-center">
              <p className="absolute left-[130px] text-white bg-primary-orange border border-black-300 pt-[2px] h-8 px-8 rounded-2xl">
                {formData.experienceRequired} Years
              </p>
            </div>
            <div className="relative mb-6">
              <input
                id="labels-range-input"
                type="range"
                min="1"
                max="10"
                name="experienceRequired"
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700`}
                value={formData.experienceRequired}
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
          <h1 className="text-lg font-bold pb-2">Salary Offered (Monthly)*</h1>
          <div className="flex justify-between w-[90%]">
            <div className="w-[32%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.jobType ? "text-red-500" : "text-gray-500"
                } dark:text-white`}
              >
                Payment Intervals*
              </label>
              <select
                id="jobType"
                name="jobType"
                className={`bg-gray-50 border ${
                  validationErrors.jobType
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Hour">Hour</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
            <div className="w-[32%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.currencyType
                    ? "text-red-500"
                    : "text-gray-500"
                } dark:text-white`}
              >
                Currency*
              </label>
              <select
                id="currencyType"
                name="currencyType"
                className={`bg-gray-50 border ${
                  validationErrors.currencyType
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.currencyType}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="AED">AED</option>
              </select>
            </div>
            <div className="w-[32%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.salaryOffered
                    ? "text-red-500"
                    : "text-gray-500"
                } dark:text-white`}
              >
                Salary Offered*
              </label>
              <input
                type="text"
                name="salaryOffered"
                id="brand"
                className={`bg-gray-50 border ${
                  validationErrors.salaryOffered
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Input text"
                value={formData.salaryOffered}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1 className="text-lg font-bold pb-2">Work Environment*</h1>
          <div className="flex">
            <div className="flex me-4 mr-16">
              <input
                id="inline-radio"
                type="radio"
                className="w-4 h-4 bg-gray-100 border-gray-300"
                name="jobVenue"
                value="hybrid"
                checked={formData.jobVenue === "hybrid"}
                onChange={handleChange}
                required={true}
              />
              <div>
                <p
                  className={`ms-2 text-sm font-medium ${
                    validationErrors.jobVenue ? "text-red-500" : "text-gray-900"
                  } dark:text-gray-300`}
                >
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
                checked={formData.jobVenue === "remote"}
                onChange={handleChange}
              />
              <div>
                <p
                  className={`ms-2 text-sm font-medium ${
                    validationErrors.jobVenue ? "text-red-500" : "text-gray-900"
                  } dark:text-gray-300`}
                >
                  Remote
                </p>
                <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Will only work from remote setting
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
                checked={formData.jobVenue === "onsite"}
                onChange={handleChange}
              />
              <div>
                <p
                  className={`ms-2 text-sm font-medium ${
                    validationErrors.jobVenue ? "text-red-500" : "text-gray-900"
                  } dark:text-gray-300`}
                >
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
          <h1 className="text-lg font-bold pb-2">Contract Type*</h1>
          <div className="flex">
            <div className="flex me-4 mr-16">
              <input
                id="inline-radio"
                type="radio"
                className="w-4 h-4 bg-gray-100 border-gray-300"
                name="contractType"
                value="fullTime"
                onChange={handleChange}
                checked={formData.contractType === "fullTime"}
                required={true}
              />
              <div>
                <p
                  className={`ms-2 text-sm font-medium ${
                    validationErrors.contractType
                      ? "text-red-500"
                      : "text-gray-900"
                  } dark:text-gray-300`}
                >
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
                checked={formData.contractType === "partTime"}
                onChange={handleChange}
              />
              <div>
                <p
                  className={`ms-2 text-sm font-medium ${
                    validationErrors.contractType
                      ? "text-red-500"
                      : "text-gray-900"
                  } dark:text-gray-300`}
                >
                  Part Time
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1
            className={`text-lg font-bold pb-2 ${
              validationErrors.description ? "text-red-500" : "text-gray-500"
            }`}
          >
            Description*
          </h1>
          <QuillTextEditor
            value={formData.description}
            onChange={(value) => handleEditorChange("description", value)}
            placeholder="Description..."
          />
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1 className="text-lg font-bold pb-2">
            Requirements & Responsibilities
          </h1>
          <div className="flex justify-between w-[80%] sm:w-[90%]">
            <div className="w-[48%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.requirements
                    ? "text-red-500"
                    : "text-gray-500"
                } dark:text-white`}
              >
                Requirements*
              </label>
              <QuillTextEditor
                value={formData.requirements}
                onChange={(value) => handleEditorChange("requirements", value)}
                placeholder="Requirements..."
              />
            </div>
            <div className="w-[48%]">
              <label
                className={`block mb-1 mt-2 text-sm font-medium ${
                  validationErrors.responsibilities
                    ? "text-red-500"
                    : "text-gray-500"
                } dark:text-white`}
              >
                Responsibilities*
              </label>
              <QuillTextEditor
                value={formData.responsibilities}
                onChange={(value) =>
                  handleEditorChange("responsibilities", value)
                }
                placeholder="Responsibilities..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;

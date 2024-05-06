"use client";
import Image from "next/image";
import Link from "next/link";
import React, {
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import QuillTextEditor from "@/components/dashboard/quilEditor/QuillTextEditor";
import SkillsInput from "@/components/dashboard/skillsInput/SkillsInput";

const page = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [skillsRequired, setSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
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
  });

  console.log("The skills inside parent componnet >>>", skillsRequired);

  useEffect(() => {
    const storedJob = localStorage.getItem("postJob");
    if (storedJob) {
      const jobData = JSON.parse(storedJob);
      setFormData(jobData);
      if (jobData.skillsRequired) {
        setSkills(jobData.skillsRequired);
      }
    }
  }, []);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
  };
  const handleSubmit = useCallback(
    async (e: any) => {
      e?.preventDefault();
      if (
        !formData.title ||
        !formData.description ||
        !formData.location ||
        !formData.industry ||
        !skillsRequired ||
        !formData.experienceRequired ||
        !formData.companyName ||
        !formData.qualification ||
        !formData.salaryOffered ||
        !formData.requirements ||
        !formData.responsibilities ||
        !formData.currencyType ||
        !formData.jobType ||
        !formData.contractType ||
        !formData.jobVenue
      ) {
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
    [formData, router]
  );
  console.log("re rendering ...........");
  console.log("The skillsRequired array >>>>", skillsRequired);
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
              className="bg-primary-orange text-sm text-white w-40 py-2 rounded-xl hover:shadow-xl"
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
          <h1 className="text-lg font-bold pb-2">Basic Info</h1>
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
                <option value="Technology">Technology</option>
                <option value="Tourism">Tourism</option>
                <option value="Hospitality">Hospitality</option>
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
                id="category"
                name="qualification"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={formData.qualification}
                onChange={handleChange}
              >
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Ph.D">Ph.D</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
          <h1 className="text-lg font-bold pb-2">Skills Required*</h1>
          <div className="mb-2 w-[90%]">
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
              <p className="absolute left-[130px] text-white bg-primary-orange border border-black-300 pt-[2px] h-8 px-8 rounded-2xl bg-gray-300">
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
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
                <option value="Month">Month</option>
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
          <h1 className="text-lg font-bold pb-2">Work Environment*</h1>

          <div className="flex">
            <div className="flex me-4 mr-16">
              <input
                id="inline-radio"
                type="radio"
                className="w-4 h-4 bg-gray-100 border-gray-300"
                name="jobVenue"
                value="hybrid"
                onChange={handleChange}
                required={true}
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
              />
              <div>
                <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                onChange={handleChange}
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
                required={true}
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
          <h1 className="text-lg font-bold pb-2">Description*</h1>
          <QuillTextEditor
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            placeholder="Description..."
          />
          {/* <div className="mb-2 w-[90%]">{QuillComponent}</div> */}
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
                  setFormData({ ...formData, requirements: value })
                }
                placeholder="Requirements..."
              />
            </div>
            <div className="w-[48%]">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Responsibilities*
              </label>
              <QuillTextEditor
                value={formData.responsibilities}
                onChange={(value) =>
                  setFormData({ ...formData, responsibilities: value })
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

"use client";
import React, { useEffect, useState } from "react";
import { countries } from "@/constants/countries";
import SkillsInput from "@/components/dashboard/skillsInput/SkillsInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTalentById } from "@/api/talent/getTalentById";
import { updateTalent as updateTalentApi } from "@/api/talent/updateTalent";
import toast from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [techRequired, setTechRequired] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({
    fullName: "",
    country: "",
    industry: "",
    about: "",
    educations: [1],
    experiences: [1],
    github: "",
    linkedIn: "",
    website: "",
    twitter: "",
    skills: [],
    tools: [],
  });
  const candId = localStorage?.getItem("candidateId");
  const [publishDialog, setPublishDialog] = useState<any>(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get talent by id"],
    queryFn: () => getTalentById(`${candId}`),
  });
  const updateTalent = useMutation({
    mutationFn: (data: any) => updateTalentApi(candId, formData),
  });

  console.log("data", data);

  useEffect(() => {
    if (data) {
      setSkillsRequired(data?.skills);
      setTechRequired(data?.tools);
      const educations: any[] = [];
      data?.educations?.map((item: any) => {
        const objItem: any = {};
        objItem.startYear = formatDate(item?.startYear);
        objItem.endYear = formatDate(item?.endYear);
        objItem.degree = item?.degree;
        objItem.school = item?.school;
        objItem.description = item?.description;
        objItem.currentlyStudying = item?.currentlyStudying;
        educations.push(objItem);
      });

      const experiences: any[] = [];
      data?.experiences?.map((item: any) => {
        const objItem: any = {};
        objItem.startDate = formatDate(item?.startDate);
        objItem.endDate = formatDate(item?.endDate);
        objItem.companyName = item?.companyName;
        objItem.role = item?.role;
        objItem.description = item?.description;
        objItem.currentlyWorking = item?.currentlyWorking;

        experiences.push(objItem);
      });

      setFormData({
        fullName: data?.fullName,
        country: data?.country,
        industry: data?.industry,
        about: data?.about,
        educations: educations,
        experiences: experiences,
        github: data?.github,
        linkedIn: data?.linkedIn,
        website: data?.website,
        twitter: data?.twitter,
        skills: data?.skills,
        tools: data?.tools,
      });
    }
  }, [data]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSkillsChange = (newSkills: string[]) => {
    // setSkillsRequired(newSkills);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      skills: newSkills,
    }));
    console.log("newskills", formData);
  };
  const handleTechChange = (newTechs: string[]) => {
    // setTechRequired(newTechs);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      tools: newTechs,
    }));
  };

  const addEducation = () => {
    setFormData((prev: any) => ({
      ...prev,
      educations: [
        ...formData.educations,
        {
          school: "",
          degree: "",
          startYear: "",
          endYear: "",
          description: "",
          currentlyStudying: false,
        },
      ],
    }));
  };
  const addExperience = () => {
    setFormData((prev: any) => ({
      ...prev,
      experiences: [
        ...formData.experiences,
        {
          companyName: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          currentlyWorking: false,
        },
      ],
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEducation = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    index: number
  ) => {
    const { name, value, type, checked } = e.target;
    const newEducations = formData.educations.map((edu: any, eduIndex: any) => {
      if (index === eduIndex) {
        return { ...edu, [name]: type === "checkbox" ? checked : value };
      }
      return edu;
    });
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      educations: newEducations,
    }));
  };

  const handleChangeExperience = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, type, checked } = e.target;
    const newExperiences = formData?.experiences?.map(
      (exp: any, expIndex: any) => {
        if (index === expIndex) {
          return { ...exp, [name]: type === "checkbox" ? checked : value };
        }
        return exp;
      }
    );
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      experiences: newExperiences,
    }));
  };

  const submitData = async () => {
    console.log("formData", formData);
    try {
      const response = await updateTalent.mutateAsync(candId, formData);
      console.log("response..", response);
      if (response) {
        toast.success(response?.message);
        setPublishDialog(!publishDialog);
        toast.success(response?.message);
        router.push("/talent/dashboard/jobBoard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err: any) {
      console.log("error", err.message);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="fixed top-[60px] sm:left-[272px] w-[-webkit-fill-available] bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 h-[90%] overflow-y-auto">
      <div className="w-[60%] mx-auto px-[2%]">
        <div>
          {/* Personal Info */}
          <div className="mt-4">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
              Personal Info
            </h1>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              <div className="grid gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="first-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. Bonnie"
                    required={true}
                    value={formData?.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                  Country*
                </label>
                <select
                  id="countries"
                  name="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData?.country}
                  onChange={handleChange}
                >
                  {countries?.map((country: any, index: any) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                  Industry*
                </label>
                <select
                  id="industry"
                  name="industry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData?.industry}
                  onChange={handleChange}
                >
                  <option value="Technology">Technology</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Staffing & Recruiting">
                    Staffing & Recruiting
                  </option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  About You*
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Who You Are?"
                  required={true}
                  value={formData?.about}
                  onChange={handleChange}
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
                </div>
              </div>
            </div>
          </div>
          {/* tools tech info  */}
          <div className="mt-4">
            <div className="w-[100%]">
              <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
                Skills and Tech
              </h1>
              <div className="w-[100%]">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Skills
                </label>
                <div key={skillsRequired.length} className="mb-2 w-[100%]">
                  <SkillsInput
                    onSkillsChange={handleSkillsChange}
                    initialSkills={skillsRequired}
                  />
                </div>
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Tech
                </label>
                <div key={techRequired.length} className="mb-2 w-[100%]">
                  <SkillsInput
                    onSkillsChange={handleTechChange}
                    initialSkills={techRequired}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* education info  */}
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
              Education Info
            </h1>
            <div className="mt-4 max-h-[480px] overflow-auto pr-[15px]">
              {formData?.educations?.map((education: any, index: any) => (
                <div key={index} className="grid gap-6 mb-8 relative">
                  <button
                    type="button"
                    // onClick={() => handleRemoveEducation(index)}
                    className="absolute right-[15px] top-[-5px] text-red-500"
                  >
                    x
                  </button>
                  <div className="grid sm:grid-cols-2">
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Degree*
                      </label>
                      <input
                        type="text"
                        name="degree"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Degree"
                        required={true}
                        value={education.degree}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                    </div>
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        School*
                      </label>
                      <input
                        type="text"
                        name="school"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="School"
                        required={true}
                        value={education.school}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2">
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        From*
                      </label>
                      <input
                        name="startYear"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date start"
                        value={education.startYear}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                    </div>
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Till*
                      </label>
                      <input
                        name="endYear"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date end"
                        value={education.endYear}
                        onChange={(e) => handleChangeEducation(e, index)}
                        disabled={education.currentlyStudying}
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <input
                        id="currentlyStudying"
                        name="currentlyStudying"
                        aria-describedby="currentlyStudying"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        checked={education.currentlyStudying}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                      <label
                        htmlFor="currentlyStudying"
                        className="text-sm text-gray-500 ml-2"
                      >
                        Currently Studying
                      </label>
                    </div>
                  </div>

                  <div className="w-[98%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Details*
                    </label>
                    <input
                      type="text"
                      name="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="What did you do here?"
                      required={true}
                      value={education.description}
                      onChange={(e) => handleChangeEducation(e, index)}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="focus:outline-none text-primary-color bg-light-gray font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 hover:bg-primary-orange hover:text-white"
                onClick={addEducation}
              >
                Add Another
              </button>
            </div>
          </div>
          {/* experience info  */}
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
              Experience Info
            </h1>
            <div className="mt-4 max-h-[480px] overflow-auto pr-[15px]">
              {formData?.experiences?.map((experience: any, index: any) => (
                <div key={index} className="grid gap-6 mb-8 relative">
                  <button
                    type="button"
                    // onClick={() => handleRemoveExperience(index)}
                    className="absolute right-[15px] top-[-5px] text-red-500"
                  >
                    x
                  </button>

                  <div className="grid sm:grid-cols-2">
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Company"
                        required={true}
                        value={experience?.companyName}
                        onChange={(e) => handleChangeExperience(e, index)}
                      />
                    </div>
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Role"
                        required={true}
                        value={experience?.role}
                        onChange={(e) => handleChangeExperience(e, index)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2">
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        From
                      </label>
                      <input
                        name="startDate"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date start"
                        value={experience?.startDate}
                        onChange={(e) => handleChangeExperience(e, index)}
                      />
                    </div>
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Till
                      </label>
                      <input
                        name="endDate"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date end"
                        value={experience?.endDate}
                        onChange={(e) => handleChangeExperience(e, index)}
                        disabled={experience?.currentlyWorking}
                      />
                      <div className="mt-2 flex items-center">
                        <input
                          id="currentlyWorking"
                          name="currentlyWorking"
                          aria-describedby="currentlyWorking"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          checked={experience?.currentlyWorking}
                          onChange={(e) => handleChangeExperience(e, index)}
                        />
                        <label
                          htmlFor="currentlyWorking"
                          className="text-sm text-gray-500 ml-2"
                        >
                          Currently Working
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="w-[98%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Details
                    </label>
                    <input
                      type="text"
                      name="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="What did you do here?"
                      required={true}
                      value={experience?.description}
                      onChange={(e) => handleChangeExperience(e, index)}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="focus:outline-none text-primary-color bg-light-gray font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 hover:bg-primary-orange hover:text-white"
                onClick={addExperience}
              >
                Add Another
              </button>
            </div>
          </div>
          {/* social media information  */}
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
              Social Media Information
            </h1>
            <div className="mt-4">
              <div className="py-4">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Website</p>
                  </div>
                  <input
                    type="text"
                    name="website"
                    placeholder="https://"
                    className="border p-2 w-full text-sm"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                        clipRule="evenodd"
                      />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                    </svg>
                    <p>Linked In</p>
                  </div>

                  <input
                    type="text"
                    name="linkedIn"
                    placeholder="linkedin.com/userid"
                    className="border p-2 w-full text-sm"
                    value={formData.linkedIn}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>GitHub</p>
                  </div>

                  <input
                    type="text"
                    name="github"
                    placeholder="github.com/userid"
                    className="border p-2 w-full text-sm"
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Twitter/X</p>
                  </div>

                  <input
                    type="text"
                    name="twitter"
                    placeholder="x.com/username"
                    className="border p-2 w-full text-sm"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setPublishDialog(!publishDialog)}
            className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
          >
            Update Profile
          </button>
          {publishDialog && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                <div className="absolute top-2 right-3">
                  <RiCloseLine
                    size={25}
                    onClick={() => setPublishDialog(!publishDialog)}
                  />
                </div>
                <div className="bg-white rounded-lg flex flex-col items-center">
                  <p className="text-gray-600 text-xl mb-4">
                    Are You Sure Want To Publish The Job?
                  </p>
                  <div>
                    <button
                      onClick={() => submitData()}
                      className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

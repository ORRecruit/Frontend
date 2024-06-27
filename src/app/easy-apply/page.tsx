"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/landing/footer/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { easyApply } from "@/api/applicants/createApplicants";
import toast from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";

function Page() {
  const param = useSearchParams();
  const id = param.get("jobId");
  const [publishDialog, setPublishDialog] = useState<any>(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    setJobId(id);
    console.log("jobId", id);
  }, [id]);

  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);
  const easyApplyMutation = useMutation({
    mutationFn: (formData: FormData) => easyApply(formData, jobId),
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const [formData, setFormData] = useState<any>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    address: "",
    countryCode: "",
    areaCode: "",
    phoneNumber: "",
    preferredContactMethod: "email",
    linkedinProfile: "",
    indeedProfile: "",
    glassdoorProfile: "",
    highestEducation: "Bachelor's Degree",
    workExperience: "",
    coverLetter: null,
    resume: null,
  });
  const [applyNow, setApplyNow] = useState<boolean>(false);

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev: any) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const fileTarget = e.target as HTMLInputElement;
      setFormData((prev: any) => ({
        ...prev,
        [name]: fileTarget.files ? fileTarget.files[0] : null,
      }));
    } else if (type === "number") {
      const numberValue = value === "" ? "" : Number(value);
      setFormData((prev: any) => ({ ...prev, [name]: numberValue }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev: any) => ({
        ...prev,
        resume: file,
      }));
      console.log("Selected resume:", file);
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev: any) => ({
        ...prev,
        coverLetter: file,
      }));
      console.log("Selected cover letter:", file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    console.log("formData0000", formData);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country ||
      !formData.city ||
      !formData.address ||
      !formData.countryCode ||
      !formData.phoneNumber ||
      !formData.preferredContactMethod ||
      !formData.highestEducation ||
      !formData.workExperience ||
      !formData.resume
    ) {
      toast.error("Please Provide All Details");
      return;
    }

    const payloadData = new FormData();

    payloadData.append("firstName", formData.firstName);
    payloadData.append("middleName", formData.middleName);
    payloadData.append("lastName", formData.lastName);
    payloadData.append("email", formData.email);
    payloadData.append("country", formData.country);
    payloadData.append("city", formData.city);
    payloadData.append("address", formData.address);
    payloadData.append("countryCode", formData.countryCode);
    payloadData.append("areaCode", formData.areaCode);
    payloadData.append("phoneNumber", formData.phoneNumber);
    payloadData.append(
      "preferredContactMethod",
      formData.preferredContactMethod
    );
    payloadData.append("linkedinProfile", formData.linkedinProfile);
    payloadData.append("indeedProfile", formData.indeedProfile);
    payloadData.append("glassdoorProfile", formData.glassdoorProfile);
    payloadData.append("highestEducation", formData.highestEducation);
    payloadData.append("workExperience", formData.workExperience);
    payloadData.append("coverLetter", formData.coverLetter);
    payloadData.append("resume", formData.resume);

    try {
      setApplyNow(!applyNow);
      const response = await easyApplyMutation.mutateAsync(payloadData);
      if (response?.success) {
        setPublishDialog(!publishDialog);
        toast.success("You've applied to  job successfully!");
        router.push("/job-board");
        setApplyNow(!applyNow);
      } else {
        toast.error(
          "Some error occured while processing your request. Try again later"
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (jobId) {
    console.log("jobId", jobId);
  }

  return (
    <>
      <div className="w-full mx-auto pt-4 pb-8">
        <div className="w-[94%] mx-auto 2xl:w-3/4">
          <div className="bg-white">
            <div className="max-w-3xl mx-auto px-6 sm:px-6 lg:px-8">
              <div>
                <p className="text-center text-gray-500">
                  Fill out the form below to apply
                </p>
                <div className="mt-8 bg-white shadow-lg rounded-lg p-8 w-full">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="first-name"
                      >
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="First Name*"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="middle-name"
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        id="middle-name"
                        placeholder="Middle Name"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="last-name"
                      >
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="Last Name*"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm" htmlFor="email">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Email Address*"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="address-country"
                      >
                        Country*
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="address-country"
                        autoComplete="country-name"
                        placeholder="Country*"
                        value={formData.country}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="address-city"
                      >
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="address-city"
                        autoComplete="address-level2"
                        placeholder="City*"
                        value={formData.city}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="address"
                      >
                        Address*
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address*"
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-3 gap-x-4">
                      <div>
                        <label
                          className="text-gray-500 text-sm"
                          htmlFor="phone-country-code"
                        >
                          Country Code*
                        </label>
                        <input
                          type="text"
                          name="countryCode"
                          id="phone-country-code"
                          autoComplete="tel-country-code"
                          placeholder="Country Code*"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-500 text-sm"
                          htmlFor="phone-area-code"
                        >
                          Area Code
                        </label>
                        <input
                          type="text"
                          name="areaCode"
                          id="phone-area-code"
                          autoComplete="tel-area-code"
                          placeholder="Area Code"
                          value={formData.areaCode}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-500 text-sm"
                          htmlFor="phone-number"
                        >
                          Phone Number*
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phone-number"
                          autoComplete="tel"
                          placeholder="Phone Number*"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="contact-method"
                        className="text-gray-500 text-sm"
                      >
                        Preferred Contact Method*
                      </label>
                      <select
                        id="contact-method"
                        name="preferredContactMethod"
                        value={formData.preferredContactMethod}
                        onChange={handleChange}
                        className="block w-full mt-1 py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-3 gap-x-4">
                      <div>
                        <label
                          className="text-gray-500 text-sm"
                          htmlFor="linkedin"
                        >
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedinProfile"
                          id="linkedinProfile"
                          placeholder="LinkedIn Profile"
                          value={formData.linkedinProfile}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-500 text-sm"
                          htmlFor="indeed"
                        >
                          Indeed
                        </label>
                        <input
                          type="url"
                          name="indeedProfile"
                          id="indeedProfile"
                          placeholder="Indeed Profile"
                          value={formData.indeedProfile}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-500 text-sm"
                          htmlFor="glassdoor"
                        >
                          Glassdoor
                        </label>
                        <input
                          type="url"
                          name="glassdoorProfile"
                          id="glassdoorProfile"
                          placeholder="Glassdoor Profile"
                          value={formData.glassdoorProfile}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="education"
                        className="text-gray-500 text-sm"
                      >
                        Highest Education*
                      </label>
                      <select
                        id="highestEducation"
                        name="highestEducation"
                        value={formData.highestEducation}
                        onChange={handleChange}
                        className="block w-full mt-1 py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="High School">High School</option>
                        <option value="Associate Degree">
                          Associate Degree
                        </option>
                        <option value="Bachelor's Degree">
                          Bachelor's Degree
                        </option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="experience"
                      >
                        Work Experience (Years)*
                      </label>
                      <input
                        type="number"
                        name="workExperience"
                        id="workExperience"
                        placeholder="Work Experience in Years*"
                        value={formData.workExperience}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="">
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="cover-letter"
                      >
                        Cover Letter (PDF or Word)
                      </label>
                      <input
                        type="file"
                        name="coverLetter"
                        id="cover-letter"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCoverLetterChange}
                        className="block w-full text-sm text-gray-500 my-5 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm" htmlFor="resume">
                        Resume (PDF or Word)*
                      </label>
                      <input
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="block w-full text-sm text-gray-500 my-5  cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-start">
                      <div
                        className="flex items-center"
                        onClick={() => setPolicyAccepted(!policyAccepted)}
                      >
                        <input
                          id="policyAccepted"
                          name="policyAccepted"
                          type="checkbox"
                          required
                          checked={policyAccepted}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="policy"
                          className="font-medium text-gray-700"
                        >
                          I agree to the{" "}
                          <a
                            href="/privacy-policy"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        onClick={() => setPublishDialog(!publishDialog)}
                        className="mt-2 h-10 w-full bg-orange-600 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Submit Application
                      </button>
                    </div>
                    {publishDialog && (
                      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                        <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                          <div className="absolute top-2 right-3">
                            <RiCloseLine
                              size={25}
                              onClick={() => {
                                setPublishDialog(!publishDialog);
                                setApplyNow(false);
                              }}
                            />
                          </div>
                          <div className="bg-white rounded-lg flex flex-col items-center">
                            {!applyNow ? (
                              <div className="text-center">
                                <p className="text-gray-600 text-xl mb-4">
                                  Are You Sure Want To Apply For The Job?
                                </p>
                                <button
                                  onClick={handleSubmit}
                                  className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                                >
                                  Yes
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col justify-center items-center py-4">
                                <p className="text-gray-600 text-xl mb-4 text-center">
                                  Sit back, we're submitting your application.
                                </p>
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
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/landing/footer/footer";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { easyApply } from "@/api/applicants/createApplicants";
import toast from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";

function Page() {
  const param = useSearchParams();
  const id = param.get("jobId");
  const [publishDialog, setPublishDialog] = useState<any>(false);
  const [jobId, setJobId] = useState<string | null>(null);
  useEffect(() => {
    setJobId(id);
    console.log("jobId", id);
  }, [id]);

  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);
  const easyApplyMutation = useMutation({
    mutationFn: (data) => easyApply(data),
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
    highestEducation: "",
    workExperience: "",
    coverLetter: null,
    resumePath: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      setFormData((prev: any) => ({ ...prev, [name]: target.checked }));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    console.log("formData000", formData);

    if (
      !formData.firstName ||
      !formData.middleName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country ||
      !formData.city ||
      !formData.address ||
      !formData.countryCode ||
      !formData.areaCode ||
      !formData.phoneNumber ||
      !formData.preferredContactMethod ||
      !formData.linkedinProfile ||
      !formData.indeedProfile ||
      !formData.glassdoorProfile ||
      !formData.highestEducation ||
      !formData.workExperience ||
      !formData.coverLetter ||
      !formData.resumePath
    ) {
      toast.error("Please Provide All Details");
      return;
    }

    console.log("formData", formData);
    formData.resumePath = formData.resumePath?.name
      ? formData.resumePath?.name
      : "";
    formData.coverLetter = formData.coverLetter?.name
      ? formData.coverLetter?.name
      : "";
    const payload = {
      ...formData,
      jobId,
    };

    try {
      const response = await easyApplyMutation.mutateAsync(payload);
      if (response?.success) {
        setPublishDialog(!publishDialog);
        toast.success(response?.message);
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
                        First Name
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
                        Last Name
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
                        Email Address
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
                        Country
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
                        City
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
                        Address
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
                          Country Code
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
                          placeholder="Area Code*"
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
                          Phone Number
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
                        <option>High School</option>
                        <option>Associate Degree</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                        <option>Doctorate</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        className="text-gray-500 text-sm"
                        htmlFor="experience"
                      >
                        Work Experience (Years)
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
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 my-5 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm" htmlFor="resume">
                        Resume (PDF or Word)
                      </label>
                      <input
                        type="file"
                        name="resumePath"
                        id="resumePath"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
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
                              onClick={() => setPublishDialog(!publishDialog)}
                            />
                          </div>
                          <div className="bg-white rounded-lg flex flex-col items-center">
                            <p className="text-gray-600 text-xl mb-4">
                              Are You Sure Want To Apply For The Job?
                            </p>
                            <div>
                              <button
                                onClick={handleSubmit}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;

"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/navbar/navbar";
import Footer from "@/components/landing/footer/footer";
import { useSearchParams } from "next/navigation";

function Page() {
  const param = useSearchParams();
  const jobId = param.get("jobId");

  const [formData, setFormData] = useState({
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
    contactMethod: "",
    linkedin: "",
    indeed: "",
    glassdoor: "",
    education: "",
    experience: "",
    coverLetter: null,
    resume: null,
    policyAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else if (type === "file") {
      const fileTarget = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: fileTarget.files ? fileTarget.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  if (jobId) {
    console.log("jobId", jobId);
  }

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto pt-4 pb-8">
        <div className="w-[94%] mx-auto 2xl:w-3/4">
          <div className="bg-white">
            <div className="max-w-3xl mx-auto px-6 sm:px-6 lg:px-8">
              <div>
                <p className="text-center text-gray-500">
                  Fill out the form below to apply
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 bg-white shadow-lg rounded-lg p-8 w-full"
                >
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <label htmlFor="first-name" className="sr-only">
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
                      <label htmlFor="middle-name" className="sr-only">
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
                      <label htmlFor="last-name" className="sr-only">
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
                      <label htmlFor="email" className="sr-only">
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
                      <label htmlFor="address-country" className="sr-only">
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
                      <label htmlFor="address-city" className="sr-only">
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
                      <label htmlFor="address" className="sr-only">
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
                        <label htmlFor="phone-country-code" className="sr-only">
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
                        <label htmlFor="phone-area-code" className="sr-only">
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
                        <label htmlFor="phone-number" className="sr-only">
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
                      <label htmlFor="contact-method" className="text-gray-500">
                        Preferred Contact Method*
                      </label>
                      <select
                        id="contact-method"
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        className="block w-full mt-1 py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Email</option>
                        <option>Phone</option>
                        <option>Both</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-3 gap-x-4">
                      <div>
                        <label htmlFor="linkedin" className="sr-only">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          id="linkedin"
                          placeholder="LinkedIn Profile"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="indeed" className="sr-only">
                          Indeed
                        </label>
                        <input
                          type="url"
                          name="indeed"
                          id="indeed"
                          placeholder="Indeed Profile"
                          value={formData.indeed}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="glassdoor" className="sr-only">
                          Glassdoor
                        </label>
                        <input
                          type="url"
                          name="glassdoor"
                          id="glassdoor"
                          placeholder="Glassdoor Profile"
                          value={formData.glassdoor}
                          onChange={handleChange}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="education" className="text-gray-500">
                        Highest Education*
                      </label>
                      <select
                        id="education"
                        name="education"
                        value={formData.education}
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
                      <label htmlFor="experience" className="sr-only">
                        Work Experience (Years)
                      </label>
                      <input
                        type="number"
                        name="experience"
                        id="experience"
                        placeholder="Work Experience in Years*"
                        value={formData.experience}
                        onChange={handleChange}
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="">
                      <label htmlFor="cover-letter" className="">
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
                    <div className="">
                      <label htmlFor="resume" className="">
                        Resume (PDF or Word)
                      </label>
                      <input
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500 my-5  cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-start">
                      <div
                        className="flex items-center"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            policyAccepted: !prev.policyAccepted,
                          }))
                        }
                      >
                        <input
                          id="policy"
                          name="policy"
                          type="checkbox"
                          required
                          checked={formData.policyAccepted}
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
                        type="submit"
                        className="mt-2 h-10 w-full bg-orange-600 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
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
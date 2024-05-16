"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const page = () => {
  const [formData, setFormData] = useState({
    experiences: [
      {
        companyName: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });

  const handleChange = (e: any, index: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newExperiences = formData.experiences.map((exp, expIndex) => {
      if (index === expIndex) {
        return { ...exp, [name]: value };
      }
      return exp;
    });
    setFormData({ experiences: newExperiences });
  };

  const router = useRouter();
  const submitForm = (e: any) => {
    e.preventDefault();
    const candidateInfo = localStorage.getItem("candidateInfo");
    if (candidateInfo !== null) {
      const data = JSON.parse(candidateInfo);
      data.experiences = formData.experiences;
      localStorage.setItem("candidateInfo", JSON.stringify(data));
      console.log("data", data);
    }
    router.push("/talentForm/education-info");
  };

  const addExperience = () => {
    setFormData({
      experiences: [
        ...formData.experiences,
        {
          companyName: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <button
          className="absolute top-10 left-10 flex items-center mb-4 text-[#FF6800]"
          onClick={() => router.back()}
        >
          <FiArrowLeft className="mr-2" size={24} color="#FF6800" />
          Back
        </button>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
          <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 text-black font-sans">
              Experience
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Please add your most recent and relevant experiences
            </p>
            <form
              onSubmit={submitForm}
              className="mt-4 max-h-[480px] overflow-auto"
              action="#"
            >
              {formData.experiences.map((experience, index) => (
                <div key={index} className="grid gap-6 mb-8">
                  <div className="grid sm:grid-cols-2">
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Company"
                        required={true}
                        value={experience.companyName}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Role"
                        required={true}
                        value={experience.role}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div date-rangepicker="true" className="grid sm:grid-cols-2">
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        From
                      </label>
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                      <input
                        name="startDate"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date start"
                        value={experience.startDate}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Till
                      </label>
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                      <input
                        name="endDate"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date end"
                        value={experience.endDate}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <div className="mt-2 flex items-center">
                        <input
                          id="currentlyWorking"
                          name="endDate"
                          aria-describedby="currentlyWorking"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required={false}
                          value="Currently Working"
                          onChange={(e) => handleChange(e, index)}
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

                  <div className="w-[100%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Details
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="about"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="What did you do here?"
                      required={true}
                      value={experience.description}
                      onChange={(e) => handleChange(e, index)}
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
              <div>
                <div className="flex items-start">
                  <div className="text-sm w-full mb-[0px]">
                    <label className="font-light text-gray-500 dark:text-gray-300 opacity-0 h-[0px]">
                      By signing up, you are creating a Sendinblue account, and
                      you agree to Sendinblue's
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                Continue
              </button>
            </form>
          </div>
          <div className="mr-auto place-self-center lg:col-span-6">
            <Image
              width={400}
              height={400}
              className="hidden mx-auto lg:flex"
              src="/sign-up.svg"
              alt="illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

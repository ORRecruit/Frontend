// page.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import useStore from "@/app/store";

const Page = () => {
  const experiences = useStore((state) => state.stepData.step3);
  const setStepData = useStore((state) => state.setStepData);
  const [formData, setFormData] = useState<{ experiences: any[] }>({
    experiences: experiences,
  });

  useEffect(() => {
    setStepData("step3", formData.experiences);
  }, [formData.experiences, setStepData]);

  const handleChange = (
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
    setFormData({ experiences: newExperiences });
  };

  const router = useRouter();
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
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
          currentlyWorking: false,
        },
      ],
    });
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = formData.experiences.filter(
      (_, i) => i !== index
    );
    setFormData({ experiences: updatedExperiences });
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
              className="mt-4 max-h-[480px] overflow-auto pr-[15px]"
              action="#"
            >
              {formData?.experiences?.map((experience: any, index: any) => (
                <div key={index} className="grid gap-6 mb-8 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Role"
                        required={true}
                        value={experience.role}
                        onChange={(e) => handleChange(e, index)}
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
                        value={experience.startDate}
                        onChange={(e) => handleChange(e, index)}
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
                        value={experience.endDate}
                        onChange={(e) => handleChange(e, index)}
                        disabled={experience.currentlyWorking}
                      />
                      <div className="mt-2 flex items-center">
                        <input
                          id="currentlyWorking"
                          name="currentlyWorking"
                          aria-describedby="currentlyWorking"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          checked={experience.currentlyWorking}
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

export default Page;

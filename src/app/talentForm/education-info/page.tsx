"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  // const [formData, setFormData] = useState({
  //   school: "",
  //   degree: "",
  //   fieldOfStudy: "",
  //   startYear: "",
  //   endYear: "",
  //   description: "",
  // });
  const [formData, setFormData] = useState({
    educations: [
      {
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
  });

  // const handleChange = (e: any) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e: any, index: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newEducations = formData.educations.map((edu, expIndex) => {
      if (index === expIndex) {
        return { ...edu, [name]: value };
      }
      return edu;
    });
    setFormData({ educations: newEducations });
  };

  // const router = useRouter();
  // const submitForm = (e: any) => {
  //   e.preventDefault();
  //   const candidateInfo = localStorage.getItem("candidateInfo");

  //   console.log(formData);
  //   if (candidateInfo !== null) {
  //     const data = JSON.parse(candidateInfo);
  //     data.educations = [
  //       {
  //         school: formData.school,
  //         degree: formData.degree,
  //         fieldOfStudy: formData.fieldOfStudy,
  //         startYear: formData.startYear,
  //         endYear: formData.endYear,
  //         description: formData.description,
  //       },
  //     ];
  //     localStorage.setItem("candidateInfo", JSON.stringify(data));
  //     console.log("data", data);
  //   }
  //   router.push("/talentForm/socialMedia-info");
  // };
  const router = useRouter();
  const submitForm = (e: any) => {
    e.preventDefault();
    const candidateInfo = localStorage.getItem("candidateInfo");
    if (candidateInfo !== null) {
      const data = JSON.parse(candidateInfo);
      data.educations = formData.educations;
      localStorage.setItem("candidateInfo", JSON.stringify(data));
      console.log("data", data);
    }
    // router.push("/talentForm/education-info");
  };

  const addEducations = () => {
    setFormData({
      educations: [
        ...formData.educations,
        {
          school: "",
          degree: "",
          startYear: "",
          endYear: "",
          description: "",
        },
      ],
    });
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
          <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 text-black font-sans">
              Education
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Tell us about your most recent qualification.
            </p>
            <form
              onSubmit={submitForm}
              className="mt-4 max-h-[450px] overflow-auto"
              action="#"
            >
              {formData.educations.map((education, index) => (
                <div key={index} className="grid gap-6 mb-8">
                  <div className="grid sm:grid-cols-2">
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Degree*
                      </label>
                      <input
                        type="text"
                        name="degree"
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Degree"
                        required={true}
                        value={education.degree}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        School*
                      </label>
                      <input
                        type="text"
                        name="school"
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="School"
                        required={true}
                        value={education.school}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div date-rangepicker="true" className="grid sm:grid-cols-2">
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        From*
                      </label>
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                      <input
                        name="startYear"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date start"
                        value={education.startYear}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div className="relative w-[96%]">
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                        Till*
                      </label>
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                      <input
                        name="endYear"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date end"
                        value={education.endYear}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="w-[100%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Details*
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="about"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="What did you do here?"
                      required={true}
                      value={education.description}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="focus:outline-none text-primary-color bg-light-gray font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 hover:bg-primary-orange hover:text-white"
                onClick={addEducations}
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

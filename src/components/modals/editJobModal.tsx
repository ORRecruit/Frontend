import React from "react";

const editJobModal: React.FC<any> = ({
  formData,
  closeEditDialog,
  handleChange,
  clientsData,
  leadOwnerData,
  SkillsInput,
  skills,
  handleSkillsChange,
  QuillTextEditor,
  setFormData,
  openEditConfirmation,
}) => {
  return (
    <div className="relative bg-white p-5 rounded-lg w-[70%] h-[85%] overflow-y-scroll border border-black-500">
      <div className="bg-white rounded-lg flex flex-col items-center">
        <div className="w-full relative">
          <button
            onClick={closeEditDialog}
            className="absolute right-0 pb-1 text-black bg-transparent text-2xl"
          >
            &times;{" "}
          </button>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <h1 className="text-lg font-bold pb-2">Company Info</h1>
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
                  {clientsData?.map((client: any, index: any) => (
                    <option key={index} value={client?.id}>
                      {client?.companyName}
                    </option>
                  ))}
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
                  <option value="1">Tier 1</option>
                  <option value="2">Tier 2</option>
                  <option value="3">Tier 3</option>
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
                  {leadOwnerData?.map((leadOwner: any, index: any) => (
                    <option key={index} value={leadOwner?.id}>
                      {leadOwner?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <h1 className="text-lg font-bold pb-2">Basic Info</h1>
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
                  <option value="Technology">Technology</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Other">Other</option>
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
                  <option value="Bachelor">Bachelor</option>
                  <option
                    value="
                         
                         "
                  >
                    Master
                  </option>
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
                initialSkills={skills}
              />
            </div>
          </div>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <h1 className="text-lg font-bold pb-2">Experience*</h1>
            <div className="mb-2 w-[90%]">
              <div className="text-base mt-4 font-medium text-gray-800 dark:text-white absolute inset-0 flex justify-center">
                <p className="absolute left-[130px] text-white bg-primary-orange border border-black-300 pt-[2px] h-8 px-8 rounded-2xl bg-gray-300">
                  {formData.experienceRequired + " "}
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
                  <option value="Hour">Hour</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
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
            <h1 className="text-lg font-bold pb-2">Work Environment*</h1>

            <div key={formData.jobVenue} className="flex">
              <div className="flex me-4 mr-16">
                <input
                  id="inline-radio"
                  type="radio"
                  className="w-4 h-4 bg-gray-100 border-gray-300"
                  name="jobVenue"
                  value="hybrid"
                  onChange={handleChange}
                  required={true}
                  checked={formData.jobVenue === "hybrid"}
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
                  checked={formData.jobVenue === "remote"}
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
                  checked={formData.jobVenue === "onsite"}
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
            <div key={formData.contractType} className="flex">
              <div className="flex me-4 mr-16">
                <input
                  id="inline-radio"
                  type="radio"
                  className="w-4 h-4 bg-gray-100 border-gray-300"
                  name="contractType"
                  value="fullTime"
                  onChange={handleChange}
                  required={true}
                  checked={formData.contractType === "fullTime"}
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
                  checked={formData.contractType === "partTime"}
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
            <div className="mb-2 w-[90%]">
              <QuillTextEditor
                value={formData.description}
                onChange={(value: any) =>
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
                  onChange={(value: any) =>
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
                  value={formData.responsibilities}
                  onChange={(value: any) =>
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
  );
};

export default editJobModal;

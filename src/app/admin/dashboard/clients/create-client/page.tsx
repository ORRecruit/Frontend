import React from "react";

const page = () => {
  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="flex items-center justify-between py-3 relative bg-white px-4 rounded">
        <form action="" className="w-full">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <h1 className="text-lg font-bold pb-2">Company Information:</h1>
            <div className="flex flex-wrap w-[80%] md:w-[99%] sm:w-[60%]">
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Company Name*
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Input Company Name"
                  // value={formData.companyName}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Industry*
                </label>
                <select
                  id="industry"
                  name="industry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  // value={formData.industry}
                  // onChange={handleChange}
                >
                  <option>Input Text</option>
                  <option value="Technology">Technology</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Number Of Employees*
                </label>
                <input
                  type="text"
                  name="salaryOffered"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Input Number of Employees"
                  // value={formData.salaryOffered}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Website
                </label>
                <input
                  type="text"
                  name="location"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Website URL"
                  // value={formData.location}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[32%] mr-2">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Address*
                </label>
                <input
                  type="text"
                  name="location"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Your Address With Country"
                  // value={formData.location}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] my-4 py-4 pl-4">
            <h1 className="text-lg font-bold pb-2">Contact Person:</h1>
            <div className="flex flex-wrap w-[80%] sm:w-[60%]">
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  First Name*
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter First Name"
                  // value={formData.companyName}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="location"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Last Name"
                  // value={formData.location}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Email*
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Email"
                  // value={formData.companyName}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="w-[48%] mr-4">
                <label className="block mb-1 mt-2 text-sm font-medium text-gray-500 dark:text-white">
                  Phone Number*
                </label>
                <input
                  type="text"
                  name="location"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Phone Number"
                  // value={formData.location}
                  // onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

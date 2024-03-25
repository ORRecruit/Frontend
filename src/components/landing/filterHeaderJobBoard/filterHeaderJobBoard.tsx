import React from "react";

const filterHeaderJobBoard = () => {
  return (
    <div>
      <section className="flex">
        <div className="w-full max-w-screen-xl px-4 mx-auto">
          <div className="relative px-4 bg-white dark:bg-gray-800 sm:rounded-lg">
            <div className="flex items-center justify-between pt-4 md:pb-4">
              <div className="flex items-center flex-1 space-x-2">
                <h5>
                  <span className="dark:text-white">Find Jobs</span>
                </h5>
              </div>
            </div>
            <div className="flex flex-col-reverse items-stretch justify-between pb-4 space-y-3 md:flex-row md:items-center md:space-y-0">
              <div className="flex flex-col w-full space-y-3 lg:w-2/3 md:space-y-0 md:flex-row md:items-center">
                <form className="flex-1 w-full md:max-w-sm md:mr-4">
                  <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="absolute top-0 bottom-0 right-0 px-4 py-2 text-sm font-medium text-white rounded-r-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div className="flex items-center space-x-4">
                  <div>
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      type="button"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        />
                      </svg>
                      Filter
                    </button>
                    <div
                      id="filterDropdown"
                      className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                    >
                      <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                        Category
                      </h6>
                      <ul
                        className="space-y-2 text-sm"
                        aria-labelledby="dropdownDefault"
                      >
                        <li className="flex items-center">
                          <input
                            id="apple"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                            Apple (56)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="fitbit"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                            Fitbit (56)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="dell"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                            Dell (56)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="asus"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                            Asus (97)
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div
                      id="configurationDropdown"
                      className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="configurationDropdownButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            By Category
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            By Brand
                          </a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Reset
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full pb-4 md:pb-0 md:w-auto md:flex-row md:items-center md:space-x-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-1.5 -ml-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add new product
                </button>
              </div>
            </div>
            <div className="flex flex-wrap pt-1 pb-4 border-t dark:border-gray-700">
              <div className="items-center hidden mt-3 mr-4 text-sm font-medium text-gray-900 md:flex dark:text-white">
                Show only:
              </div>

              <div className="flex flex-wrap">
                <div className="flex items-center mt-3 mr-4">
                  <input
                    id="all-products"
                    type="radio"
                    value=""
                    name="show-only"
                    className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    All
                  </label>
                </div>
                <div className="flex items-center mt-3 mr-4">
                  <input
                    id="active"
                    type="radio"
                    value=""
                    name="show-only"
                    className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Active products
                  </label>
                </div>
                <div className="flex items-center mt-3 mr-4">
                  <input
                    id="pending"
                    type="radio"
                    value=""
                    name="show-only"
                    className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Pending products
                  </label>
                </div>
                <div className="flex items-center mt-3 mr-4">
                  <input
                    id="inactive"
                    type="radio"
                    value=""
                    name="show-only"
                    className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Inactive products
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default filterHeaderJobBoard;

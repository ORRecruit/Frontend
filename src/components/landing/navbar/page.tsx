import React from "react";

const page = () => {
  return (
    // <div className="h-24 bg-white">
    //   <nav className="w-9/12	 mx-auto h-full flex justify-between items-center">
    //     <div className="flex justify-between items-center w-5/12">
    //       <div>
    //         <a href="#">
    //           <img src="/ORR-logo.svg" alt="" />
    //         </a>
    //       </div>
    //       <div className="w-9/12 flex items-between">
    //         <a className="w-3/12" href="#">
    //           Jobs
    //         </a>
    //         <a className="w-3/12" href="#">
    //           Recruiters
    //         </a>
    //         <a className="w-3/12" href="#">
    //           Blog
    //         </a>
    //         <a className="w-3/12" href="#">
    //           About
    //         </a>
    //       </div>
    //     </div>
    //     <div>
    //       <a href="#">Log In</a>
    //       <a href="#" className="ml-3.5">
    //         <button
    //           type="button"
    //           className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-orange-600	"
    //         >
    //           Get Started
    //         </button>
    //       </a>
    //     </div>
    //   </nav>
    // </div>

    <nav className="bg-white h-24 lg:w-4/5 mx-auto">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/ORR-logo.svg" className="h-8" alt="Flowbite Logo" />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse lg:relative">
          <a href="#" className="md:mr-4">
            Login
          </a>
          <button
            type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-orange-600"
          >
            Get started
          </button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 lg:absolute lg:left-1/4"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-black rounded"
                aria-current="page"
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Recruiters
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default page;

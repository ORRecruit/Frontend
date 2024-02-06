import React from "react";

export const footer = () => {
  return (
    <>
      <footer className="p-4 bg-white md:p-8 lg:p-10">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="#"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="my-3 w-16 h-16" src="/ORR-logo.svg" alt="" />
          </a>
          <p className="my-6 text-gray-500 dark:text-gray-400">
            4k+ Recruiters with 50k+ Talented individuals. ORR thrives on its on
            point AI based precise recruitment process. It’s tailored to modern
            Ai needs.
          </p>
          <ul className="flex flex-wrap justify-center items-center mb-6">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Recruiters
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Talent
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                How It Works
              </a>
            </li>
          </ul>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022{" "}
            <a href="#" className="hover:underline">
              ORR, Inc
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default footer;

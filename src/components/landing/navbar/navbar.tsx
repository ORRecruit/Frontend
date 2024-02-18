"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// navbar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white h-24 lg:w-4/5 mx-auto">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:">
        <Link
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            width={50}
            height={50}
            src="/ORR-logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse lg:relative">
          <Link href="#" className="md:mr-4">
            Login
          </Link>
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
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen
              ? "flex flex-col bg-gray-200 z-10 rounded-xl mt-2.5 text-white"
              : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1 lg:absolute lg:left-1/4`}
          id="navbar-cta"
        >
          <ul className="w-full flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                href="/"
                className={`${
                  isMenuOpen
                    ? "hover:bg-orange-600 hover:text-white hover:w-full"
                    : ""
                } block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={`${
                  isMenuOpen
                    ? "hover:bg-orange-600 hover:text-white hover:w-full"
                    : ""
                } block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Candidates
              </Link>
            </li>
            <li>
              <Link
                href="/recruiters"
                className={`${
                  isMenuOpen
                    ? "hover:bg-orange-600 hover:text-white hover:w-full"
                    : ""
                } block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0`}
              >
                Recruiters
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={`${
                  isMenuOpen
                    ? "hover:bg-orange-600 hover:text-white hover:w-full"
                    : ""
                } block py-2 px-3 text-gray-700 rounded md:bg-transparent md:p-0`}
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

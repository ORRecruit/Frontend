import Navbar from "@/components/landing/navbar/navbar";
import React from "react";
import FilterHeaderJobBoard from "@/components/landing/filterHeaderJobBoard/filterHeaderJobBoard";
import About from "@/components/landing/about/about";
import Footer from "@/components/landing/footer/footer";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Navbar />
      <FilterHeaderJobBoard />
      <div className="max-w-screen-xl sm:flex sm:items-start sm:justify-between mx-auto p-4">
        <div className="sm:w-[29%] mt-12">
          <div className="self-center w-full border border-black-400 p-4 mb-6 rounded-2xl hover:bg-gray-200">
            <div className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Sales Account Manager
            </div>
            <div className="font-light text-gray-500 dark:text-gray-400">
              Dubai UAE
            </div>
            <div className="mb-4 text-lg font-extrabold text-gray-900 dark:text-white">
              Market Competitive Salary
            </div>

            <div className="mb-5">
              <button
                type="button"
                className="text-black-400 hover:text-white border border-gray-800 bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Full Time
              </button>
              <button
                type="button"
                className="text-black-400 hover:text-white border border-gray-800 bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Dubai UAE
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Experienced IT Sales Account Manager needed to manage accounts,
              develop opportunities, lead sales processes, and ensure success in
              the UAE market through strong client relationships and team
              oversight.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg mt-4 sm:w-[68%] sm:p-8">
          <div className="mb-5">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">Sales Account Manager </h1>
              <button
                type="button"
                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:px-5 sm:py-3 text-center bg-orange-600 w-[120px] h-[40px] mt-[20px] sm:w-fit sm:h-fit sm:mt-0"
              >
                <Link href="#">Apply Now</Link>
              </button>
            </div>
            <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
              Full Time
            </span>
          </div>

          <div className="mb-5">
            <p className="text-gray-600">Dubai UAE</p>
            <p className="text-gray-600">Hybrid</p>
            <p className="font-semibold text-gray-900">
              Market Competitive Salary
            </p>
          </div>

          <h2 className="text-lg font-semibold mb-4">Job Description</h2>
          <div className="text-gray-700 mb-8">
            <p>
              To oversee sales efforts and provide client assistance, we are
              seeking an experienced sales account manager. A sales account
              manager's duties encompass managing customer connections,
              supervising the sales procedure, and serving as a point of
              contact.
            </p>
            <br />
            <p>
              A sales account manager needs to be very good at managing people,
              have a solid understanding of CRM software, and multitask. In the
              end, a top-notch sales account manager should have excellent
              problem-solving, business, and customer service abilities.
            </p>
            <br />
            <p>
              Experience of IT Companies (Networking, Security) along with
              exposure of UAE Market.
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 mb-8">
            <li>Account management for sustained success.</li>
            <li>Building trusting relationships with customers.</li>
            <li>Creating fresh chances for sales.</li>
            <li>Keeping an eye on agents to guarantee higher sales.</li>

            <li>Generating transaction and account reports.</li>
            <li>Monitoring account goals. </li>
            <li>Keeping an eye on sales. </li>
          </ul>
          <div className="text-gray-700 mb-8">
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 mb-8">
              <li>A degree in business, marketing, or a related field.</li>
              <li>Track record of success in a sales role.</li>
              <li>Experience of IT Products (Networking, Security)</li>
              <li>UAE Market exposure</li>

              <li>Proficiency with MS Office and CRM software.</li>
              <li>Outstanding social abilities. </li>
              <li>An understanding of sales metrics. </li>
              <li>The capacity to solve problems.</li>
            </ul>
          </div>
        </div>
      </div>
      <About height="473px" backgroundImage="" />
      <Footer />
    </div>
  );
};

export default page;

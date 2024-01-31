import React from "react";

const page = () => {
  return (
    <>
      <div className="xl:w-10/12 xl:mx-auto 2xl:w-8/12	lg:mx-auto mt-20 lg:w-4/5">
        <div className="flex justify-between xl:flex xl:justify-between">
          <div className="2xl:w-6/12 flex flex-col justify-around xl:w-7/12	lg:w-5/12		">
            <h1 className="text-6xl font-bold">
              Revolutionize Your Remote Hiring
            </h1>
            <p>
              Empower your business with our AI-driven platform, specifically
              designed for the dynamic world of remote work. Connect with
              exceptional talent, streamline your recruitment process, and build
              a successful remote team effortlessly.
            </p>
            <div className="flex direction-col">
              <input
                type="text"
                id="first_name"
                className="text-sm rounded-lg w-6/12 block w-full p-2.5  border border-gray-400"
                placeholder="Enter your e-mail adress"
                required
              />
              <button
                type="button"
                className="ml-4 w-4/12 flex justify-between items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-orange-600"
              >
                Get started
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            <div className="flex">
              <img src="/credit-card.svg" alt="" />
              <h3 className="ml-2">Free Demo</h3>
            </div>
          </div>
          <div className="2xl:w-5/12 xl:w-3/6 lg:w-3/6	">
            <img src="/demo-video.svg" alt="" />
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex justify-between mt-28 xl:w-9-12 2xl:w-8/12 lg:mx-auto xl:w-10/12 lg:w-4/5">
        <img src="/hero-icon1.svg" alt="" />
        <img src="/hero-icon2.svg" alt="" />
        <img src="/hero-icon3.svg" alt="" />
        <img src="/hero-icon4.svg" alt="" />
        <img src="/hero-icon5.svg" alt="" />
      </div>
    </>
  );
};

export default page;

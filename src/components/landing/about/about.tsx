import Link from "next/link";
import React from "react";
interface aboutInterface {
  height: string;
  backgroundImage: string;
}

const about: React.FC<aboutInterface> = ({ height, backgroundImage }) => {
  const divStyle = {
    height: height || "full", // Replace 'defaultHeight' with your default value
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <div style={divStyle} className="w-full bg-white">
      <div className="w-4/6 mx-auto h-full flex flex-col justify-center items-center xl:w-2/5">
        <p className="text-3xl font-bold my-3 text-center text-black">
          Get started with Online Remote Recruiting
        </p>
        <p className="text-gray-500 text-lg font-normal text-center my-3">
          Our platform offers a diverse pool of candidates across various
          industries, enabling you to find the perfect match for your team's
          needs.
        </p>
        <button
          type="button"
          className="h-[40px] w-[160px] ml-4 w-3/12 flex justify-between items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-orange-600 my-3 xl:w-[160px]"
        >
          <Link href="#contactUs" className="text-base">
            Get started
          </Link>
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default about;

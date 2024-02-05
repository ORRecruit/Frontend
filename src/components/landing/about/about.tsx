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
    <div style={divStyle} className="bg-about w-full">
      <div className="w-4/6 mx-auto h-full flex flex-col justify-center items-center xl:w-2/5">
        <p className="text-4xl	font-bold text-white my-3">
          Get started with ORR
        </p>
        <p className="text-gray-500 text-xl font-normal text-center my-3">
          Find your perfect talent waiting to meet you and show you what they
          have got from thousands miles away
        </p>
        <button
          type="button"
          className="ml-4 w-3/12 flex justify-between items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-orange-600 my-3 xl:w-1/5"
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
    </div>
  );
};

export default about;

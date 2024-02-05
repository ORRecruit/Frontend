import React from "react";

interface AssessmentInterface {
  heading1: any;
  paragraph1: any;
  img1: any;
  heading2: any;
  paragraph2: any;
  img2: any;
}

const assessments: React.FC<AssessmentInterface> = ({
  heading1,
  paragraph1,
  img1,
  heading2,
  paragraph2,
  img2,
}) => {
  return (
    <>
      <div className="w-full mx-auto py-14 mt-20">
        <div className="w-4/5 mx-auto 2xl:w-3/4">
          <div className="flex justify-between items-center">
            <div className="w-1/2 xl:w-w-58">
              <h1 className="text-4xl font-bold">{heading1}</h1>
              <p className="font-base font-normal my-3 w-11/12 text-text-gray xl:my-5 2xl:my-6">
                {paragraph1}
              </p>
              <button
                type="button"
                className="w-36 h-10 flex justify-between items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-color-blue my-3"
              >
                Get started
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-base font-medium"
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
            <div className="w-1/2 xl:w-2/5">
              <img src={img1} alt="" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-1/2 xl:w-2/5">
              <img src={img2} alt="" />
            </div>
            <div className="w-1/2 xl:w-w-58">
              <h1 className="text-4xl font-bold">{heading2}</h1>
              <p className="font-base font-normal my-3 w-11/12 text-text-gray xl:my-5 2xl:my-6">
                {paragraph2}
              </p>
              <button
                type="button"
                className="w-36 h-10 flex justify-between items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-color-blue my-3"
              >
                Get started
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-base font-medium"
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
        </div>
      </div>
    </>
  );
};

export default assessments;

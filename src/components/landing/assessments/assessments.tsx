import Link from "next/link";
import React from "react";
import Image from "next/image";

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
      <section className="bg-white">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <Image width={1000} height={1000} src={img1} alt="image-1" />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
              {heading1}
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400 text-justify">
              {paragraph1}
            </p>
            <Link
              href="/recruiters"
              className="bg-orange-600 inline-flex items-center text-white bg-color-blue focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Discover Talent
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
              {heading2}
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400 text-justify">
              {paragraph2}
            </p>
            <Link
              href="/recruiters"
              className="bg-orange-600 inline-flex items-center text-white bg-color-blue focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Discover Talent
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <Image width={1000} height={1000} src={img2} alt="image-2" />
        </div>
      </section>
    </>
  );
};

export default assessments;

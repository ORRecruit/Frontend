import Image from "next/image";
import Link from "next/link";
import React from "react";

interface heroSectionInterface {
  heading: any;
  paragraph: any;
  videoImageSrc: any;
  iconImages: any[];
  showIconImages: any;
}

const heroSection: React.FC<heroSectionInterface> = ({
  heading,
  paragraph,
  videoImageSrc,
  iconImages = [],
  showIconImages,
}) => {
  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
            <div className="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                {heading}
              </h1>
              <p className="mx-auto mb-6 max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                {paragraph}
              </p>
              <form action="#" className="">
                <div className="justify-center items-center mx-auto mb-3 space-y-4 sm:flex lg:justify-start sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <label className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Email address
                    </label>
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:w-80 xl:w-96 focus:ring-primary-500 focus:border-primary-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                  >
                    Get Started
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
                  </button>
                </div>
                <div className="mt-4 hidden lg:flex">
                  <Image width={20} height={20} src="/credit-card.svg" alt="" />
                  <p className="ml-2">Free Demo</p>
                </div>
              </form>
            </div>
            <div className="col-span-6">
              <Image
                width={600}
                height={600}
                src={videoImageSrc}
                alt="hero section image"
              />
            </div>
          </div>
          {showIconImages && (
            <div className="grid grid-cols-2 gap-8 mx-auto max-w-screen-xl text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
              <Link href="#" className="flex justify-center">
                <Image width={120} height={150} src={iconImages[0]} alt="" />
              </Link>
              <Link href="#" className="flex justify-center">
                <Image width={120} height={150} src={iconImages[1]} alt="" />
              </Link>
              <Link href="#" className="flex justify-center">
                <Image width={120} height={150} src={iconImages[2]} alt="" />
              </Link>
              <Link href="#" className="flex justify-center">
                <Image width={120} height={150} src={iconImages[3]} alt="" />
              </Link>
              <Link href="#" className="flex justify-center">
                <Image width={120} height={120} src={iconImages[4]} alt="" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default heroSection;

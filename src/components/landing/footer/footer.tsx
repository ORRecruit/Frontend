import Image from "next/image";
import Link from "next/link";
import React from "react";

export const footer = () => {
  return (
    <>
      <footer className="p-4 bg-white md:p-8 lg:p-10">
        <div className="mx-auto max-w-screen-xl text-center">
          <Link
            href="#"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              width={50}
              height={50}
              className="my-3 w-16 h-16"
              src="/ORR-logo.svg"
              alt=""
            />
          </Link>
          <p className="my-6 text-gray-500 dark:text-gray-400">
            4k+ Recruiters with 50k+ Talented individuals. ORR thrives on its on
            point AI based precise recruitment process. It’s tailored to modern
            Ai needs.
          </p>
          <ul className="flex flex-wrap justify-center items-center mb-6">
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6">
                Recruiters
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                Talent
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6">
                How It Works
              </Link>
            </li>
          </ul>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022{" "}
            <Link href="#" className="hover:underline">
              ORR, Inc
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default footer;

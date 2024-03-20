import Image from "next/image";
import Link from "next/link";
import React from "react";

const orrTeam = () => {
  return (
    <section className="bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        <div className="w-full">
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl dark:text-white text-center">
            Our People Make Us Great
          </h2>
          <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400 text-center">
            Leading transformative initiatives in recruitment, we empower
            recruitment, marketing, and financial teams to collaborate at high
            velocity. Rooted in integrity and innovation, we quickly adapt to
            market dynamics, ensuring top talent connects with thriving
            opportunities to deliver outstanding service experiences rapidly.
          </p>
          <div className="mt-4">
            <Link
              href="#"
              title=""
              className="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              role="button"
            >
              See the entire team
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-12 gap-y-12 gap-x-8 w-[80%] mx-auto sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <Image
              width={500}
              height={500}
              className="object-cover object-top w-full h-64 lg:h-48 rounded-xl"
              src="/team1.jpg"
              alt=""
            />
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Summiya Nawaid
                </h3>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                  CEO
                </p>
              </div>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Steering transformative recruitment, committed to integrity,
                innovation, connecting top talent with leading organizations.
              </p>
            </div>
          </div>

          <div>
            <Image
              width={500}
              height={500}
              className="object-cover object-center w-full h-64 lg:h-48 rounded-lg"
              src="/team2.jpg"
              alt=""
            />
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Laura D'Souza
                </h3>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                  COO
                </p>
              </div>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Driving operational excellence in recruitment, committed to
                integrity, efficiency, ensuring optimal experiences.
              </p>
            </div>
          </div>

          <div>
            <Image
              width={500}
              height={500}
              className="object-cover object-center w-full h-64 lg:h-48 rounded-lg"
              src="/team3.jpg"
              alt=""
            />
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Maninder Mehta
                </h3>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                  CFO
                </p>
              </div>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Guiding financial strategy in recruitment, maximizing resources
                with integrity, precision for growth, health.
              </p>
            </div>
          </div>

          <div>
            <Image
              width={500}
              height={500}
              className="object-cover object-center w-full h-64 lg:h-48 rounded-lg"
              src="/team4.jpg"
              alt=""
            />
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Darsana Sriharshan
                </h3>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                  CMO
                </p>
              </div>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Leading transformative marketing in recruitment, amplifying
                brand to connect top talent with opportunities, rooted in
                innovation.
              </p>
            </div>
          </div>

          <div>
            <Image
              width={500}
              height={500}
              className="object-cover object-top w-full h-64 lg:h-48 rounded-xl"
              src="/team5.jpg"
              alt=""
            />
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Zeeshan Ali
                </h3>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                  CTO
                </p>
              </div>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Pioneering technological innovation in recruitment, optimizing
                talent acquisition with integrity, cutting-edge solutions for
                excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default orrTeam;

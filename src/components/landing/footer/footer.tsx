import Image from "next/image";
import Link from "next/link";
import React from "react";
// comment only for build successful

export const footer = () => {
  return (
    <>
      <footer className="py-8 bg-about text-white">
        <div className="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2">
              <Link
                href="#"
                className="flex items-center mb-2 text-2xl font-semibold sm:mb-0"
              >
                <Image
                  width={35}
                  height={35}
                  src="/logo-removed-bg.png"
                  alt="Logo Here"
                  className="mr-4"
                ></Image>
                Online Remote Recruiting
              </Link>
              <div className="flex">
                <Link
                  href="https://www.facebook.com/profile.php?id=61554351726300"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 mt-[20px] mr-[10px]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
                <p className="my-4 font-light text-gray-500 dark:text-gray-400 mb-0">
                  Online Remote Recruiting | 19 Thorne Street, Suite 110,
                  Cambridge, Ontario Canada N1R 1S3
                </p>
              </div>
              <div className="flex">
                <Link
                  href="https://www.facebook.com/profile.php?id=61554351726300"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 mt-[20px] mr-[10px]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 3.8A1 1 0 0 1 6 3h12c.5 0 .9.3 1 .8l1.8 8.2h-4.2a2 2 0 0 0-1.9 1.2 3 3 0 0 1-5.4 0A2 2 0 0 0 7.4 12H3.2L5 3.8ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.4a5 5 0 0 1-9.2 0H3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
                <p className="my-4 font-light text-gray-500 dark:text-gray-400">
                  info@onlineremoterecruit.com
                </p>
              </div>
              <ul className="flex mt-5 space-x-6">
                <li>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61554351726300"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/online_remote_recruiting_/"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/97847002/"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.7 0-5 2.3-5 5v14c0 2.7 2.3 5 5 5h14c2.7 0 5-2.3 5-5v-14c0-2.7-2.3-5-5-5zM8.7 19.7h-3v-10.4h3v10.4zM7.2 8.1c-1 0-1.8-0.8-1.8-1.8s0.8-1.8 1.8-1.8 1.8 0.8 1.8 1.8-0.8 1.8-1.8 1.8zM20.7 19.7h-3v-5.3c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9v5.4h-3v-10.4h2.9v1.4h0c0.4-0.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.6v5.9z"></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com/OnlineRemoteR"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="lg:mx-auto">
              <h2 className="mb-6 text-sm font-semibold uppercase">Company</h2>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="/jobs" className=" hover:underline">
                    Candidates
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/recruiters" className="hover:underline">
                    Recruiters
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/blogs" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#contactUs" className="hover:underline">
                    ContactUs
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"></hr>
          <span className="block text-sm text-start text-gray-500 dark:text-gray-400">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Online Remote Recruiting
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default footer;

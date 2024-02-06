import React from "react";

const contactUs = () => {
  return (
    <>
      <div className="w-full mx-auto py-14 mt-20">
        <div className="w-4/5 mx-auto 2xl:w-3/4">
          <div className="relative bg-white">
            <div className="absolute inset-0">
              <img className="rounded-lg" src="/contactUs-bgImg.svg" alt="" />
              <div className="absolute inset-0 rounded-lg shadow-lg" />
            </div>
            <div className="relative max-w-3xl mx-auto py-24 px-6 sm:px-6 lg:px-8">
              <div className="">
                <h2 className="text-2xl font-bold text-center text-white">
                  Contact Us
                </h2>
                <p className="mt-4 text-center text-text-gray">
                  We use an agile approach to test assumptions and connect with
                  the needs of your audience early and often.
                </p>
                <form className="mt-8 space-y-6 bg-white shadow-lg rounded-lg p-8">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <label htmlFor="first-name" className="sr-only">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="First name"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="Last name"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Email"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="sr-only">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        placeholder="Phone number"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="sr-only">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Your message"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-between lg:block">
                    <div className="flex items-start">
                      <p className="text-sm text-gray-500">
                        By submitting this form, you confirm that you have read
                        and agree to Flowbite's Terms of Service and Privacy
                        Statement
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="mt-2 h-10 mt-6 w-full bg-orange-600 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default contactUs;

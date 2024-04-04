"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const successModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-primary-orange text-sm text-white w-40 py-2 rounded-xl hover:shadow-xl"
        onClick={() => setModalOpen(true)}
      >
        POST NOW
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[300px]">
            <div className="text-center">
              <div className="mb-4 flex justify-center items-center">
                <Image
                  src="/successIconModal.svg"
                  alt="success"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="text-2xl my-4 font-bold leading-6 font-medium text-gray-900">
                Job Posted
              </h3>
              <p className="text-sm leading-5 text-gray-500">
                Your job has been posted successfully. You can view this on your
                posted jobs tab.
              </p>
            </div>

            <div className="mt-5 sm:mt-6">
              <Link href="/dashboard/adminDashboard/jobBoard">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => setModalOpen(false)}
                >
                  Awesome!
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default successModal;

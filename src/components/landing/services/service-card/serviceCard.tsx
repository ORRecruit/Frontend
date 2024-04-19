"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ServiceCardProps {
  paragraphText: string;
  title: string;
  iconUrl: string;
  modalTitle: string;
  modalParas: string;
  modalSubHeadings: string;
  modalListHeadings: string[];
  modalListParas: string[];
  modalConclusion: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  paragraphText,
  title,
  iconUrl,
  modalTitle,
  modalParas,
  modalSubHeadings,
  modalListHeadings,
  modalListParas,
  modalConclusion,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleCloseClick = (e: any) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return (
    <div
      className="max-w-sm mb-[20px] p-6 rounded-lg shadow lg:w-[50%] xl:w-[23%] 2xl:w-[22%] cursor-pointer"
      onClick={() => setModalOpen(true)}
    >
      <Image
        width={50}
        height={50}
        className="mb-4"
        src={iconUrl}
        alt={title}
      />
      <h5 className="mb-2 text-2xl font-semibold text-black font-sm lg:my-[20px]">
        {title}
      </h5>
      <p className="mb-3 font-normal text-base">{paragraphText}</p>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-10 w-[900px] ">
            <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>

            <p className="mb-4">{modalParas}</p>

            <h3 className="text-xl font-semibold mb-3">{modalSubHeadings}</h3>

            <ul className="list-disc pl-5 space-y-2 mb-4">
              {modalListHeadings?.map((item, index) => (
                <li key={index}>
                  <strong>{item}</strong> {modalListParas[index]}
                </li>
              ))}
            </ul>

            <p className="font-semibold">{modalConclusion}</p>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;

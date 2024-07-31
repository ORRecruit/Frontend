import Image from "next/image";
import React from "react";

type ClientDetailsModalProp = {
  data: any;
  closeDialog: any;
};

const clientDetailModal: React.FC<ClientDetailsModalProp> = ({
  data,
  closeDialog,
}) => {
  return (
    <div className="relative bg-white px-10 py-5 rounded-lg max-w-4xl w-full border border-gray-300 shadow-lg overflow-hidden">
      <div className="rounded-lg p-6">
        <div className="mb-3">
          <div className="flex items-center mb-4">
            {data?.logo ? (
              <Image
                src={data?.logo}
                alt="company logo"
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-cover rounded-full mr-4 shadow-md transition-transform transform hover:scale-105"
              />
            ) : (
              ""
            )}
            <h1 className="text-4xl font-bold transition-colors duration-300 hover:text-orange-800">
              {data?.companyName}
            </h1>
          </div>
          <div className="font-semibold text-lg text-gray-700 inline mr-2">
            <span className="bg-[#FF6800] text-white px-2 py-1 rounded-lg shadow-xl font-light">{`ORR-${data?.sector?.slice(
              0,
              4
            )}-00${data?.id}`}</span>
          </div>
          <div className="font-semibold text-lg text-gray-700 mt-2 inline">
            <span className="bg-[#FF6800] text-white px-2 py-1 rounded-lg shadow-xl font-light">
              {data?.sector}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="font-light text-gray-700">
            <span className="font-medium text-gray-900">No Of Employees:</span>{" "}
            {data?.numberOfEmployees}
          </div>
          <div className="font-light text-gray-700 mt-2">
            <span className="font-medium text-gray-900">Address:</span>{" "}
            {data?.address}
          </div>
          <div className="font-light text-gray-700 mt-2">
            <span className="font-medium text-gray-900">Website:</span>{" "}
            <a
              href={data?.website}
              className="text-[#FF6800] underline hover:text-orange-800 transition-colors duration-300"
            >
              {data?.website}
            </a>
          </div>

          <h1 className="text-2xl font-bold mt-6 text-[#FF6800] border-b-2 border-[#FF6800] pb-2">
            Contact Information
          </h1>
          <div className="font-light text-gray-700 mt-2">
            <span className="font-medium text-gray-900">Full Name:</span>{" "}
            <span className="text-gray-700 font-light">
              {data?.firstName} {data?.lastName}
            </span>
          </div>

          <div className="font-light text-gray-700 mt-2">
            <span className="font-medium text-gray-900">Email:</span>{" "}
            <span className="text-gray-700 font-light">{data?.email}</span>
          </div>
          <div className="font-light text-gray-700 mt-2">
            <span className="font-medium text-gray-900">Phone Number:</span>{" "}
            <span className="text-gray-700 font-light">
              {data?.phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={closeDialog}
        className="absolute top-0 right-0 m-4 p-2 text-[#FF6800] bg-transparent text-2xl focus:outline-none hover:text-orange-800 transition duration-200"
      >
        &times;
      </button>
    </div>
  );
};

export default clientDetailModal;

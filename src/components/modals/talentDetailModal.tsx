import { formatDate } from "@/utils/utils";
import React from "react";

type TalentModalProps = {
  data: any;
  closeDialog: () => void;
};

const talentDetailModal: React.FC<TalentModalProps> = ({
  data,
  closeDialog,
}) => {
  return (
    <div className="relative bg-white p-5 rounded-lg max-w-3xl w-full border border-black-400 cursor-auto">
      <div className="bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-black">{data?.fullName}</h1>
          </div>
          <div className="font-semibold text-lg text-black dark:text-black mb-2">
            ORR-USR-00
            {data?.id}
          </div>

          <div>
            {data?.userType && (
              <span className="bg-primary-orange py-2 px-4 font-light text-white dark:text-gray-400 rounded-2xl mr-2">
                {data?.userType?.charAt(0).toUpperCase() +
                  data?.userType?.slice(1)}
              </span>
            )}
            <span className="bg-primary-orange py-2 px-4 font-light text-white dark:text-gray-400 rounded-2xl mr-2">
              {data?.email}
            </span>
          </div>
        </div>

        <div className="mb-5">
          {data?.country === data?.location ? (
            <p className="text-gray-900 dark:text-white">{data?.location}</p>
          ) : (
            <div>
              <p className="text-gray-900 dark:text-white">{data?.country}</p>
              <p className="text-gray-900 dark:text-white">{data?.location}</p>
            </div>
          )}
          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-black dark:text-black pt-2">
              Skills
            </h1>
            {data?.skills?.map((item: any, index: number) => {
              return <span key={index}>{item}, </span>;
            })}
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-black dark:text-black pt-2">
              Tech
            </h1>
            {data?.tools?.map((item: any, index: number) => {
              return <span key={index}>{item}, </span>;
            })}
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-black dark:text-black pt-2">
              Experiences
            </h1>
            {data?.experiences?.map((item: any, index: number) => {
              return (
                <p key={index}>{`${item?.role} at ${
                  item?.companyName
                } from ${formatDate(item?.startDate)} to ${formatDate(
                  item?.endDate
                )}`}</p>
              );
            })}
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-black dark:text-black pt-2">
              Educations
            </h1>
            {data?.educations?.map((item: any, index: number) => {
              return (
                <p key={index}>{`${item?.degree} from ${
                  item?.school
                } from ${formatDate(item?.startYear)} to ${formatDate(
                  item?.endYear
                )}`}</p>
              );
            })}
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-black dark:text-black pt-2">
              About Me
            </h1>
            <span>{data?.about}</span>
          </div>
        </div>
      </div>
      <button
        onClick={closeDialog}
        className="absolute top-0 right-0 p-8 text-black bg-transparent text-2xl cursor-pointer"
      >
        &times;{" "}
      </button>
    </div>
  );
};

export default talentDetailModal;

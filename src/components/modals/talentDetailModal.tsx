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
    <div className="relative bg-white p-5 rounded-lg max-w-2xl w-full border border-black-400">
      <div className="bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{data?.fullName}</h1>
          </div>
          <div className="font-semibold text-lg text-gray-500 dark:text-gray-400 mb-2">
            ORR-USR-00
            {data?.id}
          </div>

          <span className="bg-primary-orange p-2 font-light text-white dark:text-gray-400 rounded-2xl mr-2">
            {data?.email}
          </span>
          {/* <span className="bg-primary-orange p-2 font-light text-white dark:text-gray-400 rounded-2xl">
            {data?.industry}
          </span> */}
        </div>

        <div className="mb-5">
          <p className="text-gray-900 dark:text-white">{data?.country}</p>
          <p className="text-gray-900 dark:text-white">{data?.location}</p>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-gray-500 dark:text-gray-400 pt-2">
              SKills
            </h1>
            {data?.skills?.map((item: any, index: number) => {
              return <span key={index}>{item}, </span>;
            })}
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-gray-500 dark:text-gray-400 pt-2">
              Tech
            </h1>
            {data?.tools?.map((item: any, index: number) => {
              return <span key={index}>{item}, </span>;
            })}
          </div>

          <div className="text-gray-900 dark:text-white">
            <h1 className="font-semibold text-lg text-gray-500 dark:text-gray-400 pt-2">
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
            <h1 className="font-semibold text-lg text-gray-500 dark:text-gray-400 pt-2">
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
            <h1 className="font-semibold text-lg text-gray-500 dark:text-gray-400 pt-2">
              About Me
            </h1>
            <span>{data?.about}</span>
          </div>
        </div>
      </div>
      <button
        onClick={closeDialog}
        className="absolute top-0 right-0 p-8 text-lg text-black bg-transparent text-2xl"
      >
        &times;{" "}
      </button>
    </div>
  );
};

export default talentDetailModal;

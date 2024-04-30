"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SuccessModal from "../successModal/successModal";
import { postJob as postJobApi } from "@/api/jobs/postJob";
import { useMutation } from "@tanstack/react-query";
import DOMPurify from 'dompurify';
interface PreviewData {
  title: string;
  type: string;
  companyName: string;
  saleryOffered: string;
  description: string;
  responsibilities: string;
  requirements: string;
  currencyType: string;
  jobType: string;
  location: string;
  experienceRequired: string;
  qualification: string;
}

const page = () => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const postJobMutation = useMutation({
    mutationFn: (data: any) => postJobApi(data),
  });

  useEffect(() => {
    const postJob = localStorage.getItem("postJob");
    if (postJob !== null) {
      const data = JSON.parse(postJob);
      console.log("data", data);
      setPreviewData(data);
    }
  }, []);

  const postJob = async (e: any) => {
    if (!previewData) {
      return;
    }

    await postJobMutation.mutateAsync(previewData);
    localStorage.removeItem("postJob");
  };

  const createMarkup = (htmlContent:any) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };
  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available] overflow-y-auto h-[90%]">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg w-[99%] pt-4">
        <div className="p-4">
          <div>
            <Link href="/admin/dashboard/inputNewJob">
              <Image
                src="/arrowLeft.svg"
                alt="back-icon"
                width={20}
                height={20}
              />
            </Link>
          </div>
          <div className="absolute right-2 top-6 flex">
            <Link href="/admin/dashboard/previewJob">
              <button className="text-sm border border-gray-500 mr-6 text-black w-20 py-2 rounded-xl hover:shadow-xl">
                Edit
              </button>
            </Link>
            <Link href="/admin/dashboard/previewJob">
              <Image
                src="/forwardIcon.svg"
                alt="back-icon"
                width={24}
                height={24}
                className="inline mr-6"
              />
            </Link>
            {/* <div onClick={postJob}> */}
            <SuccessModal />
            {/* </div> */}
          </div>
        </div>
      </div>
      {previewData && (
        <div className="p-8 bg-white shadow-lg rounded-lg mt-4 w-[99%]">
          <div className="mb-5">
            <h1 className="text-3xl font-bold">{previewData.title}</h1>
            <span className="inline-block bg-green-200 text-green-800 text-xs px-2 rounded">
              {previewData.type}
            </span>
          </div>

          <div className="mb-5">
            <p className="text-gray-600">{previewData.companyName}</p>
            <p className="text-gray-600">{previewData.type}</p>
            <p className="text-gray-600">{previewData?.location}</p>
            <p className="text-lg font-extrabold text-gray-900 dark:text-white">
              {previewData?.saleryOffered} {previewData?.currencyType} /{" "}
              {previewData?.jobType}
            </p>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {previewData?.qualification}
            </p>
            <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
              {previewData?.experienceRequired} Yrs
            </p>
          </div>

          <h2 className="text-lg font-semibold mb-4">Job Description</h2>
          <p className="text-gray-700 mb-8 job-description-content" dangerouslySetInnerHTML={createMarkup(previewData.description)} />
          <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 mb-8 lg:w-[70%] xl:w-[50%]">
            <p>{previewData.responsibilities}</p>
          </ul>
          <h3 className="text-lg font-semibold mb-3">Requirements</h3>
          <ul className="list-disc list-inside text-gray-700 mb-8 lg:w-[70%] xl:w-[50%]">
            <p>{previewData.requirements}</p>
          </ul>
        </div>
      )}
    </div>
  );
};

export default page;

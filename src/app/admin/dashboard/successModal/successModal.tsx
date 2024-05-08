"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { postJob as postJobApi } from "@/api/jobs/postJob";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PreviewData {
  title: string;
  type: string;
  companyName: string;
  saleryOffered: string;
  description: string;
  responsibilities: string;
  requirements: string;
}

const successModal = () => {
  const router = useRouter();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const postJobMutation = useMutation({
    mutationFn: (data: any) => postJobApi(data),
    onSuccess: (data) => {
      // toast.success(data?.message)
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  useEffect(() => {
    const postJob = localStorage.getItem("postJob");
    if (postJob !== null) {
      const data = JSON.parse(postJob);
      setPreviewData(data);
    }
  }, []);

  const postJob = async (e: any) => {
    if (!previewData) {
      return;
    }
    
    const jobDataToSend = {
      ...previewData,
      isPublished: true,
      jobStatus: 'PUBLISHED'
    };
    console.log("previewDAta", previewData);
    const response = await postJobMutation.mutateAsync(jobDataToSend);
    console.log("response....", response);
    localStorage.removeItem('postJob');
    if (response) {
      toast.success(response?.message);
      if (response?.data) {
        router.push("/admin/dashboard/jobBoard");
        localStorage.removeItem("postJob");
      }
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        className="bg-primary-orange text-sm text-white w-40 py-2 rounded-xl hover:shadow-xl"
        onClick={() => setModalOpen(true)}
      >
        Publish
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
                Job Post
              </h3>
              <p className="text-sm leading-5 text-gray-500">
                Are you sure want to upload the Job?
              </p>
            </div>

            <div className="mt-5 sm:mt-6">
              {/* <Link href="/admin/dashboard/jobBoard"> */}
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={postJob}
              >
                Publish Now
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default successModal;

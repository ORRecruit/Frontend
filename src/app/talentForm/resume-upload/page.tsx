"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { uploadResume } from "@/api/talent/profileInfo";
import { MdClose } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import CustomLoader from "@/components/customLoader";

const Page = () => {
  const router = useRouter();
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const [previewResume, setPreviewResume] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resumeMutation = useMutation({
    mutationFn: (file: File) => uploadResume(file),
    onSuccess: (response) => {
      const resumeUrl = response.url;
      localStorage.setItem("resumeUrl", resumeUrl);
      toast.success("Resume uploaded successfully");
      router.push("/talent/dashboard");
    },
    onError: () => {
      toast.error("Resume upload failed");
      setLoading(false);
    },
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedResume(file);
      setPreviewResume(file.name);
    }
  };

  const handleRemoveResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedResume(null);
    setPreviewResume(null);
  };

  const uploadResumeHandler = async () => {
    if (!selectedResume) {
      toast.error("Please select a resume file to upload");
      return;
    }

    setLoading(true);
    try {
      await resumeMutation.mutateAsync(selectedResume);
    } catch (error) {
      console.error("Error uploading resume:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <button
          className="absolute top-10 left-10 flex items-center mb-4 text-[#FF6800]"
          onClick={() => router.back()}
        >
          <FiArrowLeft className="mr-2" size={24} color="#FF6800" />
          Back
        </button>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
          <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
              Personal Info
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              You can upload your resume or can fill the details manually.
              Please choose
            </p>
            <form className="mt-4" action="#">
              <div className="w-full mb-4">
                {previewResume ? (
                  <div className="relative w-full border border-gray-300 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {previewResume}
                    </span>
                    <button
                      type="button"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveResume}
                    >
                      <MdClose size={20} color="#FF6800" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Upload Your Resume
                        </span>
                      </p>
                      <Link
                        href="#"
                        className="text-sm text-gray-500 dark:text-gray-400 text-blue-700"
                      >
                        or browse for files
                      </Link>
                    </div>
                    <input
                      id="resume-file"
                      type="file"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                  </label>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  onClick={uploadResumeHandler}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload Your Resume"}
                </button>
                <button
                  type="button"
                  className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  onClick={() => router.push("/talentForm/manual-entry")}
                >
                  Fill Form Manually
                </button>
              </div>
            </form>
          </div>
          <div className="mr-auto place-self-center lg:col-span-6">
            <Image
              width={400}
              height={400}
              className="hidden mx-auto lg:flex"
              src="/sign-up.svg"
              alt="illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import about from "@/components/landing/about/about";
import toast from "react-hot-toast";
import { countries } from "@/constants/countries";
import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "@/api/talent/profileInfo";
import { MdClose } from "react-icons/md";

const page = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "United States",
    industry: "Technology",
    about: "",
  });

  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (response) => {
      const imageUrl = response.url;
      localStorage.setItem("avatarUrl", imageUrl);
      // toast.success("Image uploaded successfully");
    },
    onError: () => {
      toast.error("Image upload failed");
    },
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      // avatarMutation.mutate(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    console.log("formData....", formData);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.industry ||
      !formData.about
    ) {
      toast.error("Please provide all details");
      return;
    }

    // Upload avatar if an image is selected
    if (selectedImage) {
      try {
        const response = await avatarMutation.mutateAsync(selectedImage);
        if (response.url) {
          localStorage.setItem("avatarUrl", response.url);
        }
      } catch (error) {
        toast.error("Image upload failed");
        return;
      }
    }
    const obj = {
      country: formData.country,
      industry: formData.industry,
      about: formData.about,
    };
    localStorage.setItem("candidateInfo", JSON.stringify(obj));
    router.push("/talentForm/tools-tech-info");
  };
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
          <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 font-sans">
              Personal Info
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Tell us about yourself
            </p>
            <form onSubmit={submitForm} className="mt-4" action="#">
              <div className="grid gap-6 sm:grid-cols-1">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. Bonnie"
                      required={true}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. Green"
                      required={true}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-[100%]">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Country*
                  </label>
                  <select
                    id="countries"
                    name="country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    {countries?.map((country: any, index: any) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                    <option>Canada</option>
                    <option value="US">USA</option>
                    <option value="CA">Brazil</option>
                    <option value="FR">Mexico</option>
                    <option value="DE">Europe</option>
                  </select>
                </div>
                <div className="w-[100%]">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Industry*
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Tourism">Tourism</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Staffing & Recruiting">
                      Staffing & Recruiting
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    About You*
                  </label>
                  <input
                    type="text"
                    name="about"
                    id="about"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Who You Are?"
                    required={true}
                    value={formData.about}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <div className="text-sm w-full mb-[20px]">
                    <label className="font-light text-gray-500 dark:text-gray-300 opacity-0">
                      By signing up, you are creating a Sendinblue account, and
                      you agree to Sendinblue's
                    </label>
                    <div className="flex items-center justify-center w-full">
                      {previewImage ? (
                        <div className="relative w-[60%]">
                          <img
                            src={previewImage}
                            alt="Avatar Preview"
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0"
                            onClick={handleRemoveImage}
                          >
                            <MdClose size={25} color="#FF6800" />
                          </button>
                        </div>
                      ) : (
                        <>
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
                                  Upload Your Photo
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
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              >
                Continue
              </button>
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

export default page;

"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "@/api/talent/profileInfo";
import CustomLoader from "@/components/customLoader";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import useStore from "@/app/store";
import { RiCloseLine } from "react-icons/ri";

const Page = () => {
  const socialMedia = useStore((state) => state.stepData.step5);
  const setStepData = useStore((state) => state.setStepData);
  const stepData = useStore((state) => state.stepData);
  const resetData = useStore((state) => state.resetData);
  const [formData, setFormData] = useState({
    website: socialMedia?.website || "",
    linkedIn: socialMedia?.linkedIn || "",
    github: socialMedia?.github || "",
    twitter: socialMedia?.twitter || "",
  });
  const [publishDialog, setPublishDialog] = useState<any>(false);

  useEffect(() => {
    setStepData("step5", formData);
  }, [formData, setStepData]);

  const profileMutation = useMutation({
    mutationFn: (data) => createProfile(data),
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const router = useRouter();
  const submitForm = async (e: any) => {
    e.preventDefault();
    // const candidateInfo = localStorage.getItem("candidateInfo");
    // const avatar = localStorage.getItem("avatarUrl");

    // if (candidateInfo !== null) {
    //   const data = JSON.parse(candidateInfo);
    //   data.website = formData.website?.length ? formData.website : null;
    //   data.linkedIn = formData.linkedIn?.length ? formData.linkedIn : null;
    //   data.github = formData.github?.length ? formData.github : null;
    //   data.twitter = formData.twitter?.length ? formData.twitter : null;
    //   console.log("data", data);
    //   if (data) {
    //     try {
    //       const response = await profileMutation.mutateAsync({
    //         ...data,
    //         location: "Canada",
    //         industry: "IT Industry",
    //         profilePhoto: avatar,
    //       });
    //       console.log(response);
    //       if (response.success === true) {
    //         console.log("res here>>>", response);
    //         toast.success(response?.message);
    //         localStorage.setItem("candidateId", response?.profile?.userId);
    //         resetData();
    //         router.push("/talent/dashboard/jobBoard");
    //       } else if (response.success === false) {
    //         toast.error(response?.message);
    //         router.push("/dashboard/auth/signin");
    //       }
    //     } catch (error) {
    //       console.log("error", error);
    //       toast.error("Please Login if you have an account.");
    //     }
    //   }
    // }
    const avatar = localStorage.getItem("avatarUrl");

    const cleanEducations = stepData?.step4.map((education) => {
      const { currentlyStudying, ...rest } = education;
      return rest;
    });
    const cleanExperiences = stepData?.step3.map((experience) => {
      const { currentlyWorking, ...rest } = experience;
      return rest;
    });

    console.log("stepdata....", stepData?.step3, stepData?.step4);

    const data: any = {
      country: stepData?.step1?.country,
      industry: stepData?.step1?.industry,
      about: stepData?.step1?.about,
      skills: stepData?.step2?.skills,
      tools: stepData?.step2?.tools,
      experiences: stepData?.step3,
      educations: stepData?.step4,
      website: socialMedia?.website?.length || "",
      linkedIn: socialMedia?.linkedIn?.length || "",
      github: socialMedia?.github?.length || "",
      twitter: socialMedia?.twitter?.length || "",
      profilePhoto: avatar,
      location: "Canada",
    };

    console.log("datadatadata", data);

    try {
      const response = await profileMutation.mutateAsync(data);
      console.log(response);
      if (response.success === true) {
        console.log("res here>>>", response);
        toast.success(response?.message);
        localStorage.setItem("candidateId", response?.data?.id);
        resetData();
        setPublishDialog(!publishDialog);
        router.push("/talent/dashboard/jobBoard");
      } else if (response.success === false) {
        toast.error(response?.message);
        router.push("/dashboard/auth/signin");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Please Login if you have an account.");
    }
  };

  return (
    <>
      {profileMutation.isPending ? (
        <CustomLoader />
      ) : (
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
              <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 text-black font-sans">
                Internet Presence
              </h1>
              <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                Select your website and social media links (optional).
              </p>
              <div className="mt-4">
                <div className="flex justify-between space-x-4 py-4">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <svg
                      className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <svg
                      className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                        clipRule="evenodd"
                      />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                    </svg>
                  </div>
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <svg
                      className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <svg
                      className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="py-4">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Website</p>
                    </div>
                    <input
                      type="text"
                      name="website"
                      placeholder="https://"
                      className="border p-2 w-full text-sm"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          clipRule="evenodd"
                        />
                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                      </svg>
                      <p>Linked In</p>
                    </div>

                    <input
                      type="text"
                      name="linkedIn"
                      placeholder="linkedin.com/userid"
                      className="border p-2 w-full text-sm"
                      value={formData.linkedIn}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>GitHub</p>
                    </div>

                    <input
                      type="text"
                      name="github"
                      placeholder="github.com/userid"
                      className="border p-2 w-full text-sm"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-[28px] h-[28px] text-gray-800 dark:text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Twitter/X</p>
                    </div>

                    <input
                      type="text"
                      name="twitter"
                      placeholder="x.com/username"
                      className="border p-2 w-full text-sm"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-start h-[0px]">
                    <div className="text-sm w-full mb-[0px]">
                      <label className="font-light text-gray-500 dark:text-gray-300 opacity-0 h-[0px]">
                        By signing up, you are creating a Sendinblue account,
                        and you agree to Sendinblue's
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setPublishDialog(!publishDialog)}
                  className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                >
                  Continue
                </button>
              </div>
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
            {publishDialog && (
              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                <div className="relative bg-white p-5 rounded-lg max-w-lg w-full border border-black-400">
                  <div className="absolute top-2 right-3">
                    <RiCloseLine
                      size={25}
                      onClick={() => setPublishDialog(!publishDialog)}
                    />
                  </div>
                  <div className="bg-white rounded-lg flex flex-col items-center">
                    <p className="text-gray-600 text-xl mb-4">
                      Are You Sure Want To Create Talent Profile?
                    </p>
                    <div>
                      <button
                        onClick={submitForm}
                        className="w-full mt-[20px] sm:mt-[0px] sm:w-auto bg-orange-600 text-white justify-center font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Page;

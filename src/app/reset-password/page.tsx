"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth/login";
import { useRouter } from "next/navigation";
import CustomLoader from "@/components/customLoader";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: (body: any) => loginUser(email, password),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    if (email && password) {
      const response = await signInMutation.mutateAsync({
        email,
        password,
      });
      if (response.success === true) {
        setErrorMessage("");
        console.log("response....", response);
        if (response.User.role === "Admin") {
          toast.error("Use Admin Route to Sign Admin In!");
          return;
        }
        toast.success(response?.message);
        localStorage.setItem("authToken", response.token);
        if (response.User?.role == "Candidate") {
          if (response?.User?.isProfile === true) {
            router.replace("/talent/dashboard");
            localStorage.setItem("candidateId", response?.User?.userId);
            localStorage.setItem("role", response?.User?.role);
          } else {
            router.push("/talentForm/resume-upload");
          }
        } else if (response.User.role == "Admin") {
          router.push("/admin/dashboard");
        }
      } else if (response.success === false) {
        toast.error("Please provide correct information");
      }
    }
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {signInMutation.isPending ? (
        <CustomLoader />
      ) : (
        <div className="h-screen flex justify-center items-center border border-red-400 relative">
          <section>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
              <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
                <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 text-black">
                  Reset Your Password.
                </h1>
                <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                  Please provide new password for your account.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="mt-4 space-y-6 sm:mt-6"
                  action="#"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 flex justify-between items-center"></div>
                  <button
                    type="submit"
                    className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  >
                    Reset Password
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
        </div>
      )}
    </>
  );
};

export default page;

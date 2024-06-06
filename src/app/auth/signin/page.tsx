"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth/login";
import { useRouter } from "next/navigation";
import CustomLoader from "@/components/customLoader";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const page = () => {
  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: (body: any) => loginUser(email, password),
    onSuccess: (data) => {
      console.log("Login success response >>>>>", data);
      // Additional success handling here
    },
    onError: (error) => {
      console.error("Login failed response >>>>>", error);
      // Additional error handling here
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    if (email && password) {
      try {
        const response: any = await signInMutation.mutateAsync({
          email,
          password,
        });
        console.log("response here inside Try >>>>>", response);
        if (response.success) {
          if (response.user.roles[0] === "admin") {
            toast.error("Use Admin Route to Sign Admin In!");
            return;
          } else if (response.user.roles[0] === "candidate") {
            toast.success(response?.message);
            console.log("Inside Candidate");
            if (response?.user?.isProfile === true) {
              console.log("Inside Candidate if", response.user);
              localStorage.setItem("authToken", response.token);
              localStorage.setItem('tokenTime', Date.now().toString());
              localStorage.setItem("candidateId", response.user.candidateId);
              localStorage.setItem("role", response.user.roles[0]);
              if (response?.user?.profilePhoto) {
                localStorage.setItem("avatarUrl", response?.user?.profilePhoto);
              }
              router.replace("/talent/dashboard");
            } else {
              console.log("Inside Candidate Else");
              localStorage.setItem("authToken", response.token);
              localStorage.setItem('tokenTime', Date.now().toString());
              localStorage.setItem("candidateId", response.user.candidateId);
              localStorage.setItem("role", response.user.roles[0]);
              router.push("/talentForm/resume-upload");
            }
          }
        }
      } catch (error: any) {
        console.log("Login Error >>>>>", error.response.data.message);
        toast.error(error.response.data.message);
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
                  Welcome Back
                </h1>
                <p className="text-sm font-light text-gray-500 dark:text-gray-300 mb-6">
                  Don’t have an account?
                  <Link
                    href="/auth/signup"
                    className="font-medium text-primary-600 hover:underline text-primary-color sm:ml-2"
                  >
                    Sign Up
                  </Link>
                  .
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="mt-4 space-y-6 sm:mt-6"
                  action="#"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@example.com"
                        required={true}
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required={true}
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <AiFillEye size={20} />
                          ) : (
                            <AiFillEyeInvisible size={20} color="#b0b0b0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 flex justify-between items-center">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          aria-describedby="newsletter"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required={false}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-light text-gray-500 dark:text-gray-300">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <Link
                      href="/reset-password"
                      className="text-[14px] m-0 text-primary-color"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  >
                    Sign in
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

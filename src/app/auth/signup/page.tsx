"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth/register";
import toast from "react-hot-toast";
import CustomLoader from "@/components/customLoader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const page = () => {
  const signUpMutation = useMutation({
    mutationFn: (body: any) => registerUser(email, password, role, full_name),
    onSuccess: (data) => {
      toast.success(
        "Registration successful, Please check your email to verify your account."
      );
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [full_name, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !email.trim() ||
      !password.trim() ||
      !role.trim() ||
      !full_name.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (email && password && role) {
      try {
        const response = await signUpMutation.mutateAsync({
          email,
          password,
          role,
        });
        if (response?.message) {
          setEmail("");
          setPassword("");
          setFullName("");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };
  const handleFullName = (event: any) => {
    setFullName(event.target.value);
  };
  return (
    <>
      {signUpMutation.isPending ? (
        <CustomLoader />
      ) : (
        <section className="h-screen flex justify-center items-center">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
            <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
              <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 text-black">
                Create your Account
              </h1>
              <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                Already have an account?
                <Link
                  href="/auth/signin"
                  className="font-medium text-primary-600 hover:underline text-primary-color sm:ml-2"
                >
                  Login here
                </Link>
                .
              </p>
              <form onSubmit={handleSubmit} className="mt-4 space-y-6 sm:mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required={true}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="full-name"
                      id="full-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. Bonnie Green"
                      required={true}
                      value={full_name}
                      onChange={handleFullName}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                      Role*
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      <option>Choose a Role</option>
                      <option value="candidate">Candidate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password*
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
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required={true}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-light text-gray-500 dark:text-gray-300">
                        By signing up, you're accepting Online Remote Recruiting
                        <Link
                          className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                          href="/privacy-policy"
                        >
                          {" "}
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link
                          className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                          href="/privacy-policy"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>
                  </div>
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
                        Email me about product updates and resources.
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-orange hover:bg-orange-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                >
                  Create an account
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
      )}
    </>
  );
};

export default page;

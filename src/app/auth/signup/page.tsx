"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth/register";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CustomLoader from "@/components/customLoader";

const page = () => {
  const router = useRouter();
  const signUpMutation = useMutation({
    mutationFn: (body: any) => registerUser(email, password, role, full_name),
    onSuccess: (data) => {
      toast.success(
        "Registration successful, Please check your email to verify your account."
      );
      // router.push("/dashboard/auth/signin");
    },
    // onError: (error) => {
    //   toast.error(error.message);
    // },
  });

  const [verifyEmail, setVerifyEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [full_name, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        console.log("response...", response);
        if (response?.message) {
          setErrorMessage("");
          setVerifyEmail(true);
          setEmail("");
          setPassword("");
          setFullName("");
          setTimeout(() => {
            setVerifyEmail(false);
          }, 5000);
          // toast.success(
          //   "Registration successful, Please check your email to verify your account."
          // );
          // router.push("/dashboard/auth/signin");
        }
      } catch (error: any) {
        console.log("error", error);
        toast.error(error?.response?.data?.message);
        // setErrorMessage("Something went wrong! Try Again");
        // setTimeout(() => {
        //   setErrorMessage("");
        // }, 3000);
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
          {errorMessage?.length ? (
            <p className="absolute top-5 px-8 py-2 rounded-2xl shadow-lg text-white bg-red-600">
              {errorMessage}
            </p>
          ) : (
            ""
          )}
          {verifyEmail ? (
            // className="absolute top-5 px-8 py-2 rounded-2xl shadow-lg mt-4 text-white bg-green-500"
            <p>
              {/* Registration successful, Please check your email to verify your
              account. */}
            </p>
          ) : (
            ""
          )}
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
                      Your email
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
                      Full Name
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
                      Role
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      <option>Choose a Role</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="candidate">Candidate</option>
                    </select>
                  </div>
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
                <div className="flex items-center">
                  <div className="w-full h-0.5 bg-gray-200"></div>
                  <div className="px-5 text-center text-gray-500 dark:text-gray-400">
                    or
                  </div>
                  <div className="w-full h-0.5 bg-gray-200"></div>
                </div>
                {/* <div className="space-y-3">
                  <Link
                    href="#"
                    className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_13183_10121)">
                        <path
                          d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                          fill="#3F83F8"
                        />
                        <path
                          d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13183_10121">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Sign up with Google
                  </Link>
                  <Link
                    href="#"
                    className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-900 dark:text-white"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_13183_29163)">
                        <path
                          d="M18.6574 15.5863C18.3549 16.2851 17.9969 16.9283 17.5821 17.5196C17.0167 18.3257 16.5537 18.8838 16.1969 19.1936C15.6439 19.7022 15.0513 19.9627 14.4168 19.9775C13.9612 19.9775 13.4119 19.8479 12.7724 19.585C12.1308 19.3232 11.5412 19.1936 11.0021 19.1936C10.4366 19.1936 9.83024 19.3232 9.18162 19.585C8.53201 19.8479 8.00869 19.985 7.60858 19.9985C7.00008 20.0245 6.39356 19.7566 5.78814 19.1936C5.40174 18.8566 4.91842 18.2788 4.33942 17.4603C3.71821 16.5863 3.20749 15.5727 2.80738 14.4172C2.37887 13.1691 2.16406 11.9605 2.16406 10.7904C2.16406 9.45009 2.45368 8.29407 3.03379 7.32534C3.4897 6.54721 4.09622 5.9334 4.85533 5.4828C5.61445 5.03219 6.43467 4.80257 7.31797 4.78788C7.80129 4.78788 8.4351 4.93738 9.22273 5.2312C10.0081 5.52601 10.5124 5.67551 10.7335 5.67551C10.8988 5.67551 11.4591 5.5007 12.4088 5.15219C13.3069 4.82899 14.0649 4.69517 14.6859 4.74788C16.3685 4.88368 17.6327 5.54699 18.4734 6.74202C16.9685 7.65384 16.2241 8.93097 16.2389 10.5693C16.2525 11.8454 16.7154 12.9074 17.6253 13.7506C18.0376 14.1419 18.4981 14.4444 19.0104 14.6592C18.8993 14.9814 18.7821 15.29 18.6574 15.5863V15.5863ZM14.7982 0.400358C14.7982 1.40059 14.4328 2.3345 13.7044 3.19892C12.8254 4.22654 11.7623 4.82035 10.6093 4.72665C10.5947 4.60665 10.5861 4.48036 10.5861 4.34765C10.5861 3.38743 11.0041 2.3598 11.7465 1.51958C12.1171 1.09416 12.5884 0.740434 13.16 0.458257C13.7304 0.18029 14.2698 0.0265683 14.7772 0.000244141C14.7921 0.133959 14.7982 0.267682 14.7982 0.400345V0.400358Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13183_29163">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Sign up with Apple
                  </Link>
                </div> */}
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
                  className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
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

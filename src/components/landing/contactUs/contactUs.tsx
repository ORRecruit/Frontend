"use client";
import { useState } from "react";
import Image from "next/image";
import CaptchaTest from "../captcha/captcha";
import toast from "react-hot-toast";
import { validateCaptcha } from "react-simple-captcha";
import { useMutation } from "@tanstack/react-query";
import { contactUsApi } from "@/api/contactUs/saveContactUs";

const contactUs = () => {
  const contactUsMutation = useMutation({
    mutationFn: (data: any) => contactUsApi(data),
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const [captchaInput, setCaptchaInput] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (value: string) => {
    setCaptchaInput(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCaptcha(captchaInput)) {
      toast.error("Captcha Does Not Match");
      setCaptchaInput("");
      return;
    }
    console.log("Form Data:", formData);
    if (
      !formData?.email ||
      !formData?.firstName ||
      !formData?.lastName ||
      !formData?.message ||
      !formData?.phoneNo
    ) {
      toast.error("Please Provide All Details");
      return;
    }
    try {
      const response = await contactUsMutation.mutateAsync(formData);
      console.log("response", response);
      if (response?.success) {
        toast.success(response?.message);
        setCaptchaInput("")
;        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNo: "",
          message: "",
        })
      }
    } catch (error: any) {
      console.log("error", error);
      // toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="w-full mx-auto py-14 mt-20" id="contactPageId">
        <div className="w-[94%] mx-auto 2xl:w-3/4">
          <div className="relative bg-white">
            <div className="absolute inset-0">
              <Image
                width={1800}
                height={1800}
                className="rounded-lg"
                src="/contactUs-bgImg.svg"
                alt=""
              />
              <div className="absolute inset-0 rounded-lg shadow-lg" />
            </div>
            <div className="relative max-w-3xl mx-auto py-24 px-6 sm:px-6 lg:px-8">
              <div className="">
                <h2 className="text-2xl font-bold text-center text-white">
                  Contact Us
                </h2>
                <p className="mt-[45px] sm:mt-[100px] md:mt-4 text-center text-text-gray">
                  Do you have questions? Talk to our team today by dropping a
                  message below
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6 bg-white shadow-lg rounded-lg p-8"
                >
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <label htmlFor="first-name" className="sr-only">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="First name*"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="Last Name*"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Email*"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phoneNo" className="sr-only">
                        Phone number
                      </label>
                      <input
                        type="number"
                        name="phoneNo"
                        id="phoneNo"
                        autoComplete="tel"
                        placeholder="Phone Number*"
                        className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        value={formData.phoneNo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="sr-only">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Your Message*"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <CaptchaTest onCaptchaChange={handleCaptchaChange} />
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-between lg:block">
                    <div className="flex items-start">
                      <p className="text-sm text-gray-500">
                        By submitting this form, you confirm that you have read
                        and agree to Online Remote Recruiting's Terms of Service
                        and Privacy Statement
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="mt-2 h-10 mt-6 w-full bg-orange-600 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default contactUs;

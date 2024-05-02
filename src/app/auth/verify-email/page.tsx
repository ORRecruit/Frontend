"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
const Back_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = (token: any) => {
      axios
        .post(`${Back_URL}/auth/verifyEmail`, { token })
        .then((response) => {
          if (response.data) {
            console.log(response.data.message);
            toast.success(response.data.message);
            router.push("/auth/signin");
          } else {
            toast.error(response.data.error || "Could not verify email.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    verifyEmail(token);
  }, []);

  return <div>Verifying your email...</div>;
};

export default page;

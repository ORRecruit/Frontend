"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/landing/navbar/navbar";
import { isSessionValid, resetSessionTimer } from "@/utils/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const myRef = useRef<HTMLDivElement>(null);
  let path = usePathname();
  const router = useRouter();
  const noNavbarRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/talentForm/resume-upload",
    "/talentForm/personalInfo",
    "/talentForm/tools-tech-info",
    "/talentForm/experience-info",
    "/talentForm/education-info",
    "/talentForm/socialMedia-info",
    "/auth/verify-email",
    "/talent/dashboard",
    "/talent/dashboard/jobBoard",
    "/talent/dashboard/appliedJobs",
    "/talent/dashboard/edit-resume",
    "/admin",
    "/admin/dashboard",
    "/admin/dashboard/jobBoard",
    "/admin/dashboard/jobBoard/ai-matching",
    "/admin/dashboard/newJob",
    "/admin/dashboard/talents",
    "/admin/dashboard/overview",
    "/admin/dashboard/inputNewJob",
    "/admin/dashboard/previewJob",
    "/admin/dashboard/clients",
    "/admin/dashboard/clients/create-client",
    "/admin/dashboard/ai-magic",
    "/admin/dashboard/ai-magic/match-ai-talents",
    "/talent/dashboard/talent-ai-jobs",
    "/admin/dashboard/linkedin-scrap",
    "/admin/dashboard/leadOwner",
    "/admin/dashboard/leadOwner/create-lead-owner",
    "/admin/dashboard/indeed-scrap",
  ];
  const showNavbar = !noNavbarRoutes.includes(path);

  useEffect(() => {
    document.title = "Online Remote Recruiting";
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleUserActivity = () => {
      resetSessionTimer();
    };

    window.addEventListener("click", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    const interval = setInterval(() => {
      if (!isSessionValid()) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenTime");
        localStorage.removeItem("role");
        localStorage.removeItem("candidateId");
        localStorage.removeItem("avatarUrl");
        router.push("/auth/signin");
      }
    }, 300000);
    return () => {
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {showNavbar && <Navbar scrollToBottom={scrollToBottom} />}
      {children}
      <Toaster toastOptions={{ duration: 4000, style: { zIndex: 999999 } }} />
    </>
  );
}

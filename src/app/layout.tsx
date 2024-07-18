"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./authProvider";
import Navbar from "@/components/landing/navbar/navbar";
import { usePathname } from "next/navigation";
import { isSessionValid, resetSessionTimer } from "@/utils/utils";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Head from "next/head";
import GoogleTagManager from "@/components/custom/GoogleTagManager";
import ApolloTracker from "@/components/custom/ApolloTracker";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <body className={inter.className}>
        <GoogleTagManager containerId="GTM-WQBFH7L6" />

        <ApolloTracker appId="667d8edb4b466e0a9f2e49a4" />

        <QueryClientProvider client={queryClient}>
          {showNavbar && <Navbar scrollToBottom={scrollToBottom} />}

          <AuthProvider>
            {children}
            <Toaster
              toastOptions={{ duration: 4000, style: { zIndex: 999999 } }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

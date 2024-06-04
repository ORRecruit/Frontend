"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./authProvider";
import Navbar from "@/components/landing/navbar/navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const myRef = useRef<HTMLDivElement>(null);
  let path = usePathname();
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

  return (
    <html lang="en">
      <body className={inter.className}>
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

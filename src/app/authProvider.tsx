import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAuthTokenExpired } from "../app/isAuthTokenExpired";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  let path = usePathname();
  const param = useSearchParams();
  const blogNo = param.get("blogNo");
  const jobId = param.get("jobId");
  const jobIdAllTalents = param.get("job-id");

  if (path && blogNo) {
    path = path + `?blogNo=${blogNo}`;
  }
  if (path && path === "/easy-apply" && jobId) {
    path = path + `?jobId=${jobId}`;
  }
  if (path && path === "/admin/dashboard/jobBoard/ai-matching" && jobId) {
    path = path + `?jobId=${jobId}`;
  }
  if (
    path &&
    path === "/admin/dashboard/ai-magic/match-ai-talents" &&
    jobIdAllTalents
  ) {
    path = path + `?job-id=${jobIdAllTalents}`;
  }

  // Function to check if the path matches the blog details with a dynamic number
  const isPublicBlogDetail = (path: string) => {
    return /^\/blogs\/blog-details\?blogNo=\d+$/.test(path);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    if (
      path === "/" ||
      path === "/job-board" ||
      path === "/talent" ||
      path === "/client" ||
      path === "/blogs" ||
      path === "/admin" ||
      path === "/auth/signup" ||
      path.includes("blogs/blog-details") ||
      isPublicBlogDetail(path) ||
      path.includes("/reset-password") ||
      path.includes("easy-apply") ||
      path === "/privacy-policy"
    ) {
      router.push(path);
    } else {
      if (
        path === "/admin/dashboard" ||
        path === "/admin/dashboard/jobBoard" ||
        path === "/admin/dashboard/newJob" ||
        path === "/admin/dashboard/inputNewJob" ||
        path === "/admin/dashboard/previewJob" ||
        path === "/admin/dashboard/overview" ||
        path === "/admin/dashboard/talents" ||
        path.includes("/admin/dashboard/jobBoard/ai-matching") ||
        path === "/admin/dashboard/clients" ||
        path === "/admin/dashboard/clients/create-client" ||
        path === "/admin/dashboard/ai-magic" ||
        path.includes("/admin/dashboard/ai-magic/match-ai-talents")
      ) {
        if (role === "admin" && !isAuthTokenExpired(token!)) {
          router.push(path);
        } else {
          router.push("/auth/signin");
        }
      } else if (
        path === "/talentForm/resume-upload" ||
        path === "/talentForm/personalInfo" ||
        path === "/talentForm/tools-tech-info" ||
        path === "/talentForm/experience-info" ||
        path === "/talentForm/education-info" ||
        path === "/talentForm/socialMedia-info"
      ) {
        console.log(path);
        if (role === "candidate" && !isAuthTokenExpired(token!)) {
          router.push(path);
        } else {
          router.push("/auth/signin");
        }
      } else {
        if (path.includes("talent") && role === "candidate") {
          router.push(path);
        } else {
          router.push("/auth/signin");
        }
      }
    }
  }, [path, router]);
  return <>{children}</>;
};

export default AuthProvider;

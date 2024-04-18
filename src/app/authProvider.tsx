import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthTokenExpired } from "../app/isAuthTokenExpired";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  console.log("path", path);
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
      path.includes("/blogs/blog-details")
    ) {
      router.push(path);
    } else {
      if (
        path === "/admin/dashboard" ||
        path === "/admin/dashboard/jobBoard" ||
        path === "/admin/dashboard/newJob" ||
        path === "/admin/dashboard/inputNewJob" ||
        path === "/admin/dashboard/previewJob" ||
        path === "/admin/dashboard/overview"
      ) {
        if (role === "Admin" && !isAuthTokenExpired(token!)) {
          router.push(path);
        } else {
          router.push("/auth/signin");
        }
      } else {
        if (path.includes("talent") && role === "Candidate") {
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

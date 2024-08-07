import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Remote Recruiting",
  description: "Hite talent using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarDetails = [
    // {
    //   iconUrl: "/talendSidebar1.svg",
    //   text: "Overview",
    //   href: "/talent/dashboard/overview",
    // },
    {
      iconUrl: "/talendSidebar2.svg",
      text: "Job Board",
      href: "/talent/dashboard/jobBoard",
    },
    {
      iconUrl: "/talendSidebar3.svg",
      text: "My Resume",
      href: "/talent/dashboard/edit-resume",
    },
    {
      iconUrl: "/talendSidebar4.svg",
      text: "Application Status",
      href: "/talent/dashboard/appliedJobs",
    },
    {
      iconUrl: "/adminSidebar5.svg",
      text: "Job Matching",
      href: "/talent/dashboard/talent-ai-jobs",
    },
    // {
    //   iconUrl: "/talendSidebar5.svg",
    //   text: "Interviews",
    //   href: "#",
    // },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-dashboard h-screen w-full">
          <DashboardNavbar />
          <div className="flex">
            <DashboardSidebar sidebarDetails={sidebarDetails} />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

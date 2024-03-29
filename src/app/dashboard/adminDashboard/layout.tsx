import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarDetails = [
    {
      iconUrl: "/adminSidebar1.svg",
      text: "Overview",
      href: "/dashboard/adminDashboard/overview",
    },
    {
      iconUrl: "/adminSidebar2.svg",
      text: "Job Board",
      href: "/dashboard/adminDashboard/jobBoard",
    },
    {
      iconUrl: "/adminSidebar3.svg",
      text: "Users",
      href: "#",
    },
    {
      iconUrl: "/adminSidebar4.svg",
      text: "Activity Tracking",
      href: "#",
    },
    {
      iconUrl: "/adminSidebar5.svg",
      text: "Leads",
      href: "#",
    },
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

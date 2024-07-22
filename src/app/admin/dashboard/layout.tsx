import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardNavbar from "@/components/dashboard/dashboardNavbar/dashboardNavbar";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar/dashboardSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Remote Recruiting",
  description: "Hire talent using AI",
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
      href: "/admin/dashboard/overview",
    },
    {
      iconUrl: "/adminSidebar2.svg",
      text: "Job Board",
      href: "/admin/dashboard/jobBoard",
    },
    {
      iconUrl: "/adminSidebar3.svg",
      text: "Talents",
      href: "/admin/dashboard/talents",
    },
    {
      iconUrl: "/adminSidebar4.svg",
      text: "Clients",
      href: "/admin/dashboard/clients",
    },
    {
      iconUrl: "/adminSidebar5.svg",
      text: "AI Magic",
      href: "/admin/dashboard/ai-magic",
    },
    {
      iconUrl: "/adminSidebar2.svg",
      text: "Lead Owners",
      href: "/admin/dashboard/leadOwner",
    },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-dashboard h-screen w-full relative">
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

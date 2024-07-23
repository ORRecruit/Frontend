"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useToggleStore from "@/app/toggleStore";

interface SidebarItem {
  iconUrl: string;
  text: string;
  href: string;
  options?: { text: string; href: string }[];
}

interface SidebarInterface {
  sidebarDetails: SidebarItem[];
}

const DashboardSidebar: React.FC<SidebarInterface> = ({
  sidebarDetails = [],
}) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePopup, setActivePopup] = useState<number | null>(null);
  const setToggleMenu = useToggleStore((state) => state.toggleSidebar);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setToggleMenu();
  };

  const togglePopup = (index: number | any) => {
    setActivePopup(activePopup === index ? null : index);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("candidateId");
    localStorage.removeItem("postJob");
    router.push("/auth/signin");
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="absolute top-0 z-50 inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-[60px] left-0 z-40 w-64 h-[90%] transition-transform ${
          isMenuOpen ? "" : "-translate-x-full"
        } sm:translate-x-0 ${!isSidebarOpen ? "w-[60px]" : ""}`}
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white">
          <ul className="space-y-2">
            {sidebarDetails.map((item: SidebarItem, index: number) => (
              <li key={index} className="relative">
                {item.href.length > 0 ? (
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group ${
                      !isSidebarOpen ? "py-[10px]" : "p-2"
                    }`}
                  >
                    <Image
                      width={18}
                      height={18}
                      src={item.iconUrl}
                      alt="icon"
                    />
                    <span
                      className={`ml-3 ${!isSidebarOpen ? "hidden" : "block"}`}
                    >
                      {item.text}
                    </span>
                  </Link>
                ) : (
                  <div
                    onClick={() => togglePopup(index)}
                    className={`relative flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${
                      !isSidebarOpen ? "py-[10px]" : "p-2"
                    }`}
                  >
                    <Image
                      width={18}
                      height={18}
                      src={item.iconUrl}
                      alt="icon"
                    />
                    <span
                      className={`ml-3 ${!isSidebarOpen ? "hidden" : "block"}`}
                    >
                      {item.text} {item.options && ""}
                    </span>
                    <Image
                      width={15}
                      height={15}
                      src="/next-icon.svg"
                      alt="next-icon"
                      className={`absolute right-5 ${
                        !isSidebarOpen ? "hidden" : "block"
                      }`}
                    />
                  </div>
                )}
                {item.options && activePopup === index && (
                  <div className="absolute ml-2 bg-white right-[-10px] top-3 z-50 rounded-lg shadow-lg">
                    {item.options.map((option, optionIndex) => (
                      <Link
                        key={optionIndex}
                        href={option.href}
                        onClick={() => togglePopup(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        {option.text}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div
            onClick={logout}
            className={`absolute cursor-pointer bottom-5 w-[90%] flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group ${
              !isSidebarOpen ? "hidden" : "block"
            }`}
          >
            <span className="ml-3">Logout</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;

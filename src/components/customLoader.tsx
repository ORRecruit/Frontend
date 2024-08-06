import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const CustomLoader = () => {
  const path = usePathname();

  return (
    <div
      className={`w-full h-[100vh] flex justify-center items-center ${
        path === "/admin/dashboard/indeed-scrap" ? "h-[400px]" : ""
      }`}
    >
      <div>
        <div>Please sit back, we're processing your request...</div>
        {path !== "/admin/dashboard/linkedin-scrap" &&
          path !== "/orr-search" &&
          path !== "/admin/dashboard/indeed-scrap" && (
            <div className="w-full flex justify-center items-center mt-4">
              <RotatingLines
                visible={true}
                width="50"
                strokeColor="orange"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          )}
        {(path === "/admin/dashboard/linkedin-scrap" ||
          path === "/orr-search" ||
          path === "/admin/dashboard/indeed-scrap") && (
          <div className="w-full flex justify-center items-center mt-4">
            <Image
              src="/loading-animation.gif"
              width={200}
              height={200}
              alt="loading-animation"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomLoader;

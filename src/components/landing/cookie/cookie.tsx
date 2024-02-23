"use client";
import React, { useEffect, useState } from "react";

const cookie = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className=" bg-about z-50 pr-[10%] pl-[10%] fixed bottom-0 left-0 right-0 text-white p-4 sm:flex sm:justify-between sm:items-center 2xl:h-[150px]">
      <p className="w-[65%] mr-auto ml-auto text-center text-lg lg:text-base">
        Online Remote Recruiting uses first and third-party cookies for
        analytical purposes, to measure your browsing and interactions on the
        website; functional cookies to manage your queries and advertising
        cookies to show you personalized content based on your browsing and
        interactions.
      </p>
      <button
        onClick={handleAccept}
        className="ml-[5%] mr-[10px] bg-primary-orange hover:bg-amber-600 text-white font-bold py-2 px-4 rounded text-xs xl:text-base 2xl:text-base"
      >
        Reject All Cookies
      </button>
      <button
        onClick={handleAccept}
        className="bg-primary-orange hover:bg-amber-600 text-white font-bold py-2 px-4 rounded text-xs xl:text-base 2xl:text-base"
      >
        Accept All Cookies
      </button>
    </div>
  );
};

export default cookie;

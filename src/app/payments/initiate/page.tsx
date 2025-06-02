"use client";
import React, { useEffect, useState } from "react";
import CardPaymentModal from "@/src/components/Modals/CardPaymentModals";
import { useSearchParams } from "next/navigation";
import Modal from "./modal";
import authBgMain from "@/src/assets/auth-pages-bg-main.png";
import { CgSpinner } from "react-icons/cg";
const Page = () => {
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  
  const reference = currentParams.get("reference")
  const returnUrl = currentParams.get("return_url")

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    if (!reference) {
      setIsTokenValid(false);
    } else {
      setIsTokenValid(true);
    }
    setIsLoading(false);
  }, [reference]);

  if (isLoading) {
    return (
      <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed  backdrop-blur-sm">
        <CgSpinner className={` ${"text-[#101012]"} text-6xl animate-spin  `} />
      </div>
    );
  }

  return (
    <main
      className="
    h-full lg:w-full w-screen flex  capitalize bg-black min-h-screen justify-center
    "
      style={{
        backgroundImage: `url(${authBgMain.src})`,
        backgroundSize: "cover", // Makes the image fit while covering the entire div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents repetition
      }}
    >
      {reference && isTokenValid && isLoading === false ? (
        <CardPaymentModal paymentReference={reference} returnUrl={returnUrl}/>
      ) : (
        <Modal />
      )}
    </main>
  );
};

export default Page;

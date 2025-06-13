"use client";
import React, { useState } from "react";
import Image from "next/image";
import background from "@/src/assets/bg-black.png";
import { CiCircleCheck } from "react-icons/ci";
import logoWhite from "@/src/assets/logo-white.png";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  const blockExplorerUrl = currentParams.get("blockExplorerUrl");
 

  return (
    <>
      <main className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 flex-col gap-y-4">
          {/* <Image src={logoWhite} alt="logo-white" className="w-[10%] h-[10%]"/>
      <span className="text-4xl font-bold text-white">Payment Portal</span> */}
          <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CiCircleCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Payment Successful!
              </h2>
              <p className="text-white_primary mb-6">
                Your transaction has been completed successfully.
              </p>
              {blockExplorerUrl && (
                <a
                  href={blockExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 underline  block mb-3"
                >
                  View on Mintscan
                </a>
              )}
              <button
                className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition "
                // onClick={closeModal}
              >
                <a href={"about:blank"}>Close</a>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full ">
            <span className="text-white">Powered By</span>
            <Image
              src={logoWhite}
              alt="logo-white"
              className="w-[100px] h-[50px]"
            />
          </div>
        </div>
        <div className="absolute z-[-10] bottom-0 top-0 right-0 left-0">
          <Image
            src={background}
            alt="background"
            className="w-full lg:h-full h-[1000px] md:h-[1200px]  "
          />
        </div>
      </main>
      
    </>
  );
};

export default Page;

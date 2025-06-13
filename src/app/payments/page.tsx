"use client";
import background from "@/src/assets/bg-black.png";
import Image from "next/image";
import { useState } from "react";
import logoWhite from "@/src/assets/logo-white.png";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());

  const amount = currentParams.get("amount");
  const recipient = currentParams.get("holding_address");
  const token = currentParams.get("token_type");

  const fiatUrl = currentParams.get("fiat_url");

  return (
    <main className="h-screen flex  items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      {/* <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}></Navbar> */}
      <div className="absolute z-[-10] bottom-0 top-0 right-0 left-0">
        <Image
          src={background}
          alt="background"
          className="w-full lg:h-full h-[1000px] md:h-[1200px]  "
        />
      </div>
      <section className="flex flex-col justify-between items-center gap-y-20">
        <div className="flex flex-col text-center">
          <span className="text-white text-5xl font-bold">Welcome.</span>
          <span className="text-white text-2xl">
            Please choose an option to continue your payment.
          </span>
        </div>
        <div className="flex justify-between gap-x-10">
          <a href={fiatUrl ?? undefined}>
            <button
              onClick={() => !fiatUrl && toast.error("Invalid or no fiat url")}
              className=" px-4 h-10  rounded-lg bg-white text-black"
            >
              Pay with Fiat
            </button>
          </a>
          <button
            onClick={() => {
              if (!token || !recipient) {
                toast.error("No or invalid tokens");
                return;
              }
              router.push(
                `/payments/crypto?amount=${amount}&holding_address=${recipient}&token_type=${token}`
              );
            }}
            className=" px-4 h-10  rounded-lg bg-white text-black"
          >
            Pay with Crypto
          </button>
        </div>
        <div className="flex items-center justify-center w-full ">
          <span className="text-white">Powered By</span>
          <Image
            src={logoWhite}
            alt="logo-white"
            className="w-[100px] h-[50px]"
          />
        </div>
      </section>
    </main>
  );
};

export default Page;

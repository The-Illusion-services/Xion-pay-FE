"use client"
import React, {useEffect, useState} from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import background from "@/src/assets/bg-black.png";
import logoWhite from "@/src/assets/logo-white.png";
import logoWhiteHero from "@/src/assets/logo-white-hero.png";
import { useRouter } from "next/navigation";
import heroImg from "@/src/assets/hero-img.png";

import Image from "next/image";

const NovyPayHeroLanding = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  // useEffect(()=>{
  //   return router.push("/waitlist")
    
  // }, [])

  if(!isLoading){

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center lg:p-4 lg:flex-row flex-col w-full"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover", // Makes the image fit while covering the entire div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents repetition
      }}
    >
      <div className="container z-[10] relative w-full lg:w-[40%]">
        {/* Logo */}
        <div className=" flex flex-col lg:justify-start justify-center w-full rounded-lg ">
          <Image
            src={logoWhiteHero}
            alt="novypay-logo-white"
            className="w-full ml-5 lg:ml-0 "
          />
        </div>

        {/* Hero Text */}
        <div className="mb-12  text-center lg:text-start  flex justify-center">
          <h2 className="text-white text-3xl md:text-3xl font-light lg:max-w-3xl  leading-relaxed">
            Next-gen crypto payments built on the XION blockchain
          </h2>
        </div>
        <div className="lg:w-1/2 lg:h-1/2 w-[90%] h-[90%] lg:hidden  flex justify-center mx-auto ">
          <Image
            src={heroImg}
            alt="hero-img"
            className="w-full h-full  rounded-lg shadow-md drop-shadow-lg"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row md:flex-row items-center  lg:gap-4  gap-x-4 w-full  justify-center lg:justify-start mt-10 lg:mt-0">
          <a
            href="https://novypay-docs.readthedocs.io/en/latest/"
            className="flex items-center bg-transparent border border-white text-white lg:px-8 px-2 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            <BookOpen size={20} className="mr-2" />
            <span>Check docs</span>
          </a>

          <a
            href="/auth/register"
            className="flex items-center border text-white lg:px-8 px-4 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            <span>Register</span>
            <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
      <div className="lg:w-1/2 lg:h-1/2 w-[80%] h-[80%] hidden  lg:flex justify-center mx-auto ">
        <Image
          src={heroImg}
          alt="hero-img"
          className="w-full h-full  rounded-lg shadow-md drop-shadow-lg"
        />
      </div>
      {/* <div className={`flex absolute bottom-0 top-0 right-0 left-0`}>
        <Image
          src={background}
          alt="background"
          className="w-full lg:h-full h-[1000px] md:h-[1200px]"
        />
      </div> */}
    </div>
  );
}

};

export default NovyPayHeroLanding;

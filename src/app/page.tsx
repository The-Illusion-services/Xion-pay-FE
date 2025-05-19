"use client"
import React, {useEffect, useState} from "react";

import { useRouter } from "next/navigation";
import background from "@/src/assets/bg-black.png";


import Image from "next/image";
import Navbar from "../components/LandingNavbar";

const NovyPayHeroLanding = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const router = useRouter();



  return (
    <div>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}></Navbar>
      
      
      <main
        className={`lg:px-20 flex flex-col justify-between h-fit py-8  gap-y-16  transition-colors  ${
          isDarkMode ? "text-[#EEEEEE] " : "text-[#101012]"
        }`}
      >
        <div
          className={`${
            isDarkMode ? "flex" : "hidden"
          } absolute z-[-10] bottom-0 top-0 right-0 left-0`}
        >
          <Image
            src={background}
            alt="background"
            className="w-full lg:h-full h-[1000px] md:h-[1200px]"
          />
        </div>
        
      </main>
    </div>
  );


};

export default NovyPayHeroLanding;

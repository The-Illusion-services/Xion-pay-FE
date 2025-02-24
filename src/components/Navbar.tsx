import React from "react";
import logoBlack from "@/src/assets/logo-black.png";
import logoWhite from "@/src/assets/logo-white.png";
import { IoMoon } from "react-icons/io5";
import Image from "next/image";
import { PiSunDimBold } from "react-icons/pi";

type Props = {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
};
const Navbar: React.FC<Props> = ({ setIsDarkMode, isDarkMode }) => {
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="fixed top-0 w-full z-40 backdrop-blur-sm bg-white/30 px-4 lg:px-20">
      <div className="flex justify-between items-center w-full relative">
        {/* Logo */}
        <Image
          src={isDarkMode ? logoWhite : logoBlack}
          alt="logo"
          className="w-24 h-10"
        />
        
        {/* Dark Mode Toggle */}
        {isDarkMode ? (
          <PiSunDimBold
            className="cursor-pointer text-[#EEEEEE] z-50"
            onClick={handleDarkMode}
          />
        ) : (
          <IoMoon
            className="cursor-pointer z-50"
            onClick={handleDarkMode}
          />
        )}
      </div>
    </div>
  );
  
};

export default Navbar;

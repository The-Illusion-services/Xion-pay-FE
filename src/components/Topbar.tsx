import React from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import Profile from "@/src/assets/profile.svg";


const Topbar = () => {
  return (
    <div className=" z-10 fixed w-[84%] flex justify-between bg-[#13161F] text-white h-16 py-3 top-0">
      <div className="text-white flex items-center justify-center text-base border-inputBorderColor lg:ml-[3%]">
        {/* <h2 className="hidden xl:block p-3 text-lg">{page}</h2> */}
        
      </div>

      <div className="hidden  w-[60%] lg:flex lg:flex-row lg:items-center bg-[#161616] h-10 px-2 rounded-md">
        <div className="w-[5%]  flex text-2xl text-textGray">
          <CiSearch />
        </div>

        <input
          type="search"
          className=" text-textGray rounded-lg px-3 py-4 mt-1 text-sm h-8  w-[95%] bg-[#161616]  focus:outline-none  "
          placeholder="Search"
        />
      </div>

      <div className="flex items-center justify-between mr-[3%]">
        <div className="rounded-full text-PrimaryPurple w-5 h-5 flex items-center justify-center text-3xl bg-[#1b1c1e] border-inputBorderColor mr-3">
          <FaBell />
        </div>

        <div className="rounded-full text-PrimaryPurple w-10 h-10 flex items-center justify-center text-3xl bg-[#1b1e1f] border-inputBorderColor xl:hidden">
          <IoPersonCircleSharp />
        </div>
        <Image
          src={Profile}
          alt="login illustration"
          className="object-contain w-10 h-10 rounded-full hidden xl:block"
        />
      </div>
    </div>
  );
};

export default Topbar;

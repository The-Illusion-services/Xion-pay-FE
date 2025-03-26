"use client";
import { useState } from "react";
import { Copy, LogOut } from "lucide-react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className=" z-10 fixed w-[84%] flex justify-between bg-gray_primary text-white h-16 py-3 top-0 px-4">
      <div className="hidden  w-[50%] lg:flex lg:flex-row lg:items-center bg-black h-10 px-2 rounded-[20px] x">
        <div className="w-[5%]  flex text-2xl text-textGray">
          <CiSearch />
        </div>

        <input
          type="search"
          className=" text-textGray  px-3 py-4 mt-1 text-sm h-8  w-[95%] bg-black  focus:outline-none  "
          placeholder="Search"
        />
      </div>

      <div
        className="flex items-center justify-center rounded-[20px] bg-black w-[20%]"
        onClick={handleShowMenu}
      >
        <div className="items-center flex flex-row justify-center gap-x-2 cursor-pointer">
          <span>xion1...wugav</span>
          {showMenu ? <FaCaretUp /> : <FaCaretDown />}
        </div>
        <article
          className={`absolute  ${
            showMenu ? "h-28 opacity-1" : "h-0 opacity-0"
          } shadow-md w-[18%] rounded-[20px] mt-[150px] transition-all bg-gray_primary py-2 gap-y-2 flex flex-col drop-shadow-md`}
        >
          <div className="flex flex-row justify-center bg-black p-2 rounded-[20px] w-[90%] items-center mx-auto gap-x-2">
            <span>xion1...wugav</span>
            <Copy className="cursor-pointer text-[#949494]" />
          </div>
          <div className="border-t border-[#474747] w-[80%] mx-auto flex flex-row items-center py-1 gap-x-2 px-4">
            <LogOut className="text-[#474747]" />
            <span>Logout</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Topbar;

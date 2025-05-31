"use client";
import { useState, useEffect } from "react";
import { Copy, LogOut } from "lucide-react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useGlobalData } from "../hooks/useGlobalData";
import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
const Topbar = () => {
  const {
    data: { bech32Address },

  } = useAbstraxionAccount();
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCopyAddress = () => {
    if (bech32Address) {
      navigator.clipboard.writeText(bech32Address);
      toast.success("Address Copied");
      // Optional: Add a toast notification here
    }
  };

  const getBalance = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/get-wallet-balance/`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      console.log(responseData);

      return responseData;
    } catch (err) {
      console.log(err);
    }
  };
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["get-balance"],
  //   queryFn: getBalance,
  // });

  useEffect(() => {
    if (bech32Address) {
      const prefix = bech32Address.slice(0, 8);
      const suffix = bech32Address.slice(-8);
      const formatted = `${prefix}...${suffix}`;
      setWalletAddress(formatted);
    }
  }, [bech32Address]);

  return (
    <div className="z-10 fixed w-[84%] flex justify-between bg-gray_primary text-white h-16 py-3 top-0 px-4">
      <div className="hidden w-[50%] lg:flex lg:flex-row lg:items-center bg-black h-10 px-2 rounded-[20px] x">
        <div className="w-[5%] flex text-2xl text-textGray">
          <CiSearch />
        </div>

        <input
          type="search"
          className="text-textGray px-3 py-4 mt-1 text-sm h-8 w-[95%] bg-black focus:outline-none"
          placeholder="Search"
        />
      </div>

      <div
        className="flex items-center justify-center rounded-[20px] bg-black w-[20%]"
        onClick={handleShowMenu}
      >
        <div className="items-center flex flex-row justify-center gap-x-2 cursor-pointer">
          <span>{walletAddress || "Loading..."}</span>
          {showMenu ? <FaCaretUp /> : <FaCaretDown />}
        </div>
        <article
          className={`absolute ${
            showMenu ? "h-28 opacity-1" : "h-0 opacity-0"
          } shadow-md w-[18%] rounded-[20px] mt-[150px] transition-all bg-gray_primary py-2 gap-y-2 flex flex-col drop-shadow-md`}
        >
          <div className="flex flex-row justify-center bg-black p-2 rounded-[20px] w-[90%] items-center mx-auto gap-x-2 text-sm">
            <span>{walletAddress || "Loading..."}</span>
            <Copy
              className="cursor-pointer text-[#949494] hover:text-white"
              onClick={handleCopyAddress}
            />
          </div>
          <div className="border-t border-[#474747] w-[80%] mx-auto flex flex-row items-center py-1 gap-x-2 px-4 cursor-pointer hover:text-gray-300">
            <LogOut className="text-[#474747]" />
            <span>Logout</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Topbar;

"use client";
import { useState, useEffect, useContext } from "react";
import { CreateContext } from "../Context/context";
import { Copy, LogOut, Search, Menu } from "lucide-react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useGlobalData } from "../hooks/useGlobalData";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";

const Topbar = () => {
  const router = useRouter();
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const { setIsLoading } = useContext(CreateContext).loader;
  const { logout } = useAbstraxionSigningClient();

  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleToggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      logout && logout();
      router.push("/auth/login");
      localStorage.removeItem("lastVisitedPage");
      signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCopyAddress = () => {
    if (bech32Address) {
      navigator.clipboard.writeText(bech32Address);
      toast.success("Address Copied");
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
      console.log(responseData);
      return responseData;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (bech32Address) {
      const prefix = bech32Address.slice(0, 6);
      const suffix = bech32Address.slice(-6);
      const formatted = `${prefix}...${suffix}`;
      setWalletAddress(formatted);
    }
  }, [bech32Address]);

  return (
    <>
      {/* Main Topbar */}
      <div className="z-10 fixed w-full lg:w-[84%] flex justify-between bg-gray_primary text-white h-16 py-3 top-0 px-4">
        {/* Desktop Search Bar */}
        <div className="hidden lg:flex w-[50%] flex-row items-center bg-black h-10 px-2 rounded-[20px]">
          <div className="w-[5%] flex text-2xl text-textGray">
            <CiSearch />
          </div>
          <input
            type="search"
            className="text-textGray px-3 py-4 mt-1 text-sm h-8 w-[95%] bg-black focus:outline-none"
            placeholder="Search"
          />
        </div>

        {/* Mobile Search Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={handleToggleMobileSearch}
            className="p-2 hover:bg-black/20 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* User Menu */}
        <div className="relative">
          <div
            className="flex items-center justify-center rounded-[20px] bg-black px-3 py-2 min-w-[120px] lg:min-w-[150px] cursor-pointer"
            onClick={handleShowMenu}
          >
            <div className="items-center flex flex-row justify-center gap-x-2">
              <span className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px]">
                {walletAddress || "Loading..."}
              </span>
              {showMenu ? <FaCaretUp className="flex-shrink-0" /> : <FaCaretDown className="flex-shrink-0" />}
            </div>
          </div>

          {/* Dropdown Menu */}
          <article
            className={`absolute right-0 ${
              showMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
            } shadow-lg w-48 sm:w-56 rounded-[20px] mt-2 transition-all duration-200 bg-gray_primary py-2 gap-y-2 flex flex-col drop-shadow-md z-50`}
          >
            {/* Address with Copy */}
            <div className="flex flex-row justify-between bg-black p-3 rounded-[20px] w-[90%] items-center mx-auto gap-x-2 text-sm">
              <span className="truncate flex-1 text-xs sm:text-sm">
                {bech32Address || "Loading..."}
              </span>
              <Copy
                className="cursor-pointer text-[#949494] hover:text-white w-4 h-4 flex-shrink-0"
                onClick={handleCopyAddress}
              />
            </div>

            {/* Logout Button */}
            <div
              onClick={handleSignout}
              className="border-t border-[#474747] w-[80%] mx-auto flex flex-row items-center py-2 gap-x-2 px-4 cursor-pointer hover:text-gray-300 transition-colors"
            >
              <LogOut className="text-[#474747] w-4 h-4" />
              <span className="text-sm">Logout</span>
            </div>
          </article>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-start pt-16">
          <div className="w-full bg-gray_primary p-4 shadow-lg">
            <div className="flex items-center bg-black rounded-[20px] px-3 py-2">
              <CiSearch className="text-2xl text-textGray mr-2" />
              <input
                type="search"
                className="flex-1 text-textGray text-sm bg-transparent focus:outline-none placeholder-textGray"
                placeholder="Search"
                autoFocus
              />
              <button
                onClick={handleToggleMobileSearch}
                className="ml-2 px-3 py-1 text-sm text-white hover:text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
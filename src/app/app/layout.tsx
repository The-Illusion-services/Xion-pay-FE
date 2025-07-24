"use client";
import { CreateContext } from "@/src/Context/context";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { GoHome, GoSignOut } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "../auth/AuthGuard";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import logo from "@/src/assets/logo-white.png";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import SidebarLinkComp from "@/src/components/Sidebar/Links";
import { AiOutlineSwap } from "react-icons/ai";
import Topbar from "@/src/components/Topbar";
import { useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import ScreenGuard from "@/src/components/ScreenGuard";
type Action = {
  type: string;
};
export type SidebarState = {
  dashboard: {
    isActive: boolean;
  };
  compliance: {
    isActive: boolean;
  };
  settings: {
    isActive: boolean;
  };
  escrow: {
    isActive: boolean;
  };
  transactions: {
    isActive: boolean;
  };
};
const appSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userRole, setShowSignOutModal, showSignOutModal } =
    useContext(CreateContext).auth;
  const { setIsLoading } = useContext(CreateContext).loader;

  const router = useRouter();

  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, client } = useAbstraxionSigningClient();

  const handleShowSignOutModal = () => {
    setShowSignOutModal(!showSignOutModal);
  };

  // const handleSignout = () => {
  //   router.push("/auth/login");
  //   localStorage.removeItem("lastVisitedPage");
  //   signOut();
  // };
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

  const initialState = {
    dashboard: {
      isActive: true,
    },
    compliance: {
      isActive: false,
    },
    settings: {
      isActive: false,
    },
    escrow: {
      isActive: false,
    },
    transactions: {
      isActive: false,
    },
  };

  const reducerFunc = (state: SidebarState, action: Action) => {
    switch (action.type) {
      case "DASHBOARD":
        return {
          ...state,
          dashboard: { isActive: true },
          compliance: { isActive: false },
          settings: { isActive: false },
          escrow: { isActive: false },
          transactions: { isActive: false },
        };
      case "COMPLIANCE":
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: true },
          settings: { isActive: false },
          escrow: { isActive: false },
          transactions: { isActive: false },
        };
      case "SETTINGS": {
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: false },
          settings: { isActive: true },
          escrow: { isActive: false },
          transactions: { isActive: false },
        };
      }
      case "ESCROW": {
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: false },
          settings: { isActive: false },
          escrow: { isActive: true },
          transactions: { isActive: false },
        };
      }
      case "TRANSACTIONS":
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: false },
          settings: { isActive: false },
          escrow: { isActive: false },
          transactions: { isActive: true },
        };
      default:
        return state;
    }
  };

  useEffect(() => {
    if (pathname === "/app" || pathname === "/app/dashboard") {
      return dispatch({ type: "DASHBOARD" });
    } else if (pathname === "/app/compliance") {
      return dispatch({ type: "COMPLIANCE" });
    } else if (pathname === "/app/settings") {
      return dispatch({ type: "SETTINGS" });
    } else if (pathname === "/app/escrow") {
      dispatch({ type: "ESCROW" });
    } else if (pathname === "/app/transactions") {
      dispatch({ type: "TRANSACTIONS" });
    }
  }, [pathname]);

  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const handleDispatch = (type: string) => {
    dispatch({ type });
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

  const handleCourseDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <AuthGuard>
      {/* // <SignoutModal /> */}
      {/* <ScreenGuard> */}
      <React.Fragment>
  {/* Desktop Sidebar - Hidden on mobile */}
  <section className="hidden lg:flex bg-gray_primary text-white border-solid  fixed z-10 h-screen shadow-md flex-col text-3xl w-[16%] px-2">
    <div className="flex items-center">
      <Image src={logo} alt="logo" className="h-10 w-24" />
    </div>
    <article className="h-[50%] items-start flex flex-col justify-start gap-4 w-full px-6 mt-8">
      <SidebarLinkComp
        title="dashboard"
        Icon={<LuLayoutDashboard className="text-lg" />}
        handleDispatch={handleDispatch}
        state={state}
      />
      <SidebarLinkComp
        title="transactions"
        Icon={<AiOutlineSwap className="text-lg" />}
        handleDispatch={handleDispatch}
        state={state}
      />
      <SidebarLinkComp
        title="settings"
        Icon={<IoSettingsSharp className="text-lg" />}
        handleDispatch={handleDispatch}
        state={state}
      />
    </article>

    {/* Logout Button - Desktop */}
    <article className="mt-auto p-4">
      <button
        onClick={handleSignout}
        className="hover:bg-[#5856D60D] cursor-pointer rounded-md h-8 px-2 flex w-full text-sm gap-x-1 items-center"
      >
        <GoSignOut />
        <span>Sign Out</span>
      </button>
    </article>
  </section>

  {/* Mobile Bottom Tab Navigation */}
  <section className="lg:hidden bg-gray_primary text-white fixed bottom-0 left-0 right-0 z-10 h-20 shadow-md border-t border-gray-600">
    <article className="flex flex-row justify-around items-center h-full px-4">
      <SidebarLinkComp
        title="dashboard"
        Icon={<LuLayoutDashboard className="text-xl" />}
        handleDispatch={handleDispatch}
        state={state}
      />
      <SidebarLinkComp
        title="transactions"
        Icon={<AiOutlineSwap className="text-xl" />}
        handleDispatch={handleDispatch}
        state={state}
      />
      <SidebarLinkComp
        title="settings"
        Icon={<IoSettingsSharp className="text-xl" />}
        handleDispatch={handleDispatch}
        state={state}
      />
      {/* Mobile Logout Button */}
      <button
        onClick={handleSignout}
        className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-md hover:bg-[#5856D60D]"
      >
        <GoSignOut className="text-xl" />
        <span className="text-xs font-light">Sign Out</span>
      </button>
    </article>
  </section>

  {/* Content Section */}
  <section className="lg:ml-[16%] bg-black pb-20 lg:pb-0">
    <Topbar />
    {children}
  </section>
</React.Fragment>
      {/* </ScreenGuard> */}
    </AuthGuard>
  );
};

export default appSidebar;

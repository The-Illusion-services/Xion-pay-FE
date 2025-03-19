"use client";
import { CreateContext } from "@/src/Context/context";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { BiBook } from "react-icons/bi";
import { GoHome, GoSignOut } from "react-icons/go";
import { PiCertificateLight } from "react-icons/pi";
// import { usepathname } from "react-router-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import logo from "@/assets/logo.png";
import AuthGuard from "../auth/AuthGuard";
// import SignoutModal from "../auth/SignoutModal";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import Modal from "./dashboard/modal";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type Action = {
  type: string;
};
type State = {
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
  activity: {
    isActive: boolean;
  };
};
const appSidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { logout, userRole, setShowSignOutModal, showSignOutModal } =
    useContext(CreateContext).auth;

    const router = useRouter()
    
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowSignOutModal = () => {
    setShowSignOutModal(!showSignOutModal);
  };

  const handleSignout  = ()=>{
    router.push("/auth/login")
    localStorage.removeItem("lastVisitedPage")
    signOut()
  }

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
    activity: {
      isActive: false,
    },
  };

  const reducerFunc = (state: State, action: Action) => {
    switch (action.type) {
      case "DASHBOARD":
        return {
          ...state,
          dashboard: { isActive: true },
          compliance: { isActive: false },
          settings: { isActive: false },
          escrow: { isActive: false },
          activity: { isActive: false },
        };
      case "COMPLIANCE":
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: true },
          settings: { isActive: false },
          escrow: { isActive: false },
          activity: { isActive: false },
        };
      case "SETTINGS": {
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: false },
          settings: { isActive: true },
          escrow: { isActive: false },
          activity: { isActive: false },
        };
      }
      case "ESCROW": {
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: false },
          settings: { isActive: false },
          escrow: { isActive: true },
          activity: { isActive: false },
        };
      }
      case "ACTIVITY":
        return {
          ...state,
          dashboard: { isActive: false },
          compliance: { isActive: false },
          settings: { isActive: false },
          escrow: { isActive: false },
          activity: { isActive: true },
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
    } else if (pathname === "/app/activity") {
      dispatch({ type: "ACTIVITY" });
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
    
    <React.Fragment>
      <section className=" bg-[#13161F] text-white border-solid mt-20 fixed z-10 lg:h-full shadow-md flex flex-col text-3xl h-20 bottom-0  w-full lg:w-[16%] lg:px-2 pt-20 ">
        <div className=" flex items-center px-4">
          {/* <Image src={logo} alt="logo" className="h-10 w-24" /> */}
        </div>
        <article className="lg:h-[50%] lg:items-start flex flex-row lg:flex-col justify-evenly  items-center h-full  w-full border-b">
          <Link
            href="/app/dashboard"
            onClick={() => handleDispatch("DASHBOARD")}
            className={`w-full lg:h-8 flex items-center   lg:px-2 justify-center ${
              state.dashboard.isActive &&
              "border-l-4 border-l-[#5856D6] lg:text-[#5856D6] lg:bg-[#5856D60D]"
            } `}
          >
            <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center ">
              <LuLayoutDashboard className="text-lg " />
              <span className="">Dashboard</span>
            </div>
          </Link>
          <Link
            href="/app/compliance"
            onClick={() => handleDispatch("COMPLIANCE")}
            className={`w-full lg:h-8 flex items-center   lg:px-2 justify-center ${
              state.compliance.isActive &&
              " border-l-4 border-l-[#5856D6] lg:text-[#5856D6] lg:bg-[#5856D60D]"
            } `}
          >
            <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
              <MdOutlineVerifiedUser className="text-lg" />
              <span className="">Compliance</span>
            </div>
          </Link>
          <Link
            href="/app/settings"
            onClick={() => handleDispatch("SETTINGS")}
            className={`w-full lg:h-8 flex items-center   lg:px-2 justify-center ${
              state.settings.isActive &&
              " border-l-4 border-l-[#5856D6] lg:text-[#5856D6] lg:bg-[#5856D60D]"
            } `}
          >
            <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
              <IoSettingsSharp className="text-lg" />
              <span className="">Settings</span>
            </div>
          </Link>

          <Link
            href="#"
            onClick={() => handleDispatch("ESCROW")}
            className={`w-full lg:h-8 flex items-center   lg:px-2 justify-center ${
              state.escrow.isActive &&
              " border-l-4 border-l-[#5856D6] lg:text-[#5856D6] lg:bg-[#5856D60D]"
            } `}
          >
            <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
              <IoMdListBox className="text-lg" />
              <span className="">Escrow</span>
            </div>
          </Link>

          <Link
            href="#"
            onClick={() => handleDispatch("ACTIVITY")}
            className={`w-full lg:h-8 flex items-center   lg:px-2 justify-center ${
              state.activity.isActive &&
              " border-l-4 border-l-[#5856D6] lg:text-[#5856D6] lg:bg-[#5856D60D]"
            } `}
          >
            <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
              <HiOutlineChartSquareBar className="text-lg" />
              <span className="">Activity</span>
            </div>
          </Link>
        </article>

        {/* Logout Button */}
        <article className="mt-auto p-4">
          <button
            onClick={handleSignout}
            className="hover:lg:bg-[#5856D60D] cursor-pointer rounded-md h-8 px-2 flex w-full text-sm gap-x-1 lg:flex-row items-center"
          >
            <GoSignOut />
            <span>Sign Out</span>
          </button>
        </article>
      </section>

      {/* Content Section */}
      <section className="lg:ml-[16%] bg-black">{children}</section>
    </React.Fragment>
     </AuthGuard>
  );
};

export default appSidebar;

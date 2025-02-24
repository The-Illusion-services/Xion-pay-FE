"use client";
import React, { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


import { signOut } from "next-auth/react";
interface ContextTypes {
  auth: {
    token: string | null;
    authState: UserData;
    setAuthState: React.Dispatch<React.SetStateAction<UserData>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    userId: string | null;
    username: string;
    userRole: string | null;
    login: (accessToken: string, userId: string, userRole: string) => void;
    logout: () => void;
    showSignOutModal: boolean;
    setShowSignOutModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  modal: {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    errMsg: string;
    setErrMsg: React.Dispatch<React.SetStateAction<string>>;
    msg: string;
    setMsg:React.Dispatch<React.SetStateAction<string>>;
  };
  loader: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    skeletalLoading: boolean;
    setSkeletalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  user: { currUser: string };

  previousLocation: string;
  setPreviousLocation: React.Dispatch<React.SetStateAction<string>>;
  paymentLink: boolean,
  setPaymentLink: React.Dispatch<React.SetStateAction<boolean>>;
}

type UserData = {
  token: string | null;
  userId: string | null;
  userRole: string | null;
};

export const CreateContext = createContext({} as ContextTypes);

const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();

  // State for authentication
  useEffect(() => {
    setAuthState(() => {
      const storedDataRaw = localStorage.getItem("userData");
      const storedData = storedDataRaw && JSON.parse(storedDataRaw);
      return storedData || { token: null, userId: null, userRole: null };
    });
  }, []);

  // Other states
  const [authState, setAuthState] = useState<UserData>({
    token: null,
    userId: null,
    userRole: null,
  });

  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currUser, setCurrUser] = useState("recruit");
  const [skeletalLoading, setSkeletalLoading] = useState(false);
  
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  
  const [previousLocation, setPreviousLocation] = useState("");
  const [msg, setMsg] = useState("")
  
  const [paymentLink, setPaymentLink] = useState(false)
 
  const { token, userId, userRole } = authState;

  // useEffect(() => {
  //   if (
  //     pathname !== "/auth/login" &&
  //     pathname !== "/auth/register" &&
  //     !pathname?.includes("/auth/pay") &&
  //     pathname !== "/"
  //     && pathname !== null
  //   ) {
  //     const updatedPathname = `/${window.location.href.split("/app")[1]}`;
  //     console.log(window.location.href);
      
  //     localStorage.setItem("xion-pay-lastVisitedPage", pathname);
  //     // setPreviousLocation(updatedPathname);
  //   }
  // }, [pathname]);

  useEffect(()=>{
    if(pathname !== "/waitlist"){
      router.push("/waitlist")
    }
  },[])

  // Login function
  const login = (accessToken: string, userId: string, userRole: string) => {
    const userData = { token: accessToken, userId, userRole };
    setAuthState(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    router.push(userRole === "Employee" ? "/app/learner" : "/app/creator");
  };

  // Logout function
  const logout = () => {
    setAuthState({ token: null, userId: null, userRole: null });
    localStorage.removeItem("userData");

    signOut();
  };

  // Clear course state on navigation
  // useEffect(() => {
  //   if (
  //     !pathname?.includes("/creator/course-management/create") &&
  //     !pathname?.includes("/creator/course-management/update")
  //   ) {
      
  //   }
  // }, [pathname]);

  // Clear cached course checker on navigation
  useEffect(() => {
    if (!pathname?.includes("/creator/course-management")) {
      localStorage.removeItem("checkCachedCourse");
    }
  }, [pathname]);

  // Automatically log in from localStorage
  useEffect(() => {
    const storedDataRaw = localStorage.getItem("userData");
    const storedData = storedDataRaw && JSON.parse(storedDataRaw);
    if (storedData?.token) {
      setAuthState(storedData);
    }
  }, []);

  
  // console.log(window.location.href.split("/app")[1]);

  return (
    <CreateContext.Provider
      value={{
        auth: {
          token,
          authState,
          setAuthState,
          setUsername,
          userId,
          username,
          userRole,
          login,
          logout,
          showSignOutModal,
          setShowSignOutModal,
        },
        modal: {
          showModal,
          setShowModal,
          errMsg,
          setErrMsg,
          msg,
          setMsg
        },
        loader: {
          isLoading,
          setIsLoading,
          skeletalLoading,
          setSkeletalLoading,
        },
        user: { currUser },
      
        previousLocation,
        setPreviousLocation,
        paymentLink,
        setPaymentLink
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default ContextProvider;

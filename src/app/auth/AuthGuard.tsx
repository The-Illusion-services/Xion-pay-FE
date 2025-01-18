"use client";

import React, { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const { setIsLoading, isLoading } = useContext(CreateContext).loader;
  const isJwtExpired = (token: string) => {
    try {
      const decoded = jwtDecode(token);

      if (decoded && decoded.exp) {
        return decoded.exp; // Token is expired if exp is less than current time
      } else {
        throw new Error("Token does not contain an 'exp' field.");
      }
    } catch (error) {
      console.error("Invalid token or decoding error:", error);
      // return true;
    }
  };

  const router = useRouter();
  const { data: session, status } = useSession();

  
  useEffect(() => {
    if (session?.expires && session?.user?.accessToken) {
      const currentTime = new Date().getTime() / 1000;
      const expiryTime = isJwtExpired(session?.user?.accessToken);

      if (expiryTime && currentTime > expiryTime) {
        signOut(); // Automatically log the user out
      }
    }
    if (status === "unauthenticated") {
      localStorage.removeItem("lastVisitedPage");

      router.push("/auth/login");
      return;
    }
  }, [status, session]);

  // Show loading spinner while session is being checked
  if (status === "loading") {
    <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed ">
      <CgSpinner className=" text-6xl animate-spin bg-PrimaryPurple" />
    </div>;
  } else if (status === "authenticated") {
    return <main>{children}</main>;
  }

  // Render nothing while redirecting or if unauthenticated
  return null;
};

export default AuthGuard;

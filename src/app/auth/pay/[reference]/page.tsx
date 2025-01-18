"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";
// import { ConfigContext } from "../../../../../contexts/ConfigContext";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; // Next.js router
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import { useSession } from "next-auth/react";

import { CgSpinner } from "react-icons/cg";
// import AnimateButton from "@/components/@extended/AnimateButton";

const VerifyEmailPage = () => {
  const { data: session } = useSession();
  // const { setShowSpinner } = useContext(ConfigContext).spinner;
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [amount, setAmount] = useState("")
  const [reference, setReference] = useState("")
  const [currency, setCurrency] = useState("")
  const [email, setEmail] = useState("")
  // const currentParams = new URLSearchParams(searchParams?.toString());
  // const reference = currentParams.get("reference");
  // const url = "localhost:3000/auth/pay/bdae471a-394c-4342-abd9-e255667c0da8/";
  
  // Ensure the router is available and only run code on the client-side
  useEffect(() => {
    const reference = pathname?.split("/")[3];
    if (reference) {
      // Call API to verify email with the token
      getPaymentDetails(reference);
    } else {
      // setError("Invalid or expired token.");
      setLoading(false);
    }
  }, [session]);

  const redirectToSetPassword = (token: string | null) => {
    router.push(`/auth/register/corporate-user?token=${token}`);
  };

  const redirectToLogin = () => {
    router.push("/auth/login");
  };
  console.log(session?.user?.accessToken);

  const getPaymentDetails = async (reference: string) => {
    if (session?.user?.accessToken) {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}pay/${reference}/`,
          {
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setAmount(responseData?.amount)
          setCurrency(responseData?.currency)
          setReference(responseData?.reference)
          setVerified(true);
        }else{
          setVerified(false)
        }

        // if (response.ok && responseData?.data?.isCorporate === true) {
        //   setIsCorporate(true);
        //   setVerified(true);
        // } else if (response.ok && responseData?.data?.isCorporate === false) {
        //   setIsCorporate(false);
        //   setVerified(true);
        // } else {
        //   throw new Error(responseData.message || "Email verification failed.");
        // }
      } catch (err) {
        // setError(err?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const navigateToExternalLink = (link: string) => {
    window.location.href = link
  };

  const redirectToPaystack = async()=>{
    try{
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}pay/initiate/${reference}/`,
        {
          method: 'POST',
          body: JSON.stringify({email}),
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json()
      navigateToExternalLink(responseData?.data?.authorization_url)
      console.log(responseData);
      
    }catch(err){

    }
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="fixed flex items-center justify-center bottom-0 right-0 left-0 top-0 bg-[#0000006c] backdrop-blur-sm">
        {loading ? (
          <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed">
            <CgSpinner className=" text-6xl animate-spin text-[#2c698d]" />
          </div>
        ) : (
          <article className="bg-[#13161F] text-white w-[35%] rounded-md h-[70%] flex flex-col items-center justify-center py-4">
            {verified ? (
              <div className="flex flex-col justify-center text-center gap-y-5 py-2 ">
                <IoCheckmarkCircleOutline className="text-green-400 text-4xl mx-auto block" />
                <h3 className="font-bold">Payment Confirmation</h3>
                <div className="flex  justify-between items-center">
                  <span>Amount:</span>
                  <span>{amount}</span>
                </div>
                <div className="flex  justify-between items-center">
                  <span>Currency:</span>
                  <span>{currency}</span>
                </div>
                <div className="flex  justify-between items-center gap-x-2">
                  <span>Ref:</span>
                  <span>{reference}</span>
                </div>
                <input value={email} onChange={handleEmail} placeholder="Enter your email " className=" h-10 p-2 bg-[#0d0e14] mt-2 rounded-md focus:outline-none"/>

                <button
                  onClick={redirectToPaystack}
                  className=" p-2 bg-[#5856D6] text-white rounded-md"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center text-center gap-y-2">
                <FaCircleXmark className="text-red-400 text-3xl block mx-auto" />
                <h3>Verification Failed</h3>
                <p>{error || "An error occurred. Please try again."}</p>
                <button
                  onClick={redirectToLogin}
                  className="border p-1 bg-[#2c698d] text-white rounded-md"
                >
                  Try Again
                </button>
              </div>
            )}
          </article>
        )}
      </div>
    </Suspense>
  );
};

export default VerifyEmailPage;

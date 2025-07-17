"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import background from "@/src/assets/bg-black.png";
import { CiCircleCheck } from "react-icons/ci";
import logoWhite from "@/src/assets/logo-white.png";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  const blockExplorerUrl = currentParams.get("blockExplorerUrl");
  const callbackUrl = currentParams.get("callbackUrl");
  
  const [countdown, setCountdown] = useState(5);
  const [redirectCancelled, setRedirectCancelled] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);

  // Function to validate URL
  const validateUrl = (url:string) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      // Check if it's http or https protocol
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    // Validate callback URL on component mount
    if (callbackUrl) {
      setIsValidUrl(validateUrl(callbackUrl));
    }
  }, [callbackUrl]);

  useEffect(() => {
    if (!isValidUrl || redirectCancelled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && callbackUrl) {
          clearInterval(timer);
          // Redirect after countdown reaches 0
          window.location.href = callbackUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [callbackUrl, isValidUrl, redirectCancelled]);

  const handleCancelRedirect = () => {
    setRedirectCancelled(true);
    toast.success("Redirect cancelled");
  };

  const handleManualRedirect = () => {
    if (isValidUrl && callbackUrl) {
      window.location.href = callbackUrl;
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-black flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Payment Portal */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full mx-4 text-center border border-white/20">
          <div className="flex justify-center mb-6">
            <CiCircleCheck className="text-green-500 text-6xl" />
          </div>
          
          <h2 className="text-white text-2xl font-bold mb-4">
            Payment Successful!
          </h2>
          
          <p className="text-white/80 mb-6">
            Your transaction has been completed successfully.
          </p>
          
          {blockExplorerUrl && (
            <a
              href={blockExplorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 mb-6"
            >
              View on Mintscan
            </a>
          )}

          {/* Redirect Status */}
          {callbackUrl && (
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              {!isValidUrl ? (
                <p className="text-red-400 text-sm">
                  Invalid callback URL provided
                </p>
              ) : redirectCancelled ? (
                <div>
                  <p className="text-white/80 text-sm mb-3">
                    Redirect cancelled. You can redirect manually if needed.
                  </p>
                  <button
                    onClick={handleManualRedirect}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    Go to App
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-white/80 text-sm mb-3">
                    Redirecting to your app in {countdown} seconds...
                  </p>
                  <button
                    onClick={handleCancelRedirect}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    Cancel Redirect
                  </button>
                </div>
              )}
            </div>
          )}
          
          <button
            onClick={() => window.close()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 w-full"
          >
            Close
          </button>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm flex items-center gap-2">
          Powered By
          <Image src={logoWhite} alt="Logo" width={80} height={24} />
        </div>
      </div>
    </>
  );
};

export default Page;
"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, ArrowRight, RotateCw } from "lucide-react";
import background from "@/src/assets/bg-black.png";
import Image from "next/image";
interface ScreenGuardProps {
  children: React.ReactNode;
}

export default function ScreenGuard({ children }: ScreenGuardProps) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsAllowed(width >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isAllowed === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin">
          <RotateCw className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="flex items-center justify-center min-h-screen  p-6">
        <div className="absolute z-[-10] bottom-0 top-0 right-0 left-0">
        <Image
          src={background}
          alt="background"
          className="w-full lg:h-full h-[1000px] md:h-[1200px]  "
        />
      </div>
        <div className="max-w-md w-full text-center">
          <div className="bg-gray_primary rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Icon Animation */}
            <div className="flex justify-center items-center mb-6">
              <div className="relative">
                <Smartphone className="w-12 h-12 text-gray-400 animate-pulse" />
                <div className="absolute -right-6 top-3">
                  <ArrowRight className="w-6 h-6 text-gray-400 animate-bounce" />
                </div>
                <div className="absolute -right-14 top-1">
                  <Monitor className="w-16 h-16 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Desktop Required
            </h1>

            {/* Description */}
            <p className="text-gray-200 mb-6 leading-relaxed">
              This application is optimized for desktop viewing. Please switch to a larger screen 
              for the best experience.
            </p>

            {/* Requirements */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
                <Monitor className="w-4 h-4" />
                <span>Minimum width: 1024px</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-1">
                <span>Current width: {typeof window !== 'undefined' ? window.innerWidth : 0}px</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-white text-gray-950 py-3 px-6 rounded-lg  transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>Refresh Page</span>
              </button>
              
              <p className="text-xs text-gray-500">
                Or resize your browser window to at least 1024px width
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Having trouble? Try using a desktop computer or laptop
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
"use client";
import React from "react";
import ContextProvider from "../Context/context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./ReactQueryProvider";
import Spinner from "@/src/components/Spinner";
import Toast from "@/src/components/Toast";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Modal from "./app/dashboard/modal";

const ProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider>
       
          <ContextProvider>
          <Modal/>
            <section>
               <Spinner />
              <Toast />
              {children}
            </section>
          </ContextProvider>
      
      </SessionProvider>
    </ReactQueryProvider>
  );
};

export default ProviderWrapper;

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
import CreatePaymentLinkModal from "../components/Modals/CreatePaymentLinkModal";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";

import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";

const ProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const treasuryConfig = {
    treasury: "xion1pwvpjclmehz7zpc9zrh93l7ragyzve8g50k3jfrdkc8epvu9xwgqk59wcj",
    rpcUrl: "https://rpc.xion-testnet-2.burnt.com/",
    restUrl: "https://api.xion-testnet-2.burnt.com/",
  };

  return (
    <AbstraxionProvider config={treasuryConfig}>
      <ReactQueryProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <SessionProvider>
          <ContextProvider>
            <Modal />
            <CreatePaymentLinkModal />
            <section>
              <Spinner isDarkMode={true} />
              <Toast />
              {children}
            </section>
          </ContextProvider>
        </SessionProvider>
      </ReactQueryProvider>
    </AbstraxionProvider>
  );
};

export default ProviderWrapper;

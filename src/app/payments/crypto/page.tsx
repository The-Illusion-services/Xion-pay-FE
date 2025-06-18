"use client";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@burnt-labs/ui";
import { StdFee } from "@cosmjs/stargate";
import background from "@/src/assets/bg-black.png";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CreateContext } from "@/src/Context/context";
import { CiCircleCheck } from "react-icons/ci";
import { toast } from "sonner";
import { FaRegCircleXmark } from "react-icons/fa6";
import logoWhite from "@/src/assets/logo-white.png";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [, setShow] = useModal();
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  const { setIsLoading } = useContext(CreateContext).loader;
  const amount = currentParams.get("amount");
  const recipient = currentParams.get("holding_address");
  const reference = currentParams.get("reference");
  const [txnHash, setTxnHash] = useState("");

  const token = currentParams.get("token_type");
  const [errorMsg, setErrorMsg] = useState("");
  const { client: signingClient } = useAbstraxionSigningClient();
  const [blockExplorerUrl, setBlockExplorerUrl] = useState<string | null>(null);

  const handleSend = async () => {
    setIsLoading(true);
    if (!recipient || !amount) {
      setSendError("Please enter a recipient and an amount.");
      return;
    }
    if (!signingClient) {
      setSendError("Wallet not connected or signing client not available.");
      return;
    }

    setIsSending(true);
    setSendError(null);
    setSendSuccess(null);

    try {
      const denom =
        token === "XION"
          ? "uxion"
          : "ibc/6490A7EAB61059BFC1CDDEB05917DD70BDF3A611654162A1A47DB930D40D8AF4";
      const amountInDenom = (
        parseFloat(amount) * (token === "XION" ? 1_000_000 : 1_000_000)
      ).toString(); // Both uxion and USDC use 6 decimals
      const fee: StdFee | "auto" = "auto";
      const memo = `Sending ${token} from my dApp`;

      toast.success(`Starting transactions`);

      const result = await signingClient.sendTokens(
        bech32Address,
        recipient,
        [{ denom, amount: amountInDenom }],
        fee,
        memo
      );

      setSendSuccess(
        // console.log(result.transactionHash)
        `Successfully sent funds! TxHash: ${result.transactionHash}`
      );

      toast.success(`Successfully sent funds!`);
      setBlockExplorerUrl(
        `https://www.mintscan.io/xion-testnet/tx/${sendSuccess?.split(": ")[1]}`
      );
      // console.log(sendSuccess?.split(": ")[1])
      updatePaymentStatus("completed");
    } catch (error: any) {
      setSendError(
        error.message || "An unexpected error occurred while sending funds."
      );
      if (error?.message.includes("insufficient funds")) {
        setErrorMsg("Insufficient balance");
        updatePaymentStatus("failed");
        router.push(`/payments/failed?error=insufficient funds`);
        return;
      } else {
        updatePaymentStatus("failed");
        router.push(`/payments/failed`);
        return;
      }
    } finally {
      setIsSending(false);
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (status: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/update-status/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            reference,
            status,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      toast.success("Payment status updated");

      router.push(
        `/payments/success?blockExplorerUrl=https://www.mintscan.io/xion-testnet/tx/${txnHash}`
      );
    } catch (err) {
      toast.error("Failed to update payment status");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!bech32Address) {
      setShow(true);
    } else if (bech32Address && signingClient) {
      handleSend();
    }
  }, [bech32Address, signingClient]);

  return (
    <main className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      <div className="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-md text-white mt-8 flex-col gap-y-4">
        {/* <span className="text-4xl font-bold text-white">Payment Portal</span> */}
        {/* {sendError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <FaRegCircleXmark className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Payment Failed
                </h2>
                <p className="text-white_primary mb-6">{errorMsg}</p>
                <button
                  className="bg-red-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-600 transition transform hover:-translate-y-1"
                  // onClick={closeModal}
                >
                  <a href={"about:blank"}>Close</a>
                </button>
              </div>
            </div>
          </div>
        )} */}
        {/* {sendSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <CiCircleCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Payment Successful!
                </h2>
                <p className="text-white_primary mb-6">
                  Your transaction has been completed successfully. Please do{" "}
                  not refresh the page.
                </p>
                {blockExplorerUrl && (
                  <a
                    href={blockExplorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 underline  block mb-3"
                  >
                    View on Mintscan
                  </a>
                )}
                <button
                  className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition "
                  // onClick={closeModal}
                >
                  <a href={"about:blank"}>Close</a>
                </button>
              </div>
            </div>
          </div>
        )} */}
        <Abstraxion onClose={() => setShow(false)} />
        <div className="absolute z-[-10] bottom-0 top-0 right-0 left-0">
          <Image
            src={background}
            alt="background"
            className="w-full lg:h-full h-[1000px] md:h-[1200px]  "
          />
        </div>
        <div className="flex items-center justify-center w-full ">
          <span className="text-white">Powered By</span>
          <Image
            src={logoWhite}
            alt="logo-white"
            className="w-[100px] h-[50px]"
          />
        </div>
      </div>
    </main>
  );
};
export default Page;

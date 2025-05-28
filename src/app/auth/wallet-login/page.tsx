"use client";
import React, { useState } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  // Abstraxion hooks
  const { data: session } = useSession();
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  const { client, signArb } = useAbstraxionSigningClient();
  const [result, setResult] = useState("");

  const arbitraryMessage = `Welcome to ${
    window.location.hostname
  }!\n\nSign this message to authenticate.\n\nTimestamp: ${Date.now()}`;

  // General state hooks
  const [, setShow] = useModal();

  // watch isConnected and isConnecting
  // only added for testing
  // useEffect(() => {
  //   console.log({ isConnected, isConnecting });
  // }, [isConnected, isConnecting])

  const verifyArbitraryMessage = async (signature: string | undefined) => {
    // const payload = {
    //   address: client?.granteeAddress,
    //   message: arbitraryMessage,
    //   signature
    // };
    // console.log(payload);
    const granteeAccountData = await client?.getGranteeAccountData();

  if (!granteeAccountData) return false;

  const userSessionAddress = granteeAccountData.address;
  const userSessionPubKey = Buffer.from(granteeAccountData.pubkey).toString(
    "base64",
  );
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/verify-signature/`,
        {
          method: "POST",
          body: JSON.stringify({
            address: client?.granteeAddress,
            message: arbitraryMessage,
            signature,
            pubkey: userSessionPubKey
          }),
          headers: {
            "Content-Type": "application/json"
            // authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      console.log(responseData);

      return responseData;
    } catch (err) {
      console.log(err);
    }
  };

  // const {
  //   data: balanceObj,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: [""],
  //   queryFn: verifyArbitraryMessage,
  // });

  async function handleSign(): Promise<void> {
    if (client?.granteeAddress) {
      const response = await signArb?.(client?.granteeAddress, arbitraryMessage);

      if (response) {
        setResult(response);
        verifyArbitraryMessage(response);
      }
    }
  }

  // console.log(result)

  return (
    <main className="m-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
        Abstraxion
      </h1>
      <Button
        fullWidth
        onClick={() => {
          setShow(true);
        }}
        structure="base"
      >
        {bech32Address ? (
          <div className="flex items-center justify-center">VIEW ACCOUNT</div>
        ) : (
          "CONNECT"
        )}
      </Button>
      {bech32Address && (
        <div className="border-2 border-primary rounded-md p-4 flex flex-row gap-4">
          <div className="flex flex-row gap-6">
            <div>address</div>
            <div>{bech32Address}</div>
          </div>
        </div>
      )}
      <Abstraxion onClose={() => setShow(false)} />
      {bech32Address && client?.granteeAddress && (
        <button onClick={handleSign}>Sign Arbitrary Message</button>
      )}
    </main>
  );
}

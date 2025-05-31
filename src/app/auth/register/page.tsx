"use client";

import { AuthLayout } from "@/src/components/layouts";
import React, { FC, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { motion, AnimatePresence, isMotionComponent } from "framer-motion";

import { Label } from "@/src/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/src/hooks";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { CreateContext } from "@/src/Context/context";
import Image from "next/image";
import authBg from "@/src/assets/auth-pages-bg.png";
import authBgMain from "@/src/assets/auth-pages-bg-main.png";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .regex(/^\S+$/, { message: "email cannot contain whitespace." }),
    password: z
      .string()
      .min(1, {
        message: "password must be at least 1 character.",
      })
      .regex(/^\S+$/, { message: "password cannot contain whitespace." }),
  })
  .required();

let title = "Log In";

const Page: FC = () => {
  const { setIsLoading } = useContext(CreateContext).loader;
  const { data: session, status } = useSession();
  const router = useRouter();
  const { updateUser } = useAuthToken();
  const { client, signArb } = useAbstraxionSigningClient();

  // Add state to track signing process and prevent duplicates
  const [isSigningInProgress, setIsSigningInProgress] = useState(false);
  const [hasAttemptedSign, setHasAttemptedSign] = useState(false);
  const [result, setResult] = useState("");

  const arbitraryMessage = `Welcome to ${
    window.location.hostname
  }!\n\nSign this message to authenticate.\n\nTimestamp: ${Date.now()}`;

  const [, setShow] = useModal();
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  // Optimized verify function with error handling
  const verifyArbitraryMessage = async (signature: string | undefined) => {
    setIsLoading(true)
    if (!signature || !client) return false;

    setIsSigningInProgress(true);

    try {
      const granteeAccountData = await client.getGranteeAccountData();
      if (!granteeAccountData) {
        console.error("No grantee account data available");
        return false;
      }

      const userSessionPubKey = Buffer.from(granteeAccountData.pubkey).toString(
        "base64"
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/verify-signature/`,
        {
          method: "POST",
          body: JSON.stringify({
            address: client.granteeAddress,
            message: arbitraryMessage,
            signature,
            pubkey: userSessionPubKey,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Verification failed: ${response.status}`);
      }

      const responseData = await response.json();
      const {
        access: access_token,
        user_id,
        refresh: refresh_token,
      } = responseData;

      if (access_token) {
        const signInResponse = await signIn("xion-abstraction", {
          redirect: false,
          access_token,
          user_id,
          refresh_token,
        });

        if (signInResponse?.ok) {
          router.push("/app/dashboard");
          return responseData;
        } else {
          throw new Error("Sign in failed");
        }
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Authentication failed. Please try again.");
      // Reset states to allow retry
      setHasAttemptedSign(false);
    } finally {
      setIsSigningInProgress(false);
    setIsLoading(false)

    }

    return false;
  };

  // Optimized sign handler with duplicate prevention
  const handleSign = async (
    granteeAddress: string
  ): Promise<void> => {
    // Prevent multiple simultaneous signing attempts
    if (isSigningInProgress || hasAttemptedSign) {
      console.log("Sign operation already in progress or completed");
      return;
    }

    if (!client?.granteeAddress) {
      console.error("No grantee address available");
      return;
    }

    setHasAttemptedSign(true);

    try {
      const response = await signArb?.(granteeAddress, arbitraryMessage);
      if (response) {
        setResult(response);
        await verifyArbitraryMessage(response);
      }
    } catch (error) {
      console.error("Signing error:", error);
      setHasAttemptedSign(false); // Reset on error to allow retry
    }
  };

  // Optimized useEffect with better condition checking
  useEffect(() => {
    // Skip if already authenticated
    if (session?.user?.accessToken) {
      console.log("User already authenticated");
      return;
    }

    // Skip if not connected or signing in progress
    if (!isConnected || isSigningInProgress || hasAttemptedSign) {
      return;
    }

    // Only proceed if we have a grantee address and no existing session
    if (client?.granteeAddress) {
      console.log("Initiating sign process");
      console.log("sign");
      handleSign(client?.granteeAddress);
    }
  }, [
    isConnected,
    client?.granteeAddress,
    // session?.user?.accessToken,
    // isSigningInProgress,
    // hasAttemptedSign
  ]);

  // Separate useEffect for navigation logic
  useEffect(() => {
    if (status === "loading") return;

    const lastVisitedPage = localStorage.getItem("xion-pay-lastVisitedPage");

    if (status === "authenticated") {
      const destination = lastVisitedPage || "/app/dashboard";
      router.push(destination);
    }
  }, [status, router]);

  // Reset signing state when disconnected
  useEffect(() => {
    if (!isConnected) {
      setHasAttemptedSign(false);
      setIsSigningInProgress(false);
    }
  }, [isConnected]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Ensures validation checks on each change
  });

  if (status !== "authenticated") {
    return (
      // <AuthLayout title={title}>
      <main
        className="h-full lg:w-full w-screen flex lg:flex-row flex-col capitalize bg-black min-h-screen justify-center"
        style={{
          backgroundImage: `url(${authBgMain.src})`,
          backgroundSize: "cover", // Makes the image fit while covering the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition
        }}
      >
        <div className="lg:w-[50%]  gap-y-8 hidden lg:flex flex-col items-center justify-center">
          <Image
            src={authBg}
            alt="auth-pages-background"
            height={20}
            width={600}
            className="max-h-[95vh] absolute z-10"
          />
          <h2 className="text-3xl font-bold z-20 relative text-white">
            Simplifying Payments, Securing <br /> Transactions
          </h2>
          <p className="text-white z-10 relative px-[100px] font-thin">
            BurntPay empowers businesses and individuals with fast, borderless
            blockchain transactions. Create payment links, manage escrow, and
            store sensitive credentials securely—no complicated setup required.
            Get started in minutes!
          </p>
        </div>
        <div className="flex flex-col h-screen w-full lg:w-[50%] items-center justify-center ">
          <Card className="lg:w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white items-center justify-center">
            <CardHeader className="p-0 text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="pb-4 text-border-secondary">
                Sign in to acccess your account
              </CardDescription>
              
            </CardHeader>
 
            <CardContent className="p-0 flex flex-col gap-y-5 lg:w-full w-[100%]">
              <Button
                onClick={() => setShow(true)}
                className="bg-white text-black lg:w-full"
              >
                Log In{" "}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Abstraxion onClose={() => setShow(false)} />
      </main>
      // </AuthLayout>
    );
  } else {
    return null;
  }
};

export default Page;

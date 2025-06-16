"use client";
import background from "@/src/assets/bg-black.png";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import logoWhite from "@/src/assets/logo-white.png";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CreateContext } from "@/src/Context/context";
const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  const [paymentStatus, setPaymentStatus] = useState("");
  const amount = currentParams.get("amount");
  const recipient = currentParams.get("holding_address");
  const token = currentParams.get("token_type");
  const reference = currentParams.get("reference");
  const [hasLoaded, setHasLoaded] = useState(false);

  const fiatUrl = currentParams.get("fiat_url");
  const { setIsLoading } = useContext(CreateContext).loader;

  const getRefStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/verify/${reference}`,
        {
          headers: {
            "Content-Type": "application-json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("");
      }
      const responseData = await response.json();

      return responseData;
    } catch (err: any) {
      console.log("an error occured");
      return err.message;
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  const {
    data: refStatus,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-reference-status"],
    queryFn: getRefStatus,
    enabled: !!reference,
  });

  useEffect(() => {
    if (refStatus?.data?.payment_status) {
      setPaymentStatus(refStatus?.data?.payment_status);
    }
  }, [refStatus?.data?.payment_status]);
  return (
    <main className="h-screen flex  items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      {/* <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}></Navbar> */}
      <div className="absolute z-[-10] bottom-0 top-0 right-0 left-0">
        <Image
          src={background}
          alt="background"
          className="w-full lg:h-full h-[1000px] md:h-[1200px]  "
        />
      </div>
      <section className="flex flex-col justify-between items-center gap-y-20">
        <div className="flex flex-col text-center">
          <span className="text-white text-5xl font-bold">Welcome.</span>
          <span className="text-white text-2xl">
            Please choose an option to continue your payment.
          </span>
        </div>
        <div className="flex justify-between gap-x-10">
          <a
            href={
              fiatUrl && hasLoaded && paymentStatus !== "expired"
                ? fiatUrl
                : undefined
            }
          >
            <button
              onClick={() => {
                !fiatUrl && toast.error("Invalid or no fiat url");
                if (paymentStatus === "expired") {
                  toast.error(
                    "Payment reference expired, please initialize a new one"
                  );

                  return;
                }
              }}
              className=" px-4 h-10  rounded-lg bg-white text-black"
            >
              Pay with Fiat
            </button>
          </a>
          <button
            onClick={() => {
              if (!token || !recipient || !hasLoaded) {
                toast.error("No or invalid tokens");
                return;
              }

              if (
                (paymentStatus === "pending" ||
                  paymentStatus === "initialized") &&
                hasLoaded
              ) {
                router.push(
                  `/payments/crypto?amount=${amount}&holding_address=${recipient}&token_type=${token}&reference=${reference}`
                );
              } else {
                toast.error(
                  "Payment reference expired, please initialize a new one"
                );
              }
            }}
            className=" px-4 h-10  rounded-lg bg-white text-black"
          >
            Pay with Crypto
          </button>
        </div>
        <div className="flex items-center justify-center w-full ">
          <span className="text-white">Powered By</span>
          <Image
            src={logoWhite}
            alt="logo-white"
            className="w-[100px] h-[50px]"
          />
        </div>
      </section>
    </main>
  );
};

export default Page;

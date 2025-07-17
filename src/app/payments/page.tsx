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
import { FaRegCircleXmark } from "react-icons/fa6";
const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  const [paymentStatus, setPaymentStatus] = useState("");
  const amount = currentParams.get("amount");
  const cryptoAmount = currentParams.get("crypto_amount");
  const callbackUrl = currentParams.get("callback_url");


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
      if (
        refStatus?.data?.payment_status !== "pending" &&
        refStatus?.data?.payment_status !== "initialized"
      ) {
        setShowErrorModal(true);
      }
    }
  }, [refStatus?.data?.payment_status]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const FailedModal = () => {
    return (
      <>
        <main className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-0 p-4 flex-col gap-y-10">
            {/* <Image src={logoWhite} alt="logo-white" className="w-[10%] h-[10%]" /> */}
            {/* <span className="text-4xl font-bold text-white">Payment Portal</span> */}
            <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <FaRegCircleXmark className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Payment Processing Failed
                </h2>
                <p className="text-white_primary mb-6">
                  Payment Link Expired Or Failed Please Reinitialize Payment.
                </p>
                <button
                  className="bg-red-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-600 transition transform hover:-translate-y-1"
                  onClick={() => setShowErrorModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  };
  return (
    <main className="h-screen flex  items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      {showErrorModal && <FailedModal />}
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
              fiatUrl &&
              hasLoaded &&
              (paymentStatus === "pending" || paymentStatus === "initialized")
                ? fiatUrl
                : undefined
            }
          >
            <button
              onClick={() => {
                !fiatUrl && toast.error("Invalid or no fiat url");
                if (
                  paymentStatus !== "pending" &&
                  paymentStatus !== "initialized" &&
                  hasLoaded
                ) {
                  toast.error(
                    "Payment reference expired or failed, please initialize a new one"
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
                  `/payments/crypto?amount=${cryptoAmount}&holding_address=${recipient}&token_type=${token}&reference=${reference}&callbackUrl=${callbackUrl}`
                );
              } else {
                toast.error(
                  "Payment reference expired or failed, please initialize a new one"
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

"use client";
import React, {useContext} from "react";
import { CreateContext } from "@/src/Context/context";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {toast} from "sonner"
import { IoCopyOutline } from "react-icons/io5";
const ApiandWebhooks = () => {
  const {setIsLoading} = useContext(CreateContext).loader;
  const { data: session } = useSession();
  const getApiKey = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/api-keys/`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
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
  const {
    data: apiKey,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-api-key"],
    queryFn: getApiKey,
    enabled: !!session?.user?.accessToken,
  });
  // console.log(apiKey);

  const generateApiKey = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/api-keys/create/`,
        {
          method: "POST",
          body: JSON.stringify({ description: "" }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        if (responseData.error === "You already have an active API key.") {
          throw new Error(responseData.error);
        }
        throw new Error("An error occured");
      }
      // setModalMsg(responseData)
      setIsLoading(false);
      // setPaymentLink(false);
      // setMsg(` ${responseData.key}`);
      // setShowModal(true);
      // console.log(responseData);
      toast.error("Api Key Generated!");

    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const copyText = (msg: string) => {
    const text = msg;
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Text copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <article className="mt-4 w-[50%]">
      <span className="text-2xl font-bold">API Configuration</span>

      <form className="flex flex-col mt-8 w-full gap-y-6">
        {/* <div className="flex flex-col w-full">
          <label>Test Secret Key</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Test Public Key</label>
          <input
            placeholder="Enter email address"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Test Callback URL</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div> */}
        <div className="flex flex-col w-full">
          <label>Api key</label>
          {/* <input
            placeholder="Enter Full name"
            value={}
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          /> */}
          <div className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F] flex flex-row items-center gap-x-2">
            {apiKey?.length >= 1 && apiKey[0]?.key}
            <IoCopyOutline className="cursor-pointer" onClick={()=> copyText(apiKey[0]?.key)}/>
          </div>
        </div>
        {apiKey?.length <  1 && (
          <button onClick={generateApiKey} className="py-3 px-4 w-fit bg-white text-black block  rounded-md">
            Generate Api Key
          </button>
        )}
      </form>
    </article>
  );
};

export default ApiandWebhooks;

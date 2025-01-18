"use client";
import React, { useState, useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import Topbar from "@/src/components/Topbar";
import { IoEyeOffOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";
const Page = () => {

  // const getBalance = async()=>{
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}get-wallet-balance/`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${session?.user?.accessToken}`,
  //         },
  //       }
  //     );
  //     const responseData = await response.json();
  //     // setModalMsg(responseData)
  //     console.log(responseData);
      
  //    return responseData
      
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // const {data: balance, error, isLoading} = useQuery({
  //   queryKey: ["get-balance"],
  //   queryFn: getBalance
  // })

  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const { data: session } = useSession();

  const [modalMsg, setModalMsg] = useState("");
  const { msg, setMsg, setShowModal, showModal } =
  useContext(CreateContext).modal;
  const {paymentLink, setPaymentLink} = useContext(CreateContext)


  const generatePaymentLink = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/create-link/`,
        {
          method: "POST",
          body: JSON.stringify({ email, amount }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      setPaymentLink(true)
      setMsg(` ${responseData.payment_link}`)
      setShowModal(true)
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  const generateApiKey = async(e: any)=>{
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api-keys/create/`,
        {
          method: "POST",
          body: JSON.stringify({ description: ""}),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      setPaymentLink(false)
      setMsg(` ${responseData.key}`)
      setShowModal(true)
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };


  return (
    <>
  
    <main className="">
      <Topbar />
      <section className="mt-20 px-4">
        <div className="flex flex-row  items-center gap-x-2">
          <h1 className="text-sm text-[#AAAAAA] font-light">Total Balance</h1>
          <IoEyeOffOutline className="text-[#AAAAAA]" />
        </div>

        <article className="text-white  relative  justify-between flex items-center mt-2">
          <div className="">
            <span className="font-bold text-4xl">$20,983</span>
          </div>

          <div>
            <button className="p-2 px-4  rounded-md bg-[#5856D6]">
              {" "}
              + Top Up{" "}
            </button>
          </div>
        </article>
        <section className="flex gap-x-4 justify-center mt-10">
          <form className="w-[30%] border p-2 rounded-md">
            <div className="flex flex-col w-full">
              <label>Email address</label>
              <input
                placeholder="Enter email address"
                value={email}
                onChange={handleEmailChange}
                className="focus:outline-none h-10 p-2 bg-[#13161F] mt-2 rounded-md text-white"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Amount</label>
              <input
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                className="focus:outline-none h-10 p-2 bg-[#13161F] mt-2 rounded-md text-white"
              />
            </div>
            <button
              className="p-2 px-4 block mx-auto rounded-md bg-[#5856D6] mt-5 text-white"
              onClick={generatePaymentLink}
            >
              {" "}
              Generate payment link{" "}
            </button>
          </form>

          <form className="w-[30%] flex items-center border p-2 rounded-md">
           
            <button
              className="p-2 px-4 block mx-auto rounded-md bg-[#5856D6] mt-5 text-white"
              onClick={generateApiKey}
            >
              {" "}
              Generate api key{" "}
            </button>
          </form>
        </section>
      </section>
    </main>
    </>

  );
};

export default Page;

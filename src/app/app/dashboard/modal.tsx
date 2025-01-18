"use client";
import React, { useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import { HiXCircle } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

const Modal = () => {


  
  const { msg, setMsg, setShowModal, showModal } =
    useContext(CreateContext).modal;
    const {paymentLink, setPaymentLink} = useContext(CreateContext)


    const copyText = () => {
      const text = msg;
      navigator.clipboard.writeText(text)
        .then(() => alert("Text copied to clipboard!"))
        .catch(err => console.error("Failed to copy text: ", err));
    };

  if (showModal) {
    return (
      <main className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center z-20 backdrop-blur-sm">
        <section className="w-[25%] h-[40%] bg-[#13161F] text-white flex flex-col justify-between py-6 items-center">
          {paymentLink ? 
        <span> Here's your payment link</span>  : <span>Here's your api key</span>
        }
        <div className="flex items-center p-1 bg-[#0c0e13] px-4">

          <span className="text-sm text-center ">{msg.slice(0, 30)}...</span>
          <IoCopyOutline className="cursor-pointer" onClick={copyText}/>
        </div>

          <button
            className="p-1 px-4 bg-[#5856D6] mx-auto block rounded-md cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </section>
      </main>
    );
  }
};

export default Modal;

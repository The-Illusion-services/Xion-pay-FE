"use client";
import React, { useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import { FaXmark } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import { useQuery } from "@tanstack/react-query";
type InitialValues = {
  currency: string;
  amount: string;
  tokenType: string;
  xionAddress: string;
};
const CreatePaymentLinkModal = () => {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const { paymentLink, setPaymentLink, modal } = useContext(CreateContext);
  const { setMsg, setShowModal } = modal;
  const { data: session } = useSession();
  const { showPaymentLinkModal, setShowPaymentLinkModal } =
    useContext(CreateContext).modal;
  const { setIsLoading } = useContext(CreateContext).loader;
  const initialValues = {
    currency: "",
    amount: "",
    tokenType: "",
    xionAddress: "",
  };
  const validationSchema = Yup.object({
    currency: Yup.string().required(),
    amount: Yup.string().required(),
    tokenType: Yup.string().required("token type is required"),
    xionAddress: Yup.string().notRequired(),
  });

  const handleCloseModal = () => {
    setShowPaymentLinkModal(false);
  };


  // const initiatePayment = async()=>{
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/initialize-payment/`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           currency,
  //           amount,
  //           token_type,
  //           xion_address: bech32Address,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${session?.user?.accessToken}`,
  //         },
  //       }
  //     );
  //     const responseData = await response.json();
  //     // setModalMsg(responseData)
  //     if (!response.ok) {
  //       throw new Error("");
  //     }

  //     setIsLoading(false);
  //     // setPaymentLink(true);
  //     setShowPaymentLinkModal(false);
  //     setMsg(` ${responseData.payment_link}`);
  //     setShowModal(true);
  //     console.log(responseData);
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.log(err);
  //   }
  // }

  if (showPaymentLinkModal) {
    return (
      <main className="fixed flex top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-[#00000060] z-40 items-center justify-center">
        <section className="w-[40%] h-[60%] py-2 bg-gray_primary rounded-lg px-8 text-white_primary flex  flex-col justify-center">
          <div className="flex items-center justify-between">
            <span>Create Payment Link</span>
            <FaXmark onClick={handleCloseModal} className="cursor-pointer" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={()=> {}}
          >
            {({ setFieldValue, values }) => (
              <Form className="border-t w-full flex flex-col gap-y-2 py-6">
                <div className="flex flex-col  w-[70%] gap-y-2">
                  <label>Amount</label>
                  <Field
                    name="amount"
                    type="text"
                    className="bg-transparent border w-full border-[#474747] rounded-md px-2 py-2"
                  />
                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="amount" />}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col w-[40%] gap-y-2">
                    <label>Currency</label>
                    <Field
                      name="currency"
                      as="select"
                      className="bg-transparent border w-full border-[#474747] rounded-md py-2 cursor-pointer"
                    >
                      <option value="">Select</option>

                      <option className="text-gray_primary" value="GBP">
                        GBP
                      </option>
                      <option className="text-gray_primary" value="NGN">
                        NGN
                      </option>
                      <option className="text-gray_primary" value="USD">
                        USD
                      </option>
                    </Field>
                    <span className="text-red-500 text-xs">
                      {<ErrorMessage name="currency" />}
                    </span>
                  </div>
                  <div className="flex flex-col w-[40%] gap-y-2">
                    <label>Token type</label>
                    <Field
                      name="tokenType"
                      as="select"
                      className="bg-transparent border w-full border-[#474747] rounded-md py-2 cursor-pointer"
                    >
                      <option value="">Select</option>

                      <option className="text-gray_primary" value="USDC">
                        USDC
                      </option>
                      <option className="text-gray_primary" value="XION">
                        XION
                      </option>
                    </Field>
                    <span className="text-red-500 text-xs">
                      {<ErrorMessage name="tokenType" />}
                    </span>
                  </div>
                </div>

                {/* <div className="flex flex-col gap-y-2">
                  <label>Xion Address</label>
                  <Field
                    name="email"
                    type="text"
                    className="border rounded-md bg-transparent border-[#474747] px-2"
                  />
                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="email" />}
                  </span>
                </div> */}

                <div className="flex gap-x-2 justify-end items-center pt-6">
                  <button className="py-2 px-4 text-sm rounded-lg border">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 text-sm  rounded-lg bg-white text-black"
                  >
                    Create Payment Link
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    );
  }
};

export default CreatePaymentLinkModal;

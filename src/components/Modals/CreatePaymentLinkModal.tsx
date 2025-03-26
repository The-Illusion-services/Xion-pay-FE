"use client";
import React, { useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import { FaXmark } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";

type InitialValues = {
  currency: string;
  amount: string;
  email: string;
  expirationDate: string;
  reason: string;
  date: string;
};
const CreatePaymentLinkModal = () => {
  const { paymentLink, setPaymentLink, modal } = useContext(CreateContext);
  const { setMsg, setShowModal } = modal;
  const { data: session } = useSession();
  const { showPaymentLinkModal, setShowPaymentLinkModal } =
    useContext(CreateContext).modal;
  const { setIsLoading } = useContext(CreateContext).loader;
  const initialValues = {
    currency: "",
    amount: "",
    email: "",
    expirationDate: "",
    reason: "",
    date: "",
  };
  const validationSchema = Yup.object({
    currency: Yup.string().notRequired(),
    amount: Yup.string().required(),
    email: Yup.string().email().required(),
    expirationDate: Yup.string().notRequired(),
    reason: Yup.string().notRequired(),
  });

  const handleCloseModal = () => {
    setShowPaymentLinkModal(false);
  };
  const generatePaymentLink = async (values: InitialValues) => {
    const { email, amount } = values;

    try {
      setIsLoading(true);
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
      if (!response.ok) {
        throw new Error("");
      }

      setIsLoading(false);
      setPaymentLink(true);
      setShowPaymentLinkModal(false);
      setMsg(` ${responseData.payment_link}`);
      setShowModal(true);
      console.log(responseData);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  if (showPaymentLinkModal) {
    return (
      <main className="fixed flex top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-[#00000060] z-40 items-center justify-center">
        <section className="w-[40%] h-[90%] py-2 bg-gray_primary rounded-lg px-8 text-white_primary flex  flex-col justify-center">
          <div className="flex items-center justify-between">
            <span>Create Payment Link</span>
            <FaXmark onClick={handleCloseModal} className="cursor-pointer" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => generatePaymentLink(values)}
          >
            {({ setFieldValue, values }) => (
              <Form className="border-t w-full flex flex-col gap-y-2">
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col w-[20%] gap-y-2">
                    <label>Currency</label>
                    <Field
                      name="currency"
                      type="text"
                      className="bg-transparent border w-full border-[#474747] rounded-md"
                    />
                    <span className="text-red-500 text-xs">
                      {<ErrorMessage name="currency" />}
                    </span>
                  </div>
                  <div className="flex flex-col  w-[70%] gap-y-2">
                    <label>Amount</label>
                    <Field
                      name="amount"
                      type="text"
                      className="bg-transparent border w-full border-[#474747] rounded-md px-2"
                    />
                    <span className="text-red-500 text-xs">
                      {<ErrorMessage name="amount" />}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label>Email Address</label>
                  <Field
                    name="email"
                    type="text"
                    className="border rounded-md bg-transparent border-[#474747] px-2"
                  />
                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="email" />}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 border-[#474747]">
                  <label>Expiration Date</label>
                  {/* <DemoItem label="Responsive variant"> */}
                  <input
                    name="date"
                    type="date"
                    className="bg-transparent border-[#474747] border rounded-md "
                  />
                  {/* </DemoItem> */}
                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="date" />}
                  </span>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label>Payment Reason</label>
                  <Field
                    name="reason"
                    type="text"
                    className="border rounded-md bg-transparent border-[#474747] px-2"
                  />
                  <span className="text-red-500 text-xs">
                    {<ErrorMessage name="reason" />}
                  </span>
                </div>
                <div className="flex gap-x-2 justify-end items-center">
                  <button className="py-2 px-4 text-sm rounded-lg border">
                    Cancel
                  </button>
                  <button className="py-2 px-4 text-sm  rounded-lg bg-white text-black">
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

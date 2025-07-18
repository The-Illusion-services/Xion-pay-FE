"use client";
import React, { useState, useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import logoWhite from "@/src/assets/logo-white.png";
import Image from "next/image";
import { toast } from "sonner";
import { Loader, Router } from "lucide-react";
import background from "@/src/assets/bg-black.png";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const { setIsLoading } = useContext(CreateContext).loader;
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString());
  const reference = currentParams.get("reference");
  const callbackUrl = currentParams.get("callback_url");

  const initialValues = {
    novypay_token: "",
    pin: "",
  };

  const schema = Yup.object().shape({
    novypay_token: Yup.string().max(255).required("Novy pay token is required"),
    pin: Yup.string()
      .matches(/^\d{4}$/, "Pin must be exactly 4 digits")
      .required("Pin is required"),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);

    try {
      // Your submission logic here
      console.log("Form submitted with values:", values);
      console.log("Reference:", reference);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/cards/pay/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            novypay_token: values.novypay_token,
            pin: values.pin,
            reference: reference,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Submission failed");
      }

      // Handle successful submission
      toast.success("Transaction successful!");
      router.push(`/payments/success?callbackUrl=${result.callback_url}`);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-zinc-800">
      <div className="absolute z-[-10] bottom-0 top-0 right-0 left-0">
        <Image
          src={background}
          alt="background"
          className="w-full lg:h-full h-[1000px] md:h-[1200px]  "
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors }) => (
          <Form className="bg-gray_primary w-[30%] h-[75vh] p-10 rounded-lg flex flex-col justify-between">
            <h2 className="text-center text-white_primary text-2xl font-bold">
              Card Payment
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Novy Pay token
                </label>
                <div className="relative">
                  <Field
                    name="novypay_token"
                    type="text"
                    placeholder="novypay_token:1ad822..."
                    maxLength={255}
                    className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white_primary focus:border-transparent transition-all ${
                      touched.novypay_token && errors.novypay_token
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="novypay_token"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">PIN</label>
                <div className="relative">
                  <Field
                    name="pin"
                    type="password"
                    placeholder="Enter 4-digit PIN"
                    maxLength={4}
                    className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white_primary focus:border-transparent transition-all ${
                      touched.pin && errors.pin
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="pin"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-gray-900 transition-all ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-white_primary hover:bg-white_primary/90 focus:outline-none focus:ring-2 focus:ring-white_primary focus:ring-offset-2 focus:ring-offset-gray_primary"
                }`}
              >
                {isSubmitting ? (
                  <Loader
                    size={24}
                    className="animate-spin mx-auto"
                    color="black"
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            <div className="flex items-center justify-center w-full ">
              <span className="text-white">Powered By</span>
              <Image
                src={logoWhite}
                alt="logo-white"
                className="w-[130px] h-[50px]"
              />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Page;

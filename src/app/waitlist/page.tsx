"use client";
import React, { useState } from "react";
import HeroImg from "@/src/assets/payment-link2.png";
import Image from "next/image";
import { Check, ArrowRight, Link, Key } from "lucide-react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      <section className="flex w-full justify-between lg:px-20 px-4">
        <div className="flex flex-col items-start justify-center h-screen w-full max-w-xl px-6 ">
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">
                Join the waitlist
              </h1>
              <p className="text-lg text-[#5856D6]">
                Be among the first to experience seamless payment processing
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#5856D6" }}
                >
                  <Link className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: "#5856D6" }}>
                    Payment Links
                  </h3>
                  <p className="text-sm text-white">
                    Generate instant payment links for your customers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#5856D6" }}
                >
                  <Key className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: "#5856D6" }}>
                    API Access
                  </h3>
                  <p className="text-sm text-white">
                    Integrate payments directly into your applications
                  </p>
                </div>
              </div>
            </div>

            <section className="border-0 shadow-lg">
              <article className="p-6">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white p-2 transition-transform hover:scale-105 delay-50"
                      style={{ backgroundColor: "#5856D6" }}
                    >
                      Join Waitlist
                      {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-3">
                    <div
                      className="flex items-center justify-center w-12 h-12 mx-auto rounded-full"
                      style={{ backgroundColor: "#5856D6" }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      You're on the list!
                    </h3>
                    <p className="text-sm text-gray-600">
                      We'll notify you when we launch. Thanks for your interest!
                    </p>
                  </div>
                )}
              </article>
            </section>
          </div>
        </div>
        <section className="w-[50%] hidden lg:block">
        <Image src={HeroImg} alt="HeroImg" height={700} width={700} />
        </section>
      </section>
    </>
  );
};

export default Page;

"use client";
import React, { useState, useEffect } from "react";
import background from "@/src/assets/bg-black.png"
import users from "@/src/assets/users.png";
import {Link } from "lucide-react";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "@/src/components/Navbar";
import apiAccess from "@/src/assets/api-access.png"

const Page = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <main
        className={`lg:px-20 flex flex-col justify-between h-fit py-12  gap-y-16  ${
          isDarkMode ? "text-[#EEEEEE] " : "text-[#101012]"
        }`}
        // style={{backgroundImage: url()}}
      >
        <div className={`${isDarkMode ? "flex" : "hidden"} absolute z-[-10] bottom-0 top-0 right-0 left-0`}>
          <Image src={background} alt="background" className="w-full lg:h-full h-[1000px] md:h-[1200px]"/>
        </div>
        <section className="flex flex-col items-center gap-y-6 w-[80%] lg:w-[60%] mx-auto pt-8" data-aos="fade-in"
            data-aos-easing="ease-out"
            data-aos-duration="1200"
            data-aos-once="true">
          <div className="text-center leading-8">
            <span className="text-2xl lg:text-[40px] font-bold">
              Be among the first to experience <br className="hidden lg:flex" />{" "}
              next-gen crypto payments!
            </span>
          </div>
          <div className="text-center text-sm font-light">
            <p>
              Seamless, secure, and borderless transactions—experience the
              future of Web3 payments <br className="hidden lg:flex" /> before
              anyone else. Join the waitlist today!
            </p>
          </div>

          <article className="w-full flex flex-col gap-y-2 text-sm font-light">
            <form className="w-full flex lg:flex-row flex-col gap-y-2 lg:gap-y-0 gap-x-2 items-center justify-center">
              <input
                placeholder="Enter email address "
                className={`border rounded-lg w-full h-8 text-sm px-4 focus:outline-none ${isDarkMode ? "bg-transparent border-[#474747]" : "bg-white"}`}
              />
              <button
                className={` ${
                  isDarkMode ? "bg-[#EEEEEE] text-[#101012]" : "bg-[#101012] text-[#EEEEEE]"
                } rounded-lg  h-8 px-3 text-sm w-full lg:w-[30%] transition-transform hover:scale-105 delay-50`}
              >
                Join the waitlist
              </button>
            </form>
            <div className="mx-auto flex items-center gap-x-2">
              <Image src={users} alt="users" className="h-6 w-12" />
              <span>2k+ users joined the waitlist</span>
            </div>
          </article>
        </section>

        <section className={` flex lg:flex-row flex-col items-center gap-x-4 justify-evenly gap-y-5`} data-aos="fade-right"
            data-aos-easing="ease-out"
            data-aos-duration="1200"
            data-aos-once="true">
          <article
            className={`rounded-lg flex flex-col gap-y-2 px-6 py-4 w-[80%] lg:w-[30%] ${
              isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F9F9F9]"
            }`}
          >
            <Link />
            <h2 className="text-sm font-bold">Payment Links</h2>
            <p className="text-xs font-light">
              Generate instant payment links <br /> for your customers
            </p>
          </article>
          <article
            className={`rounded-lg flex flex-col gap-y-2 px-6 py-4 w-[80%] lg:w-[30%] ${
              isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F9F9F9]"
            }`}
          >
            {/* <Link /> */}
            <Image src={apiAccess} alt="api-access-key" className="w-5 h-5"/>
            <h2 className="text-sm font-bold">Api Access</h2>
            <p className="text-xs font-light">
            Integrate payments directly into your <br/> applications
            </p>
          </article>
          <article
            className={`rounded-lg flex flex-col gap-y-2 px-6 py-4 w-[80%] lg:w-[30%] ${
              isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F9F9F9]"
            }`}
          >
            <Link />
            <h2 className="text-sm font-bold">Payment Links</h2>
            <p className="text-xs font-light">
              Generate instant payment links <br /> for your customers
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Page;

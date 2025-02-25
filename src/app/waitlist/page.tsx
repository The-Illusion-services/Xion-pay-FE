"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import background from "@/src/assets/bg-black.png";
import users from "@/src/assets/users.png";
import { Link } from "lucide-react";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "@/src/components/Navbar";
import apiAccessBlack from "@/src/assets/api-access.png";
import apiAccessWhite from "@/src/assets/api-access-white.png";
import SuccessModal from "./successModal";
import Spinner from "@/src/components/Spinner";
import "../globals.css";

const Page = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [errorMode, setErrorMode] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [hasTouched, setHasTouched] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    joinWaitList();
    setSubmitted(true);
  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { setIsLoading } = useContext(CreateContext).loader;

  const joinWaitList = async () => {
    if(errorMode) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}waitlist/join/`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }
      const responseData = await response.json();
      setIsLoading(false);
      setModalType("success");
      setShowModal(true);
      console.log(responseData);
    } catch (err) {
      console.log(err);
      setModalType("error");
      setShowModal(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current?.focus();
    }
  }, []);

  const handleEmailChange = (e: any) => {

     if (email === "" && hasTouched) {
      setErrorMode(true);
      setErrMsg("Field cannot be empty");
      
    }
    if (!validateEmail(email) && hasTouched) {
      setErrorMode(true);
      setErrMsg("Invalid email");
      
    }else if(validateEmail(email)){
      setErrorMode(false);
    }

    setEmail(e.target.value);
  };

  const handleHasTouched = ()=>{
    if(email === ""){
      setErrorMode(true)
      setErrMsg("Field cannot be empty")
    }
    setHasTouched(true)
  }

  return (
    <>
      <Spinner isDarkMode={isDarkMode} />
      <SuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        isDarkMode={isDarkMode}
      />
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <main
        className={`lg:px-20 flex flex-col justify-between h-fit py-8  gap-y-16   ${
          isDarkMode ? "text-[#EEEEEE] " : "text-[#101012]"
        }`}
      >
        <div
          className={`${
            isDarkMode ? "flex" : "hidden"
          } absolute z-[-10] bottom-0 top-0 right-0 left-0`}
        >
          <Image
            src={background}
            alt="background"
            className="w-full lg:h-full h-[1000px] md:h-[1200px]"
          />
        </div>
        <section
          className="flex flex-col items-center gap-y-6 w-[80%] lg:w-[60%] mx-auto pt-12"
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="1200"
          data-aos-once="true"
        >
          <div className="text-center leading-8 font-rationalSemibold">
            <span className="text-2xl lg:text-[40px] font-bold">
              Be among the first to experience <br className="hidden lg:flex" />{" "}
              next-gen crypto payments!
            </span>
          </div>
          <div className="text-center text-sm font-rationalLight">
            <p>
              Seamless, secure, and borderless transactions—experience the
              future of Web3 payments <br className="hidden lg:flex" /> before
              anyone else. Join the waitlist today!
            </p>
          </div>

          <article className="w-full flex flex-col gap-y-2 text-sm font-rationalLight">
            <form
              onSubmit={handleSubmit}
              className="w-full flex lg:flex-row flex-col gap-y-2 lg:gap-y-0 gap-x-2 items-center justify-center"
            >
              <article className="w-full flex flex-col">
                <div className="w-full flex lg:flex-row flex-col  gap-x-2 gap-y-2">
                  <input
                    ref={inputRef}
                    // type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleHasTouched}
                    placeholder="Enter email address "
                    className={`border rounded-lg w-full h-8 text-sm px-4 focus:outline-none ${
                      errorMode && "border-red-500"
                    } ${
                      isDarkMode
                        ? "bg-transparent border-[#474747]"
                        : "bg-white"
                    }`}
                  />
                   {errorMode && (
                  <span className="text-red-400 ml-4 text-center lg:text-start text-xs flex lg:hidden">{errorMsg}</span>
                )}

                  <button
                    type="submit"
                    className={` ${
                      isDarkMode
                        ? "bg-[#EEEEEE] text-[#101012]"
                        : "bg-[#101012] text-[#EEEEEE]"
                    } rounded-lg  h-8 px-3 text-sm w-full lg:w-[30%] transition-transform hover:scale-105 delay-50`}
                  >
                    Join the waitlist
                  </button>
                </div>

                {errorMode && (
                  <span className="text-red-400 ml-4 text-xs hidden lg:flex pt-1">{errorMsg}</span>
                )}
              </article>
            </form>
            <div className="mx-auto flex items-center gap-x-2">
              <Image src={users} alt="users" className="h-6 w-12" />
              <span>2k+ users joined the waitlist</span>
            </div>
          </article>
        </section>

        <section
          className={` flex lg:flex-row flex-col items-center gap-x-4 justify-evenly gap-y-5`}
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="1200"
          data-aos-once="true"
        >
          <article
            className={`rounded-lg flex flex-col gap-y-2 px-6 py-4 w-[80%] lg:w-[30%] cursor-pointer transition-transform hover:scale-105 delay-50 ${
              isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F9F9F9]"
            }`}
          >
            <Link />
            <h2 className="text-sm font-bold font-rationalSemibold">
              Payment Links
            </h2>
            <p className="text-xs font-rationalLight">
              Generate instant payment links <br /> for your customers
            </p>
          </article>
          <article
            className={`rounded-lg flex flex-col gap-y-2 px-6 py-4 w-[80%] lg:w-[30%] cursor-pointer transition-transform hover:scale-105 delay-50 ${
              isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F9F9F9]"
            }`}
          >
            {/* <Link /> */}
            <Image
              src={!isDarkMode ? apiAccessBlack : apiAccessWhite}
              alt="api-access-key"
              className="w-5 h-5"
            />
            <h2 className="text-sm font-rationalSemibold">API Access</h2>
            <p className="text-xs font-rationalLight">
              Integrate payments directly into your <br /> applications
            </p>
          </article>
          <article
            className={`rounded-lg flex flex-col gap-y-2 px-6 py-4 w-[80%] lg:w-[30%] cursor-pointer transition-transform hover:scale-105 delay-50 ${
              isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F9F9F9]"
            }`}
          >
            <Link />
            <h2 className="text-sm font-bold font-rationalSemibold">
              Payment Links
            </h2>
            <p className="text-xs font-rationalLight">
              Generate instant payment links <br /> for your customers
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Page;

"use client"
import React, {ReactNode, useEffect, useState} from "react";

import { useRouter } from "next/navigation";
import background from "@/src/assets/bg-black.png";
import desktop from "@/src/assets/desktop-3.png"
import signup from "@/src/assets/signup.png"
import payment from "@/src/assets/payment.png"

import { Button } from "../components/ui/button"

import Image from "next/image";
import Navbar from "../components/LandingNavbar";
import { ArrowRight, KeyRound, LucideIcon, Shield, ShieldCheck } from "lucide-react"

const NovyPayHeroLanding = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)


  return (
    <div
    style={{ background: `url(${background.src})`, backgroundSize: "cover" }}>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}></Navbar>
      
      
      <main
        className={`lg:px-20 flex flex-col justify-between pt-12 gap-y-16 transition-colors  ${
          isDarkMode ? "text-[#EEEEEE] " : "text-[#101012]"
        }`}
      >


        <section id="hero" className="flex flex-col items-center justify-center gap-5 mt-28">
          <div className="flex gap-3 bg-[#141414] bg-blur-xl border-[#1C1C1C] border-2 px-3 py-1 items-center rounded-full">
            <div className="h-4 aspect-square rounded-full flex justify-center items-center bg-[#373737] p-2">
              <span className="text-sm">🔥</span>
            </div>
            <p>Withdraw your earnings in fiat or crypto</p>
            <div className="h-4 aspect-square rounded-full flex justify-center items-center bg-white text-black p-1">
              <ArrowRight color="black"/>
            </div>
          </div>

          <section className="flex flex-col gap-3 items-center">
            <h1 className="text-6xl leading-[1.3em] font-extrabold text-center line">Powering Seamless Transactions for Individuals and Businesses</h1>
            <p className="text-center text-[#C4C4C4] w-[40em]">Send, receive, and manage funds across borders using fiat or crypto  with real-time tracking, low fees, and total peace of mind</p>
            <div className="flex gap-3">
              <Button variant={'default'} className="bg-white hover:bg-white/70 transition-all duration-2000 ease-in-out text-black font-bold">Get Started</Button>
              <Button variant={'default'} className="backdrop-blur-[1.2px] bg-white/30 border-[#474747] hover:bg-white/30 transition-all duration-2000 ease-in-out text-white font-bold">View API Docs</Button>
            </div>
            <Image src={desktop} alt="Desktop View" />
          </section>
        </section>

        <section id="sponsors">
          <h2 className="text-center">Trusted by companies worldwide</h2>
        </section>

        <section className="flex flex-col gap-24">
          <section className="grid grid-cols-2 gap-24">
            <GradientH3>
              From Your First Click to Final Delivery, See How Everything Works Seamlessly
            </GradientH3>
            <p className="text-[#C4C4C4] ">
              A clear and simple guide that walks you through every step of the experience — so you always know what’s next and feel confident along the way
            </p>
          </section>
          <section className="grid grid-cols-2 gap-32 mb-10">
            <ImageContainer>
              <Image src={signup} alt="NovyPay Sign Up page" />
            </ImageContainer>
            <div className="w-[70%] flex flex-col items-center gap-3">
              <GradientH3>Sign Up to Get Started in Minutes</GradientH3>
              <p className="text-[#C4C4C4]">Create your account in just a few clicks and gain instant access to personalized features, seamless tools, and everything you need to make the most of your experience</p>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-32 mb-10">
            
            <div className="flex flex-col items-center gap-3">
              <GradientH3>No Hassle, Just a Payment Link Away</GradientH3>
              <p className="text-[#C4C4C4]">Create and share custom payment links in just a few clicks — no complex setup, no coding needed. Whether you're running a small business, freelancing, or collecting payments on the go, we've made it fast, secure, and effortless to get paid anytime, anywhere</p>
            </div>
            <ImageContainer>
              <Image src={payment} alt="NovyPay Payment Link page" />
            </ImageContainer>
          </section>
        </section>
        
        <section className="flex flex-col items-center justify-center">
          <span className="rounded-full py-2 px-3 backdrop-blur-3xl border border-[#1C1C1C] font-bold text-sm">FEAUTURES</span>
          <h3 className="text-4xl w-[70%] py-3 font-bold text-center leading-[1.3em]">Powerful Tools to Help You Accept and Manage Crypto Payments</h3>
          <p className="w-[70%] text-[#C4C4C4] text-center">BurntPay gives you everything you need to collect payments, secure funds, and track transactions — all backed by the reliability of Xion and USDC. Whether you're a creator, a business, or a platform, our suite of tools makes crypto payments easy and accessible.</p>

          <section className="mt-28 grid grid-cols-3 gap-14">
            <FeatureCard icon={ShieldCheck} className="" title="Secure Transactions" description="With end-to-end encryption, your sensitive data is safeguarded at every stage of the transaction process, from start to finish" />
            <FeatureCard icon={KeyRound} className="" title="API Access" description="Take your integration capabilities to the next level with our easy-to-use API. Seamlessly connect your systems, automate workflows, and access data in real-time to drive efficiency and innovation" />
            <FeatureCard icon={KeyRound} className="" title="Multi-Currency Support" description="Enjoy seamless conversion and real-time exchange rates, all while reducing the complexity of dealing with different financial systems" />
            <FeatureCard icon={KeyRound} className="" title="Withdraw USDC to Wallet" description="Our secure, streamlined process ensures quick access to your digital assets, giving you full control and flexibility whenever you need it" />
            <FeatureCard icon={KeyRound} className="" title="Two-Factor Authentication" description="Add an extra layer of security to Keep user accounts secure with OTPs, biometric login, or app-based authentication" />
          </section>
        </section>
      </main>
    </div>
  );


};


type FeaturedProps = {
  className: string | undefined,
  title: string,
  description: string,
  icon: LucideIcon
}

const FeatureCard = ({
  className,
  title,
  description,
  icon: Icon
}: FeaturedProps) => {
  return (
          <div className="bg-[#1A1A1A] backdrop-blur-3xl p-5 rounded-md">
            <div className="mb-2">
              {/* Replace this with your actual wallet icon component (e.g., using a library like Heroicons, Font Awesome, or a custom SVG) */}
              <Icon />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{ title }</h2>
            <p className="text-sm text-gray-400">
              { description }
            </p>
          </div>
  );
}

const GradientH3 = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (<h3 style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(to right, #EDEDED, #878787)", WebkitBackgroundClip: "text" }} className="font-bold text-3xl bg-linear-to-r from-[#EDEDED] to-[#878787] bg-clip-text">
    {children}
  </h3>)
}

const ImageContainer = ({ children } : Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      { children }
    </div>
  )
}

export default NovyPayHeroLanding;

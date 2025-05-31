"use client"
import React, {ReactNode, useEffect, useState} from "react";

import { useRouter } from "next/navigation";
import background from "@/src/assets/bg-black.png";
import desktop from "@/src/assets/desktop-3.png"
import signup from "@/src/assets/signup.png"
import payment from "@/src/assets/payment.png"
import freelancers from "@/src/assets/freelancers.svg"
import laptop from "@/src/assets/laptop.svg"
import code from "@/src/assets/code.svg"
import newsletterBg from "@/src/assets/newsletter.png"
import logoBlack from "@/src/assets/logo-black.png";
import logoWhite from "@/src/assets/logo-white.png";
import eclipse1 from "@/src/assets/eclipse-1.png"
import eclipse2 from "@/src/assets/eclipse-2.png"
import google from "@/src/assets/google.svg"
import twitter from "@/src/assets/twitter.svg"
import insta from "@/src/assets/instagram.svg"

import { Button } from "../components/ui/button"

import Image from "next/image";
import Navbar from "../components/LandingNavbar";
import { ArrowRight, CircleDollarSignIcon, Facebook, Icon, KeyRound, Lock, LucideIcon, LucideImage, Shield, ShieldCheck, Store, Target, Wallet, Wallet2 } from "lucide-react"
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import Link from "next/link";
import { Divider } from "@mui/material";
import { Separator } from "../components/ui/separator";

const NovyPayHeroLanding = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)


  return (
    <div className="bg-black">
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}></Navbar>
      
      
      <main
        className={`lg:px-20 px-5 flex flex-col justify-between pt-12 gap-y-16 transition-colors  ${
          isDarkMode ? "text-[#EEEEEE] " : "text-[#101012]"
        }`}
      >

        <Image src={eclipse1} alt="" className="absolute w-[35%] top-0 left-0 z-0"/>
        <section id="hero" className="flex flex-col z-10 items-center justify-center gap-5 mt-28">
          <div className="flex gap-3 bg-[#141414] bg-blur-xl border-[#1C1C1C] border-2 px-3 py-1 items-center rounded-full">
            <div className="h-4 aspect-square rounded-full flex justify-center items-center bg-[#373737] p-2">
              <span className="text-sm">🔥</span>
            </div>
            <p className="text-sm lg:text-md">Withdraw your earnings in fiat or crypto</p>
            <div className="h-4 aspect-square rounded-full flex justify-center items-center bg-white text-black p-1">
              <ArrowRight color="black"/>
            </div>
          </div>

          <section className="flex flex-col gap-3 items-center">
            <h1 style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(to right, #EDEDED, #878787)", WebkitBackgroundClip: "text" }} className="lg:text-6xl text-4xl leading-[1.3em] font-extrabold text-center line">Powering Seamless Transactions for Individuals and Businesses</h1>
            <p className="text-center text-[#C4C4C4] lg:w-[40em] w-full">Send, receive, and manage funds across borders using fiat or crypto  with real-time tracking, low fees, and total peace of mind</p>
            <div className="flex gap-3">
              <Link href="/app/auth/register"><Button variant={'default'} className="bg-white hover:bg-white/70 transition-all duration-2000 ease-in-out text-black font-bold">Get Started</Button></Link>
              <Button variant={'default'} className="backdrop-blur-[1.2px] bg-white/30 border-[#474747] hover:bg-white/30 transition-all duration-2000 ease-in-out text-white font-bold">View API Docs</Button>
            </div>
            <Image src={eclipse2} alt="" />
            <Image src={desktop} className="mt-5" alt="Desktop View" />
          </section>
        </section>

        <section className="flex flex-col gap-24">
          <section className="grid md:grid-cols-2 gap-24">
            <GradientH3>
              From Your First Click to Final Delivery, See How Everything Works Seamlessly
            </GradientH3>
            <p className="text-[#C4C4C4] ">
              A clear and simple guide that walks you through every step of the experience — so you always know what’s next and feel confident along the way
            </p>
          </section>
          <section className="grid md:grid-cols-2 gap-32 mb-10">
            <ImageContainer>
              <Image src={signup} alt="NovyPay Sign Up page" />
            </ImageContainer>
            <div className="md:w-[70%] flex flex-col items-center gap-3">
              <GradientH3>Sign Up to Get Started in Minutes</GradientH3>
              <p className="text-[#C4C4C4]">Create your account in just a few clicks and gain instant access to personalized features, seamless tools, and everything you need to make the most of your experience</p>
            </div>
          </section>
          <section className="grid md:grid-cols-2 gap-32 mb-10">
            
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
          <h3 className="text-4xl md:w-[70%] py-3 font-bold text-center leading-[1.3em]">Powerful Tools to Help You Accept and Manage Crypto Payments</h3>
          <p className="md:w-[70%] text-[#C4C4C4] text-center">BurntPay gives you everything you need to collect payments, secure funds, and track transactions — all backed by the reliability of Xion and USDC. Whether you're a creator, a business, or a platform, our suite of tools makes crypto payments easy and accessible.</p>

          <section className="mt-28 grid md:grid-cols-3 gap-14">
            <FeatureCard icon={<ShieldCheck />} className="" title="Secure Transactions" description="With end-to-end encryption, your sensitive data is safeguarded at every stage of the transaction process, from start to finish" />
            <FeatureCard icon={<KeyRound />} className="" title="API Access" description="Take your integration capabilities to the next level with our easy-to-use API. Seamlessly connect your systems, automate workflows, and access data in real-time to drive efficiency and innovation" />
            <FeatureCard icon={<CircleDollarSignIcon/>} className="" title="Multi-Currency Support" description="Enjoy seamless conversion and real-time exchange rates, all while reducing the complexity of dealing with different financial systems" />
            <FeatureCard icon={<Wallet2/>} className="" title="Withdraw USDC to Wallet" description="Our secure, streamlined process ensures quick access to your digital assets, giving you full control and flexibility whenever you need it" />
            <FeatureCard icon={<Lock/>} className="" title="Two-Factor Authentication" description="Add an extra layer of security to Keep user accounts secure with OTPs, biometric login, or app-based authentication" />
            <FeatureCard icon={<Target/>} className="" title="Track Every Transaction" description="Interactive dashboards that monitor income, spend, user behavior, and more" />
          </section>
        </section>
        <section className="flex flex-col items-center justify-center">
          <span className="rounded-full py-2 px-3 backdrop-blur-3xl border border-[#1C1C1C] font-bold text-sm">FEAUTURES</span>
          <h3 className="text-4xl w-[70%] py-3 font-bold text-center leading-[1.3em]">Built for Every Kind of User</h3>
          <section className="mt-16 grid md:grid-cols-3 gap-14">
            
            <FeatureCard icon={<Image src={freelancers} alt="freelancers" />} 
              title="For Freelancers"
              description="Invoice clients easily, receive global payments in USDC or fiat, and withdraw securely — no middlemen."
              className="bg-[#303030] backdrop-blur-3xl"
            />
            <FeatureCard icon={<Image src={laptop} alt="freelancers" />} 
              title=" For Platforms & Marketplaces"
              description="Add BurntPay to your platform to offer secure, fast, and flexible payouts via simple API."
              className="bg-[#303030] backdrop-blur-3xl"
            />
            <FeatureCard icon={<Image src={code} alt="freelancers" />} 
              title="For Web3 Builders"
              description="Build on-chain apps with instant payment links, escrow, and developer-friendly API access."
              className="bg-[#303030] backdrop-blur-3xl"
            />
          </section>
        </section>

        <section style={{ 
            background: `url(${newsletterBg.src})`, 
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }} className="flex flex-col justify-center items-center py-24 px-12 rounded-xl">
          <div className=" lg:w-[50%]">
            <h3 className="text-3xl text-center">Get your stories Subscribe to payment token times</h3>
          </div>

          <form className="lg:w-[60%] rounded-full flex border border-white p-2 mt-8">
            <Input placeholder="enter your email address" className="outline-none border-0 ring-0" />
            <Button style={{ background: "linear-gradient(to right, #EDEDED, #878787)" }} className="p-5 rounded-full font-bold text-black">Step inside</Button>
          </form>
          
        </section>
      </main>

      <Footer isDarkMode={isDarkMode}/>
    </div>
  );


};

const Footer = ({ isDarkMode } : { isDarkMode: boolean }) => {
  return (
    <footer className="lg:px-20 px-5 py-12 flex flex-col gap-8 text-white">
      <section className="grid lg:grid-cols-5 gap-28">
        <section className="flex flex-col col-span-2">
          <Image
            src={isDarkMode ? logoWhite : logoBlack}
            alt="logo"
            className="w-28 h-12 mb-5"
          />
          <p>The network mints branded digital tokens unique to your online presence, allowing you to own, value.</p>
          <form className=" rounded-full flex border border-white p-2 mt-8">
            <Input placeholder="enter your email address" className="outline-none border-0 ring-0" />
            <Button style={{ background: "linear-gradient(to right, #EDEDED, #878787)" }} className="p-5 rounded-full font-bold text-black">Sign up</Button>
          </form>
        </section>
        <section className="flex flex-col gap-5">
          <h4 className="text-2xl font-bold">Protocol</h4>
          <Link href="/" className="text-[#C4C4C4]">Dashboard</Link>
          <Link href="/" className="text-[#C4C4C4]">Documentation</Link>
          <Link href="/" className="text-[#C4C4C4]">Articles</Link>
        </section>
        <section className="flex flex-col col-span-2 gap-5">
          <h4 className="text-2xl font-bold">Company</h4>
          <Link href="/" className="text-[#C4C4C4]">Privacy Policy</Link>
          <Link href="/" className="text-[#C4C4C4]">Terms of service</Link>
          <Link href="/" className="text-[#C4C4C4]">Community Guidelines</Link>
        </section>
      </section>
      <Separator color="#C4C4C4" className="bg-[#C4C4C4]" />
      <section className="flex flex-row justify-between">
        <p>&copy; { new Date().getFullYear() } NovyPay</p>

        <section className="flex gap-5 items-center">
          <Link href=""><Image src={google} alt="" /></Link>
          <Link href=""><Image src={twitter} alt="" /></Link>
          <Link href=""><Image src={insta} alt="" /></Link>
        </section>
      </section>
    </footer>
  )
}


type FeaturedProps = {
  className: string | undefined,
  title: string,
  description: string,
  icon: React.ReactNode
}

const FeatureCard = ({
  className,
  title,
  description,
  icon: Icon
}: FeaturedProps) => {
  return (
        <div className={cn("bg-[#1A1A1A] backdrop-blur-3xl p-5 rounded-md ", className)}>
            <div className="mb-5">
              {Icon}
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
    <div className="w-full">
      { children }
    </div>
  )
}

export default NovyPayHeroLanding;

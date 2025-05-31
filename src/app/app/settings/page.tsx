"use client";
import Topbar from "@/src/components/Topbar";
import React from "react";
import PersonalInformation from "./personalInformation";
import ApiandWebhooks from "./apiandwebhooks";

const Page = () => {
  return (
    <main className="pt-20">
      <h2 className="text-white font-medium text-4xl pl-6">Settings</h2>

      <section className="bg-gray_primary rounded-md mt-4 mx-4 text-white  min-h-screen px-4 py-4">
        <article className="w-[50%] h-10 bg-[#0D0D13] p-1 flex items-center justify-evenly text-sm rounded-md">
          {/* <span className="bg-gray_primary rounded-md p-1">Profile</span>
          <span className="text-[#888888] rounded-md p-1">Contact</span>
          <span className="text-[#888888] rounded-md p-1">Account</span>
          <span className="text-[#888888] rounded-md p-1">Preference</span>
          <span className="text-[#888888] rounded-md p-1">Team</span> */}
          <span className="text-[#888888] rounded-md p-1">
            Api Keys & Webhooks
          </span>
        </article>
       
        <ApiandWebhooks />
      </section>
    </main>
  );
};

export default Page;

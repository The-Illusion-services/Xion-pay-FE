"use client";
import Topbar from "@/src/components/Topbar";
import React from "react";
import PersonalInformation from "./personalInformation";
import ApiandWebhooks from "./apiandwebhooks";

const Page = () => {
  return (
    <>
      <Topbar />
      <main className="mt-20">
        <section className="bg-[#13161F] mx-4 text-white my-4 min-h-screen px-4 py-4">
          <article className="w-[50%] h-10 bg-[#0D0D13] p-1 flex items-center justify-evenly text-sm rounded-md">
            <span className="bg-[#13161F] rounded-md p-1">Profile</span>
            <span className="text-[#888888] rounded-md p-1">Contact</span>
            <span className="text-[#888888] rounded-md p-1">Account</span>
            <span className="text-[#888888] rounded-md p-1">Preference</span>
            <span className="text-[#888888] rounded-md p-1">Team</span>
            <span className="text-[#888888] rounded-md p-1">
              Api Keys & Webhooks
            </span>
          </article>
          {/* <article className="mt-4 w-[50%]">
            <span className="text-2xl font-bold">Personal Information</span>

            <form className="flex flex-col mt-8 w-full gap-y-6">
              <div className="flex flex-col w-full">
                <label>Full name</label>
                <input
                  placeholder="Enter Full name"
                  className="border h-10 p-2 bg-[#13161F] mt-2 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Email address</label>
                <input
                  placeholder="Enter email address"
                  className="border h-10 p-2 bg-[#13161F] mt-2 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Phone Number</label>
                <input
                  placeholder="Enter Full name"
                  className="border h-10 p-2 bg-[#13161F] mt-2 rounded-md"
                />
              </div>
              <button className="p-1 bg-[#5856D6] w-32 block ml-auto rounded-md">Save Change</button>
            </form>
          </article> */}
          {/* <PersonalInformation/> */}
          <ApiandWebhooks/>
        </section>
      </main>
    </>
  );
};

export default Page;

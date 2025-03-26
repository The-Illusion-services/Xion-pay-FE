import React from "react";

const ApiandWebhooks = () => {
  return (
    <article className="mt-4 w-[50%]">
      <span className="text-2xl font-bold">API Configuration</span>

      <form className="flex flex-col mt-8 w-full gap-y-6">
        <div className="flex flex-col w-full">
          <label>Test Secret Key</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Test Public Key</label>
          <input
            placeholder="Enter email address"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Test Callback URL</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Test Webhook URL</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md border-[#FFFFFF1F]"
          />
        </div>
        <button className="p-1 bg-white text-black w-32 block  rounded-md">
          Save Change
        </button>
      </form>
    </article>
  );
};

export default ApiandWebhooks;

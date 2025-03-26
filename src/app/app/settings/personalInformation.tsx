import React from "react";

const PersonalInformation = () => {
  return (
    <article className="mt-4 w-[50%]">
      <span className="text-2xl font-bold">Personal Information</span>

      <form className="flex flex-col mt-8 w-full gap-y-6">
        <div className="flex flex-col w-full">
          <label>Full name</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Email address</label>
          <input
            placeholder="Enter email address"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Phone Number</label>
          <input
            placeholder="Enter Full name"
            className="border h-10 p-2 bg-transparent mt-2 rounded-md"
          />
        </div>
        <button className="p-1 bg-[#5856D6] w-32 block ml-auto rounded-md">
          Save Change
        </button>
      </form>
    </article>
  );
};

export default PersonalInformation;

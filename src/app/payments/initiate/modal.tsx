import React from "react";
import { MdErrorOutline } from "react-icons/md";

const Modal = () => {
  return (
    <section className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm ">
      <div className="lg:w-[25%] h-[40%] bg-gray_primary flex items-center justify-center rounded-lg flex-col gap-y-2">
        <MdErrorOutline className="text-red-400 text-2xl"/>
        <span className="text-white_primary text-lg text-center px-4">
          Invalid or expired payment reference
        </span>
      </div>
    </section>
  );
};

export default Modal;

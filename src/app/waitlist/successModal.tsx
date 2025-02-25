import React from "react";
import Image from "next/image";
import correct from "@/assets/Waitlist/correct.gif";
import { MdError } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
type Props = {
  showModal: boolean;
  modalType: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
};
const SuccessModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  modalType,
  isDarkMode,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };
  if (showModal) {
    return (
      <section className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#00000068] z-50 backdrop-blur-sm">
        <div
          className={`lg:w-[26%] w-[80%] h-[40%] lg:h-[45%] flex flex-col justify-evenly py-2 items-center  rounded-lg  z-40 px-4  ${
            isDarkMode
              ? "bg-[#1A1A1A] text-[#EEEEEE]"
              : "bg-[#F9F9F9] text-[#101012]"
          }`}
        >
          {/* <HiMiniXMark className=" ml-auto text-xl font-bold cursor-pointer" /> */}
          {modalType === "success" ? (
            <CiCircleCheck className="text-5xl text-green-400"/>
          ) : (
            <MdError className="text-5xl text-red-500" />
          )}

          <span className="text-center text-lg font-bold font-rationalSemibold">
            {modalType === "success" ? (
              <span>
                You're on the list! <br /> We'll be in touch soon.
              </span>
            ) : (
              "You're already on the list"
            )}
          </span>
          <button
            className={`${
              isDarkMode
                ? "  bg-[#EEEEEE] text-[#101012]"
                : " bg-[#101012] text-[#EEEEEE]"
            } p-1 rounded-md text-lg px-8 mt-2 transition-transform hover:scale-105 delay-100 font-rationalSemibold`}
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </section>
    );
  }
};

export default SuccessModal;

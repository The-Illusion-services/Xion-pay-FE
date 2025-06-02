"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { X, Check, Loader } from 'lucide-react';
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import { CgSpinnerTwo } from "react-icons/cg";

type Props = {
  activeModal: string;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentStatusModals: React.FC<Props> = ({
  activeModal,
  setActiveModal,
  showModal,
  setShowModal,
}) => {
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Success Modal */}
      {activeModal === "success" && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CiCircleCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Payment Successful!
              </h2>
              <p className="text-white_primary mb-6">
                Your transaction has been completed successfully.
              </p>
              <button
                className="bg-green-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-600 transition transform hover:-translate-y-1"
                onClick={closeModal}
              >
                <a href="about:blank">Close</a>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Failed Modal */}
      {activeModal === "failed" && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <FaRegCircleXmark className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Payment Failed
              </h2>
              <p className="text-white_primary mb-6">
                Card payment or authorization failed
              </p>
              <button
                className="bg-red-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-600 transition transform hover:-translate-y-1"
                onClick={closeModal}
              >
                <a href="about:blank">Close</a>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "noParams" && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <FaRegCircleXmark className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
              <p className="text-gray-600 mb-6">
                oops! you cannot access this page
              </p>
              <button
                className="bg-red-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-600 transition transform hover:-translate-y-1"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Modal */}
      {activeModal === "processing" && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray_primary rounded-xl shadow-lg p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#FFBF00" }}
              >
                <CgSpinnerTwo className="w-8 h-8 text-white animate-spin" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Processing Payment
              </h2>
              <p className="text-white_primary mb-6">
                Please wait while we process your payment. This may take a few
                moments.
              </p>
              <button
                className="text-white font-medium py-3 px-6 rounded-lg opacity-90 cursor-not-allowed"
                // style={{ backgroundColor: '#FFBF00' }}
                disabled
              >
                Processing...
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusModals;

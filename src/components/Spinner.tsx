"use client"
import React, { useContext } from "react";
import { CreateContext } from "../Context/context";
import { CgSpinner } from "react-icons/cg";

export default function Spinner() {
  const { isLoading } = useContext(CreateContext).loader;

  if (isLoading) {
    return (
      <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed  backdrop-blur-sm">
        <CgSpinner className=" text-6xl animate-spin text-[#5856D6] " />
      </div>
    );
  }
}

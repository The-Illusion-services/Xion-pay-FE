import React from "react";
import TableComp from "@/src/components/Table/Table";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
const Page = () => {
  const dummyTableValues = [
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
    {
      txnID: "TXN12345",
      date: "Jan 2, 2024",
      merchant: "Jeremiah Madelyn",
      token: "USDC (Polygon)",
      amount: "$150",
      status: "successful",
    },
  ];
  const tableHeaders = [
    "TRANSACTIONID",
    "DATE&TIME",
    "MERCHANT/USER",
    "PAYMENT METHOD",
    "AMOUNT",
    "STATUS",
  ];
  return (
    <main className="min-h-screen bg-black pt-20 px-4">
      <h2 className="text-white font-medium text-4xl">All Transactions</h2>

      <section>
        <TableComp tableValues={dummyTableValues} tableHeaders={tableHeaders} />
        <section className="bg-gray_primary h-20 flex items-center flex-row  justify-between px-4">
          <div className="flex items-center flex-row gap-x-2 text-[#949494] border w-28 p-1 border-[#949494] rounded-md justify-center">
            <ArrowLeftIcon className="text-[#949494] " />
            <span>Previous</span>
          </div>
          <div className="flex flex-row items-center gap-x-4 text-[#949494]">
            <span className="py-1 px-3 text-white bg-black rounded-md">1</span>
            <span className="">2</span>

            <span className="">3</span>

            <span className="">...</span>

            <span className="">8</span>
            <span className="">9</span>

            <span className="">10</span>
          </div>
          <div className="flex items-center flex-row gap-x-2 text-[#949494] border w-28 p-1 border-[#949494] rounded-md justify-center">
            <span>Next</span>
            <ArrowRightIcon className="text-[#949494] " />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Page;

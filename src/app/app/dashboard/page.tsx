"use client";
import React, { useState, useContext } from "react";
import { CreateContext } from "@/src/Context/context";

import { IoEyeOffOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import TableComp from "@/src/components/Table/Table";
import { useRouter } from "next/navigation";
import {
  Cell,
  Pie,
  PieChart,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

import { useQuery } from "@tanstack/react-query";

const chartData = [
  { day: "Mon", amount: 2000 },
  { day: "Tue", amount: 2000 },
  { day: "Wed", amount: 2500 },
  { day: "Thu", amount: 3000 },
  { day: "Fri", amount: 6000 },
  { day: "Sat", amount: 6200 },
  { day: "Sun", amount: 5000 },
];

const Page = () => {
  const router = useRouter();
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];

  const COLORS = ["#008000", "#FB3748"];
  const getBalance = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}get-wallet-balance/`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      console.log(responseData);

      return responseData;
    } catch (err) {
      console.log(err);
    }
  };
  const {
    data: balanceObj,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-balance"],
    queryFn: getBalance,
  });

  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const { data: session } = useSession();

  const [modalMsg, setModalMsg] = useState("");
  const { msg, setMsg, setShowModal, showModal } =
    useContext(CreateContext).modal;
  const { paymentLink, setPaymentLink, loader, modal } =
    useContext(CreateContext);
  const { setIsLoading } = loader;
  const { setShowPaymentLinkModal } = modal;

 
  const generateApiKey = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api-keys/create/`,
        {
          method: "POST",
          body: JSON.stringify({ description: "" }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      setIsLoading(false);
      setPaymentLink(false);
      setMsg(` ${responseData.key}`);
      setShowModal(true);
      console.log(responseData);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

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
  ];
  const tableHeaders = [
    "TRANSACTIONID",
    "DATE&TIME",
    "MERCHANT/USER",
    "PAYMENT METHOD",
    "AMOUNT",
    "STATUS",
  ];

  const handleGoToTxnPage = () => {
    router.push("/app/transactions");
  };

  const handleShowPaymentModal = () => {
    setShowPaymentLinkModal(true);
  };

  return (
    <main className="">
      <section className="pt-20 px-4 min-h-screen">
        <article className="flex justify-between items-center">
          <span className="font-bold text-4xl text-white_primary">
            Welcome, Favour
          </span>
          <div className="bg-[#00800033] py-1 px-3 rounded-md">
            <span className="text-[#008000]">Due Tuesday, January 4</span>
          </div>
        </article>
        <article className="flex justify-between items-center mt-14">
          <div className="flex flex-row  items-center gap-x-2">
            <h1 className="text-sm text-[#AAAAAA] font-light">Total Balance</h1>
            <IoEyeOffOutline className="text-[#AAAAAA]" />
          </div>
          <div className="flex items-center gap-x-1">
            {/* <h1 className="text-sm text-[#AAAAAA] font-light">
                {balanceObj?.address?.slice(0, 30)}...
              </h1> */}
          </div>
        </article>

        <article className="text-white  relative  justify-between flex items-center mt-2">
          <div className="">
            <span className="font-bold text-4xl">
              {balanceObj?.balance ?? "$20,983"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-x-4">
            <button className="p-2 px-4  rounded-lg border">
              Withdraw to Wallet
            </button>
            <button
              onClick={handleShowPaymentModal}
              className="p-2 px-4  rounded-lg bg-white text-black"
            >
              Create Payment Link
            </button>
          </div>
        </article>
        <section className="bg-black mt-8 flex flex-row items-center gap-x-2  h-[420px]">
          <article className="w-[70%] bg-gray_primary flex flex-col justify-evenly pb-4 gap-y-2 rounded-md">
            <span className="text-white ml-4 mt-4">Recent Transactions</span>
            <div className="w-full flex flex-row items-center justify-between text-white px-4">
              <div className="flex flex-col">
                <span className="text-[#949494]">Total Balance</span>
                <span>$20,983</span>
              </div>

              <div className="bg-black w-40 flex items-center  justify-evenly py-1">
                <button className="bg-gray_primary rounded-sm px-1">Day</button>
                <button className=" rounded-sm px-1">Month</button>
                <button className=" rounded-sm px-1">Year</button>
              </div>
            </div>
            <div className="">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="white"
                    dot={false}
                  />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid
                    stroke="#474747"
                    vertical={false}
                    strokeDasharray={8}
                  />
                  {/* <Legend /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className=" text-xs px-4 bg-gray_primary h-full flex flex-col rounded-md py-4 justify-between">
            <span className="text-white text-lg font-medium">Success Rate</span>
            <div className=" flex flex-col items-center">
              <PieChart height={200} width={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  // paddingAngle={10}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#949494"
                  className="flex flex-col"
                >
                  Total transaction
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#fefefefe"
                  className=""
                >
                  205
                </text>
              </PieChart>
            </div>
            <div className="flex flex-row  justify-center gap-x-20 items-start">
              <div className="border-l-4 border-[#008000] flex flex-col text-white pl-1">
                <span>Success</span>
                <span className="text-xl">65%</span>
              </div>
              <div className="border-l-4 border-[#FB3748] flex flex-col text-white pl-1">
                <span>Failed</span>
                <span className="text-xl">35%</span>
              </div>
            </div>
          </article>
          {/* <section className="flex flex-row items-center justify-center gap-x-2 w-full">
              <div className="flex flex-row text-[10px] items-center gap-x-1">
                <FaCircle className="text-[#4A8957]" />
                Payments Done
              </div>
              <div className="flex flex-row text-[10px] items-center gap-x-1">
                <FaCircle className="text-[#4a89571a]" />
                Payments Pending
              </div>
            </section> */}
        </section>
        <section className="bg-gray_primary w-full flex justify-center flex-col py-2 mt-5 rounded-lg">
          <div className="flex px-8 justify-between w-full">
            <span className=" text-white_primary">Recent Transactions</span>
            <span
              className=" text-white_primary cursor-pointer"
              onClick={handleGoToTxnPage}
            >
              See all
            </span>
          </div>
          <article className="w-[95%] mx-auto">
            <TableComp
              tableHeaders={tableHeaders}
              tableValues={dummyTableValues}
            />
          </article>
        </section>
        {/* <section className="flex gap-x-4 justify-center mt-10">
            <form className="w-[30%] border p-2 rounded-md">
              <div className="flex flex-col w-full">
                <label>Email address</label>
                <input
                  placeholder="Enter email address"
                  value={email}
                  onChange={handleEmailChange}
                  className="focus:outline-none h-10 p-2 bg-[#13161F] mt-2 rounded-md text-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Amount</label>
                <input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="focus:outline-none h-10 p-2 bg-[#13161F] mt-2 rounded-md text-white"
                />
              </div>
              <button
                className="p-2 px-4 block mx-auto rounded-md bg-[#5856D6] mt-5 text-white"
                onClick={generatePaymentLink}
              >
                {" "}
                Generate payment link{" "}
              </button>
            </form>

            <form className="w-[30%] flex items-center border p-2 rounded-md">
              <button
                className="p-2 px-4 block mx-auto rounded-md bg-[#5856D6] mt-5 text-white"
                onClick={generateApiKey}
              >
                {" "}
                Generate api key{" "}
              </button>
            </form>
          </section> */}
      </section>
    </main>
  );
};

export default Page;

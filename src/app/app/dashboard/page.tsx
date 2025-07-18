"use client";
import { CreateContext } from "@/src/Context/context";
import {
  transformToMonthlyChartData,
  transformToWeeklyChartData,
  transformToYearlyChartData,
} from "@/src/Utils";
import TableComp from "@/src/components/Table/Table";
import WalletCardUI from "@/src/components/WalletCard/WalletCardUI";
import { buildTransactionQuery, useDateFilter } from "@/src/hooks/date";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
// import { IoEyeOffOutEyline } from "react-icons/io5";
import { EyeOff, Eye } from "lucide-react";

const Page = () => {
  const [balanceVisibilty, setBalanceVisibility] = useState({
    card: false,
    xion: false,
    usdc: false,
  });
  const toggleBalanceVisibility = (type: string) => {
    if (type === "card") {
      setBalanceVisibility({
        ...balanceVisibilty,
        card: !balanceVisibilty.card,
      });
    } else if (type === "xion") {
      setBalanceVisibility({
        ...balanceVisibilty,
        xion: !balanceVisibilty.xion,
      });
    } else if (type === "usdc") {
      setBalanceVisibility({
        ...balanceVisibilty,
        usdc: !balanceVisibilty.usdc,
      });
    } else {
      return;
    }
  };
  const queryClient = useQueryClient();
  const {
    pin,
    setPin,
    isPinChange,
    setIsPinChange,
    isWalletSetupModalVisible,
    setIsWalletSetupModalVisible,
  } = useContext(CreateContext).cards;
  const [chartData, setChartData] = useState<any[]>([]);
  const {
    filterType,
    setFilterType,
    dateRange,
    description,
    goToPrevious,
    goToNext,
    goToCurrent,
  } = useDateFilter("week");
  const [dateQuery, setDateQuery] = useState("");
  const [activeCurrency, setActiveCurrency] = useState("XION");
  const { data: session } = useSession();
  const [isCardPaymentModalOpen, setIsCardPaymentModalOpen] = useState(false);
  const router = useRouter();

  const COLORS = ["#008000", "#FB3748"];

  const getWalletBalance = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/get-wallet-balance/`,
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
  const getApiKey = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/api-keys/`,
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
    data: apiKey,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-api-key"],
    queryFn: getApiKey,
    enabled: !!session?.user?.accessToken,
  });

  const { data: walletBalance } = useQuery({
    queryKey: ["get-wallet-balance"],
    queryFn: getWalletBalance,
  });

  const getTxnHistory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/transactions`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      // setModalMsg(responseData)
      // console.log(responseData);

      return responseData;
    } catch (err) {
      console.log(err);
    }
  };

  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const [modalMsg, setModalMsg] = useState("");
  const { setMsg, setShowModal } = useContext(CreateContext).modal;
  const { paymentLink, setPaymentLink, loader, modal } =
    useContext(CreateContext);
  const { setIsLoading } = loader;

  const generateApiKey = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/api-keys/create/`,
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
      if (!response.ok) {
        if (responseData.error === "You already have an active API key.") {
          throw new Error(responseData.error);
        }
        throw new Error("An error occured");
      }
      // setModalMsg(responseData)
      setIsLoading(false);
      setPaymentLink(false);
      setMsg(` ${responseData.key}`);
      setShowModal(true);
      queryClient.invalidateQueries();
      // console.log(responseData);
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tableHeaders = [
    "REFERENCE",
    "ID",
    "AMOUNT",
    "CURRENCY",
    "EMAIL",
    "STATUS",
    "TIME",
    // "PAYMENT TYPE",
    // "TRANSACTION HASH",
  ];

  const handleGoToTxnPage = () => {
    router.push("/app/transactions?page=1&page_size=10");
  };

  const { data: txnHistory, isLoading: txnHistoryLoading } = useQuery({
    queryKey: ["transactions-history", filterType, dateQuery, activeCurrency],
    queryFn: getTxnHistory,
    enabled: !!session?.user?.accessToken,
  });

  useEffect(() => {
    const query = buildTransactionQuery(filterType, dateRange.startDate);
    setDateQuery(`?${query}`);
    // fetchTransactions(`/api/transactions?${query}`);
  }, [filterType, dateRange]);
  // console.log(txnHistory?.data?.results);
  const [totalTxnCount, setTotalTxnCount] = useState<null | number>(null);
  const [totalFailedTxn, setTotalFailedTxn] = useState<null | number>(null);
  const [totalCompletedTxn, setTotalCompletedTxn] = useState(null);
  const [percentageFailedTxn, setPercentageFailedTxn] = useState<null | number>(
    null
  );
  const [percentageSuccessfulTxn, setPercentageSuccessfulTxn] = useState<
    null | number
  >(null);

  useEffect(() => {
    setTotalTxnCount(txnHistory?.data?.results.length);
    const totalFailedTxnRaw = txnHistory?.data?.results.filter(
      (txn: any) => txn.status === "failed"
    );
    const totalCompletedTxnRaw = txnHistory?.data?.results.filter(
      (txn: any) => txn.status === "completed"
    );
    setTotalCompletedTxn(totalCompletedTxnRaw?.length);
    setTotalFailedTxn(totalFailedTxnRaw?.length);
    setPercentageFailedTxn(
      (totalFailedTxnRaw?.length /
        (totalFailedTxnRaw?.length + totalCompletedTxnRaw?.length)) *
        100
    );
    setPercentageSuccessfulTxn(
      (totalCompletedTxnRaw?.length /
        (totalFailedTxnRaw?.length + totalCompletedTxnRaw?.length)) *
        100
    );
    console.log(
      typeof (
        totalFailedTxnRaw?.length /
        (totalFailedTxnRaw?.length + totalCompletedTxnRaw?.length)
      )
    );
  }, [txnHistory?.data?.results]);

  const data = [
    { name: "Group A", value: totalCompletedTxn },
    { name: "Group B", value: totalFailedTxn },
  ];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (txnHistory?.data?.results.length >= 1) {
      if (filterType === "week") {
        const weeklyChartData = transformToWeeklyChartData(
          txnHistory?.data?.results
        );
        setChartData(weeklyChartData);
      } else if (filterType === "month") {
        const monthlyChartData = transformToMonthlyChartData(
          txnHistory?.data?.results,
          currentYear,
          currentMonth
        );
        // console.log(monthlyChartData);
        setChartData(monthlyChartData);
      } else if (filterType === "year") {
        const yearlyChartData = transformToYearlyChartData(
          txnHistory?.data?.results,
          currentYear
        );
        setChartData(yearlyChartData);
      }
    }
  }, [txnHistory?.data?.results, filterType]);

  /**
   * Returns a greeting based on the current time
   * @returns {string} - "Good morning", "Good afternoon", or "Good evening"
   */
  function getTimeBasedGreeting(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  interface WalletBalance {
    balances: {
      xion: {
        amount: string;
      };
      usdc: {
        amount: string;
      };
    };
  }

  interface CurrencyCardsProps {
    walletBalance?: WalletBalance;
  }

  
  const CurrencyCards: React.FC<CurrencyCardsProps> = ({ walletBalance }) => {
    return (
      <div className="flex flex-col justify-start items-start ga-y-2 w-full">
        {/* Header */}
        <div className="w-full  rounded-lg py-4   ">
          <div className="flex gap-x-2 items-center">
            <span className="text-sm text-[#AAAAAA]">
              Total Portfolio Value:
            </span>
            <span className="text-lg font-semibold text-white">
              $
              {(
                parseFloat(walletBalance?.balances?.xion?.amount || "0") +
                parseFloat(walletBalance?.balances?.usdc?.amount || "0")
              ).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Currency Cards */}
        <div className="flex flex-row gap-x-4 w-full ">
          {/* XION Card */}
          <div className="flex-1 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm opacity-80">Balance</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  XION
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1 flex justify-between gap-x-2 items-center">
                  <span>
                    {!balanceVisibilty.xion
                      ? (walletBalance?.balances?.xion?.amount || "0.00")
                      : "••••••"}
                  </span>
                  <button
                    onClick={() => toggleBalanceVisibility("xion")}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    {!balanceVisibilty.xion ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="text-sm opacity-80">XION</div>
              </div>

              <div className="flex justify-between items-center text-xs opacity-60 mt-4">
                <span>Token</span>
                <span>XION</span>
              </div>
            </div>
          </div>

          {/* USDC Card */}
          <div className="flex-1 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm opacity-80">Balance</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  USDC
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
              <div className="text-3xl font-bold mb-1 flex justify-between gap-x-2 items-center">
                  <span>
                    {!balanceVisibilty.usdc
                      ? (walletBalance?.balances?.usdc?.amount || "0.00")
                      : "••••••"}
                  </span>
                  <button
                    onClick={() => toggleBalanceVisibility("usdc")}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    {!balanceVisibilty.usdc ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="text-sm opacity-80">USDC</div>
              </div>

              <div className="flex justify-between items-center text-xs opacity-60 mt-4">
                <span>Token</span>
                <span>USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Total Summary */}
        {/* <div className="w-full bg-[#1A1A1A] rounded-lg p-4 border border-[#474747]">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#AAAAAA]">Total Portfolio Value</span>
          <span className="text-lg font-semibold text-white">
            ${((parseFloat(walletBalance?.balances?.xion?.amount || '0') + parseFloat(walletBalance?.balances?.usdc?.amount || '0')).toFixed(2))}
          </span>
        </div>
      </div> */}
      </div>
    );
  };

  return (
    <>
      <main className="">
        <section className="pt-20 px-4 min-h-screen">
          <article className="flex justify-between items-center">
            <span className="font-bold text-4xl text-white_primary">
              Hi, {getTimeBasedGreeting()}
            </span>
            {/* <div className="bg-[#00800033] py-1 px-3 rounded-md">
              <span className="text-[#008000]">Due Tuesday, January 4</span>
            </div> */}
          </article>
          <section className="flex flex-row justify-between items-center w-full ">
            <article className="flex flex-col justify-between gap-y-8 h-full w-[40%]">
              <CurrencyCards walletBalance={walletBalance} />

              {apiKey?.length < 1 && (
                <button
                  onClick={generateApiKey}
                  className=" px-4 h-10  rounded-lg bg-white text-black"
                >
                  Generate Api Key
                </button>
              )}
            </article>

            <section>
              {/* <h2 className="text-white">Cards</h2> */}
              <WalletCardUI />
            </section>
          </section>
          <section className="bg-black mt-8 flex flex-row items-center gap-x-2  h-[420px] justify-between">
            <article className="w-[70%] bg-gray_primary flex flex-col justify-evenly pb-4 gap-y-2 rounded-md">
              <div className="flex flex-row justify-between items-center w-full px-4">
                <span className="text-white  mt-4">Recent Transactions</span>
                {/* <select onChange={(e) => setActiveCurrency(e.target.value)}>
                  <option value="XION">XION</option>
                  <option value="USDC">USDC</option>
                </select> */}
              </div>
              <div className="w-full flex flex-row items-center justify-between text-white px-4">
                {/* <div className="flex flex-col">
                  <span className="text-[#949494]">Total Balance</span>
                  <span>$20,983</span>
                </div> */}

                <div className="bg-black w-40 flex items-center  justify-evenly py-1">
                  <button
                    onClick={() => setFilterType("week")}
                    className={` ${
                      filterType === "week" && "bg-gray_primary"
                    } rounded-sm px-1 cursor-pointer`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setFilterType("month")}
                    className={` ${
                      filterType === "month" && "bg-gray_primary"
                    } rounded-sm px-1 cursor-pointer`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setFilterType("year")}
                    className={` ${
                      filterType === "year" && "bg-gray_primary"
                    } rounded-sm px-1 cursor-pointer`}
                  >
                    Year
                  </button>
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
                    <XAxis
                      dataKey={
                        filterType === "week"
                          ? "day"
                          : filterType === "month"
                          ? "week"
                          : filterType === "year"
                          ? "month"
                          : ""
                      }
                    />
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

            <article className=" text-xs px-4 bg-gray_primary h-full flex flex-col rounded-md py-4 justify-between w-[30%]">
              <span className="text-white text-lg font-medium">
                Success Rate
              </span>
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
                    {totalTxnCount}
                  </text>
                </PieChart>
              </div>
              <div className="flex flex-row  justify-center gap-x-20 items-start">
                <div className="border-l-4 border-[#008000] flex flex-col text-white pl-1">
                  <span>Success</span>
                  <span className="text-xl">
                    {Number.isNaN(percentageSuccessfulTxn)
                      ? 0
                      : percentageSuccessfulTxn?.toFixed()}
                    %
                  </span>
                </div>
                <div className="border-l-4 border-[#FB3748] flex flex-col text-white pl-1">
                  <span>Failed</span>
                  <span className="text-xl">
                    {Number.isNaN(percentageFailedTxn)
                      ? 0
                      : percentageFailedTxn?.toFixed()}
                    %
                  </span>
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
              {txnHistory?.message ===
              "Failed to retrieve transaction history or no transaction history" ? (
                <div className="min-h-[200px] flex items-center justify-center text-white">
                  <span className="text-3xl font-bold">
                    No Transactions yet
                  </span>
                </div>
              ) : (
                <TableComp
                  tableHeaders={tableHeaders}
                  tableValues={txnHistory?.data?.results}
                />
              )}
            </article>
          </section>
        </section>
      </main>
    </>
  );
};

export default Page;

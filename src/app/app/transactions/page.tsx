"use client"

import React from "react";
import TableComp from "@/src/components/Table/Table";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import TableNavigator from "@/src/components/Table/TableNavigator";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams?.get("page"))

  const tableHeaders = [
    "REFERENCE",
    "AMOUNT",
    "CURRENCY",
    "EMAIL",
    "STATUS",
    "TIME"
  ];
  const currentParams = new URLSearchParams(searchParams?.toString());

  const getTxnHistory = async (pageNumber?: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/transactions?page=${pageNumber}&page_size=10`,
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

  const { data: txnHistory, isLoading: txnHistoryLoading } = useQuery({
    queryKey: ["transactions-history"],
    queryFn: () => getTxnHistory(pageNumber),
  });

  const prefetchNextPage = () => {
    if (txnHistory?.data?.total_pages > pageNumber) {
      queryClient.prefetchQuery({
        queryKey: ["transactions-history", pageNumber + 1],
        queryFn: () => getTxnHistory(pageNumber + 1),
      });
    }
  };
  const goToPage = (newPage: number) => {
    currentParams.set("page", newPage.toFixed());
    router.push(`?${currentParams.toString()}`);
  };


  
  return (
    <main className="min-h-screen bg-black pt-20 px-4">
      <h2 className="text-white font-medium text-4xl">All Transactions</h2>

      <section>
        {txnHistory?.message ===
        "Failed to retrieve transaction history or no transaction history" ? (
          <div className="min-h-[350px] flex items-center justify-center text-white">
            <span className="text-3xl font-bold">No Transactions yet</span>
          </div>
        ) : (
          <TableComp
            tableHeaders={tableHeaders}
            tableValues={txnHistory?.data?.results}
          />
        )}
       <TableNavigator
       pageNumber={pageNumber}
       totalPages={txnHistory?.data?.total_pages}
       goToPage={goToPage}
       prefetchNextPage={prefetchNextPage}
       />
      </section>
    </main>
  );
};

export default Page;

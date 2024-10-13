import React, { FC, useState } from "react";
import { SearchBar } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/shared";
import {
  Check,
  ChevronDown,
  Circle,
  Clock,
  Edit3,
  EllipsisVertical,
  Filter,
  Minus,
  Plus,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminTable, Invoice, Menus } from "@/types";
import Image from "next/image";
import orderImg from "public/orderimg.png";
import DefaultTable from "../../../table";
import MenuGrid from "../../menuGrid";
import DataPagination from "@/components/serviette-ui/Pagination";

const AdminMenuTable = ({
  children,
  view,
  invoiceData,
  setIsOpen,
  setSelectedInvoice,
  selectedInvoice,
  currentPage,
  setCurrentPage,
  total_pages,
  items_per_page,
  getPageNumbers,
  tabHeaders,
  tableHeaders,
  className,
}: AdminTable) => {

  let tabKey: any = "";
  let tabValue: any = "";

  const handleTabChange: any = (event: any, key: any, value: any) => {
    tabKey = key;
    tabValue = value;
  };

  return (
    <div>
      <Tabs defaultValue={Object.keys(tabHeaders || {})[0]} className="w-full">
        <div className="flex m-auto justify-between py-3 md:px-3 px-0 overflow-x-scroll md:gapx-0 gap-x-2">
          <div className="md:block hidden">
            <Button className="transparent-btn text-secondary-border border-[0.3px]">
              <p className="capitalize text-sm">bulk actions</p>
              <ChevronDown className="w-5" />
            </Button>
          </div>
          <TabsList className="w-fit bg-secondary-dark">
            {Object.entries(tabHeaders || {}).map(
              ([key, value], index): any => (
                <TabsTrigger
                  value={key}
                  onClick={(event) => handleTabChange(event, key, value)}
                  className="active-sub-tab text-xs md:px-6 py-1 rounded-lg capitalize"
                >
                  {value as string}
                </TabsTrigger>
              )
            )}
          </TabsList>
          <div>
            <Button className="md:rounded-xl rounded-full md:px-3 transparent-btn text-secondary-border">
              <Filter className="w-5" />
              <ChevronDown className="md:block hidden w-5" />
            </Button>
          </div>
          <div>
            <SearchBar
              placeholder="Search for food, drinks and more"
              className="md:rounded-xl rounded-full md:px-3 px-1"
            />
          </div>
        </div>
        <div>
          <div
            className={`${
              view ? "px-4 bg-secondary-darker" : ""
            }  flex py-4 justify-between`}
          >
            {Object.keys(tabHeaders || {}).map((item, index) => (
              <TabsContent value={item} className="w-full">
                {view ? (
                  <div>
                    <MenuGrid
                      invoiceData={invoiceData}
                      setIsOpen={setIsOpen}
                      setSelectedInvoice={setSelectedInvoice}
                      selectedInvoice={selectedInvoice}
                    />
                  </div>
                ) : (
                  <div className={className}>
                    <DefaultTable
                      children={children}
                      tableHeaders={tableHeaders}
                    />
                  </div>
                )}
                <DataPagination
                  data={invoiceData}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  total_pages={total_pages}
                  items_per_page={items_per_page}
                  getPageNumbers={getPageNumbers}
                />
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminMenuTable;

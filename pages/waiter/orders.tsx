import { AuthLayout } from "@layouts";
import Link from "next/link";
import React, { FC, useState } from "react";
import { PageAnimation } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AdminNavbar, Modal } from "@/components/shared";
import {
  Check,
  Circle,
  EllipsisVertical,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/container";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types";
import Image from "next/image";
import orderImg from "public/orderimg.png";
import { handleRowClick } from "@/utils/modal";
import Sidebar from "@/components/shared/nav/sidebar";
import AdminOrdersTable from "@/components/shared/admin/table/orders";

const tabs = ["yesterday", "today", "This Week", "This Month", "This Year"];
const tableHeaders = [
  "S/N",
  "OrderID",
  "Customer",
  "Table No.",
  "Menu Items",
  "Price",
  "Time of Order",
  "Status",
  "Actions",
];
const tabHeaders = {
  all: "all",
  dine: "dine in",
  togo: "to go",
  delivery: "delivery",
};
const invoiceData = [
  {
    value: "all",
    OrderID: 11356,
    Customer: "Chima Paul",
    TableNo: "A103",
    MenuItems: [
      {
        mealImage: "macaroni-image.jpg",
        name: "Macaroni with Chicken",
        quantity: 2,
        price: 335,
      },
      {
        mealImage: "macaroni-image.jpg",
        name: "Chicken Burger",
        quantity: 2,
        price: 335,
      },
      {
        mealImage: "macaroni-image.jpg",
        name: "Bread With Veggies",
        quantity: 5,
        price: 1105,
      },
    ],
    Price: "670",
    Discount: "10",
    subTotal: "660",
    amountPaid: "300",
    TimeofOrder: "1:00pm",
    AssignedTo: [
      {
        staffImage: "macaroni-image.jpg",
        name: "Susan Jackson",
      },
    ],
    Status: "pending",
  },
  {
    value: "dine",
    OrderID: 11357,
    Customer: "David Strong",
    TableNo: "A103",
    MenuItems: [
      {
        mealImage: "macaroni-image.jpg",
        name: "Macaroni with Chicken",
        quantity: 2,
        price: 335,
      },
    ],
    Price: "160",
    Discount: "2",
    amountPaid: "158",
    TimeofOrder: "1:00pm",
    AssignedTo: [
      {
        staffImage: "macaroni-image.jpg",
        name: "David Mark",
      },
    ],
    Status: "cancelled",
  },
  {
    value: "togo",
    OrderID: 11358,
    Customer: "Alice Strong",
    TableNo: "A103",
    MenuItems: [
      {
        mealImage: "macaroni-image.jpg",
        name: "Chicken Burger",
        quantity: 2,
        price: 335,
      },
      {
        mealImage: "macaroni-image.jpg",
        name: "Macaroni with Chicken",
        quantity: 7,
        price: 235,
      },
    ],
    Price: "200",
    Discount: "0",
    amountPaid: "200",
    TimeofOrder: "1:00pm",
    AssignedTo: [
      {
        staffImage: "macaroni-image.jpg",
        name: "Susan Jackson",
      },
    ],
    Status: "pending",
  },
  {
    value: "delivery",
    OrderID: 11359,
    Customer: "David Strong",
    TableNo: "A103",
    MenuItems: [
      {
        mealImage: "macaroni-image.jpg",
        name: "Macaroni with Chicken",
        quantity: 2,
        price: 335,
      },
    ],
    Price: "320",
    Discount: "5",
    amountPaid: "300",
    TimeofOrder: "1:00pm",
    AssignedTo: [
      {
        staffImage: "macaroni-image.jpg",
        name: "Jason Mason",
      },
    ],
    Status: "completed",
  },
];
const defaultInvoice: Invoice = {
  OrderID: 0,
  Customer: "",
  TableNo: "",
  MenuItems: [],
  Price: 0,
  Discount: 0,
  amountPaid: 0,
  TimeofOrder: "",
  Status: "",
};
const WaiterOrders: FC = () => {
  const [view, setView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice>(defaultInvoice);

  let tabKey: any = "";
  let tabValue: any = "";
  let title = "Orders";
// TODO: 404 page
  return (
    <AuthLayout subtitle="Waiter" title={title}>
      <AdminNavbar title={title} />
      <PageAnimation>
        <div className="flex justify-end h-screen w-full">
          <Sidebar />
          <Container>
            <div className="authcard3 h-fit lg:px-6 md:px-8 px-0">
              <Tabs defaultValue={tabs[0]} className="w-full">
                <ScrollArea className="px-3 w-full whitespace-nowrap">
                  <TabsList className="bg-transparent">
                    {tabs.map((item, index) => (
                      <>
                        <TabsTrigger
                          value={item}
                          className="active-main-tab text-sm px-6 capitalize"
                        >
                          {item}
                        </TabsTrigger>
                      </>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                {tabs.map((item, index) => (
                  <TabsContent value={item} className="md:px-0 px-2">
                    <div className="w-full bg-primary-dark pt-4 rounded-md">
                      <div className="w-full h-full">
                        <div className="px-3 flex pb-4 border-b border-primary-border">
                          <div className="flex w-full items-center gap-x-8">
                            <h1 className="md:block hidden capitalize font-semibold text-white text-xl">
                              your orders {item}
                            </h1>
                            <Link
                              href="#"
                              className="authbtn w-fit m-0 px-1 py-2 text-sm font-semibold"
                            >
                              Create Order
                            </Link>
                          </div>
                          <div>
                            <Button
                              onClick={() => setView(!view)}
                              className="transparent-btn text-secondary-border"
                            >
                              {view ? (
                                <>
                                  <LayoutGrid className="w-5" />
                                  <p className="capitalize text-sm">
                                    Grid view
                                  </p>
                                </>
                              ) : (
                                <>
                                  <List className="w-5" />
                                  <p className="capitalize text-sm">
                                    List view
                                  </p>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <AdminOrdersTable
                          view={view}
                          tableHeaders={tableHeaders}
                          tabHeaders={tabHeaders}
                          invoiceData={invoiceData}
                          setIsOpen={setIsOpen}
                          setSelectedInvoice={setSelectedInvoice}
                          selectedInvoice={selectedInvoice}
                        >
                          <TableBody>
                            {invoiceData.map((invoice, index) => (
                              <TableRow
                                key={index}
                                className={`${
                                  selectedInvoice.OrderID === invoice.OrderID
                                    ? "border border-primary-green bg-[#1e240a]"
                                    : "bg-primary-dark"
                                } truncate text-center py-2 rounded-lg`}
                                onClick={() =>
                                  handleRowClick(
                                    invoice,
                                    setIsOpen,
                                    setSelectedInvoice
                                  )
                                }
                              >
                                <TableCell className="truncate">
                                  <Circle
                                    fill={`
                              ${
                                selectedInvoice.OrderID === invoice.OrderID
                                  ? "green"
                                  : "none"
                              }
                              `}
                                    className={` text-primary-border`}
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {index + 1}
                                </TableCell>
                                <TableCell className="truncate">
                                  #{invoice.OrderID}
                                </TableCell>
                                <TableCell>{invoice.Customer}</TableCell>
                                <TableCell>{invoice.TableNo}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-x-1">
                                    {invoice.MenuItems[0].name}
                                    {invoice.MenuItems.length > 1 ? (
                                      <h1 className="w-fit py-[0.1rem] px-[0.2rem] border-2 border-text-completed border-dashed rounded-full font-medium">
                                        +{invoice.MenuItems.length - 1}
                                      </h1>
                                    ) : null}
                                  </div>
                                </TableCell>
                                <TableCell>${invoice.Price}</TableCell>
                                <TableCell>{invoice.TimeofOrder}</TableCell>
                                <TableCell>
                                  <div className="flex justify-center">
                                    <p
                                      className={`status-${invoice.Status} text-center flex items-center rounded-xl py-[0.1rem] px-3 w-fit`}
                                    >
                                      {invoice.Status}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell className="flex justify-center">
                                  <EllipsisVertical />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </AdminOrdersTable>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>
                  <div className="border-b-[0.3px] border-b-primary-border -border">
                    <div className="px-3">
                      <div className="flex justify-between rounded-xl px-2 items-center bg-primary-forest-green h-20 text-white">
                        <div className="flex flex-col h-full justify-center gap-y-3">
                          <p className="bg-status-completed text-text-completed rounded-lg w-fit px-2 text-sm font-medium">
                            Dine in{tabValue}{" "}
                          </p>
                          <p className="text-lg font-medium">
                            Table No. {selectedInvoice.TableNo}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary-border">
                            Order ID{" "}
                          </p>
                          <p className="text-lg font-medium">
                            {selectedInvoice.OrderID}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="my-2 md:mb-2 md:mt-12 flex justify-between px-2 items-center h-28 text-white">
                        <div className="flex flex-col h-full justify-center gap-y-3 text-secondary-border">
                          <p className="text-sm">Customer </p>
                          <p className="text-2xl font-medium capitalize text-white">
                            {selectedInvoice.Customer}
                          </p>
                          <p className="text-sm">
                            Amount paid:{" "}
                            <span className="font-medium text-white pl-1">
                              ${selectedInvoice.Price}
                            </span>{" "}
                          </p>
                        </div>
                        <div>
                          <button className="text-sm transparent-btn rounded-xl p-2">
                            Give Refund
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Tabs
                      defaultValue="items"
                      className="md:text-base text-sm w-full"
                    >
                      <div className="flex py-2 px-6">
                        <div className="w-[60%]">
                          <div className="w-fit flex px-0 gap-x-4">
                            <div
                              className="active-order-tab px-0 py-1 rounded-lg capitalize"
                            >
                              items
                            </div>
                          </div>
                        </div>
                          <div className="text-primary-border flex w-[40%] items-center justify-center gap-x-4">
                            <div className="w-[35%]">
                              <h1>Quantity</h1>
                            </div>
                            <div className="w-[35%]">
                              <h1>Price</h1>
                            </div>
                            <div className="w-[30%]">
                              <h1>Action</h1>
                            </div>
                          </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <div className="w-full">
                            <div className="flex flex-col gap-y-3 px-3 pb-4">
                              {selectedInvoice.MenuItems.map((menuItem) => (
                                <div className="text-white items-center flex border border-primary-border px-2.5 py-2 rounded-lg">
                                  <div className="w-[60%] flex gap-x-3">
                                    <div>
                                      <Image
                                        src={orderImg}
                                        alt="img"
                                        className=""
                                      />
                                    </div>
                                    <p className="m-auto">{menuItem.name}</p>
                                  </div>
                                  <div className="w-[40%] text-center flex">
                                    <div className="w-[35%]">
                                      <p className="transparent-btn justify-center">
                                        {menuItem.quantity}
                                      </p>
                                    </div>
                                    <div className="w-[35%]">
                                      <p>${menuItem.price}</p>
                                    </div>
                                    <div className="w-[30%]">
                                      <EllipsisVertical className="m-auto" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div>
                              <div className="flex justify-between p-3 items-center border-t border-primary-border text-white">
                                <div className=" w-full text-secondary-border">
                                  <div className="flex justify-between">
                                    <p>Sub-total</p>
                                    <p>${selectedInvoice.Price} </p>
                                  </div>
                                  <div className="flex justify-between">
                                    <p>Discount</p>
                                    <p>${selectedInvoice.Discount} </p>
                                  </div>
                                  <div className="flex justify-between text-lg font-medium ">
                                    <p>Total amount to be paid</p>
                                    <p>${selectedInvoice.amountPaid} </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between p-3 items-center border-t border-primary-border text-white">
                                <div className=" w-full text-white">
                                  <div className="flex justify-between">
                                    <button className="flex rounded-xl bg-text-cancelled p-2 ">
                                      <X /> Cancel Order
                                    </button>
                                    <button className="flex rounded-xl bg-text-completed p-2 ">
                                      <Check /> Approve
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </Modal>
            </div>
          </Container>
        </div>
      </PageAnimation>
    </AuthLayout>
  );
};

export default WaiterOrders;

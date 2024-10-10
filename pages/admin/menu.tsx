import { AuthLayout } from "@layouts";
import Link from "next/link";
import React, { FC, useState } from "react";
import { PageAnimation } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { AdminNavbar, Modal } from "@/components/shared";
import Container from "@/components/shared/container";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Menus } from "@/types";
import Image from "next/image";
import orderImg from "public/orderimg.png";
import { handleRowClick } from "@/utils/modal";
import Sidebar from "@/components/shared/nav/sidebar";
import AdminMenuTable from "@/components/shared/admin/table/menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ArrowBigDown,
  Check,
  Circle,
  Edit3,
  EllipsisVertical,
  LayoutGrid,
  List,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Invoice } from "@/types";
import AdminOrdersTable from "@/components/shared/admin/table/orders";

const tabs = ["yesterday", "today", "This Week", "This Month", "This Year"];
const invoiceData = [
  {
    value: "all",
    Category: "Intercontinental",
    MenuId: 101,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chicken",
    Price: "120",
    Discount: "No Discount",
    Description: "random text about some intercontinental dish or whatever",
    Department: "Kitchen",
  },
  {
    value: "all",
    Category: "Intercontinental",
    MenuId: 102,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chicken",
    Price: "120",
    Discount: "No Discount",
    Description: "random text about some intercontinental dish or whatever",
    Department: "Kitchen",
  },
  {
    value: "all",
    Category: "Intercontinental",
    MenuId: 103,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chicken",
    Price: "120",
    Discount: "No Discount",
    Description: "random text about some intercontinental dish or whatever",
    Department: "Kitchen",
  },
  {
    value: "all",
    Category: "Intercontinental",
    MenuId: 103,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chicken",
    Price: "120",
    Discount: "No Discount",
    Description: "random text about some intercontinental dish or whatever",
    Department: "Kitchen",
  },
];
const tabHeaders = {
  all: "all",
  wines: "wines",
  pasta: "pasta",
  pizza: "pizza",
  intercontinental: "intercontinental",
};
const defaultInvoice: Menus = {
  Category: "",
  MenuId: 0,
  mealImage: "",
  Name: "",
  Price: 0,
  Discount: "",
  Description: "",
  Department: "",
};
const tableHeaders = [
  "S/N",
  "Menu Item",
  "Category",
  "price",
  "Discount",
  "Department",
  "Actions",
];

const Menu: FC = () => {
  const [view, setView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orderHeader, setOrderHeader] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Menus>(defaultInvoice);

  let tabKey: any = "";
  let tabValue: any = "";
  let title = "Menu";

  const handleTabChange: any = (event: any, key: any, value: any) => {
    tabKey = key;
    tabValue = value;
  };

  const updatedInvoice = { ...selectedInvoice };

  const handleQuantityChange = (mealIndex: number, type: string) => {
    // if (type === "increment") {
    //   updatedInvoice.MenuItems[mealIndex].quantity += 1;
    // } else if (
    //   type === "decrement" &&
    //   updatedInvoice.MenuItems[mealIndex].quantity > 0
    // ) {
    //   updatedInvoice.MenuItems[mealIndex].quantity -= 1;
    // }
    // setSelectedInvoice(updatedInvoice);
  };

  const onDeleteItem = (mealIndex: number) => {
    const updatedMenuItems = selectedInvoice
    // .
    // MenuItems.filter(
    //   (menuItem, index) => index !== mealIndex
    // );
    // setSelectedInvoice({
    //   ...selectedInvoice,
    //   MenuItems: updatedMenuItems,
    // });
  };

  return (
    <AuthLayout title={title}>
      <AdminNavbar title={title} />
      <PageAnimation>
        <div className="flex justify-end h-screen w-full">
          <Sidebar />
          <Container>
            <div className="authcard3 h-fit lg:px-12 md:px-8 px-0">
              <Tabs defaultValue={tabs[0]} className="w-full md:px-0 px-2">
                <div className="w-full bg-primary-dark pt-4 rounded-md">
                  <div className="w-full h-full">
                    <div className="px-3 flex pb-4 border-b border-primary-border">
                      <div className="flex w-full items-center gap-x-8">
                        <h1 className="md:block hidden capitalize font-semibold text-white text-xl">
                          Your Menu
                        </h1>
                        <Link
                          href="#"
                          className="authbtn w-fit m-0 px-1 py-2 text-sm font-semibold"
                        >
                          Create Menu
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
                              <p className="capitalize text-sm">Grid view</p>
                            </>
                          ) : (
                            <>
                              <List className="w-5" />
                              <p className="capitalize text-sm">List view</p>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <AdminMenuTable
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
                              selectedInvoice.MenuId === invoice.MenuId
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
                                selectedInvoice.MenuId === invoice.MenuId
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
                            <TableCell>
                              <div className="m-auto w-fit flex items-center gap-x-1">
                                <div className="w-8 h-4">
                                  <Image
                                    alt="img"
                                    src={orderImg}
                                    className="w-10 h-8 rounded-full"
                                  />
                                </div>
                                <p className="flex break-words">
                                  {invoice.Name}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{invoice.Category}</TableCell>
                            <TableCell>${invoice.Price}</TableCell>
                            <TableCell>{invoice.Discount}</TableCell>

                            <TableCell>
                              <div className="flex justify-center">
                                <p
                                  className={`status-cancelled text-center flex items-center rounded-xl py-[0.1rem] px-3 w-fit`}
                                >
                                  {invoice.Department}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <EllipsisVertical />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </AdminMenuTable>
                  </div>
                </div>
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
                            Table No. {selectedInvoice.MenuId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary-border">
                            Order ID{" "}
                          </p>
                          <p className="text-lg font-medium">
                            {selectedInvoice.MenuId}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="my-2 md:mb-2 md:mt-12 flex justify-between px-2 items-center h-28 text-white">
                        <div className="flex flex-col h-full justify-center gap-y-3 text-secondary-border">
                          <p className="text-sm">Customer </p>
                          <p className="text-2xl font-medium capitalize text-white">
                            {selectedInvoice.Category}
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
                          <TabsList className="w-fit flex px-0 gap-x-4">
                            <TabsTrigger
                              value="items"
                              className="active-order-tab px-0 py-1 rounded-lg capitalize"
                              onClick={() => setOrderHeader(false)}
                            >
                              items
                            </TabsTrigger>
                            <TabsTrigger
                              value="edit"
                              className="active-order-tab px-0 py-1 rounded-lg capitalize"
                              onClick={() => setOrderHeader(true)}
                            >
                              <Edit3 />
                              edit
                            </TabsTrigger>
                          </TabsList>
                        </div>
                        {orderHeader ? (
                          <div className="text-primary-border flex w-[40%] items-center justify-between">
                            <div className="w-[35%]">
                              <h1>Quantity</h1>
                            </div>
                            <div className="w-[30%]">
                              <h1>Action</h1>
                            </div>
                          </div>
                        ) : (
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
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <TabsContent value="items" className="w-full">
                            <div className="flex flex-col gap-y-3 px-3 pb-4">
                              {/* {selectedInvoice.MenuItems.map((menuItem) => (
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
                              ))} */}
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
                                    <p>${selectedInvoice.Price} </p>
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
                          </TabsContent>
                          <TabsContent value="edit" className="w-full">
                            <div className="flex flex-col gap-y-3 px-3 pb-4">
                                  <div className="text-white items-center border border-primary-border px-2.5 py-2 rounded-lg flex">
                                    <div className="w-[60%] flex gap-x-3">
                                      <div>
                                        <Image
                                          src={orderImg}
                                          alt="img"
                                          className=""
                                        />
                                      </div>
                                      <p className="m-auto">{selectedInvoice.Name}</p>
                                    </div>
                                    <div className="w-[40%] text-center flex">
                                      <div className="w-[70%] flex justify-evenly">
                                        
                                      </div>
                                      <div className="w-[30%]">
                                        <Trash2
                                          onClick={() =>
                                            onDeleteItem(selectedInvoice.MenuId)
                                          }
                                          className="m-auto cursor-pointer text-text-cancelled"
                                        />
                                      </div>
                                    </div>
                                  </div>
                            </div>

                            <div>
                              <div className="flex justify-between p-3 items-center border-t border-primary-border text-white">
                                <div className=" w-fit m-auto text-white">
                                  <button className="flex rounded-xl bg-text-completed p-2 ">
                                    <Check /> Save Changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
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

export default Menu;

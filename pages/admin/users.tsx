import { AuthLayout } from "@layouts";
import Link from "next/link";
import React, { FC, useState } from "react";
import { PageAnimation } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { AdminNavbar, Modal } from "@/components/shared";
import Container from "@/components/shared/container";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Menus, User } from "@/types";
import Image from "next/image";
import orderImg from "public/orderimg.png";
import orderImg2 from "public/auth-email.png";
import { handleRowClick } from "@/utils/modal";
import Sidebar from "@/components/shared/nav/sidebar";
import AdminMenuTable from "@/components/shared/admin/table/menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ArrowBigDown,
  Check,
  Circle,
  Clock,
  Edit3,
  EllipsisVertical,
  LayoutGrid,
  List,
  Mail,
  Minus,
  Phone,
  Plus,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Invoice } from "@/types";
import AdminOrdersTable from "@/components/shared/admin/table/orders";
import AdminUsersTable from "@/components/shared/admin/table/users";

const tabs = ["yesterday", "today", "This Week", "This Month", "This Year"];
const invoiceData = [
  {
    UserId: 1,
    Email: "wunmi@gmail.com",
    userImage: "abc def",
    Name: "abc def",
    Type: "waiter",
    Department: "kitchen",
    Phone: "+234-800-123-4567",
    Date: "22-07-24",
    Status: "active",
    Requests: 300,
    Completed: 200,
    Sales: 12000,
  },
  {
    UserId: 2,
    Email: "wunmi@gmail.com",
    userImage: "abc def",
    Name: "abc def",
    Type: "waiter",
    Department: "kitchen",
    Phone: "+234-800-123-4567",
    Date: "22-07-24",
    Status: "active",
    Requests: 300,
    Completed: 200,
    Sales: 12000,
  },
  {
    UserId: 3,
    Email: "wunmi@gmail.com",
    userImage: "abc def",
    Name: "abc def",
    Type: "waiter",
    Department: "kitchen",
    Phone: "+234-800-123-4567",
    Date: "22-07-24",
    Status: "active",
    Requests: 300,
    Completed: 200,
    Sales: 12000,
  },
  {
    UserId: 4,
    Email: "wunmi@gmail.com",
    userImage: "abc def",
    Name: "abc def",
    Type: "waiter",
    Department: "kitchen",
    Phone: "+234-800-123-4567",
    Date: "22-07-24",
    Status: "inactive",
    Requests: 300,
    Completed: 200,
    Sales: 12000,
  },
];
const tabHeaders = {
  all: "all",
  customers: "customers",
  admins: "admins",
  waiters: "waiters",
  more: "more categories",
};
const defaultInvoice: Users = {
  UserId: 0,
  Name: "",
  Email: "",
  userImage: "",
  Type: "",
  Department: "",
  Phone: "",
  Date: "",
  Status: "",
  Requests: 0,
  Completed: 0,
  Sales: 0,
};
const tableHeaders = [
  "S/N",
  "Users",
  "Email Address",
  "User Type",
  "Phone Number",
  "Date Added",
  "Status",
  "Action",
];

const Users: FC = () => {
  const [view, setView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orderHeader, setOrderHeader] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<User>(defaultInvoice);

  let tabKey: any = "";
  let tabValue: any = "";
  let title = "User Management";

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
    const updatedMenuItems = selectedInvoice;
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
                    <div className="px-3 flex md:justify-between justify-start pb-4 border-b border-primary-border">
                      <div className="flex items-center">
                        <h1 className="md:block hidden capitalize font-semibold text-white text-xl">
                          All Users
                        </h1>
                      </div>
                      <div>
                        <Link
                          href="#"
                          className="flex authbtn items-center gap-x-1 w-fit m-0 px-2 py-2 text-sm font-semibold"
                        >
                          <Plus className="w-4 h-4" />
                          Create User
                        </Link>
                      </div>
                    </div>

                    <AdminUsersTable
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
                              selectedInvoice.UserId === invoice.UserId
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
                                selectedInvoice.UserId === invoice.UserId
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
                            <TableCell>{invoice.Email}</TableCell>
                            <TableCell>{invoice.Type}</TableCell>
                            <TableCell>{invoice.Phone}</TableCell>
                            <TableCell>{invoice.Date}</TableCell>

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
                    </AdminUsersTable>
                  </div>
                </div>
              </Tabs>
              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>
                  <div className="border-b-[0.3px] border-b-primary-border -border">
                    <div className="px-3">
                      <div className="flex justify-between rounded-xl px-2 items-center bg-primary-forest-green h-16 text-white">
                        <div className="flex flex-col h-full justify-center gap-y-3">
                          <p className="md:text-xl text-lg font-medium">
                            User Details
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-center">
                            <p
                              className={`capitalize text-white font-medium status-cancelled text-center  flex items-center rounded-xl py-[0.1rem] px-3 w-fit`}
                            >
                              {selectedInvoice.Type}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-2 md:mb-3 md:mt-8 flex justify-center px-2 items-center text-white">
                        <div className="gap-y-3 flex flex-col h-full justify-center text-secondary-border">
                          <div className="w-36 h-36 m-auto">
                            <Image
                              alt="img"
                              src={orderImg2}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                          <div className="w-full flex flex-col text-center">
                            <p className="text-2xl font-medium capitalize text-white">
                              {selectedInvoice.Name}
                            </p>
                            <p className="text-sm">{selectedInvoice.Email}</p>
                          </div>
                          <div className="flex w-full gap-x-2 justify-center">
                            <Phone className="w-8 h-8 py-2 px-1 rounded-full bg-primary-border" />
                            <Mail className="w-8 h-8 py-2 px-1 rounded-full bg-primary-border" />
                          </div>
                          <div>
                            <Link
                              href="#"
                              className="flex authbtn items-center 1 w-fit m-0 px-6 py-2 text-sm font-semibold"
                            >
                              View Full Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex py-2 px-4">
                      <div className="w-full">
                        <div className="text-white justify-between w-full flex px-0 gap-x-4">
                          <h1 className="">User Summary</h1>
                          <h1 className="text-xs font-medium text-primary-green">
                            See All
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <div className="flex justify-between p-3 items-center border-t border-primary-border text-white">
                            <div className="flex flex-col gap-y-3 w-full">
                              <div className="flex justify-between">
                                <p>Department</p>
                                <p className="text-white">
                                  {selectedInvoice.Department}{" "}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p>Order Requests</p>
                                <p>{selectedInvoice.Requests} </p>
                              </div>
                              <div className="flex justify-between">
                                <p>Orders Completed</p>
                                <p>{selectedInvoice.Completed} </p>
                              </div>
                              <div className="flex justify-between">
                                <p>Sales</p>
                                <p>${selectedInvoice.Sales} </p>
                              </div>
                              <div className="flex justify-between">
                                <p>Status</p>
                                <p
                                  className={`capitalize text-sm status-${selectedInvoice.Status} text-center  flex items-center rounded-xl py-[0.1rem] px-2 w-fit`}
                                >
                                  {selectedInvoice.Status}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="border-t border-primary-border flex flex-col py-4 px-4">
                            <div className="w-full">
                              <div className="text-white justify-between items-center w-full flex px-0 pb-4 gap-x-4">
                                <h1 className="flex gap-x-2">Open Tasks <span className="font-semibold border border-primary-orange py-[0.1rem] px-1 text-sm rounded-md text-primary-orange">10</span></h1>
                                <h1 className="text-xs font-medium text-primary-green">
                                  See All
                                </h1>
                              </div>
                            </div>
                            <div className="border-l-4 px-1 border-primary-green text-secondary-border items-end flex justify-between">
                              <div className="text-sm">
                                <p> Upcoming</p>
                                <p className="text-base font-medium text-white">
                                  {" "}
                                  Review with manager
                                </p>
                                <div className="flex items-center gap-x-1">
                                    <Clock className="w-4 h-4"/>
                                  <p> 6:30pm-8:00pm</p>
                                </div>
                              </div>
                              <button className="text-secondary-border h-fit flex rounded-xl transparent-btn p-2 ">
                                Send Reminder
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between p-3 items-center border-t border-primary-border text-white">
                            <div className=" w-full text-white">
                              <div className="flex justify-between">
                                <button className="text-secondary-border flex rounded-xl transparent-btn p-2 ">
                                  <Wrench /> Set Permissions
                                </button>
                                <button className="flex rounded-xl bg-text-cancelled p-2 ">
                                  <X /> Remove User
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
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

export default Users;

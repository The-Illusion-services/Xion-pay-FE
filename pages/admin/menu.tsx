import { AuthLayout } from "@layouts";
import Link from "next/link";
import React, { FC, useState } from "react";
import { PageAnimation } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { AdminNavbar } from "@/components/shared";
import { Circle, EllipsisVertical, LayoutGrid, List } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import Container from "@/components/shared/container";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Menu } from "@/types";
import Image from "next/image";
import orderImg from "public/orderimg.png";
import { handleRowClick } from "@/utils/modal";
import Sidebar from "@/components/shared/nav/sidebar";
import AdminMenuTable from "@/components/shared/admin/table/menu";

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
const defaultInvoice: Menu = {
  Category: "",
  MenuId: 0,
  mealImage: "",
  Name: "",
  Price: 0,
  Discount: "",
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
  const [selectedInvoice, setSelectedInvoice] = useState<Menu>(defaultInvoice);

  let tabKey: any = "";
  let tabValue: any = "";
  let title = "Menu";

  const handleTabChange: any = (event: any, key: any, value: any) => {
    tabKey = key;
    tabValue = value;
  };

  return (
    //TODO: heading all pages
    <AuthLayout heading={"Welcome"} title={title}>
      <AdminNavbar title={title} />
      <PageAnimation>
        <div className="flex justify-end h-screen w-full">
          <Sidebar />
          <Container>
            <div className="authcard3 h-fit lg:px-12 md:px-8 px-0">
              <Tabs defaultValue={tabs[0]} className="w-full">
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
            </div>
          </Container>
        </div>
      </PageAnimation>
    </AuthLayout>
  );
};

export default Menu;

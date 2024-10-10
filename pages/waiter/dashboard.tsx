"use client";
import { AuthLayout } from "@layouts";
import Link from "next/link";
import React, { FC } from "react";
import { PageAnimation } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/shared";
import {
  BookCheck,
  CalendarFold,
  ChevronRight,
  Circle,
  ClipboardPlus,
  Clock,
  EllipsisVertical,
  Mail,
  MessageCircleQuestion,
  NotepadText,
  Plus,
  ScrollText,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/container";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import orderImg from "public/orderimg.png";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/shared/nav/sidebar";
import AdminOrdersTable from "@/components/shared/admin/table/orders";
const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false }
);

export const description = "A line chart with dots";

const customersChartData = [
  { month: "January", desktop: 80 },
  { month: "February", desktop: 105 },
  { month: "March", desktop: 137 },
  { month: "April", desktop: 173 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
];

const ordersChartData = [
  { month: "January", desktop: 80 },
  { month: "February", desktop: 105 },
  { month: "March", desktop: 137 },
  { month: "April", desktop: 173 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
];

const revenuesChartData = [
  { month: "January", desktop: 80 },
  { month: "February", desktop: 105 },
  { month: "March", desktop: 137 },
  { month: "April", desktop: 173 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0000FF",
  },
} satisfies ChartConfig;

const tabs = ["yesterday", "today", "This Week", "This Month", "This Year"];
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
    Status: "completed",
  },
  {
    value: "all",
    OrderID: 11360,
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
    Status: "pending",
  },
];
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

const taskData = [
  {
    title: "meeting with co-workers",
    startTime: "11:00am",
    endTime: "1:00pm",
    priority: "medium",
  },
  {
    title: "review with manager",
    startTime: "6:30pm",
    endTime: "8:00pm",
    priority: "low",
  },
  {
    title: "cash-in yesterday's sales",
    startTime: "4:00pm",
    endTime: "5:00pm",
    priority: "high",
  },
];
const activityData = [
  {
    title: "fried rice preparation",
    startTime: "11:00am",
    endTime: "1:00pm",
    assignedTo: [
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
    ],
  },
  {
    title: "chicken soup preparation",
    startTime: "6:30pm",
    endTime: "8:00pm",
    assignedTo: [],
  },
  {
    title: "dishwashing",
    startTime: "4:00pm",
    endTime: "5:00pm",
    assignedTo: [
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
      {
        profileImage: "macaroni-image.jpg",
        name: "John Berger",
      },
    ],
  },
];

const tabActivitiesHeaders = {
  pending: "pending",
  completed: "completed",
};
let tabKey: any = "";
let tabValue: any = "";

const handleTabChange: any = (event: any, key: any, value: any) => {
  tabKey = key;
  tabValue = value;
};
const WaiterDashboard: FC = () => {
  let title = "Dashboard";
  //TODO: chart mobile view
  //TODO: next waiter admin routing for sidenavbar
  return (
    <AuthLayout title={title}>
      <AdminNavbar title={title} />
      <PageAnimation>
        <div className="flex justify-end h-screen w-full">
          <Sidebar />

          <Container>
            <div className="authcard3 h-fit lg:px-12 md:px-8 px-0">
              <Tabs defaultValue={tabs[0]} className="w-full">
                <ScrollArea className="px-3 w-full whitespace-nowrap">
                  <div className="flex justify-between items-center lg:flex-row flex-col-reverse">
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
                    <div className="flex justify-end w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          className="cursor-pointer bg-[#424141d6]"
                        >
                          <div className="lg:text-base md:text-sm md:flex hidden transparent-btn text-secondary-border lg:p-3 p-1">
                            <Plus />
                            <p>Customize Dashboard</p>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-none backdrop-blur-sm text-white bg-gray-300/30 w-56">
                          <DropdownMenuLabel className="px-1 py-0">
                            <div>
                              <p className="text-sm">Customize Dashboard</p>
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <CalendarFold className="mr-2 h-4 w-4" />
                                <span>Calender</span>
                              </div>

                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <ScrollText className="mr-2 h-4 w-4" />
                                <span>List</span>
                              </div>
                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Message Box</span>
                              </div>
                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                <span>Profit</span>
                              </div>
                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span>Recent Orders</span>
                              </div>
                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <ClipboardPlus className="mr-2 h-4 w-4" />
                                <span>Reports</span>
                              </div>
                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between">
                              <div className="flex items-center">
                                <BookCheck className="mr-2 h-4 w-4" />
                                <span>Tasks</span>
                              </div>
                              <div className="flex text-xs items-center text-green-400">
                                <Plus className="mr-2 h-3 w-3" />
                                <span>Add</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                {tabs.map((item, index) => (
                  <TabsContent value={item}>
                    <div className="w-full">
                      <div className="flex gap-y-6 md:px-0 px-3 flex-col w-full h-full">
                        <div className="pt-4 rounded-md px-3 lg:gap-y-0 gap-y-3 flex pb-4 gap-x-4 lg:flex-row flex-col">
                          <div className="lg:w-[70%] w-full h-fit flex flex-col gap-y-4 justify-between">
                            <div className="w-full overflow-x-scroll flex md:justify-start gap-x-4">
                              <div
                                className={`
                                    bg-primary-dark md:min-w-max min-w-80 w-full h-full cursor-pointer text-sm text-white rounded-md py-1`}
                              >
                                <div className="text-secondary-border w-full">
                                  <div className="p-2">
                                    <div className="text-secondary-border font-medium flex justify-between">
                                      <h1 className="text-lg">Customers</h1>
                                      <div className="flex gap-x-4">
                                        <EllipsisVertical />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-between">
                                    <Card className="text-slate-100 w-full rounded-none bg-transparent border-none">
                                      <CardHeader className="px-2 py-2">
                                        <CardTitle className="flex justify-between">
                                          <p className="font-medium">673</p>
                                          <div className="flex w-28 items-center">
                                            <TrendingDown className="w-8 pr-1 text-red-600" />

                                            <p className="text-sm font-medium leading-4">
                                              5% less than last month
                                            </p>
                                          </div>
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-0 h-20">
                                        <ChartContainer
                                          config={chartConfig}
                                          className="w-full h-full"
                                        >
                                          <AreaChart
                                            accessibilityLayer
                                            data={customersChartData}
                                            margin={{
                                              left: 12,
                                              right: 12,
                                            }}
                                          >
                                            <ChartTooltip
                                              cursor={false}
                                              content={<ChartTooltipContent />}
                                            />
                                            <defs>
                                              <linearGradient
                                                id="fillDesktop"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                              >
                                                <stop
                                                  offset="5%"
                                                  stopColor="white"
                                                  stopOpacity={0.8}
                                                />
                                                <stop
                                                  offset="95%"
                                                  stopColor="white"
                                                  stopOpacity={0.1}
                                                />
                                              </linearGradient>
                                            </defs>
                                            <Area
                                              className="w-full"
                                              dataKey="desktop"
                                              type="natural"
                                              fill="url(#fillDesktop)"
                                              fillOpacity={0.2}
                                              stroke="red"
                                              stackId="a"
                                            />
                                          </AreaChart>
                                        </ChartContainer>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`
                                    bg-primary-dark h-full md:min-w-max min-w-80 w-full cursor-pointer text-sm text-white rounded-md py-1`}
                              >
                                <div className="text-secondary-border w-full">
                                  <div className="p-2">
                                    <div className="text-secondary-border font-medium flex justify-between">
                                      <h1 className="text-lg">Orders</h1>
                                      <div className="flex gap-x-4">
                                        <EllipsisVertical />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-between">
                                    <Card className="text-slate-100 w-full rounded-none bg-transparent border-none">
                                      <CardHeader className="px-2 py-2">
                                        <CardTitle className="flex justify-between">
                                          <p className="font-medium">865</p>
                                          <div className="flex w-28 items-center">
                                            <TrendingUp className="w-8 pr-1 text-green-600" />

                                            <p className="text-sm font-medium leading-4">
                                              10% more than last month
                                            </p>
                                          </div>
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-0 h-20">
                                        <ChartContainer
                                          config={chartConfig}
                                          className="w-full h-full"
                                        >
                                          <AreaChart
                                            accessibilityLayer
                                            data={ordersChartData}
                                            margin={{
                                              left: 12,
                                              right: 12,
                                            }}
                                          >
                                            <ChartTooltip
                                              cursor={false}
                                              content={<ChartTooltipContent />}
                                            />
                                            <defs>
                                              <linearGradient
                                                id="fillDesktop"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                              >
                                                <stop
                                                  offset="5%"
                                                  stopColor="white"
                                                  stopOpacity={0.8}
                                                />
                                                <stop
                                                  offset="95%"
                                                  stopColor="white"
                                                  stopOpacity={0.1}
                                                />
                                              </linearGradient>
                                            </defs>
                                            <Area
                                              className="w-full"
                                              dataKey="desktop"
                                              type="natural"
                                              fill="url(#fillDesktop)"
                                              fillOpacity={0.2}
                                              stroke="green"
                                              stackId="a"
                                            />
                                          </AreaChart>
                                        </ChartContainer>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`
                                    bg-primary-dark h-full md:min-w-max min-w-80 w-full cursor-pointer text-sm text-white rounded-md py-1`}
                              >
                                <div className="text-secondary-border w-full">
                                  <div className="p-2">
                                    <div className="text-secondary-border font-medium flex justify-between">
                                      <h1 className="text-lg">Revenue</h1>
                                      <div className="flex gap-x-4">
                                        <EllipsisVertical />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-between">
                                    <Card className="text-slate-100 w-full rounded-none bg-transparent border-none">
                                      <CardHeader className="px-2 py-2">
                                        <CardTitle className="flex justify-between">
                                          <p className="font-medium">$95000</p>
                                          <div className="flex w-28 items-center">
                                            <TrendingUp className="w-8 pr-1 text-green-600" />

                                            <p className="text-sm font-medium leading-4">
                                              5% more than last month
                                            </p>
                                          </div>
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-0 h-20">
                                        <ChartContainer
                                          config={chartConfig}
                                          className="w-full h-full"
                                        >
                                          <AreaChart
                                            accessibilityLayer
                                            data={revenuesChartData}
                                            margin={{
                                              left: 12,
                                              right: 12,
                                            }}
                                          >
                                            <ChartTooltip
                                              cursor={false}
                                              content={<ChartTooltipContent />}
                                            />
                                            <defs>
                                              <linearGradient
                                                id="fillDesktop"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                              >
                                                <stop
                                                  offset="5%"
                                                  stopColor="white"
                                                  stopOpacity={0.8}
                                                />
                                                <stop
                                                  offset="95%"
                                                  stopColor="white"
                                                  stopOpacity={0.1}
                                                />
                                              </linearGradient>
                                            </defs>
                                            <Area
                                              className="w-full"
                                              dataKey="desktop"
                                              type="natural"
                                              fill="url(#fillDesktop)"
                                              fillOpacity={0.2}
                                              stroke="green"
                                              stackId="a"
                                            />
                                          </AreaChart>
                                        </ChartContainer>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex lg:gap-y-0 gap-y-3 gap-x-4 lg:h-[25rem] lg:flex-row flex-col">
                              <div className="lg:w-1/2">
                                <div className="rounded-md md:w-auto w-full h-fit bg-primary-dark ">
                                  <div className="border-b border-primary-border">
                                    <div className="p-2 text-secondary-border font-medium flex justify-between pb-4">
                                      <h1 className="text-lg">Your Tasks</h1>
                                      <div className="flex gap-x-4">
                                        <EllipsisVertical />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-6">
                                    <Tabs
                                      defaultValue={
                                        Object.keys(
                                          tabActivitiesHeaders || {}
                                        )[0]
                                      }
                                      className="w-full"
                                    >
                                      <div className="flex justify-between  md:gap-x-16 gap-x-0">
                                        <TabsList className="w-fit rounded-lg bg-secondary-dark">
                                          {Object.entries(
                                            tabActivitiesHeaders || {}
                                          ).map(([key, value], index): any => (
                                            <TabsTrigger
                                              value={key}
                                              onClick={(event) =>
                                                handleTabChange(
                                                  event,
                                                  key,
                                                  value
                                                )
                                              }
                                              className="active-sub-tab text-xs md:px-6 py-1 rounded-lg capitalize"
                                            >
                                              {value as string}
                                            </TabsTrigger>
                                          ))}
                                        </TabsList>
                                        <Button className="transparent-btn">
                                          All Tasks
                                        </Button>
                                      </div>
                                      {Object.keys(
                                        tabActivitiesHeaders || {}
                                      ).map((item, index) => (
                                        <TabsContent
                                          value={item}
                                          className="w-full pt-3"
                                        >
                                          <div className="flex flex-col gap-y-2">
                                            {taskData
                                              .slice(0, 3)
                                              .map((item, index) => (
                                                <div className="py-3 bg-secondary-dark rounded-md">
                                                  <div className="px-2 border-l-2 border-primary-green text-secondary-border items-center flex justify-between">
                                                    <div className="text-sm w-1/2">
                                                      <p className="capitalize truncate text-base text-white">
                                                        {item.title}
                                                      </p>
                                                      <div className="flex items-center gap-x-1">
                                                        <Clock className="w-4 h-4" />
                                                        <p>
                                                          {item.startTime}-
                                                          {item.endTime}
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="w-1/2 flex justify-end items-center gap-x-2">
                                                      <p
                                                        className={`status-${item.priority} font-medium text-sm text-center flex items-center rounded-lg py-[0.1rem] px-3 w-fit`}
                                                      >
                                                        {item.priority}
                                                      </p>
                                                      <button className="text-sm text-secondary-border h-fit flex rounded-xl transparent-btn py-2 px-3 ">
                                                        View
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                        </TabsContent>
                                      ))}
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                              <div className="lg:w-1/2">
                                <div className="rounded-md md:w-auto w-full h-fit bg-primary-dark ">
                                  <div className="border-b border-primary-border">
                                    <div className="p-2 text-secondary-border font-medium flex justify-between pb-4">
                                      <h1 className="text-lg">
                                        Running Activities
                                      </h1>
                                      <div className="flex gap-x-4">
                                        <EllipsisVertical />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-4 py-6">
                                    <Tabs
                                      defaultValue={
                                        Object.keys(
                                          tabActivitiesHeaders || {}
                                        )[0]
                                      }
                                      className="w-full"
                                    >
                                      <div className="flex justify-between  md:gap-x-16 gap-x-0">
                                        <TabsList className="w-fit rounded-lg bg-secondary-dark">
                                          {Object.entries(
                                            tabActivitiesHeaders || {}
                                          ).map(([key, value], index): any => (
                                            <TabsTrigger
                                              value={key}
                                              onClick={(event) =>
                                                handleTabChange(
                                                  event,
                                                  key,
                                                  value
                                                )
                                              }
                                              className="active-sub-tab text-xs md:px-6 py-1 rounded-lg capitalize"
                                            >
                                              {value as string}
                                            </TabsTrigger>
                                          ))}
                                        </TabsList>
                                        <Button className="transparent-btn">
                                          All Activities
                                        </Button>
                                      </div>
                                      {Object.keys(
                                        tabActivitiesHeaders || {}
                                      ).map((item, index) => (
                                        <TabsContent
                                          value={item}
                                          className="w-full pt-3"
                                        >
                                          <div className="flex flex-col gap-y-2">
                                            {activityData
                                              .slice(0, 3)
                                              .map((item, index) => (
                                                <div className="py-3 bg-secondary-dark rounded-md">
                                                  <div className="px-2 border-l-2 border-primary-green text-secondary-border items-center flex justify-between">
                                                    <div className="w-[15%]">
                                                      <div className="w-fit bg-primary-dark border-[5px] border-[#403e3e] rounded-full">
                                                        <p className="p-[0.3rem]">
                                                          0%
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="text-sm w-[45%]">
                                                      <p className="capitalize truncate text-base text-white">
                                                        {item.title}
                                                      </p>
                                                      <div className="flex items-center gap-x-1">
                                                        <Clock className="w-4 h-4" />
                                                        <p>
                                                          {item.startTime}-
                                                          {item.endTime}
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="w-[40%] flex justify-end items-center gap-x-2">
                                                      <div className="flex">
                                                        {item.assignedTo
                                                          .slice(0, 3)
                                                          .map(
                                                            (item, index) => (
                                                              <Image
                                                                alt="img"
                                                                src={orderImg}
                                                                className={`rounded-full border-2 border-secondary-dark w-7 relative right-${
                                                                  index * 2
                                                                } `}
                                                              />
                                                            )
                                                          )}
                                                        {item.assignedTo
                                                          .length > 3 ? (
                                                          <h1 className="relative right-6 text-xs w-fit h-fit py-[0.1rem] px-[0.2rem] text-white bg-secondary-dark border-2 border-text-completed border-dashed rounded-full">
                                                            +
                                                            {item.assignedTo
                                                              .length - 3}
                                                          </h1>
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                        </TabsContent>
                                      ))}
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-[30%] w-full overflow-hidden flex lg:flex-col md:flex-row flex-col gap-y-4">
                            <div
                              className={`
                                    bg-primary-dark   w-full h-fit cursor-pointer text-sm text-white rounded-md py-1`}
                            >
                              <div className="text-secondary-border w-full">
                                <div className="border-b border-primary-border">
                                  <div className="p-2 text-secondary-border font-medium flex justify-between pb-4">
                                    <h1 className="text-lg">Notifications</h1>
                                    <div className="flex gap-x-4">
                                      <EllipsisVertical />
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full flex flex-col gap-y-4 p-4">
                                  <div className="lg:gap-x-2 flex w-full justify-between items-center">
                                    <div className="bg-status-cancelled p-1 rounded-md">
                                      <MessageCircleQuestion className="w-5" />
                                    </div>
                                    <div className="lg:pl-0 pl-1 lg:w-48 w-44">
                                      <h1 className="text-lg text-white">
                                        Review Request
                                      </h1>
                                      <p className="truncate">
                                        New review request from Steve James for
                                        your attention.
                                      </p>
                                    </div>
                                    <p className="flex">
                                      <Clock className="w-[1.1rem]" />
                                      12:11pm
                                    </p>
                                  </div>
                                  <div className="lg:gap-x-2 flex w-full justify-between items-center">
                                    <div className="bg-status-cancelled p-1 rounded-md">
                                      <NotepadText className="w-5" />
                                    </div>
                                    <div className="lg:pl-0 pl-1 lg:w-48 w-44">
                                      <h1 className="text-lg text-white">
                                        Order Request
                                      </h1>
                                      <p className="truncate">
                                        Order for Macaroni with Chicken
                                        initiated.
                                      </p>
                                    </div>
                                    <p className="flex">
                                      <Clock className="w-[1.1rem]" />
                                      12:11pm
                                    </p>
                                  </div>
                                  <Button className="transparent-btn">
                                    View All
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`
                                    bg-primary-dark   w-full h-fit cursor-pointer text-sm text-white rounded-md py-1`}
                            >
                              <div className="text-secondary-border w-full">
                                <div className="border-b border-primary-border">
                                  <div className="p-2 text-secondary-border font-medium flex justify-between pb-4">
                                    <h1 className="text-lg">Messages</h1>
                                    <div className="flex gap-x-4">
                                      <EllipsisVertical />
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full flex flex-col gap-y-4 p-4">
                                  <div className="lg:gap-x-2 flex w-full justify-between items-center">
                                    <div className="w-10">
                                      <Image
                                        alt="img"
                                        src={orderImg}
                                        className="rounded-full"
                                      />
                                    </div>
                                    <div className="lg:pl-0 pl-1 lg:w-48 w-44">
                                      <h1 className="text-lg text-white">
                                        Damien Black
                                      </h1>
                                      <p className="truncate">
                                        Hi! Gizodo is currently finished. Please
                                        ask the customer.
                                      </p>
                                    </div>
                                    <p className="flex">
                                      <Clock className="w-[1.1rem]" />
                                      12:11pm
                                    </p>
                                  </div>
                                  <div className="lg:gap-x-2 flex w-full justify-between items-center">
                                    <div className="w-10">
                                      <Image
                                        alt="img"
                                        src={orderImg}
                                        className="rounded-full"
                                      />
                                    </div>
                                    <div className="lg:pl-0 pl-1 lg:w-48 w-44">
                                      <h1 className="text-lg text-white">
                                        Damien Black
                                      </h1>
                                      <p className="truncate">
                                        Hi! Gizodo is currently finished. Please
                                        ask the customer.
                                      </p>
                                    </div>
                                    <p className="flex">
                                      <Clock className="w-[1.1rem]" />
                                      12:11pm
                                    </p>
                                  </div>
                                  <Button className="transparent-btn">
                                    View All
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex pb-4 flex-col bg-primary-dark pt-4 rounded-md">
                          <div className="pt-4 rounded-t-md px-3 flex pb-4 border-b border-primary-border">
                            <div className="flex justify-between w-full">
                              <p className="capitalize text-lg font-medium text-secondary-border">
                                Recent Orders
                              </p>
                              <EllipsisVertical className="capitalize text-lg font-medium text-secondary-border" />
                            </div>
                          </div>

                          <AdminOrdersTable
                            tableHeaders={tableHeaders}
                            tabHeaders={tabHeaders}
                            invoiceData={invoiceData}
                            className="h-80 overflow-scroll"
                          >
                            <TableBody className="h-80">
                              {invoiceData
                                .slice(0, 10)
                                .map((invoice, index) => (
                                  <TableRow
                                    key={index}
                                    className="bg-primary-dark truncate text-center py-2 rounded-lg"
                                  >
                                    <TableCell className="truncate">
                                      <Circle
                                        fill="none"
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
                          <Link
                            href="orders"
                            className="text-white md:text-base text-sm py-2 m-auto transparent-btn w-fit px-5"
                          >
                            View All Orders
                            <ChevronRight color="#c0bfbc" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </Container>
        </div>
      </PageAnimation>
    </AuthLayout>
  );
};

export default WaiterDashboard;

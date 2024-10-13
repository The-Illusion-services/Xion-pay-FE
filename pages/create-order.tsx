import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { PageAnimation, SearchBar } from "@/components/serviette-ui";
import { Button } from "@/components/ui/button";
import { MainNavbar, Modal } from "@/components/shared";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  Clock,
  Edit3,
  EllipsisVertical,
  LoaderCircle,
  MapPin,
  Minus,
  Plus,
  Search,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/shared/container";
import { Invoice, OrderItems, OrderMenuItem } from "@/types";
import Image from "next/image";
import orderImg from "public/orderimg.png";
import orderImg2 from "public/auth-email.png";
import Sidebar from "@/components/shared/nav/sidebar/admin";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import OrderTab from "@/components/shared/waiter/create-order-tab";
import OrderDropDown from "@/components/shared/waiter/create-order-tab";

const departments: string[] = [
  "kitchen",
  "bar",
  "reception",
  "hospitality",
  "bakery",
  "counter",
  "utilities",
];
const tableHeaders = [
  "S/N",
  "OrderID",
  "Customer",
  "Table No.",
  "Menu Items",
  "Price",
  "Time of Order",
  "Assigned to",
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
    Category: "Intercontinental",
    MenuId: 101,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chicken",
    Price: "120",
    Discount: "No Discount",
    Description:
      "random text about some lorem ipsum intercontinental dish or whatever",
    Department: "Kitchen",
  },
  {
    value: "all",
    Category: "Intercontinental",
    MenuId: 102,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chickessssssssssssssssssssssssssn",
    Price: "120",
    Discount: "No Discount",
    Description:
      "random text about some lorem ipsum intercontinental dish or whatever",
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
    Description:
      "random text about some lorem ipsum intercontinental dish or whatever",
    Department: "Kitchen",
  },
  {
    value: "all",
    Category: "Intercontinental",
    MenuId: 104,
    mealImage: "macaroni-image.jpg",
    Name: "Macaroni with Chicken",
    Price: "120",
    Discount: "No Discount",
    Description:
      "random text about some lorem ipsum intercontinental dish or whatever",
    Department: "Kitchen",
  },
];

const defaultOrder: OrderItems = {
  fname: "",
  lname: "",
  phone: "",
  location: "",
  orderType: "",
  orderTime: "",
  tableNumber: "",
  handlingDepartment: [],
  orderItems: [],
};

const defaultMeal: OrderMenuItem = {
  MenuId: "",
  Name: "",
  quantity: 1,
  Price: 0,
};

const CreateOrder: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("toGo");
  const [isFormValid, setIsFormValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDepartments, setSelectedDepartments] = useState<{
    [department: string]: boolean;
  }>({});
  const [dropDown1, setDropDown1] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const [dropDown3, setDropDown3] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<OrderMenuItem>(defaultMeal);
  const [order, setOrder] = useState<OrderItems>(defaultOrder);
  const [activeId, setActiveId] = useState(null);
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
    watch,
  } = useForm({
    defaultValues: defaultOrder,
  });

  const {
    register: register2,
    setValue,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm();

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartments((prevDepartments) => {
      const newDepartments = { ...prevDepartments };
      newDepartments[department] = !newDepartments[department];

      // Update handlingDepartments in order
      if (newDepartments[department]) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          handlingDepartment: [...prevOrder.handlingDepartment, department],
        }));
      } else {
        setOrder((prevOrder) => ({
          ...prevOrder,
          handlingDepartment: prevOrder.handlingDepartment.filter(
            (d) => d !== department
          ),
        }));
      }

      return newDepartments;
    });
  };

  const saveOrderItems = (orderItems: any) => {
    console.log(orderItems);

    const items: any = {
      fname: orderItems.fname,
      lname: orderItems.lname,
      phone: orderItems.phone,
      orderType: orderItems.orderType,
      orderTime: orderItems.orderTime,
      estimatedDeliveryTime: orderItems.estimatedDeliveryTime,
    };

    setOrder((prevOrder) => ({
      ...prevOrder,
      ...items,
    }));

    console.log(order);
  };

  const addOrder = (selectedMeal: any) => {
    setActiveId(selectedMeal.MenuId);

    const mealToOrder: OrderMenuItem = {
      MenuId: selectedMeal.MenuId,
      Name: selectedMeal.Name,
      quantity: 1,
      Price: selectedMeal.Price,
    };

    const existingItem = order.orderItems.find(
      (item) => item.MenuId === mealToOrder.MenuId
    );

    if (!existingItem) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        orderItems: [...prevOrder.orderItems, mealToOrder],
      }));
    } else {
      // Update quantity if item already exists
      setOrder((prevOrder) => ({
        ...prevOrder,
        orderItems: prevOrder.orderItems.map((item) =>
          item.MenuId === mealToOrder.MenuId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    }
  };

  const handleQuantityChange = (mealIndex: number, type: string) => {
    setOrder((prevOrder) => {
      const newOrderItems = [...prevOrder.orderItems];

      return {
        ...prevOrder,
        orderItems: newOrderItems.map((item, index) =>
          index === mealIndex
            ? {
                ...item,
                quantity:
                  type === "increment"
                    ? item.quantity + 1
                    : Math.max(item.quantity - 1, 1), // Minimum quantity is 1
              }
            : item
        ),
      };
    });
  };

  const removeOrder = (itemToRemove: any) => {
    const mealToOrder: OrderMenuItem = {
      MenuId: itemToRemove.MenuId,
      Name: itemToRemove.Name,
      quantity: itemToRemove.quantity,
      Price: itemToRemove.Price,
    };

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: prevOrder.orderItems.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(mealToOrder)
      ),
    }));
  };

  const onSubmit1 = (data: any) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      ...data,
      orderItems: [...prevOrder.orderItems],
    }));
    setDropDown1(false)
  };

  const onSubmit2 = (data: any) => {
    if (selectedTab === "delivery") {
      data.tableNumber = "";
      order.tableNumber = "";
      setValue("tableNumber", "");
    }
    if (selectedTab === "dineIn") {
      data.location = "";
      data.orderTime = "";
    }
    if (selectedTab === "toGo") {
      data.location = "";
      data.orderTime = "";
      data.tableNumber = "";
      order.tableNumber = "";
      setValue("tableNumber", "");
    }

    if (
      (selectedTab === "delivery" && !data.location && !data.orderTime) ||
      (selectedTab === "delivery" && data.location === "") ||
      (selectedTab === "delivery" && data.orderTime === "")
    ) {
      return setIsFormValid(false);
    }
    if (
      (selectedTab === "dineIn" && !data.tableNumber) ||
      (selectedTab === "dineIn" && data.tableNumber === "")
    ) {
      console.log("here");

      return setIsFormValid(false);
    }

    setOrder((prevOrder) => ({
      ...prevOrder,
      ...data,
      orderType: selectedTab,
      orderItems: [...prevOrder.orderItems],
    }));
    setDropDown2(false)
    setIsFormValid(true);
    console.log("hiiii", data.tableNumber);
  };

  const isOrderComplete = () => {
    // console.log(order);
    
    return (
      order.fname !== "" &&
      order.lname !== "" &&
      order.phone !== "" &&
      order.orderType !== "" &&
      order.handlingDepartment.length > 0 &&
      order.orderItems.length > 0
    );
  };

  const handleOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("...where submit order aapi comes in");
      setSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        setOrder(defaultOrder); // clear order
        console.log("order created");

        return window.location.reload();
      }, 2000);
    }, 2000);
  };
  const title = "Create Order";

  return (
    <AuthLayout title={title}>
      <MainNavbar title={title} />
      <div className="flex justify-end h-screen w-full">
        <Container>
          <div className="authcard3 md:py-24 py-16 md:h-fit lg:px-6 md:px-8 px-0">
            {success ? (
              <div className="md:w-1/2 w-full h-screen m-auto bg-primary-dark z-50 rounded-xl">
                <div className="text-white gap-y-4 flex flex-col justify-center items-center h-full">
                  <CircleCheckBig
                    fill="green"
                    className="text-white md:w-24 md:h-20 w-16 h-20"
                  />
                  <p className="font-semibold text-lg">
                    Order Created Successfully!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full bg-primary-dark pt-4 md:pb-0 pb-6 rounded-md">
                  <div className="w-full h-full">
                    <div className="px-3 flex pb-4 border-b border-primary-border">
                      <div className="flex w-full items-center gap-x-8">
                        <h1 className="capitalize font-semibold text-white text-xl">
                          Create Order
                        </h1>
                      </div>
                      <div></div>
                    </div>
                    <div className="flex gap-x-4 pt-6 md:pb-6 pb-20 justify-between md:px-8 px-4 text-secondary-border">
                      <div className="md:w-[60%] w-full flex flex-col gap-y-3">
                        <h1 className="pb-4">Order Details</h1>
                        <div className="flex flex-col gap-y-4">
                          <div className="w-full bg-secondary-dark p-3 rounded-md">
                            <div className="flex text-white w-full pb-4 justify-between">
                              <h2 className="font-medium">Add a menu</h2>
                              <h2 className="text-primary-green">
                                Custom Order
                              </h2>
                            </div>

                            <div className="text-white w-full overflow-x-scroll flex gap-x-2">
                              <Drawer>
                                <DrawerTrigger asChild>
                                  <div className="bg-primary-dark cursor-pointer min-w-40 min-h-52 py-3 rounded-md items-center flex">
                                    <Plus className="m-auto w-5" />
                                  </div>
                                </DrawerTrigger>
                                <DrawerContent className="h-[75%] bg-secondary-dark border-secondary-transparent-border w-full flex px-4 pb-4">
                                  <div className="flex md:flex-row flex-col w-full justify-between md:items-center pt-6 pb-3">
                                    <h1 className="text-white font-medium text-xl md:pb-0 pb-4">
                                      Choose A Menu
                                    </h1>
                                    <div className="flex px-2 bg-neutral-700 items-center rounded-md">
                                      <Input
                                        placeholder="Start your search here"
                                        className="md:w-72 w-full text-white px-0 bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                                      />
                                      <Search className="text-secondary-border" />
                                    </div>
                                  </div>
                                  <div className="h-full w-full overflow-y-scroll py-4">
                                    <div className="w-full h-full flex justify-center gap-2 flex-wrap">
                                      {invoiceData.map((item, index) => (
                                        <div
                                          key={index}
                                          onClick={() => addOrder(item)}
                                          className={` 
                                        ${
                                          activeId === item.MenuId
                                            ? "border border-primary-green bg-[#1e240a]"
                                            : "bg-primary-dark"
                                        }
                                          bg-primary-dark md:w-auto w-full h-fit cursor-pointer text-sm text-white rounded-md py-3`}
                                        >
                                          <div className="flex w-full border-b border-primary-border pb-3 px-4">
                                            <div className="w-full flex flex-col items-center gap-x-1  justify-between">
                                              <p className="w-full text-end font-medium text-lg">
                                                ${item.Price}
                                              </p>

                                              <div className="flex flex-col gap-x-2 w-full">
                                                <div className="w-20 h-20 ">
                                                  <Image
                                                    alt="img"
                                                    src={orderImg}
                                                    className="w-full h-full rounded-full"
                                                  />
                                                </div>
                                                <div className="w-48">
                                                  <p className="text-lg font-medium break-all">
                                                    {item.Name}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="text-secondary-border">
                                            <div className="md:gap-x-8 gap-x-4 px-4 pt-2 flex justify-between">
                                              <div className="flex gap-x-1">
                                                <UtensilsCrossed className="w-4" />
                                                <h1>{item.Category}</h1>
                                              </div>
                                              <p
                                                className={`status-cancelled font-medium status-pending text-center flex items-center rounded-xl py-[0.1rem] px-3 w-fit`}
                                              >
                                                {item.Department}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </DrawerContent>
                              </Drawer>
                              {order.orderItems.map((item, index) => (
                                <div className="flex flex-col gap-y-2">
                                  <div
                                    key={index}
                                    className="bg-primary-dark cursor-pointer min-w-40 min-h-52 py-3 px-2 rounded-md items-center flex flex-col justify-center"
                                  >
                                    <div
                                      className="flex justify-end w-full"
                                      onClick={() => removeOrder(item)}
                                    >
                                      <X className="w-5 h-5 bg-red-600 rounded-full" />
                                    </div>
                                    <Image
                                      alt="img"
                                      src={orderImg2}
                                      className="w-24 h-24 rounded-full"
                                    />
                                    <h1 className="capitalize text-center pt-1 w-40 break-all">
                                      {item.Name}
                                    </h1>
                                  </div>
                                  <div className="flex  justify-between items-center px-3 rounded-2xl text-neutral-500 w-full h-10 bg-primary-dark">
                                    <Plus
                                      onClick={() =>
                                        handleQuantityChange(index, "increment")
                                      }
                                      className="cursor-pointer"
                                    />
                                    <p className="text-white">
                                      {item.quantity}
                                    </p>
                                    <Minus
                                      onClick={() =>
                                        handleQuantityChange(index, "decrement")
                                      }
                                      className="cursor-pointer"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Collapsible
                            open={dropDown1}
                            onOpenChange={setDropDown1}
                            className="bg-secondary-dark rounded-md"
                          >
                            <div className="flex items-center justify-between p-4">
                              <h4 className="text-sm font-semibold">
                                Add Customer Details
                              </h4>
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-9 p-0"
                                >
                                  {dropDown1 ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="px-4 py-3">
                              <form
                                onSubmit={handleSubmit1(onSubmit1)}
                                className="w-full"
                              >
                                <div className="pb-4">
                                  <Label
                                    htmlFor="fname"
                                    className="text-white font-normal"
                                  >
                                    First Name
                                  </Label>

                                  <Input
                                    type="text"
                                    id="fname"
                                    placeholder="Enter First Name"
                                    {...register1("fname", {
                                      required: true,
                                    })}
                                    className="md:w-1/2 w-full border-y-0 border-x-0 rounded-none focus:border-b-primary-orange transition-colors duration-300 border-b border-primary-border focus-visible:ring-offset-0 focus-visible:ring-0 px-0 bg-transparent"
                                  />
                                  {errors1.fname && (
                                    <p className="text-text-cancelled text-sm">
                                      First name is required
                                    </p>
                                  )}
                                </div>
                                <div className="pb-4">
                                  <Label
                                    htmlFor="lname"
                                    className="text-white font-normal"
                                  >
                                    Last Name
                                  </Label>
                                  <Input
                                    type="text"
                                    id="lname"
                                    placeholder="Enter Last Name"
                                    {...register1("lname", {
                                      required: true,
                                    })}
                                    className="md:w-1/2 w-full border-y-0 border-x-0 rounded-none focus:border-b-primary-orange transition-colors duration-300 border-b border-primary-border focus-visible:ring-offset-0 focus-visible:ring-0 px-0 bg-transparent"
                                  />
                                </div>
                                {errors1.lname && (
                                  <p className="text-text-cancelled text-sm">
                                    Last name is required
                                  </p>
                                )}
                                <div className="pb-4">
                                  <Label
                                    htmlFor="phone"
                                    className="text-white font-normal"
                                  >
                                    Phone Number
                                  </Label>
                                  <Input
                                    type="text"
                                    id="phone"
                                    placeholder="Enter Phone Number"
                                    {...register1("phone", {
                                      required: true,
                                    })}
                                    className="md:w-1/2 w-full border-y-0 border-x-0 rounded-none focus:border-b-primary-orange transition-colors duration-300 border-b border-primary-border focus-visible:ring-offset-0 focus-visible:ring-0 px-0 bg-transparent"
                                  />
                                </div>
                                {errors1.phone && (
                                  <p className="text-text-cancelled text-sm">
                                    Phone number is required
                                  </p>
                                )}

                                <div className="md:w-1/2 w-full flex gap-x-4 justify-end text-primary-green font-medium">
                                  {/* <button className="">Cancel</button> */}
                                  <button
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                </div>
                              </form>
                            </CollapsibleContent>
                          </Collapsible>
                          <Collapsible
                            open={dropDown2}
                            onOpenChange={setDropDown2}
                            className="bg-secondary-dark rounded-md"
                          >
                            <div className="flex items-center justify-between p-4">
                              <h4 className="text-sm font-semibold">
                                Add Order Type
                              </h4>
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-9 p-0"
                                >
                                  {dropDown2 ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="px-4 py-3">
                              <OrderDropDown
                                handleSubmit2={handleSubmit2}
                                onSubmit2={onSubmit2}
                                register2={register2}
                                setValue={setValue}
                                errors2={errors2}
                                isFormValid={isFormValid}
                                watch={watch}
                                setIsSubmitted={setIsSubmitted}
                                isSubmitted={isSubmitted}
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                              />
                            </CollapsibleContent>
                          </Collapsible>
                          <Collapsible
                            open={dropDown3}
                            onOpenChange={setDropDown3}
                            className="bg-secondary-dark rounded-md"
                          >
                            <div className="flex items-center justify-between p-4">
                              <h4 className="text-sm font-semibold">
                                Add Handling Department
                              </h4>
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-9 p-0"
                                >
                                  {dropDown3 ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="px-4 py-3">
                              <div className="w-full flex-wrap flex gap-4 pb-4">
                                {departments.map((item, index) => (
                                  <>
                                    {selectedDepartments[item] ? (
                                      <button
                                        key={index}
                                        onClick={() =>
                                          handleDepartmentSelect(item)
                                        }
                                        className="capitalize py-1 transparent-btn bg-slate-300 text-black rounded-lg"
                                      >
                                        <Minus className="w-5 h-5" />
                                        {item}
                                      </button>
                                    ) : (
                                      <button
                                        key={index}
                                        onClick={() =>
                                          handleDepartmentSelect(item)
                                        }
                                        className="capitalize py-1 transparent-btn rounded-lg text-secondary-border"
                                      >
                                        <Plus className="w-5 h-5" />
                                        {item}
                                      </button>
                                    )}
                                  </>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </div>
                      <div className="w-[40%] md:block hidden">
                        <h1 className="pb-4">Order Summary</h1>
                        <div className="w-full flex justify-center h-[40rem] bg-secondary-dark rounded-md">
                          {order.orderItems.length < 1 ? (
                            <p className="w-full m-auto text-center px-3">
                              Your order summar will show here.
                            </p>
                          ) : (
                            <div className="w-full flex flex-col justify-between">
                              <div className="p-3 w-full">
                                <div className="flex justify-end pb-3">
                                  <div className="flex w-[50%]">
                                    <h1>Items</h1>
                                  </div>
                                  <div className="text-primary-border text-sm flex w-[50%] items-center justify-center gap-x-4">
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
                                <div className="flex flex-col gap-y-3 pb-4">
                                  {order.orderItems.map((item, index) => (
                                    <div
                                      key={index}
                                      className="text-white items-center flex gap-x-2 rounded-lg"
                                    >
                                      <div className="w-[50%] flex gap-x-1">
                                        <div className="w-[30%] h-12">
                                          <Image
                                            src={orderImg}
                                            alt="img"
                                            className="w-full h-full"
                                          />
                                        </div>
                                        <p className="w-[70%] m-auto truncate">
                                          {item.Name}
                                        </p>
                                      </div>
                                      <div className="w-[50%] text-center gap-x-2 flex">
                                        <div className="w-[35%]">
                                          <p className="transparent-btn rounded-lg justify-center">
                                            {item.quantity}
                                          </p>
                                        </div>
                                        <div className="w-[35%]">
                                          <p>${item.Price}</p>
                                        </div>
                                        <div className="w-[30%]">
                                          <EllipsisVertical className="m-auto" />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <div className="flex justify-between py-3 items-center border-t border-primary-border text-white">
                                    <div className="text-sm w-full text-secondary-border">
                                      <div className="flex justify-between">
                                        <p>Sub-total</p>
                                        $600
                                        {/* <p>${order.Price} </p> */}
                                      </div>
                                      <div className="flex justify-between">
                                        <p>Discount</p>
                                        No discount
                                        {/* <p>${order.Discount} </p> */}
                                      </div>
                                      <div className="flex justify-between text-base font-medium ">
                                        <p>Total amount to be paid</p>
                                        $900
                                        {/* <p>${order.amountPaid} </p> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="p-3 w-full bg-neutral-700 rounded-b-md">
                                <button
                                  disabled={!isOrderComplete()}
                                  onClick={() => handleOrder()}
                                  className={`place-order-btn ${
                                    isOrderComplete()
                                      ? "bg-primary-green"
                                      : "bg-lime-700"
                                  } w-full py-2 rounded-md text-black flex items-center justify-center md:gap-x-4 gap-x-2`}
                                >
                                  <LoaderCircle
                                    className={`${
                                      isLoading ? "flex" : "hidden"
                                    } text-black w-5 h-5 rotate-icon`}
                                  />
                                  Place Order
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden flex bg-black px-4 h-20 fixed bottom-0 w-full z-50">
                  <div className="text-xs flex w-full justify-between items-center">
                    <div className="text-white font-medium w-full flex justify-between">
                      <Drawer>
                        <div className="w-full h-full flex gap-x-1">
                          <DrawerTrigger asChild>
                            <Button className="capitalize transparent-btn bg-transparent rounded-lg text-secondary-border">
                              <ChevronUp className="w-5 h-5" />
                              Order Summary
                              <p className="rounded-full border-2 px-[0.3rem] flex border-primary-green">
                                {order.orderItems.length}
                              </p>
                            </Button>
                          </DrawerTrigger>
                          <button
                            disabled={!isOrderComplete()}
                            onClick={() => handleOrder()}
                            className={`place-order-btn ${
                              isOrderComplete()
                                ? "bg-primary-green"
                                : "bg-lime-700"
                            } w-full py-2 rounded-md text-sm text-black
                             flex items-center justify-center gap-x-2
                            `}
                          >
                            <LoaderCircle
                              className={`${
                                isLoading ? "flex" : "hidden"
                              } text-black w-5 h-5 rotate-icon`}
                            />
                            Place Order
                          </button>
                        </div>
                        <DrawerContent className="h-[85%]  text-secondary-border bg-secondary-dark border-secondary-transparent-border w-full flex px-4 pb-4">
                          <div>
                            <h1 className="pb-4">Order Summary</h1>
                            <div className="w-full flex justify-center h-[40rem] bg-secondary-dark rounded-md">
                              <div className="w-full flex flex-col justify-between">
                                <div className="p-3 w-full">
                                  <div className="flex justify-end pb-3">
                                    <div className="flex w-[50%]">
                                      <h1>Items</h1>
                                    </div>
                                    <div className="text-primary-border text-sm flex w-[50%] items-center justify-center gap-x-4">
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
                                  <div className="flex flex-col gap-y-3 pb-4">
                                    {order.orderItems.map((item, index) => (
                                      <div
                                        key={index}
                                        className="text-white items-center flex gap-x-2 rounded-lg"
                                      >
                                        <div className="w-[50%] flex gap-x-1">
                                          <div className="w-[30%] h-12">
                                            <Image
                                              src={orderImg}
                                              alt="img"
                                              className="w-full h-full"
                                            />
                                          </div>
                                          <p className="w-[70%] m-auto truncate">
                                            {item.Name}
                                          </p>
                                        </div>
                                        <div className="w-[50%] text-center gap-x-2 flex">
                                          <div className="w-[35%]">
                                            <p className="transparent-btn rounded-lg justify-center">
                                              {item.quantity}
                                            </p>
                                          </div>
                                          <div className="w-[35%]">
                                            <p>${item.Price}</p>
                                          </div>
                                          <div className="w-[30%]">
                                            <EllipsisVertical className="m-auto" />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div>
                                    <div className="flex justify-between py-3 items-center border-t border-primary-border text-white">
                                      <div className="text-sm w-full">
                                        <div className="flex justify-between">
                                          <p>Sub-total</p>
                                          $600
                                          {/* <p>${order.Price} </p> */}
                                        </div>
                                        <div className="flex justify-between">
                                          <p>Discount</p>
                                          No discount
                                          {/* <p>${order.Discount} </p> */}
                                        </div>
                                        <div className="flex justify-between text-base font-medium ">
                                          <p>Total amount to be paid</p>
                                          $900
                                          {/* <p>${order.amountPaid} </p> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </AuthLayout>
  );
};

export default CreateOrder;

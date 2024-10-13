import {
  LayoutDashboard,
  NotepadText,
  UtensilsCrossed,
  ChartSpline,
  MessageSquarePlus,
  Bolt,
  ShieldQuestion,
} from "lucide-react";
import React from "react";
import { Mail, User, Users } from "lucide-react";
import Sidebar from "..";

const WaiterSidebar = () => {
  const navItems = [
    {
      title: "Dashboard",
      link: "/waiter/dashboard",
      tag: LayoutDashboard,
    },
    {
      title: "Menu",
      link: "/",
      tag: UtensilsCrossed,
    },
    {
      title: "Orders",
      link: "/waiter/orders",
      tag: NotepadText,
    },
    {
      title: "Messages",
      link: "/",
      tag: Mail,
    },
    {
      title: "Analytics",
      link: "/",
      tag: ChartSpline,
    },
    {
      title: "User Management",
      link: "/",
      tag: Users,
    },
    {
      title: "Reviews",
      link: "/",
      tag: MessageSquarePlus,
    },
    {
      title: "Profile",
      link: "/",
      tag: User,
    },
    {
      title: "Account Settings",
      link: "/",
      tag: Bolt,
    },
    {
      title: "Help Center",
      link: "/",
      tag: ShieldQuestion,
    },
  ];

  return (
    <>
      <Sidebar navItems={navItems} />
    </>
  );
};

export default WaiterSidebar;

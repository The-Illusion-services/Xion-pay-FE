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

const AdminSidebar = () => {
  const navItems = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
      tag: LayoutDashboard,
    },
    {
      title: "Menu",
      link: "/admin/menus",
      tag: UtensilsCrossed,
    },
    {
      title: "Orders",
      link: "/admin/orders",
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
      link: "/admin/users",
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

export default AdminSidebar;

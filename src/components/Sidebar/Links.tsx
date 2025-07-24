import React from "react";
import Link from "next/link";
import { SidebarState } from "@/src/app/app/layout";
import sidebarBg from "@/src/assets/sidebar-bg.png";
import Image from "next/image";

type LinkProps = {
  handleDispatch: (type: string) => void;
  state: SidebarState;
  Icon: React.ReactElement;
  title: string;
};
const SidebarLinkComp: React.FC<LinkProps> = ({
  handleDispatch,
  state,
  Icon,
  title,
}) => {
  return (
    <Link
      href={`/app/${
        title === "transactions" ? `${title}?page=1&page_size=10` : title
      }`}
      onClick={() => handleDispatch(title.toUpperCase())}
      className={`flex lg:flex-row flex-col items-center justify-center gap-1 py-2 px-3 rounded-md ${
        state[title as keyof SidebarState].isActive
          ? "text-white_primary "
          : "text-white"
      }`}
    >
      
      {Icon}
      <span className="text-xs font-light">
        {title.replace(title[0], title[0].toUpperCase())}
      </span>
      <Image
        src={sidebarBg}
        alt="sidebar"
        className={`absolute z-[-10] px-4 ml-20 lg:w-[232px] w-[40px] ${
          state[title as keyof SidebarState].isActive ? "flex" : "hidden"
        }`}
      />
    </Link>
  );
};
export default SidebarLinkComp;

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
      href={`/app/${title}`}
      onClick={() => handleDispatch(title.toUpperCase())}
      className={`w-[116px] h-[26px] flex items-center justify-center gap-x-1 ${
        state[title as keyof SidebarState].isActive && " text-white_primary font-rationalSemibold"
      } `}
    >
      {Icon}
      <div className="flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center">
        <span className="font-light">
          {title.replace(title[0], title[0].toUpperCase())}
        </span>
      </div>
      <Image
        src={sidebarBg}
        alt="sidebar"
        className={`absolute z-[-10] px-4 ml-8 w-[232px] ${
          state[title as keyof SidebarState].isActive ? "flex" : "hidden"
        }`}
      />
    </Link>
  );
};

export default SidebarLinkComp;

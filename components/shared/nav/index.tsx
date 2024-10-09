import Image from "next/image";
import Link from "next/link";
import logo from "public/Logo.png";
import { Play, SquareMenu } from "lucide-react";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar: FC = () => {
  const navItems = [
    {
      title: "Home",
      link: "#",
    },
    {
      title: "About",
      link: "#",
    },
    {
      title: "Partners",
      link: "#",
    },
    {
      title: "Documentation",
      link: "#",
    },
  ];
  const path = usePathname();

  return (
    <div>
      <div className="md:flex hidden w-full bg-black py-3 text-[#FEFEFE] items-center px-4">
        <div className="w-[20%]">
          <Image alt="logo" src={logo} className="w-32 h-8" />
        </div>

        <div className="w-[69%] flex pl-5">
          {navItems.map((item, index) => (
            <li key={index} className="list-none px-4 text-[0.98rem]">
              <Link
                href={item.link}
                className={`${
                  item.link === path ? "font-bold" : ""
                } text-base`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </div>
        <div className="w-[11%] bg-primary-orange flex justify-center py-1 rounded-md px-1">
          <Play fill="white" className="pr-2" />

          <p className="md:text-base text-sm">Watch Video</p>
        </div>
      </div>
      <div className="hidden justify-between pt-4 px-4 text-white">
        <div className="w-fit items-center bg-primary-orange flex justify-center py-1 rounded-md px-1">
          <Play fill="white" className="pr-2" />

          <p>Watch Video</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="px-0 hover:bg-none hover:text-none">
              <SquareMenu color="#A5A5A5" className="w-12 h-12" />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-0 border-none">
            <div className="text-secondary-border py-8 text-end font-medium">
            {navItems.map((item, index) => (
            <li key={index} className="list-none px-4 text-xl">
              <Link
                href={item.link}
                className={`${
                  item.link === path ? "text-yellow-400 font-bold" : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;

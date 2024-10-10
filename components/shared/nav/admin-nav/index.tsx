import Image from "next/image";
import logo from "public/Logo.png";
import { Bell, ChevronDown, SearchIcon } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/serviette-ui";
import { LogOut, Mail, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import orderImg from "public/orderimg.png";

const AdminNavbar = ({ title }: any) => {
  const navItems = [
    {
      title: "Home",
      link: "/auth/sign-up",
    },
    {
      title: "About",
      link: "/auth/sign-in",
    },
    {
      title: "Partners",
      link: "/",
    },
    {
      title: "Documentation",
      link: "/",
    },
  ];
  const path = usePathname();

  return (
    <div className="fixed top-0 z-[100] flex w-full justify-between bg-black py-3 text-[#FEFEFE] items-center px-4">
      <>
        <div className="md:flex hidden w-fit h-full pb-1 items-center">
          <Image alt="logo" src={logo} className="w-32 h-8" />
        </div>
        <div className="md:flex hidden w-fit h-full justify-start items-center xl:gap-x-64 lg:gap-x-40 md:gap-x-1">
          <div>
            <h1 className="text-xl text-secondary-border font-medium">
              {title}
            </h1>
          </div>
          <SearchBar
            placeholder="Search for menus, orders, food and more"
            className="lg:w-80 py-1"
          />
        </div>
        <div className="md:flex hidden  w-fit h-full gap-x-4 items-center">
          <div className=" bg-[#333232] h-fit bg-opacity-80 flex justify-center py-1 px-2 rounded-full w-fit">
            <Bell fill="white" className="w-[1.1rem]" />
          </div>
          <div className="md:w-fit h-fit bg-primary-orange flex justify-center px-3 p-1 rounded-md">
            <p>Invite</p>
          </div>
          <div className="w-full flex justify-center p-1rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="cursor-pointer bg-[#424141d6]"
              >
                <div className="items-center text-xs leading-4 h-fit w-fit flex bg-[#333232] px-1 py-1 rounded-full">
                  <div className="pr-2">
                    <Image
                      alt="img"
                      src={orderImg}
                      className="rounded-full w-10"
                    />
                  </div>
                  Hello,
                  <br />
                  Victoria
                  <ChevronDown className="w-7 m-auto text-secondary-border" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none backdrop-blur-sm text-white bg-gray-100/30 w-56">
                <DropdownMenuLabel className="px-1 py-0">
                  <div className="items-center text-xs leading-4 h-fit w-full flex">
                    <div className="pr-2 w-12">
                      <Image
                        alt="img"
                        src={orderImg}
                        className="rounded-full w-10"
                      />
                    </div>
                    <div>
                      <p className="text-sm">Victoria Okon</p>
                      <p className="font-normal text-xs text-gray-300">
                        Victoriaokon@email.com
                      </p>
                      <p className="text-text-completed">Admin</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut color="#c01c28" className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </>
      <>
        <div className="md:hidden flex  w-fit h-full gap-x-4 items-center">
          <div className="w-fit flex justify-center p-1rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="cursor-pointer bg-[#424141d6]"
              >
                <div className="items-center text-xs leading-4 h-fit w-fit flex bg-[#333232] px-1 py-1 rounded-full">
                  <div className="pr-2">
                    <Image
                      alt="img"
                      src={orderImg}
                      className="rounded-full w-10"
                    />
                  </div>
                  Hello,
                  <br />
                  Victoria
                  <ChevronDown className="w-7 m-auto text-secondary-border" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none backdrop-blur-sm text-white bg-gray-400/30 w-56">
                <DropdownMenuLabel className="px-1 py-0">
                  <div className="items-center text-xs leading-4 h-fit w-full flex">
                    <div className="pr-2 w-12">
                      <Image
                        alt="img"
                        src={orderImg}
                        className="rounded-full w-10"
                      />
                    </div>
                    <div>
                      <p className="text-sm">Victoria Okon</p>
                      <p className="font-normal text-xs text-gray-300">
                        Victoriaokon@email.com
                      </p>
                      <p className="text-text-completed">Admin</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut color="#c01c28" className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-32">
            <h1 className="w-full truncate text-xl text-secondary-border font-medium">
              {title}
            </h1>
            <p className="text-xs">13 Ongoing Tasks</p>
          </div>
        </div>
        <div className="md:hidden flex w-fit h-full justify-start items-center gap-x-2">
          <div className=" bg-[#333232] h-fit bg-opacity-80 flex justify-center py-1 px-2 rounded-full w-fit">
            <SearchIcon className="w-[1.1rem]" />
          </div>
          <div className=" bg-[#333232] h-fit bg-opacity-80 flex justify-center py-1 px-2 rounded-full w-fit">
            <Bell fill="white" className="w-[1.1rem]" />
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminNavbar;

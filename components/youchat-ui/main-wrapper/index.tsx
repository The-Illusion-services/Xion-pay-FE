import { PageAnimation } from "@/components/youchat-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthToken } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Bell, ChevronDown, LogOut, Mail, Settings, User } from "lucide-react";
import img from "public/auth-email.png";
export default function MainWrapper({
  content,
}: {
  content: JSX.Element | React.ReactNode;
}) {
  const { userData, logout } = useAuthToken();

  return (
    <main className="flex-1 h-screen min-h-screen">
      <header>
        <div className="fixed top-0 right-0 z-50 bg-background w-full py-1 px-3 h-14 items-center text-black flex justify-between border border-b border-b-black">
          <div className="font-semibold text-lg">
            <p>You Chat</p>
          </div>
          <div className="flex w-fit h-full gap-x-4 items-center">
            <div className="w-full flex justify-center p-1rounded-md">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="cursor-pointer px-3"
                >
                  <div className="items-center text-xs leading-4 h-fit w-fit flex bg-brown-primary border-black border px-1 py-1 rounded-2xl">
                    <div className="flex gap-x-2 items-center">
                      <div className="leading-none">
                        <h1 className="text-base">
                          {userData?.fname} {userData?.lname}
                        </h1>
                        <span className="text-xs text-black/55">
                          {userData?.username}
                        </span>
                      </div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <ChevronDown className="w-6 text-secondary-border" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border border-black border-t-0 backdrop-blur-sm text-white bg-[#dd7d024c] w-56">
                  <DropdownMenuLabel className="px-1 py-0 text-black">
                    <div className="items-center text-xs leading-4 h-fit w-full flex">
                      <div className="pr-2 w-12">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="text-sm">{userData?.fname} {userData?.lname}</p>
                        <p className="font-normal text-xs">
                        {userData?.mobile}
                        </p>
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
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem onClick={()=> logout()}>
                    <LogOut color="#c01c28" className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <section className="h-full pt-14">
        <PageAnimation>{content}</PageAnimation>
      </section>
    </main>
  );
}

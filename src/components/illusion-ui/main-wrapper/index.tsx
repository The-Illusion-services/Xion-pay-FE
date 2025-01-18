import { PageAnimation } from "@/src/components/illusion-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useAuthToken } from "@/src/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useContext } from "react";
export default function MainWrapper({
  content,
}: {
  content: JSX.Element | React.ReactNode;
}) {
  const { userData, logout } = useAuthToken();

  return (
    <main className="flex-1 h-screen min-h-screen">
      <header>
        <p>helo world</p>
      </header>
      <section className="h-full pt-14">
        <PageAnimation>{content}</PageAnimation>
      </section>
    </main>
  );
}

import Image from "next/image";
import logoBlack from "@/src/assets/logo-black.png";
import logoWhite from "@/src/assets/logo-white.png";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
};

const Navbar: React.FC<Props> = ({ setIsDarkMode, isDarkMode }) => {
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const links = [
    { title: "Home", href: "/" },
    { title: "How it works", href: "/" },
    { title: "Features", href: "/features" }
  ]
  return (
    <div className="fixed top-0 px-4 py-6 w-[100vw] lg:px-20 z-40 text-white">
      <div className="rounded-xl w-full z-40 backdrop-blur-3xl bg-transparent px-4 py-3">
        <div className="flex justify-between items-center w-full relative">
          {/* Logo */}
          <Image
            src={isDarkMode ? logoWhite : logoBlack}
            alt="logo"
            className="w-24 h-10"
          />

          <ul className="lg:flex hidden gap-8">
            {
              links.map((link) => <li key={link.title}><Link href={link.href}>{ link.title }</Link></li>)
            }
          </ul>
          
          <div>
            <Button variant={'default'} className="bg-white hover:bg-white/70 transition-all duration-2000 ease-in-out text-black font-bold">Sign Up</Button>
          </div>

        </div>
      </div>
    </div>
    
  );
  
}

export default Navbar
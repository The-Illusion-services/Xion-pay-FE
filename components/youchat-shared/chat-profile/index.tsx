import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AudioLinesIcon,
  Camera,
  Ellipsis,
  FilePenLine,
  Phone,
  Search,
} from "lucide-react";
import Image from "next/image";

import img4 from "public/Rectangle4.png";
import img5 from "public/Rectangle5.png";
import img6 from "public/Rectangle6.png";
import LinkPreview from "../link-preview";

export default function ChatProfile({
  image,
  name,
  time,
  text,
}: {
  image?: string;
  name?: string;
  time?: string;
  text?: string;
}) {
  const chats = [
    {
      name: "Lois Griffin",
      lastMessage: {
        type: "image",
        user: "recipient",
        url: ["rectangle"],
        date: "1m",
      },
    },
    {
      name: "Adam West",
      lastMessage: {
        type: "text",
        user: "sender",
        text: "what sup?",
        date: "4d",
      },
    },

    {
      name: "Brian Griffin",
      lastMessage: {
        type: "audio",
        user: "recipient",
        url: ["audiourl"],
        date: "5w",
      },
    },
  ];
  return (
    <main className="p-2 flex flex-col gap-y-5">
      <section className="w-full flex flex-col items-center">
        <Avatar className="size-24">
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold">Lois Griffin</h1>
          <p className="text-xs pb-2">+234-834-8299</p>
          <p className="text-xs text-black/55">Active 9m ago</p>
        </div>
      </section>
      <section className="w-full flex items-center justify-center">
        <div className="flex gap-x-1 text-xs text-center font-medium">
          <div>
            <div className="p-1 w-fit rounded-full  bg-brown-primary">
              <Search className="w-5 h-5 m-auto" />
            </div>
            <p>Search</p>
          </div>

          <div>
            <div className="p-1 w-fit rounded-full  bg-brown-primary">
              <Phone className="w-5 h-5 m-auto" />
            </div>
            <p>Call</p>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col justify-center">
        <Tabs
          defaultValue="media"
          className="w-full flex flex-col justify-center"
        >
          <TabsList className="bg-black/85 text-brown-secondary w-fit px-2 py-1 m-auto">
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>

          <Card className="w-full max-h-[31rem] overflow-y-scroll">
            <CardContent className="p-1">
              <TabsContent value="media">
                <div className="flex w-full justify-center flex-wrap gap-1">
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img5} className="rounded-md size-24" />
                  <Image alt="img" src={img6} className="rounded-md size-24" />
                  <Image alt="img" src={img5} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img6} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                  <Image alt="img" src={img4} className="rounded-md size-24" />
                </div>
              </TabsContent>
              <TabsContent value="links"><LinkPreview url="www.preciousaffiah.com"/></TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </section>
    </main>
  );
}

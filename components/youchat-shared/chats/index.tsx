import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  AudioLinesIcon,
  Camera,
  Ellipsis,
  FilePenLine,
  Phone,
  Search,
} from "lucide-react";
import rectangle from "public/rectangle.png";
import audio from "public/audio.png";
import { useEffect, useState } from "react";
import { UseQueryOptions, queryOptions, useQuery } from "@tanstack/react-query";
import { MessageService } from "@/services";
import { useRouter } from "next/router";

const router = useRouter();
const locale = router.locale;
// TODO: use moment for date formating
const currentDate = new Date().toLocaleTimeString(locale, {
  hour: "2-digit",
  minute: "2-digit",
});
export default function Chats({
  image,
  name,
  time,
  text,
  data,
  recipientId,
  lastMessage,
  setRecipientId,
  setCurrentRecipient,

}: {
  image?: string;
  name?: string;
  time?: string;
  text?: string;
  data?: any;
  recipientId?: string;
  lastMessage?: string;
  setRecipientId?: any;
  setCurrentRecipient?: any
}) {

  return (
    <main className="py-2">
      <section className="px-2">
        <section className="w-full flex items-center justify-between pb-2">
          <h1 className="font-semibold text-xl">Chats</h1>
          <div className="flex gap-x-1">
            <div className="p-1  rounded-full  bg-brown-primary">
              <FilePenLine className="w-5 h-5" />
            </div>
            <div className="p-1  rounded-full  bg-brown-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div className="p-1  rounded-full  bg-brown-primary">
              <Ellipsis className="w-5 h-5" />
            </div>
          </div>
        </section>
        <section className="pb-2">
          <div className="flex items-center w-full h-8 px-2 bg-brown-primary rounded-lg">
            <Search className="select-none size-5 text-black/55" />
            <Input
              type="text"
              placeholder="Search You Chat"
              className="py-0 ring-0 outline-none border-none bg-transparent placeholder:text-black/55"
            />
          </div>
        </section>
      </section>
      <section className="flex flex-col gap-y-1 h-screen overflow-y-scroll pb-36">
        {data?.map((item: any, index: number) => (
          <div key={index} className="px-2">
            <div
              onClick={() => {setRecipientId(item.contact_id._id), setCurrentRecipient({
                fname: item.contact_id.fname,
                lname: item.contact_id.lname
              })}}
              className={`w-full transition-colors transition-border duration-500 ease-in-out flex gap-x-1 p-2 rounded-lg cursor-pointer hover:bg-brown-primary ${
                recipientId === item.id ? "bg-brown-primary" : "bg-transparent"
              }`}
            >
              <Avatar className="size-11">
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 text-left text-sm justify-start my-auto w-full">
                <span className="truncate capitalize">
                  {item.contact_id.fname} {item.contact_id.lname}
                </span>
                <div className="flex gap-x-2 items-center max-w-[85%]">
                  <span className="truncate text-[0.73rem] w-[75%]">
                    {data
                      ? (lastMessage || "typing")
                      : "start conversation!"}
                  </span>
                  <span className="w-[12%]">
                    {item.lastMessage?.type === "audio" && (
                      <AudioLinesIcon className="size-4 text-black/55" />
                    )}
                    {item.lastMessage?.type === "image" && (
                      <Camera className="size-4 text-black/55" />
                    )}
                  </span>
                  {item.lastMessage && (
                    <span className="truncate text-[0.6rem] w-[13%]">
                      {new Date(item.lastMessage.date).toLocaleTimeString(
                        navigator.language,
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

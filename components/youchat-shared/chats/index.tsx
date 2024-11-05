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

export default function Chats({
  image,
  name,
  time,
  text,
  recipientId,
  setRecipientId,
}: {
  image?: string;
  name?: string;
  time?: string;
  text?: string;
  recipientId?: string | null;
  setRecipientId?: any;
}) {
  const chats = [
    {
      name: "Lois Griffin",
      id: "1",
      lastMessage: {
        type: "image",
        user: "recipient",
        url: ["rectangle"],
        date: "1m",
      },
    },
    {
      name: "Adam West",
      id: "2",
      lastMessage: {
        type: "text",
        user: "sender",
        text: "what sup?",
        date: "4d",
      },
    },

    {
      name: "Brian Griffin",
      id: "3",
      lastMessage: {
        type: "audio",
        user: "recipient",
        url: ["audiourl"],
        date: "5w",
      },
    },
  ];
  return (
    <main className="p-2">
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
      <section className="flex flex-col gap-y-1">
        {chats.map((item, index) => (
          <div
            key={index}
            onClick={() => setRecipientId(item.id)}
            className={`transition-colors transition-border duration-500 ease-in-out flex gap-x-1 relative p-2 rounded-lg cursor-pointer hover:bg-brown-primary ${
              recipientId === item.id
                ? "active-chat-width bg-gradient-to-r from-brown-primary to-brown-secondary border-black border rounded-r-none border-r-0"
                : "bg-transparent"
            }`}
          >
            <Avatar className="size-11">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 text-left text-sm">
              <span className="truncate capitalize">{item.name}</span>
              <div className="flex gap-x-2 items-center max-w-[80%]">
                {item.lastMessage.type === "text" && (
                  <span className="truncate text-[0.73rem]">
                    {item.lastMessage.text}
                  </span>
                )}
                {item.lastMessage.type === "audio" && (
                  <AudioLinesIcon className="size-4 text-black/55" />
                )}
                {item.lastMessage.type === "image" && (
                  <Camera className="size-4 text-black/55" />
                )}
                <span className="truncate text-[0.6rem]">
                  {item.lastMessage.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

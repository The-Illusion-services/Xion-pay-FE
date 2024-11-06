import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, FilePenLine, Phone, Play } from "lucide-react";
import Image from "next/image";
import rectangle from "public/rectangle.png";
import audio from "public/audio.png";

export default function ChatBox({
  recipientId,
  setRecipientId,
}: {
  recipientId?: string | null;
  setRecipientId?: any;
}) {
  const chats = [
    {
      type: "text",
      user: "recipient",
      text: "hey bro!",
    },
    {
      type: "text",
      user: "sender",
      text: "what sup?",
    },
    {
      type: "text",
      user: "recipient",
      text: "lately I'm learning about an art style called Retro",
    },

    {
      type: "image",
      user: "recipient",
      url: [rectangle],
    },
    {
      type: "text",
      user: "recipient",
      text: "while the main vintage color tones are deep, warm colors, the Retro style is more colorful when the main color tones are pastel.      ",
    },
    {
      type: "text",
      user: "sender",
      text: "wow look great!",
    },
    {
      type: "audio",
      user: "sender",
    },
    {
      type: "image",
      user: "recipient",
      url: [rectangle, rectangle, rectangle],
    },
    {
      type: "text",
      user: "recipient",
      text: "hey bro!",
    },
    {
      type: "text",
      user: "sender",
      text: "what sup?",
    },
    {
      type: "text",
      user: "recipient",
      text: "lately I'm learning about an art style called Retro",
    },

    {
      type: "image",
      user: "recipient",
      url: [rectangle],
    },
    {
      type: "text",
      user: "recipient",
      text: "while the main vintage color tones are deep, warm colors, the Retro style is more colorful when the main color tones are pastel.      ",
    },
    {
      type: "text",
      user: "sender",
      text: "wow look great!",
    },
    {
      type: "audio",
      user: "sender",
    },
    {
      type: "image",
      user: "recipient",
      url: [rectangle, rectangle, rectangle],
    },
  ];
  return (
    <div>
      {chats.map((item, index) => (
        <div
          key={index}
          className={`p-2 flex ${
            item.user === "sender" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex gap-x-1 max-w-[85%] w-fit items-end">
            {item.user !== "sender" && (
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            )}
            {item.type === "text" && (
              <div
                className={`grid flex-1 text-left text-sm leading-tight items-center py-1 px-2 rounded-xl border border-black shadow-[4px_4px_0px_0px] ${
                  item.user === "sender"
                    ? "bg-brown-primary"
                    : "bg-brown-secondary"
                }`}
              >
                <span className="text-xs capitalize">{item.text}</span>
              </div>
            )}
            {item.type === "image" && (
              <div className="cursor-pointer relative flex-1 flex flex-wrap text-left text-sm leading-tight items-center rounded-xl bg-black border border-black shadow-[4px_4px_0px_0px]">
                {item.url?.slice(0, 2).map((url, imgIndex) => (
                  <Image
                    key={imgIndex}
                    alt="img"
                    src={url}
                    className={`w-48 h-48`}
                  />
                ))}
                {(item.url?.length ?? 0) > 2 ? (
                  <div className="absolute top-0 right-0 bg-[#000000a3] w-1/2 h-full flex rounded-xl">
                    <h1 className="m-auto text-white text-2xl py-[0.1rem] px-1 border-2 border-dashed rounded-full font-medium">
                      +{(item.url?.length ?? 0) - 2}
                    </h1>
                  </div>
                ) : null}
              </div>
            )}
            {item.type === "audio" && (
              <div
                className={`flex flex-1 gap-x-1 text-left px-2 py-1 text-sm leading-tight items-center rounded-xl border border-black shadow-[4px_4px_0px_0px] ${
                  item.user === "sender"
                    ? "bg-brown-primary"
                    : "bg-brown-secondary"
                }`}
              >
                <Play className="w-5 h-5" />
                <Image alt="img" src={audio} className="h-5" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

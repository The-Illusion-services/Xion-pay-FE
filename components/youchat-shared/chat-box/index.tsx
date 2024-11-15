import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, FilePenLine, Phone, Play } from "lucide-react";
import Image from "next/image";
import rectangle from "public/rectangle.png";
import audio from "public/audio.png";
import { useEffect, useState } from "react";
import { MessageService } from "@/services";
import { useAuthToken, useSocket } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatBox({
  recipientId,
  setlastMessage,
  lastMessage,
  setConversation,
  conversation,
}: {
  recipientId: string;
  lastMessage: any;
  conversation: any;
  setlastMessage?: any;
  setConversation: any;
}) {
  const { userData } = useAuthToken();

  const { receivedMsg } = useSocket();
  console.log("con", conversation);

  // GET CURRENT CONVERSATION
  const fetchCurrentConversation = async () => {
    if (recipientId) {
      try {
        const response = await MessageService.getConversation(recipientId);
        const text = (response?.data?.data?.data).slice(-1);
        setlastMessage({ text: text[0]?.text, time: new Date().toISOString() });
        setConversation(response?.data?.data?.data);

        return response?.data?.data?.data;
      } catch (error: any) {
        console.log(error);
        throw new Error(
          error?.response?.data?.data?.message || "An error occurred"
        );
      }
    } else {
      return null;
    }
  };

  // console.log(lastMessage);

  // TODO: is loading componenent for all
  // TODO: work on time
  // TODO: work on text area for space

  useEffect(() => {
    // setPage(1);
    fetchCurrentConversation();
  }, [
    // page,
    recipientId,
    conversation,
    // lastMessage
  ]);

  return (
    <div>
      {!conversation ? (
        <div className="flex flex-col gap-y-3 px-2 pt-2">
          <div className="flex ">
            <div className="flex gap-x-1 max-w-[85%]">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-x-1 max-w-[85%]">
              <Skeleton className="h-7 w-24 rounded-xl" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {conversation?.map((item: any, index: number) => (
            <div
              key={index}
              className={`p-2 flex ${
                item.sender_id === userData?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="flex gap-x-1 max-w-[85%] w-fit items-end">
                {item.sender_id !== userData?._id && (
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="avatar"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                )}
                {item.type === "TEXT" && (
                  <div
                    className={`grid flex-1 text-left text-sm leading-tight items-center py-1 px-2 rounded-xl border border-black shadow-[4px_4px_0px_0px] ${
                      item.sender_id === userData?._id
                        ? "bg-brown-primary"
                        : "bg-brown-secondary"
                    }`}
                  >
                    <span className="text-xs">{item.text}</span>
                  </div>
                )}

                {item.type === "image" && (
                  <div className="cursor-pointer relative flex-1 flex flex-wrap text-left text-sm leading-tight items-center rounded-xl bg-black border border-black shadow-[4px_4px_0px_0px]">
                    {item.url
                      ?.slice(0, 2)
                      .map((url: string, imgIndex: number) => (
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
      )}
    </div>
  );
}

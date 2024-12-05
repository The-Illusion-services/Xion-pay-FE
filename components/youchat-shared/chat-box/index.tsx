import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle, Play } from "lucide-react";
import Image from "next/image";
import audio from "public/audio.png";
import { useContext, useEffect, useState } from "react";
import { MessageService } from "@/services";
import { useAuthToken, useSocket } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { ConversationContext } from "@/hooks/context/conversation";
import LinkPreview from "../links";
import { MessageTypeEnum } from "@/types/enum";
import { handleAxiosError } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function ChatBox({
  recipientId,
  uploadImageLoading,
  textMsgLoading,
  lastMsgId,
}: {
  recipientId: string;
  receivedMsg: any;
  uploadImageLoading: boolean;
  textMsgLoading: boolean;
  lastMsgId: any;
}) {
  const { userData } = useAuthToken();
  const [page, setPage] = useState(1);

  const { setReceivedMsg } = useSocket();
  const { conversation, initializeConversation } =
    useContext(ConversationContext);

  // GET CURRENT CONVERSATION
  const fetchCurrentConversation = async () => {
    if (recipientId) {
      try {
        const response = await MessageService.getConversation(
          recipientId,
          page
        );

        initializeConversation(response?.data?.data?.data);

        return response?.data?.data?.data;
      } catch (error: any) {
        console.error(
          error?.response?.data?.data?.message || "An error occurred"
        );
        // setError(true);
        handleAxiosError(error, "");
      }
    } else {
      return null;
    }
  };

  const { isLoading, isRefetching, refetch, isError, data } = useQuery<
    any,
    Error
  >({
    queryKey: ["get-conversation", page],
    queryFn: fetchCurrentConversation,
    gcTime: 1000 * 60 * 15, // Keep data in cache for 10 minutes
    refetchOnWindowFocus: true,
  });

  // TODO: work on text area for space

  useEffect(() => {
    // setPage(1);\
    const chatBottom = document.getElementById("chatBottom");
    console.log(chatBottom);
    
    if (chatBottom) chatBottom.scrollIntoView({ behavior: "smooth" });
    refetch;
  }, [
    // page,
    recipientId,
  ]);

  return (
    <div>
      {!conversation || isLoading ? (
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
          {conversation.map((item: any, index: number) => (
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
                {item.type === MessageTypeEnum.TEXT && (
                  <div
                    className={`grid flex-1 text-left text-sm leading-tight items-center py-1 px-2 rounded-xl border border-black shadow-[4px_4px_0px_0px] ${
                      item.sender_id === userData?._id
                        ? "bg-brown-primary"
                        : "bg-brown-secondary"
                    }`}
                  >
                    <span className="text-xs">
                      {item?.text?.includes("https") && (
                        <LinkPreview text={item.text} />
                      )}

                      {item.text}
                    </span>
                  </div>
                )}

                {item.type === MessageTypeEnum.IMAGE && (
                  <div className="cursor-pointer relative flex-1 flex flex-wrap text-left text-sm leading-tight items-center rounded-xl bg-black border border-black shadow-[4px_4px_0px_0px]">
                    {item.media
                      ?.slice(0, 2)
                      .map((url: string, imgIndex: number) => (
                        <div key={imgIndex} className="flex">
                          <img
                            alt="img"
                            src={url}
                            className="w-48 h-48 rounded-xl"
                          />
                        </div>
                      ))}
                    {(item.media?.length ?? 0) > 2 ? (
                      <div className="absolute top-0 right-0 bg-[#000000a3] w-1/2 h-full flex rounded-xl">
                        <h1 className="m-auto text-white text-2xl py-[0.1rem] px-1 border-2 border-dashed rounded-full font-medium">
                          +{(item.media?.length ?? 0) - 2}
                        </h1>
                      </div>
                    ) : null}
                  </div>
                )}
                {item.type === MessageTypeEnum.AUDIO && (
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
                {item.lastMsgId === lastMsgId &&
                  (textMsgLoading || uploadImageLoading) && (
                    <LoaderCircle
                      strokeWidth={3}
                      className="text-black w-4 h-4 rotate-icon"
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div id="chatBottom"></div>
    </div>
  );
}

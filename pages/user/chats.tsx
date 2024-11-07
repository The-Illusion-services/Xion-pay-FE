import { UserLayout } from "@layouts";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import {
  Ellipsis,
  Image,
  Mic,
  Phone,
  Send,
  SmilePlus,
} from "lucide-react";
import ChatBox from "@/components/youchat-shared/chat-box";
import ChatProfile from "@/components/youchat-shared/chat-profile";
import { useMutation } from "@tanstack/react-query";
import { MessageService } from "@/services";

const name = "Victoria";
let title = "Chat";

const Chat: FC = () => {
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  console.log(message);

  const sendMessageRequest = async () => {
    if (message.trim() === "") return;
    try {
      const response = await MessageService.sendMessage({
        text: message.trim(),
        recepient_id: recipientId || "",
        type: "TEXT",
      });
      return response?.data?.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  const { isLoading, mutate }: any = useMutation({
    mutationFn: sendMessageRequest,
    onSuccess: () => {
      setMessage("");
      // onSend();
      // let messageInput = document.getElementById("messageInput");
      // if (messageInput) messageInput.focus();
    },
    onError: (error: any) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = () => {
    mutate();
    // let messageInput = document.getElementById("messageInput");
    // console.log(messageInput);
    // if (messageInput) messageInput.focus();
  };

  return (
    <UserLayout title={title}>
      <main className="h-screen w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 h-full w-full">
          <div className="">
            <Chats recipientId={recipientId} setRecipientId={setRecipientId} />
          </div>
          <section className="md:flex flex-col hidden col-span-2 w-full h-full border border-t-0 border-black">
            <div className="flex p-2 h-14 justify-between items-center border border-b-black">
              <div className="flex gap-x-1">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Lois Griffin</span>
                  <span className="truncate text-xs">Active 9m ago</span>
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <Phone className="w-5 h-5" />
                <Ellipsis className="w-5 h-5" />
              </div>
            </div>
            <div className="h-screen overflow-y-scroll pb-44">
              <ChatBox
                recipientId={recipientId}
                setRecipientId={setRecipientId}
              />
            </div>
            <div className="flex p-2 h-14 justify-between bg-black/95 lg:w-1/2 w-full fixed bottom-14 items-center border-r border-r-black">
              <div className="w-full">
                <div className="flex  justify-between items-center gap-x-1">
                  <div className="text-brown-primary">
                    <Image className="cursor-pointer" />
                  </div>
                  <div className="flex bg-brown-secondary p-1 rounded-xl w-full">
                    <input
                      autoComplete="off"
                      id="messageInput"
                      // disabled={isLoading}
                      value={message}
                      onChange={(e) => {
                        if (e.target.value.length <= 1500) {
                          setMessage(e.target.value);
                        }
                      }}
                      // onKeyDown={handleKeyDown}
                      type="text"
                      placeholder="Message..."
                      className="w-full bg-transparent"
                    />
                    <SmilePlus className="cursor-pointer" />
                  </div>
                  <div className="relative flex items-center">
                    <button
                      onClick={() => handleSendMessage()}
                      className={`cursor-pointer rounded-full bg-brown-primary p-[0.4rem] transition-opacity duration-300 ease-in-out 
      ${
        message && message.trim().length !== 0
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
                    >
                      <Mic className="size-5" />
                    </button>

                    <button
                      onClick={() => handleSendMessage()}
                      className={`absolute  cursor-pointer rounded-full bg-brown-primary p-[0.4rem] transition-opacity duration-300 ease-in-out 
      ${
        message && message.trim().length !== 0
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
                    >
                      <Send className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="lg:grid hidden">
            <ChatProfile />
          </section>
        </div>
      </main>
    </UserLayout>
  );
};

export default Chat;

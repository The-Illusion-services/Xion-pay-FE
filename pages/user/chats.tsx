"use client";

import { UserLayout } from "@layouts";
import React, { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import {
  ChevronLeft,
  Ellipsis,
  ImageIcon,
  Mic,
  Phone,
  Send,
  SmilePlus,
} from "lucide-react";
import ChatBox from "@/components/youchat-shared/chat-box";
import ChatProfile from "@/components/youchat-shared/chat-profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MessageService } from "@/services";
import { useAuthToken } from "@/hooks";
import { TAppUser } from "@/types";
import emptyImg from "public/empty2.jpg";
import Image from "next/image";

const name = "Victoria";
let title = "Chat";

const Chat: FC = () => {
  const { userData } = useAuthToken();

  const [recipientId, setRecipientId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [lastMessage, setlastMessage] = useState({text: "", time: ""});
  const [conversation, setConversation] = useState<any | null>(null);

  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [currentRecipient, setCurrentRecipient] = useState<TAppUser | null>({
    _id: "",
    avatar: "",
    fname: "",
    lname: "",
    mobile: "",
    username: "",
  });

  // TODO: idea for implementing ws
  // when receied a message, push mesage to localConversation array
  // and refetch on chage(basically how conversatoion in performing now
  // for conversations, fetch only once, on load of screen

  // GET CHATS LIST
  const fetchChatList = async () => {
    try {
      const response = await MessageService.getChatList(page);

      return response?.data?.data?.data.results;
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error?.response?.data?.data?.message || "An error occurred"
      );
    }
  };

  const { isLoading, isRefetching, refetch, isError, data } = useQuery<
    any,
    Error
  >({
    queryKey: ["get-chat-list", page],
    queryFn: fetchChatList,
    gcTime: 1000 * 60 * 15, // Keep data in cache for 10 minutes
  });

  // TODO: check on chaching method and why it dosent shw cahced data first on reaload
  // if (isLoading) {
  //   return <ConversationListLoader />;
  // }


  // SEND MESSAGE
  const sendMessageRequest = async () => {
    if (message.trim() === "") return;
    try {
      setConversation([
        ...conversation,
        { text: message, sender_id: userData?._id },
      ]);
      setMessage("");

      const response = await MessageService.sendMessage({
        text: message.trim(),
        recepient_id: recipientId || "",
        type: "TEXT",
      });
      console.log(response?.data?.data);
      
      return response?.data?.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  const { isLoading: sendMsgLoading, mutate }: any = useMutation({
    mutationFn: sendMessageRequest,
    onSuccess: () => {
      setMessage("");
    },
    onError: (error: any) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = () => {
    mutate();
  };

  return (
    <UserLayout title={title}>
      <main className="h-screen w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 h-full w-full">
          <div className={`md:block ${open ? "hidden" : "block"}`}>
            <Chats
              recipientId={recipientId}
              setOpen={setOpen}
              open={open}
              setRecipientId={setRecipientId}
              setCurrentRecipient={setCurrentRecipient}
              data={data}
              lastMessage={lastMessage}
              isLoading={isLoading}
            />
          </div>
         {
          !recipientId ? 
          <div className="w-full h-screen lg:col-span-3 md:col-span-2">
            <Image src={emptyImg} alt="img" className="h-full w-full"/>
          </div>
          :
          <>
           <section
            className={`md:flex ${
              open ? "flex" : "hidden"
            } flex-col col-span-2 w-full h-full border border-t-0 border-black`}
          >
            <div className="flex p-2 h-14 justify-between items-center border border-b-black">
              <div className="flex gap-x-1 items-center">
                <ChevronLeft
                  className="md:hidden flex size-7 text-start cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
                <Avatar className="size-9">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentRecipient
                      ? `${currentRecipient.fname} ${currentRecipient.lname}`
                      : ""}
                  </span>
                  <span className="truncate text-xs">Active 9m ago</span>
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <Phone className="size-5" />
                <Ellipsis className="size-5" />
              </div>
            </div>
            <div className="h-screen overflow-y-scroll pb-44">
              <ChatBox
                recipientId={recipientId}
                lastMessage={lastMessage}
                setlastMessage={setlastMessage}
                setConversation={setConversation}
                conversation={conversation}
              />
            </div>
            <div className="flex p-2 h-14 justify-between bg-black/95 lg:w-1/2 md:w-[67%] w-full fixed bottom-14 items-center border-r border-r-black">
              <div className="w-full">
                <div className="flex  justify-between items-center gap-x-1">
                  <div className="text-brown-primary">
                    <ImageIcon className="cursor-pointer" />
                  </div>
                  <div className="flex bg-brown-secondary p-1 rounded-xl w-full">
                    <input
                      autoComplete="off"
                      id="messageInput"
                      // disabled={sendMsgLoading}
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
            <ChatProfile currentRecipient={currentRecipient} />
          </section>
          </>
         }
        </div>
      </main>
    </UserLayout>
  );
};

export default Chat;

"use client";

import { UserLayout } from "@layouts";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import {
  ChevronLeft,
  Dot,
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
import { ContactService, MessageService } from "@/services";
import { useAuthToken, useSocket } from "@/hooks";
import { TAppUser } from "@/types";
import emptyImg from "public/empty2.jpg";
import Image from "next/image";
import { MessageTypeEnum } from "@/types/enum";
import { ConversationContext } from "@/hooks/context/conversation";
import { generateRoomId } from "@/utils/generator";
import { handleAxiosError } from "@/utils/axios";
import { Streak } from "@/components/youchat-icons";
import { Input } from "@/components/ui/input";

let title = "Chat";

const Chat: FC = () => {
  // let base64Image: string

  const { receivedMsg } = useSocket();
  const { userData } = useAuthToken();
  const [recipientId, setRecipientId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  const { lastMessages, updateImagePreview, imagePreview } =
    useContext(ConversationContext);

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const { updateConversation } = useContext(ConversationContext);
  const [randomId, setRandomId] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );
  const [currentRecipient, setCurrentRecipient] = useState<TAppUser | null>({
    _id: "",
    avatar: "",
    fname: "",
    lname: "",
    mobile: "",
    username: "",
    onlineStatus: false,
    streak_count: 0,
  });

  const streak_count =
    lastMessages[[userData?._id, recipientId].sort().join("_")]?.streak_count ||
    currentRecipient?.streak_count;

  // GET CHATS LIST
  const fetchChatList = async () => {
    try {
      const response = await ContactService.getChatList(page);
      return response?.data?.data?.data;
    } catch (error: any) {
      console.log("error", error);
      setError(true);
      handleAxiosError(error, "");
    }
  };

  const { isLoading, isRefetching, refetch, isError, data } = useQuery<
    any,
    Error
  >({
    queryKey: ["get-chat-list", page],
    queryFn: fetchChatList,
    gcTime: 1000 * 60 * 15, // Keep data in cache for 10 minutes
    refetchOnWindowFocus: true,
  });

  // TODO: check on chaching method and why it dosent shw cahced data first on reaload

  // SEND MESSAGE
  const sendMessageRequest = async () => {
    if (message.trim() === "") return;
    try {
      setMessage("");

      updateConversation({
        text: message,
        sender_id: userData?._id,
        type: messageType,
        recepient_id: recipientId || null,
        lastMsgId: randomId,
      });

      const response = await MessageService.sendMessage({
        text: message.trim(),
        recepient_id: recipientId || "",
        type: messageType,
      });

      return response?.data?.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  const { isPending: isMsgPending, mutate }: any = useMutation({
    mutationFn: sendMessageRequest,
    onError: (error: any) => {
      console.error("Error sending message:", error);
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    setRandomId(Math.floor(100000 + Math.random() * 900000)); // Generate a new uploadId

    e.preventDefault();
    mutate();
  };
  let hi: any;
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setRandomId(Math.floor(100000 + Math.random() * 900000)); // Generate a new uploadId
      // Wait for the base64 value
      const base64Image = await convertToBase64(file).then((image) => {
        setMessageType(MessageTypeEnum.IMAGE);
        updateImagePreview(image);
        handleUploadImage(e, image, randomId);
      });

      // Update preview and message type

      // Call the upload function with the Base64 string
    } catch (error) {
      console.error("Error reading image file:", error);
    }
  };

  // Helper function to convert file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  // Function to trigger the file input click
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  // UPLOAD IMAGE
  const uploadImageRequest = async (base64Image: string) => {
    try {
      setMessage("");

      updateConversation({
        sender_id: userData?._id,
        type: MessageTypeEnum.IMAGE,
        media: [base64Image],
        recepient_id: recipientId || null,
        lastMsgId: randomId,
      });

      const response = await MessageService.uploadImage({
        recepient_id: recipientId || "",
        type: MessageTypeEnum.IMAGE,
        base64: base64Image,
      });

      return response?.data?.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  const { isPending: isImagePending, mutate: imageMutate }: any = useMutation({
    mutationFn: (base64Image: string) => uploadImageRequest(base64Image),
    onError: (error: any) => {
      console.error("Error uploading image/images:", error);
    },
  });

  const handleUploadImage = async (
    e: React.FormEvent,
    base64Image: string,
    randomId: number
  ) => {
    e.preventDefault();
    imageMutate(base64Image, randomId);
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
              isLoading={isLoading}
            />
          </div>
          {!recipientId ? (
            <div className="w-full h-screen lg:col-span-3 md:col-span-2">
              <Image src={emptyImg} alt="img" className="h-full w-full" />
            </div>
          ) : (
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
                      <span className="truncate font-semibold items-center flex gap-x-2">
                        {currentRecipient
                          ? `${currentRecipient.fname} ${currentRecipient.lname}`
                          : ""}

                        {streak_count && (
                          <>
                            <Dot className="w-7 h-7" />
                            <div className="flex items-center font-normal">
                              {streak_count}
                              <Streak />
                            </div>
                          </>
                        )}
                      </span>
                      <span className="truncate text-xs">Active 5m ago</span>
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
                    receivedMsg={receivedMsg}
                    uploadImageLoading={isImagePending}
                    textMsgLoading={isMsgPending}
                    lastMsgId={randomId}
                  />
                </div>
                <div className="flex p-2 h-14 justify-between bg-black/95 lg:w-1/2 md:w-[67%] w-full fixed bottom-14 items-center border-r border-r-black">
                  <div className="w-full">
                    <form onSubmit={handleSendMessage}>
                      <div className="flex  justify-between items-center gap-x-1">
                        <Input
                          type="file"
                          accept="image/*"
                          // {...register1("mealImage")}
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <ImageIcon
                          onClick={isImagePending ? undefined : handleIconClick}
                          className={`cursor-pointer size-7 text-brown-primary ${isImagePending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <div
                          onClick={(e) => {
                            setMessageType(MessageTypeEnum.TEXT);
                          }}
                          className="flex bg-brown-secondary p-1 rounded-xl w-full"
                        >
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
                            type="text"
                            placeholder="Message..."
                            className="w-full bg-transparent focus-visible:outline-none focus-visible:ring-0"
                          />
                          <SmilePlus className="cursor-pointer" />
                        </div>
                        <div className="relative flex items-center">
                          <button
                            type="submit"
                            className={`cursor-pointer rounded-full bg-brown-primary p-[0.4rem] transition-opacity duration-300 ease-in-out 
      ${
        message && message.trim().length !== 0
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
                          >
                            <Mic
                              onClick={(e) => {
                                setMessageType(MessageTypeEnum.AUDIO);
                              }}
                              className="size-5"
                            />
                          </button>

                          <button
                            type="submit"
                            onClick={(e) => {
                              setMessageType(MessageTypeEnum.TEXT);
                            }}
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
                    </form>
                  </div>
                </div>
              </section>
              <section className="lg:grid hidden">
                <ChatProfile currentRecipient={currentRecipient} />
              </section>
            </>
          )}
        </div>
      </main>
    </UserLayout>
  );
};

export default Chat;

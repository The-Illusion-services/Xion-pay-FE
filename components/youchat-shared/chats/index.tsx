import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthToken } from "@/hooks";
import { ConversationContext } from "@/hooks/context/conversation";
import {
  AudioLinesIcon,
  Camera,
  Ellipsis,
  FilePenLine,
  Phone,
  Search,
} from "lucide-react";
import { useContext } from "react";
import moment from "moment";

// TODO: verify api's error for messge data
// TODO: remove password suggestion from web

export default function Chats({
  image,
  name,
  time,
  text,
  data,
  setOpen,
  open,
  isLoading,
  recipientId,
  setRecipientId,
  setCurrentRecipient,
}: {
  image?: string;
  name?: string;
  time?: string;
  text?: string;
  data?: any;
  setOpen: any;
  open: boolean;
  isLoading?: boolean;
  recipientId?: string;
  setRecipientId?: any;
  setCurrentRecipient?: any;
}) {
  const { lastMessages } = useContext(ConversationContext);
  const { userData } = useAuthToken();

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
        {isLoading ? (
          <div className="px-2">
            <div
              className={`w-full transition-colors transition-border duration-500 ease-in-out flex gap-x-1 p-2 rounded-lg cursor-pointer`}
            >
              <div className="flex items-center space-x-1 w-full">
                <Skeleton className="w-14 h-11 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex justify-between w-[88%]">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {data?.map((item: any, index: number) => (
              <div key={index} className="px-2">
                <div
                  onClick={() => {
                    setRecipientId(item.contact.contact_id._id),
                      setCurrentRecipient({
                        fname: item.contact.contact_id.fname,
                        lname: item.contact.contact_id.lname,
                      });
                    setOpen(!open);
                  }}
                  className={`w-full transitio-colors transition-border duration-500 ease-in-out flex gap-x-1 p-2 rounded-lg cursor-pointer hover:bg-brown-primary ${
                    recipientId === item.contact.contact_id._id
                      ? "bg-brown-primary"
                      : "bg-transparent"
                  }`}
                >
                  <Avatar className="size-11">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="avatar"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left text-sm justify-start my-auto w-full">
                    <span className="truncate capitalize">
                      {item.contact.contact_id.fname}{" "}
                      {item.contact.contact_id.lname}
                    </span>
                    <div className="flex gap-x-2 items-center">
                      <span className="truncate text-[0.73rem] w-[75%]">
                        {(lastMessages[
                            [userData?._id, item.contact.contact_id._id]
                              .sort()
                              .join("_")
                          ]?.text || item.lastMsg?.text
                          ) ||
                          "start conversation!"}
                      </span>
                      <span className="w-[12%]">
                        {item.lastMessage?.type === "audio" && (
                          <AudioLinesIcon className="size-4 text-black/55" />
                        )}
                        {item.lastMessage?.type === "image" && (
                          <Camera className="size-4 text-black/55" />
                        )}
                      </span>
                      {item.contact.contact_id && (
                        <span className="truncate text-[0.6rem] w-[13%]">
                          {lastMessages[
                            [userData?._id, item.contact.contact_id._id]
                              .sort()
                              .join("_")
                          ]?.createdAt || item.lastMsg?.createdAt
                            ? moment(
                                lastMessages[
                                  [userData?._id, item.contact.contact_id._id]
                                    .sort()
                                    .join("_")
                                ]?.createdAt || item.lastMsg?.createdAt
                              ).format("HH:mm")
                            : null}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  );
}

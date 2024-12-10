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
import { ChangeEvent, useContext, useEffect, useState } from "react";
import moment from "moment";
import { Streak } from "@/components/youchat-icons";
import { MessageTypeEnum } from "@/types/enum";
import { ContactService } from "@/services";
import { handleAxiosError } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import notFound from "public/shit.png";

// TODO: verify api's error for messge data
// TODO: remove password suggestion from web
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

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
  const { userData, onlineStat } = useAuthToken();
  const [page, setPage] = useState(1);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [query, setQuery] = useState("");

  console.log("data", data);

  // GET CONTACT SEARCH LIST
  const fetchContactSearch = async (query) => {
    if (!query) return;
    setIsSearchLoading(true);
    try {
      const response = await ContactService.SearchContact(page, query);
      const data = response?.data?.data?.data;
      console.log("filter", response?.data?.data?.data);

      setSearchData(data);
      return data;
    } catch (error: any) {
      console.log("error", error);
      // setError(true);
      handleAxiosError(error, "");
    } finally {
      setIsSearchLoading(false);
    }
  };

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);

  const debouncedHandleSearch = debounce(fetchContactSearch, 500);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchData(null);
    setQuery(query);
    debouncedHandleSearch(query);
  };

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
              onChange={handleInputChange}
            />
          </div>
        </section>
      </section>

      {searchData && searchData.length < 1 && (
        <section
          className={`flex flex-col gap-y-1 h-screen overflow-y-scroll pb-36`}
        >
          <div className="px-2 py-16">
            <div className="w-full px-2">
              <Image
                alt="img"
                src={notFound}
                className="size-12 rounded-l-md m-auto"
              />
              <p className="text-center">No results</p>
            </div>
          </div>
        </section>
      )}
      {query && (
        <section className="flex flex-col gap-y-1 h-screen overflow-y-scroll pb-36">
          {isSearchLoading ? (
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
              {searchData?.map((item: any, index: number) => (
                <div key={index} className="px-2">
                  <div
                    onClick={() => {
                      setRecipientId(item.contact._id);
                      setCurrentRecipient({
                        fname: item.contact.fname,
                        lname: item.contact.lname,
                        streak_count: item.streak_count,
                      });
                      setOpen(!open);
                    }}
                    className={`w-full transitio-colors justify-evenly items-baseline transition-border duration-500 ease-in-out flex gap-x-1 py-2 px-1 rounded-lg cursor-pointer hover:bg-brown-primary ${
                      recipientId === item.contact._id
                        ? "bg-brown-primary"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="size-11">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="avatar"
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`${
                          item.contact.onlineStatus
                            ? "bg-[#99D609] border border-lime-700"
                            : "bg-brown-secondary border border-black"
                        } rounded-full p-1.5 absolute bottom-0 z-50`}
                      ></div>
                    </div>
                    <div className="flex flex-col text-left text-sm justify-start my-auto w-[75%]">
                      <span className="truncate capitalize">
                        {item.contact.fname} {item.contact.lname}
                      </span>
                      <div className="flex gap-x-2 items-center">
                        <span className="truncate text-[0.73rem] w-[75%]">
                          {((lastMessages[
                            [userData?._id, item.contact._id].sort().join("_")
                          ]?.type || item.lastMsg?.type) ===
                            MessageTypeEnum.TEXT &&
                            lastMessages[
                              [userData?._id, item.contact._id].sort().join("_")
                            ]?.text) ||
                            item.lastMsg?.text}

                          {(lastMessages[
                            [userData?._id, item.contact._id].sort().join("_")
                          ]?.type || item.lastMsg?.type) ===
                            MessageTypeEnum.IMAGE && (
                            <div className="flex items-center gap-x-3">
                              <p>sent a photo</p>
                              <Camera className="size-4 text-black/55" />
                            </div>
                          )}
                          {!lastMessages[
                            [userData?._id, item.contact._id].sort().join("_")
                          ]?.type &&
                            !item.lastMsg?.type &&
                            "start conversation!"}
                        </span>
                        {item.contact && (
                          <span className="truncate text-end text-[0.6rem] w-[13%]">
                            {lastMessages[
                              [userData?._id, item.contact._id].sort().join("_")
                            ]?.createdAt || item.lastMsg?.createdAt
                              ? moment(
                                  lastMessages[
                                    [userData?._id, item.contact._id]
                                      .sort()
                                      .join("_")
                                  ]?.createdAt || item.lastMsg?.createdAt
                                ).format("HH:mm")
                              : null}
                          </span>
                        )}
                      </div>
                    </div>
                    {lastMessages[
                      [userData?._id, item.contact._id].sort().join("_")
                    ]?.streak_count > 0 || item.streak_count > 0 ? (
                      <Streak />
                    ) : null}
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      )}

      {!query && (
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
                      setRecipientId(item.contact.contact_id._id);
                      setCurrentRecipient({
                        fname: item.contact.contact_id.fname,
                        lname: item.contact.contact_id.lname,
                        streak_count: item.streak_count,
                      });
                      setOpen(!open);
                    }}
                    className={`w-full transitio-colors justify-evenly items-baseline transition-border duration-500 ease-in-out flex gap-x-1 py-2 px-1 rounded-lg cursor-pointer hover:bg-brown-primary ${
                      recipientId === item.contact.contact_id._id
                        ? "bg-brown-primary"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="size-11">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="avatar"
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`${
                          item.contact.contact_id.onlineStatus
                            ? "bg-[#99D609] border border-lime-700"
                            : "bg-brown-secondary border border-black"
                        } rounded-full p-1.5 absolute bottom-0 z-50`}
                      ></div>
                    </div>
                    <div className="flex flex-col text-left text-sm justify-start my-auto w-[75%]">
                      <span className="truncate capitalize">
                        {item.contact.contact_id.fname}{" "}
                        {item.contact.contact_id.lname}
                      </span>
                      <div className="flex gap-x-2 items-center">
                        <span className="truncate text-[0.73rem] w-[75%]">
                          {((lastMessages[
                            [userData?._id, item.contact.contact_id._id]
                              .sort()
                              .join("_")
                          ]?.type || item.lastMsg?.type) ===
                            MessageTypeEnum.TEXT &&
                            lastMessages[
                              [userData?._id, item.contact.contact_id._id]
                                .sort()
                                .join("_")
                            ]?.text) ||
                            item.lastMsg?.text}

                          {(lastMessages[
                            [userData?._id, item.contact.contact_id._id]
                              .sort()
                              .join("_")
                          ]?.type || item.lastMsg?.type) ===
                            MessageTypeEnum.IMAGE && (
                            <div className="flex items-center gap-x-3">
                              <p>sent a photo</p>
                              <Camera className="size-4 text-black/55" />
                            </div>
                          )}
                          {!lastMessages[
                            [userData?._id, item.contact.contact_id._id]
                              .sort()
                              .join("_")
                          ]?.type &&
                            !item.lastMsg?.type &&
                            "start conversation!"}
                        </span>
                        {item.contact.contact_id && (
                          <span className="truncate text-end text-[0.6rem] w-[13%]">
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
                    {lastMessages[
                      [userData?._id, item.contact.contact_id._id]
                        .sort()
                        .join("_")
                    ]?.streak_count > 0 || item.streak_count > 0 ? (
                      <Streak />
                    ) : null}
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      )}
    </main>
  );
}

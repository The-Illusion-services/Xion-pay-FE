import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import { Ellipsis, FilePenLine, Phone } from "lucide-react";
import ChatBox from "@/components/youchat-shared/chat-box";
import ChatProfile from "@/components/youchat-shared/chat-profile";

const name = "Victoria";
let title = "Start";

const Start: FC = () => {
  const [recipientId, setRecipientId] = useState<string | null>(null);

  return (
    <AuthLayout title={title}>
      <main className="h-screen w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 h-full w-full">
          <Chats recipientId={recipientId} setRecipientId={setRecipientId} />
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
            <div>
              <ChatBox
                recipientId={recipientId}
                setRecipientId={setRecipientId}
              />
            </div>
          </section>
          <section className="lg:grid hidden">
            <ChatProfile />
          </section>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Start;

import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import {
  Ellipsis,
  FilePenLine,
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
let title = "Sign Up";

const SignUp: FC = () => {
  return (
    <AuthLayout title={title}>
      <main className="h-screen w-full">
        <form>
            <label>Mobile Number</label>
            <input/>

            <label>Password</label>
            <input/>
        </form>
      </main>
    </AuthLayout>
  );
};

export default SignUp;

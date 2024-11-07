import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import ChatBox from "@/components/youchat-shared/chat-box";
import ChatProfile from "@/components/youchat-shared/chat-profile";
import { useMutation } from "@tanstack/react-query";
import { MessageService } from "@/services";
import img1 from "public/authimg1.jpg";
import img2 from "public/authimg2.jpg";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const name = "Victoria";
let title = "Sign Up";

const SignUp: FC = () => {
  return (
    <AuthLayout title={title}>
      <main className="h-full w-full flex">
        <div className="md:grid grid-cols-4 md:pt-0 pt-6 w-full">
          <section className="md:col-span-2 col-span-4">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="md:text-3xl md:text-start text-center font-medium">Create an account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Input
                      id="text"
                      type="text"
                      placeholder="Name"
                      required
                      className="placeholder:font-medium px-5 rounded-3xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      {/* <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link> */}
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      required
                      className="placeholder:font-medium px-5 rounded-3xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Mobile"
                      required
                      className="placeholder:font-medium px-5 rounded-3xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      className="placeholder:font-medium px-5 rounded-3xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full  h-12 bg-black/90 text-brown-secondary font-semibold text-base rounded-3xl"
                  >
                    Sign up
                  </Button>
                </div>
                <div className="mt-4 text-center font-medium text-sm">
                  Already have an account?{" "}
                  <Link href="sign-in" className="underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="md:col-span-2 md:flex hidden justify-center">
            <div className="rotate-12 h-fit rounded-3xl  border-4 border-black shadow-[8px_10px_0px_0px] w-fit">
              <Image
                alt="img"
                src={img1}
                className="lg:w-[30rem] w-72 lg:h-[26rem] h-72 rounded-3xl"
              />
            </div>
          </section>
        </div>
      </main>
    </AuthLayout>
  );
};

export default SignUp;

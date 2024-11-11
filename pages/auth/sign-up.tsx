"use client";

import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import ChatBox from "@/components/youchat-shared/chat-box";
import ChatProfile from "@/components/youchat-shared/chat-profile";
import { useMutation } from "@tanstack/react-query";
import { AuthService, MessageService } from "@/services";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/router";
import { useAuthToken } from "@/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ToastMessage from "@/components/youchat-ui/toast-message";

// TODO: trimbackend fields for form

const formSchema = z
  .object({
    fname: z
      .string()
      .min(3, {
        message: "fisrt name must be at least 3 characters.",
      })
      .trim(),
    lname: z
      .string()
      .min(3, {
        message: "last name must be at least 3 characters.",
      })
      .trim(),
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .toLowerCase()
      .trim(),
    mobile: z
      .string()
      .length(13, { message: "Mobile number must be exactly 13 characters." }) // String with exactly 12 characters
      .trim(),
    password: z
      .string()
      .min(7, {
        message: "Username must be at least 7 characters.",
      })
      .trim(),
  })
  .required();

let title = "Sign Up";

const SignUp: FC = () => {
  const router = useRouter();
  const { updateUser } = useAuthToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      username: "",
      mobile: "",
      password: "",
    },
    mode: "onChange", // Ensures validation checks on each change
  });

  const registerRequest: any = async () => {
    try {
      const response = await AuthService.register(form.getValues());

      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.data?.message || "An error occurred"
      );
    }
  };

  //TODO: make mobile number unique- logging db duplicate error
  // TODO: all password fields shoudl show as password

  const mutation: any = useMutation({
    mutationFn: registerRequest,
    onSuccess: (res: any) => {
      console.log(res.data.data);
      updateUser(res.data.data);
      router.push("/user/chats");
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <AuthLayout title={title}>
      <main className="h-full w-full flex">
        <div className="md:grid grid-cols-4 md:pt-0 pt-6 w-full items-center justify-center">
          <section className="md:col-span-2 col-span-4">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="md:text-3xl md:text-start text-center font-medium">
                  Create an account
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {mutation.isError && (
                  <motion.div
                    initial={{ y: -20, opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0.2 }}
                  >
                    <ToastMessage
                      message={
                        mutation?.error?.message ||
                        "An error occured during sign up"
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="fname"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              {...field}
                              className="placeholder:font-medium px-5 rounded-3xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lname"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              {...field}
                              className="placeholder:font-medium px-5 rounded-3xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              placeholder="Username"
                              {...field}
                              className="placeholder:font-medium px-5 rounded-3xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              placeholder="Mobile Number"
                              {...field}
                              className="placeholder:font-medium px-5 rounded-3xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              className="placeholder:font-medium px-5 rounded-3xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button
                        type="submit"
                        disabled={!form.formState.isValid}
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
                  </form>
                </Form>
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

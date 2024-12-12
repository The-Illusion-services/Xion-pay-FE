"use client";

import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/router";
import { useAuthToken } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/illusion-ui/input/input";
import { LoaderCircle } from "lucide-react";
import ToastMessage from "@/components/illusion-ui/toast-message";
import confirmEmail from "public/confirm-email.png";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PageAnimation } from "@/components/illusion-ui";

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "code must be 6 characters.",
  }),
});

export default function ConfirmVerfificationCode() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  const { userData } = useAuthToken();
  const registerRequest: any = async () => {
    try {
      const response = await AuthService.confirmCode(form.getValues());

      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          "An error occurred"
      );
    }
  };

  const mutation: any = useMutation({
    mutationFn: registerRequest,
    onSuccess: (res: any) => {
      // updateUser(res.data.data);
    //   router.push("/user/chats");
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <PageAnimation>
      <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
        <AnimatePresence>
          {mutation.isError && (
            <motion.div
              initial={{ y: -20, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0.2 }}
            >
              <ToastMessage
                message={
                  mutation?.error?.message || "An error occured during sign in"
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Image alt="img" src={confirmEmail} className="m-auto md:size-auto" />
        <CardHeader className="p-0 text-center">
          <CardTitle className="md:text-2xl text-lg font-medium">
            Enter your verification code
          </CardTitle>
          <CardDescription className="font-normal">
            We sent a verfifcaion code to{" "}
            {userData?.email || (
              <span className="lowercase">johnDoe@mail.com</span>
            )}
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center flex-col items-center"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="py-5">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="p-0 w-full">
                <Button className="md:text-base text-sm bg-indigo-primary w-full">
                  Verify Email Address
                  {mutation.isPending && (
                    <LoaderCircle
                      strokeWidth={3}
                      className="flex
                        text-white w-5 h-5 rotate-icon"
                    />
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardHeader>
      </Card>
    </PageAnimation>
  );
}

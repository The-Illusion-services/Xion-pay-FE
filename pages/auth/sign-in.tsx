import { AuthLayout } from "@layouts";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chats from "@/components/youchat-shared/chats";
import ChatBox from "@/components/youchat-shared/chat-box";
import ChatProfile from "@/components/youchat-shared/chat-profile";
import { useMutation } from "@tanstack/react-query";
import { AuthService, MessageService } from "@/services";
import img1 from "public/authimg1.jpg";
import img2 from "public/authimg2.png";
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
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useAuthToken } from "@/hooks";
import ToastMessage from "@/components/youchat-ui/toast-message";
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
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const name = "Victoria";
let title = "Sign In";
const formSchema = z
  .object({
    mobile: z.string().min(1, {
      message: "invalid mobile number.",
    }).trim(),
    password: z.string().min(1, {
      message: "enter password.",
    }).trim(),
  })
  .required();

const SignIn: FC = () => {
  const path = usePathname();
  const router = useRouter();
  const { updateUser, userData } = useAuthToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
    mode: "onChange", // Ensures validation checks on each change
  });

  const loginRequest: any = async () => {
    try {
      const response = await AuthService.login(form.getValues());

      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "An error occurred"
      );
    }
  };

  const mutation: any = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res: any) => {
      updateUser(res.data.data);
      router.push("/user/chats");
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <AuthLayout title={title}>
      <main className="h-full w-full flex">
        <div className="md:grid grid-cols-4 md:pt-0 pt-6 w-full">
          <section className="md:col-span-2 col-span-4">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="md:text-3xl md:text-start text-center font-medium">
                  Sign in to account
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
                        Sign in
                      </Button>
                    </div>
                    <div className="mt-4 text-center font-medium text-sm">
                      Don&apos;t have an account?{" "}
                      {path === "/" ? (
                        <Link href="auth/sign-up" className="underline">
                          Sign up
                        </Link>
                      ) : (
                        <Link href="sign-up" className="underline">
                          Sign up
                        </Link>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>
          <section className="md:col-span-2 md:flex hidden justify-center">
            <div className="rotate-12 rounded-3xl h-fit border-4 border-black shadow-[8px_10px_0px_0px] w-fit">
              <Image
                alt="img"
                src={img2}
                className="lg:w-[30rem] w-72 lg:h-[26rem] h-72 rounded-3xl"
              />
            </div>
          </section>
        </div>
      </main>
    </AuthLayout>
  );
};

export default SignIn;

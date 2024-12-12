"use client";

import { AuthLayout } from "@layouts";
import React, { FC } from "react";
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/router";
import { useAuthToken } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/illusion-ui/input/input";
import { LoaderCircle } from "lucide-react";
import ToastMessage from "@/components/illusion-ui/toast-message";

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .regex(/^\S+$/, { message: "email cannot contain whitespace." }),
    password: z
      .string()
      .min(1, {
        message: "password must be at least 1 character.",
      })
      .regex(/^\S+$/, { message: "password cannot contain whitespace." }),
  })
  .required();

let title = "Log In";

const Login: FC = () => {
  const router = useRouter();
  const { updateUser } = useAuthToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          "An error occurred"
      );
    }
  };

  const mutation: any = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res: any) => {
      // updateUser(res.data.data);
      // router.push("/user/chats");
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <AuthLayout title={title}>
      <main className="h-full w-full flex capitalize">
        <div className="flex h-full w-full items-center justify-center">
          <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
            <CardHeader className="p-0 text-center">
              <CardTitle className="text-2xl font-medium">Log In</CardTitle>
              <CardDescription className="pb-4 text-border-secondary">
                Enter your credentials to acccess your account
              </CardDescription>
              <Separator />
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
                      "An error occured during sign in"
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <CardContent className="p-0 flex flex-col gap-y-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-6"
                >
                  <div className="grid w-full items-center gap-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1.5">
                          <Label htmlFor="email">Email Address</Label>
                          <FormControl>
                            <Input
                              placeholder="Enter email address"
                              autoComplete="off"
                              {...field}
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
                        <FormItem className="flex flex-col space-y-1.5">
                          <Label htmlFor="password">Password</Label>
                          <FormControl>
                            <Input
                              placeholder="Enter password"
                              autoComplete="new-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm text-border-secondary">
                    Forgot Password?{" "}
                    <Link href="#" className="text-indigo-primary font-medium">
                      Recover
                    </Link>
                  </p>
                  <CardFooter className="flex-col gap-y-12 p-0">
                    <Button className="bg-indigo-primary w-full">
                      Log In{" "}
                      {mutation.isPending && (
                        <LoaderCircle
                          strokeWidth={3}
                          className="flex
                        text-white w-5 h-5 rotate-icon"
                        />
                      )}
                    </Button>
                    <p className="text-sm text-border-secondary">
                      Are you new here?{" "}
                      <Link
                        href="/auth/register"
                        className="text-indigo-primary font-medium"
                      >
                        Create Account
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Login;

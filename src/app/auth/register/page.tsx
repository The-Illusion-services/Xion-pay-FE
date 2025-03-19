"use client";

import { AuthLayout } from "@/src/components/layouts";
import React, { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/src/services";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

import { Label } from "@/src/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/src/hooks";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { Input } from "@/src/components/illusion-ui/input/input";
import { LoaderCircle } from "lucide-react";
import ToastMessage from "@/src/components/illusion-ui/toast-message";
import ConfirmVerfificationCode from "@/src/components/illusion-shared/confirm-code";

const formSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: z
      .string()
      .email()
      .toLowerCase()
      .regex(/^\S+$/, { message: "email cannot contain whitespace." }),
    password: z
      .string()
      .min(7, {
        message: "password must be at least 7 characters.",
      })
      .regex(/^\S+$/, { message: "password cannot contain whitespace." }),
    confirm_password: z
      .string()
      .min(7, {
        message: "password must be at least 7 characters.",
      })
      .regex(/^\S+$/, { message: "password cannot contain whitespace." }),
  })
  .required();

let title = "Log In";

const Register: FC = () => {
  const router = useRouter();
  const { updateUser } = useAuthToken();
  const [confirmEmailModal, setConfirmEmailModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange", // Ensures validation checks on each change
  });

  const registerRequest: any = async () => {
    try {
      // TODO: remove when api starts working
      // setConfirmEmailModal(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}register/`,
        {
          method: "POST",
          body: JSON.stringify(form.getValues()),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      

      return responseData;
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
      // TODO: remove when api starts working
      // setConfirmEmailModal(true);
      // updateUser(res.data.data);
      router.push("/auth/login");
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <AuthLayout title={title}>
      <main className="h-full w-full flex capitalize">
        <div className="flex h-full w-full items-center justify-center">
          {confirmEmailModal ? (
            <ConfirmVerfificationCode />
          ) : (
            <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
              <CardHeader className="p-0 text-center">
                <CardTitle className="text-2xl font-medium">Register</CardTitle>
                <CardDescription className="pb-4 text-border-secondary">
                  Enter your credentials to create an account
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
                        name="first_name"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">First Name</Label>
                            <FormControl>
                              <Input
                                placeholder="Enter first name"
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
                        name="last_name"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastName">Last Name</Label>
                            <FormControl>
                              <Input
                                placeholder="Enter last name"
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
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
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
                      <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Confirm Password</Label>
                            <FormControl>
                              <Input
                                placeholder="Confirm password"
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <CardFooter className="flex-col gap-y-12 p-0">
                      <Button className="bg-indigo-primary w-full">
                        Register{" "}
                        {mutation.isPending && (
                          <LoaderCircle
                            strokeWidth={3}
                            className="flex
                      text-white w-5 h-5 rotate-icon"
                          />
                        )}
                      </Button>
                      <p className="text-sm text-border-secondary">
                        Not new here?{" "}
                        <Link
                          href="/auth/login"
                          className="text-indigo-primary font-medium"
                        >
                          Login
                        </Link>
                      </p>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </AuthLayout>
    
  );
};

export default Register;

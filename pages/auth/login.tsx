"use client";

import { AuthLayout, UserLayout } from "@layouts";
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
import { Input } from "@/components/ui/input";
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
import { motion, AnimatePresence } from "framer-motion";
import ToastMessage from "@/components/illusion-ui/toast-message";
import { LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Milestone from "@/components/illusion-shared/milestone";
import Link from "next/link";

// TODO: trimbackend fields for form

const formSchema = z
  .object({
    fname: z
      .string()
      .min(3, {
        message: "First name must be at least 3 characters.",
      })
      .regex(/^\S+$/, { message: "First name cannot contain whitespace." }),

    lname: z
      .string()
      .min(3, {
        message: "Last name must be at least 3 characters.",
      })
      .regex(/^\S+$/, { message: "Last name cannot contain whitespace." }),

    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .toLowerCase()
      .regex(/^\S+$/, { message: "Username cannot contain whitespace." }),

    mobile: z
      .string()
      .length(13, { message: "Mobile number must be exactly 13 characters." }) // String with exactly 12 characters
      .regex(/^\S+$/, { message: "Mobile cannot contain whitespace." }),

    password: z
      .string()
      .min(7, {
        message: "Username must be at least 7 characters.",
      })
      .regex(/^\S+$/, { message: "Password cannot contain whitespace." }),
  })
  .required();

let title = "Log In";

const SignIn: FC = () => {
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
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          "An error occurred"
      );
    }
  };

  //TODO: make mobile number unique- logging db duplicate error
  // TODO: all password fields shoudl show as password
  // TODO: check mobile number format

  const mutation: any = useMutation({
    mutationFn: registerRequest,
    onSuccess: (res: any) => {
      updateUser(res.data.data);
      router.push("/user/chats");
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
              <CardDescription className="pb-4 text-border-secondary">Enter your credentials to acccess your account</CardDescription>
              <Separator/>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-y-5">
              <form>
                <div className="grid w-full items-center gap-y-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email Address</Label>
                    <Input
                      id="name"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      placeholder="Enter password"
                      className=""
                    />
                  </div>
                </div>
              </form>
              <p className="text-sm text-border-secondary">
                Forgot Password? <Link href="#" className="text-indigo-primary font-medium">Recover</Link>
              </p>
            </CardContent>
            <CardFooter className="flex-col gap-y-12 p-0">
              <Button className="bg-indigo-primary w-full">Log In</Button>
              <p className="text-sm text-border-secondary">
                Are you new here? <Link href="/auth/register" className="text-indigo-primary font-medium">Create Account</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </AuthLayout>
  );
};

export default SignIn;

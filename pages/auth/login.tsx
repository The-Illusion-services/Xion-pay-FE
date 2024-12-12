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

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email must be at least 1 character.",
      })
      .toLowerCase()
      .regex(/^\S+$/, { message: "Email cannot contain whitespace." }),
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
      email: "",
      password: "",
    },
    mode: "onChange", // Ensures validation checks on each change
  });

  const registerRequest: any = async () => {
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
              <CardDescription className="pb-4 text-border-secondary">
                Enter your credentials to acccess your account
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-y-5">
              <form>
                <div className="grid w-full items-center gap-y-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      className=""
                    />
                  </div>
                </div>
              </form>
              <p className="text-sm text-border-secondary">
                Forgot Password?{" "}
                <Link href="#" className="text-indigo-primary font-medium">
                  Recover
                </Link>
              </p>
            </CardContent>
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
          </Card>
        </div>
      </main>
    </AuthLayout>
  );
};

export default SignIn;

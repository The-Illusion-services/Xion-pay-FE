"use client";

import { AuthLayout } from "@layouts";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import confirmEmail from "public/confirm-email.png"

let title = "Confirm Email";

const ConfirmEmail: FC = () => {
 
  return (
    <AuthLayout title={title}>
      <main className="h-full w-full flex capitalize">
        <div className="flex h-full w-full items-center justify-center">
          <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
            <Image alt="img" src={confirmEmail} className="m-auto md:size-auto"/>
            <CardHeader className="p-0 text-center">
              <CardTitle className="md:text-2xl text-lg font-medium">
                verify your email address
              </CardTitle>
              <CardDescription className="md:text-base text-sm pb-2 text-border-secondary">
                Lorem ipsum dolor sit amet consectetur. Purus ultrices donec
                amet gravida arcu. Egestas nisl egestas consequat pellentesque.
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-0">
              <Button className="md:text-base text-sm bg-indigo-primary w-full">
                Verify Email Address
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </AuthLayout>
  );
};

export default ConfirmEmail;

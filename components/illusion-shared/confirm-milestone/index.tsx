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
import confirmContract from "public/confirm-contract.png"


export default function ConfirmMilestone(){
 
  return (
      <main className="h-full w-full flex capitalize">
        <div className="flex h-full w-full items-center justify-center">
          <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
            <Image alt="img" src={confirmContract} className="m-auto md:size-auto"/>
            <CardHeader className="p-0 text-center">
              <CardTitle className="md:text-2xl text-lg font-medium">
                Contract Created
              </CardTitle>
            </CardHeader>
            <CardFooter className="p-0">
              <Button className="md:text-base text-sm bg-indigo-primary w-full">
                Okay
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
  );
};


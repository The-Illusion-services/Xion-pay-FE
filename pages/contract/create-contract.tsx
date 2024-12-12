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
import { Input } from "@/components/illusion-ui/input/input";
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
import MilestoneForm from "@/components/illusion-shared/milestone-form";
import confirmContract from "public/confirm-contract.png";

import { PageAnimation } from "@/components/illusion-ui";
import Image from "next/image";
import Link from "next/link";

const contractSchema = z.object({
  title: z.string().min(3, "Title is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      return !isNaN(parseFloat(val)) && !/\s/.test(val);
    }, "Amount must be a valid number"),
});

const milestone1Schema = z.object({
  title: z.string().min(3, "Milestone title is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\S+$/, { message: "Amount cannot contain whitespace" })
    .refine((val) => {
      return !isNaN(parseFloat(val)) && !/\s/.test(val);
    }, "Amount must be a valid number"),
});

const milestone2Schema = z
  .object({
    title: z.string().min(3, "Milestone title is required").optional(),
    amount: z
      .string()
      .min(1, "Amount is required")
      .regex(/^\S+$/, { message: "Amount cannot contain whitespace" })
      .optional(),
  })
  .refine((data) => {
    if ((data.title && !data.amount) || (!data.title && data.amount)) {
      return false;
    }
    return true;
  }, "Title and amount must be present together");

let title = "Create Contract";
let transformedData: any;

const CreateContract: FC = () => {
  const router = useRouter();
  const { updateUser } = useAuthToken();
  const [showModal, setShowModal] = useState(false);

  const milestone2Title = z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // allow empty strings
      return val.length >= 3;
    }, "Milestone title must be at least 3 characters and cannot contain whitespace");
  const milestone2Amount = z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // allow empty strings
      return /^\S+$/.test(val) && val.length >= 1;
    }, "Milestone Amount must be at least 1 characters and cannot contain whitespace")
    .refine((val) => {
      if (!val) return true; // allow empty strings
      return !isNaN(parseFloat(val)) && !/\s/.test(val);
    }, "Amount must be a valid number");

  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: zodResolver(
      z.object({
        title: contractSchema.shape.title,
        amount: contractSchema.shape.amount,
        milestone1Title: milestone1Schema.shape.title,
        milestone1Amount: milestone1Schema.shape.amount,
        milestone2Title: milestone2Title,
        milestone2Amount: milestone2Amount,
      })
    ),
  });

  const [milestoneCount, setMilestoneCount] = useState(1);
  const [contractModal, setContractModal] = useState(false);

  const registerRequest: any = async (data: any) => {
    try {
      // TODO: remove when api starts working
      setContractModal(true);

      const response = await AuthService.register(data);

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
      console.log("contract created");
      // setContractModal(true);
      // updateUser(res.data.data);
      // router.push("/user/chats");
    },
  });

  const handleAddMilestone = () => {
    if (milestoneCount > 1) {
      return false;
    }

    setMilestoneCount((prevCount) => prevCount + 1);
  };

  const onCreateContract = async (data: any) => {
    console.log(data);
    transformedData = {
      title: data.title,
      amount: data.amount,
      milestones: [
        {
          title: data.milestone1Title,
          amount: data.milestone1Amount,
        },
        {
          title: data.milestone2Title,
          amount: data.milestone2Amount,
        },
      ],
    };
    setShowModal(true);

    console.log(transformedData);
  };

  const onRejectContract = async () => {
    reset();
    transformedData = "";
    setShowModal(false);

    console.log(transformedData);
  };

  const onSubmit = async () => {
    console.log("suitting form", transformedData);

    mutation.mutate({ ...transformedData });
  };

  const isFormValid = () => {
    if (Object.keys(formState.errors).length > 0) {
      return false;
    }
    try {
      contractSchema.parse({
        title: watch("title"),
        amount: watch("amount"),
      });
      milestone1Schema.parse({
        title: watch("milestone1Title"),
        amount: watch("milestone1Amount"),
      });

      if (watch("milestone2Title") || watch("milestone2Amount")) {
        milestone2Schema.parse({
          title: watch("milestone2Title"),
          amount: watch("milestone2Amount"),
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  console.log("form", isFormValid());

  return (
    <UserLayout title={title}>
      {showModal ? (
        contractModal ? (
          <main className="h-full w-full flex capitalize">
            <div className="flex h-full w-full items-center justify-center">
              <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
                <Image
                  alt="img"
                  src={confirmContract}
                  className="m-auto md:size-auto"
                />
                <CardHeader className="p-0 text-center">
                  <CardTitle className="md:text-2xl text-lg font-medium">
                    Contract Creation Completed
                  </CardTitle>
                </CardHeader>
                <CardFooter className="p-0">
                  <Link
                    href="/"
                    className="md:text-base text-sm text-center py-1 rounded-md bg-indigo-primary w-full"
                  >
                    Okay
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </main>
        ) : (
          <main className={`flex h-full w-full capitalize`}>
            <div className="flex h-full w-full items-center justify-center">
              <Card className="md:w-[550px] w-full h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
                <CardHeader className="p-0">
                  <CardTitle className="md:text-xl text-2xl font-medium pb-4">
                    Confirm Contract
                  </CardTitle>
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
                <CardContent className="p-0">
                  <div className="grid w-full items-center gap-y-6">
                    <div className="flex flex-col space-y-1.5">
                      <h4 className="text-sm text-border-secondary">Title</h4>
                      <h3>{transformedData?.title}</h3>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <h4 className="text-sm text-border-secondary">Amount</h4>
                      <h3>{transformedData?.amount} SOL</h3>
                    </div>
                    <CardContent className="px-6 py-8 bg-foreground rounded-md flex flex-col gap-y-6">
                      <div className="flex">
                        <Milestone />

                        <div className="w-full">
                          <div className="grid w-full items-center gap-y-3">
                            {transformedData?.milestones.map(
                              (milestone: any, index: number) => {
                                if (
                                  milestone.title === undefined ||
                                  milestone.amount === undefined
                                ) {
                                  return null;
                                }
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-col space-y-1"
                                  >
                                    <h4 className="pb-6">
                                      Milestone {index + 1}
                                    </h4>

                                    <h4 className="text-sm text-border-secondary">
                                      milstone title
                                    </h4>
                                    <h3>{milestone.title}</h3>
                                    <h4 className="text-sm text-border-secondary">
                                      milstone amount
                                    </h4>
                                    <h3>{milestone.amount}</h3>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-0">
                  <Button
                    onClick={onRejectContract}
                    className="border border-border-primary"
                  >
                    Reject Contract
                  </Button>
                  <Button onClick={onSubmit} className="bg-indigo-primary">
                    Approve Contract
                    {mutation.isLoading && <p>loading</p>}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        )
      ) : (
        <main className={`flex h-full w-full`}>
          <div className="flex h-full w-full items-center justify-center">
            <Card className="md:w-[550px] w-full h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
              <CardHeader className="p-0">
                <CardTitle className="md:text-xl text-2xl font-medium pb-4">
                  Create Contract
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="p-0">
                <form
                  onSubmit={handleSubmit(onCreateContract)}
                  className="flex flex-col gap-y-4"
                >
                  <div className="grid w-full items-center gap-y-6">
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
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter contract title"
                        {...register("title")}
                      />
                      {formState.errors.title?.message && (
                        <p className="text-red-500 text-xs">
                          {formState.errors.title.message.toString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Amount</Label>
                      <Input
                        id="amount"
                        placeholder="Enter contract amount"
                        {...register("amount")}
                      />
                      {formState.errors.amount?.message && (
                        <p className="text-red-500 text-xs">
                          {formState.errors.amount.message.toString()}
                        </p>
                      )}
                    </div>
                    <CardContent className="px-6 py-8 bg-foreground rounded-md flex flex-col gap-y-6">
                      {Array.from({ length: milestoneCount }, (_, index) => (
                        <MilestoneForm
                          index={index}
                          register={register}
                          formState={formState}
                        />
                      ))}
                      {milestoneCount < 2 && (
                        <p
                          className="text-indigo-primary font-medium cursor-pointer"
                          onClick={handleAddMilestone}
                        >
                          + Add Milestone
                        </p>
                      )}
                    </CardContent>
                  </div>
                  <CardFooter className="flex justify-between p-0">
                    <Button
                      onClick={onRejectContract}
                      className="border border-border-primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isFormValid()}
                      className="bg-indigo-primary"
                    >
                      Create Contract
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </UserLayout>
  );
};

export default CreateContract;

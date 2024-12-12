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
import { PageAnimation } from "@/components/illusion-ui";

const contractSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .regex(/^\S+$/, { message: "Title cannot contain whitespace" }),
  description: z
    .string()
    .min(1, "Description is required")
    .regex(/^\S+$/, { message: "Description cannot contain whitespace" }),
});

const milestone1Schema = z.object({
  title: z
    .string()
    .min(3, "Milestone title is required")
    .regex(/^\S+$/, { message: "Milestone title cannot contain whitespace" }),
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
    title: z
      .string()
      .min(3, "Milestone title is required")
      .regex(/^\S+$/, { message: "Milestone title cannot contain whitespace" })
      .optional(),
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

const CreateContract: FC = () => {
  const router = useRouter();
  const { updateUser } = useAuthToken();
  const [showModal, setShowModal] = useState(false);

  const milestone2Title = z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // allow empty strings
      return /^\S+$/.test(val) && val.length >= 3;
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

  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(
      z.object({
        title: contractSchema.shape.title,
        description: contractSchema.shape.description,
        milestone1Title: milestone1Schema.shape.title,
        milestone1Amount: milestone1Schema.shape.amount,
        milestone2Title: milestone2Title,
        milestone2Amount: milestone2Amount,
      })
    ),
  });

  const [milestoneCount, setMilestoneCount] = useState(1);

  const registerRequest: any = async (data: any) => {
    try {
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

  const onSubmit = async (data: any) => {
    console.log(data);
    const transformedData = {
      title: data.title,
      description: data.description,
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

    // mutation.mutate({ ...data });
  };

  const isFormValid = () => {
    if (Object.keys(formState.errors).length > 0) {
      return false;
    }
    try {
      contractSchema.parse({
        title: watch("title"),
        description: watch("description"),
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
      <PageAnimation>
        <main className={`${showModal ? "hidden" : "flex"} h-full w-full`}>
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
                  onSubmit={handleSubmit(onSubmit)}
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
                      <Label htmlFor="name">Description</Label>
                      <Input
                        id="description"
                        placeholder="Enter contract description"
                        {...register("description")}
                      />
                      {formState.errors.description?.message && (
                        <p className="text-red-500 text-xs">
                          {formState.errors.description.message.toString()}
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
                    <Button className="border border-border-primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      // isLoading={mutation.isLoading}
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
      </PageAnimation>
      <PageAnimation>
        <main
          className={`${
            showModal ? "flex" : "hidden"
          } h-full w-full capitalize`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <Card className="md:w-[550px] w-full h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white">
              <CardHeader className="p-0">
                <CardTitle className="md:text-xl text-2xl font-medium pb-4">
                  Confirm Contract
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="p-0">
                <form>
                  <div className="grid w-full items-center gap-y-6">
                    <div className="flex flex-col space-y-1.5">
                      <h4 className="text-sm text-border-secondary">Title</h4>
                      <h3>Contract Name</h3>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <h4 className="text-sm text-border-secondary">Amount</h4>
                      <h3>200 SOL</h3>
                    </div>
                    <CardContent className="px-6 py-8 bg-foreground rounded-md flex flex-col gap-y-6">
                      <div className="flex">
                        <Milestone />
                        <div className="w-full">
                          <div className="grid w-full items-center gap-y-3">
                            <div className="flex flex-col space-y-1">
                              <h4 className="pb-6">Milestone 1</h4>
                              <h4 className="text-sm text-border-secondary">
                                milstone name
                              </h4>
                              <h3>milstone Name</h3>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <h4 className="text-sm text-border-secondary">
                                Amount
                              </h4>
                              <h3>100 SOL</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <Milestone />
                        <div className="w-full">
                          <div className="grid w-full items-center gap-y-3">
                            <div className="flex flex-col space-y-1">
                              <h4 className="pb-6">Milestone 2</h4>
                              <h4 className="text-sm text-border-secondary">
                                milstone name
                              </h4>
                              <h3>milstone Name</h3>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <h4 className="text-sm text-border-secondary">
                                Amount
                              </h4>
                              <h3>100 SOL</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between p-0">
                <Button className="border border-border-primary">
                  Reject Contract
                </Button>
                <Button className="bg-indigo-primary">Approve Contract</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </PageAnimation>
    </UserLayout>
  );
};

export default CreateContract;

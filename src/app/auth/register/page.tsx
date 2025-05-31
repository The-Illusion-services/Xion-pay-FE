// "use client";

// import { AuthLayout } from "@/src/components/layouts";
// import React, { FC, useState, useContext, useEffect } from "react";
// import { CreateContext } from "@/src/Context/context";
// import { useMutation } from "@tanstack/react-query";
// import { AuthService } from "@/src/services";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import { motion, AnimatePresence } from "framer-motion";

// import { Label } from "@/src/components/ui/label";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/src/components/ui/form";
// import { useRouter } from "next/navigation";
// import { useAuthToken } from "@/src/hooks";
// import { Separator } from "@/src/components/ui/separator";
// import Link from "next/link";
// import { Input } from "@/src/components/illusion-ui/input/input";
// import { LoaderCircle } from "lucide-react";
// import ToastMessage from "@/src/components/illusion-ui/toast-message";
// import Image from "next/image";
// import authBg from "@/src/assets/auth-pages-bg.png";
// import authBgMain from "@/src/assets/auth-pages-bg-main.png";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";



// const formSchema = z
//   .object({
//     first_name: z.string(),
//     last_name: z.string(),
//     email: z
//       .string()
//       .email()
//       .toLowerCase()
//       .regex(/^\S+$/, { message: "email cannot contain whitespace." }),
//     password: z
//       .string()
//       .min(7, {
//         message: "password must be at least 7 characters.",
//       })
//       .regex(/^\S+$/, { message: "password cannot contain whitespace." }),
//     confirm_password: z
//       .string()
//       .min(7, {
//         message: "password must be at least 7 characters.",
//       })
//       .regex(/^\S+$/, { message: "password cannot contain whitespace." }),
//   })
//   .required();

// let title = "Log In";

// const Register: FC = () => {
//   const { setIsLoading } = useContext(CreateContext).loader;
//   const { data: session, status } = useSession();
//   const initialLoading = true;
  
//   useEffect(()=>{
//     // router.push("/waitlist")
//   },[])
//   const router = useRouter();
//   const { updateUser } = useAuthToken();
//   const [confirmEmailModal, setConfirmEmailModal] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       confirm_password: "",
//     },
//     mode: "onChange", // Ensures validation checks on each change
//   });

//   const registerRequest: any = async () => {
//     try {
//       setIsLoading(true);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/register/`,
//         {
//           method: "POST",
//           body: JSON.stringify(form.getValues()),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if(!response.ok){
//         console.log(response.json());
        
//         throw new Error(
          
//             "An error occurred"
//         );
//       }
//       const responseData = await response.json();
//       console.log(responseData);
//       setIsLoading(false);
      
//       router.push("/auth/login");

//     } catch (error: any) {
//       setIsLoading(false);
//       toast.error("An error occured")
//     }
//   };

//   // const mutation: any = useMutation({
//   //   mutationFn: registerRequest,
//   //   onSuccess: (res: any) => {
//   //     // TODO: remove when api starts working
//   //     // setConfirmEmailModal(true);
//   //     // updateUser(res.data.data);
//   //     router.push("/auth/login");
//   //   },
//   // });

//   const onSubmit = () => registerRequest();

//   if(status !== "authenticated" )
//   return (
//     <main className="h-full w-full flex flex-col lg:flex-row capitalize min-h-screen bg-black justify-center"
//     style={{
//       backgroundImage: `url(${authBgMain.src})`,
//       backgroundSize: "cover", // Makes the image fit while covering the entire div
//       backgroundPosition: "center", // Centers the image
//       backgroundRepeat: "no-repeat", // Prevents repetition
//     }}
//     >
//       <div className="lg:w-[50%] hidden gap-y-8 lg:flex flex-col items-center justify-center">
//         <Image
//           src={authBg}
//           alt="auth-pages-background"
//           height={20}
//           width={600}
//           className=" absolute z-10 max-h-[95vh]"
//         />
//         <h2 className="text-3xl font-bold z-20 relative text-white">
//           Simplifying Payments, Securing <br /> Transactions
//         </h2>
//         <p className="text-white z-10 relative px-[100px] font-thin">
//           BurntPay empowers businesses and individuals with fast, borderless
//           blockchain transactions. Create payment links, manage escrow, and
//           store sensitive credentials securely—no complicated setup required.
//           Get started in minutes!
//         </p>
//       </div>
//       <div className="flex lg:max-h-screen lg:w-[50%] items-center justify-center px-4 ">
//         <Card className="w-[500px] h-full flex flex-col gap-y-6 px-6 py-8 bg-blue-secondary text-white lg:overflow-y-auto scroll-smooth">
//           <CardHeader className="p-0 text-center">
//             <CardTitle className="text-2xl font-bold">
//               Create your account
//             </CardTitle>
//             <CardDescription className="pb-4 text-border-secondary">
//               Enter your credentials to create an account
//             </CardDescription>
//             <Separator />
//           </CardHeader>
       
//           <CardContent className="p-0 flex flex-col gap-y-5">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="flex flex-col gap-y-6 overflow-y-auto"
//               >
//                 <div className="grid w-full items-center gap-y-6">
//                   <FormField
//                     control={form.control}
//                     name="first_name"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col space-y-1.5">
//                         <Label htmlFor="email">First Name</Label>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter first name"
//                             autoComplete="off"
//                             className="border-[#474747] placeholder:text-[#474747]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="last_name"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col space-y-1.5">
//                         <Label htmlFor="lastName">Last Name</Label>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter last name"
//                             autoComplete="off"
//                             className="border-[#474747] placeholder:text-[#474747]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col space-y-1.5">
//                         <Label htmlFor="email">Email</Label>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter email address"
//                             autoComplete="off"
//                             className="border-[#474747] placeholder:text-[#474747]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col space-y-1.5">
//                         <Label htmlFor="password">Password</Label>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter password"
//                             autoComplete="new-password"
//                             className="border-[#474747] placeholder:text-[#474747]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="confirm_password"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col space-y-1.5">
//                         <Label htmlFor="email">Confirm Password</Label>
//                         <FormControl>
//                           <Input
//                             placeholder="Confirm password"
//                             autoComplete="off"
//                             className="border-[#474747] placeholder:text-[#474747]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <CardFooter className="flex-col gap-y-12 p-0">
//                   <Button className="bg-white text-black w-full">
//                     Register{" "}
                   
//                   </Button>
//                   <p className="text-sm text-border-secondary">
//                     Are you already a user?{" "}
//                     <Link
//                       href="/auth/login"
//                       className="text-indigo-primary font-medium"
//                     >
//                       Login
//                     </Link>
//                   </p>
//                 </CardFooter>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
      
//     </main>
//   );
// };

// export default Register;

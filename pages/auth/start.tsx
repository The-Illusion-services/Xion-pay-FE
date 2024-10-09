import { AuthLayout } from "@layouts";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Logo.png";
import authEmImage from "../../public/auth-email.png";
import authPwdImage from "../../public/auth-pwd.png";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthToken } from "@hooks";
import { PageAnimation } from "@/components/serviette-ui";
import { GoogleSignIn } from "@/components/serviette-icons";
import { usePathname } from "next/navigation";
import { AdminNavbar } from "@/components/shared";
import { ChevronRight } from "lucide-react";
import Container from "@/components/shared/container";

const name = "Victoria";
let title = "Start";

const Start: FC = () => {
  return (
    <AuthLayout heading={"Welcome"} title={title}>
      <AdminNavbar title={"Welcome"} />
      <PageAnimation>
        <Container className={"min-h-[40rem]"}>
          <div className="authcard3 md:pt-24 md:pb-16 py-0 md:px-7 px-0">
            <div className="authcard4">
              <div className="md:w-1/2 w-full h-full bg-primary-dark z-50 rounded-xl">
                <div className="text-white gap-y-12 flex flex-col justify-center items-center h-full">
                  <div className="text-center flex flex-col gap-y-5">
                    <h2 className="font-semibold text-2xl">Welcome, {name}!</h2>
                    <p className="">What would you like to do?</p>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <Link
                      href="#"
                      className="font-medium rounded-[7px] justify-center items-center p-2 text-center w-full border-[0.3px] bg-primary-green text-black hover:bg-transparent border-primary-border hover:text-secondary-border flex gap-x-2 transition-colors duration-500"
                    >
                      Setup my Organisation
                    </Link>
                    <Link
                      href="#"
                      className="font-medium rounded-[7px] justify-center items-center p-2 text-center w-full bg-transparent hover:bg-primary-green hover:text-black border-[0.3px] border-primary-border text-secondary-border flex gap-x-2 transition-colors duration-500"
                    >
                      Continue without Setup
                      <ChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </PageAnimation>
    </AuthLayout>
  );
};

export default Start;

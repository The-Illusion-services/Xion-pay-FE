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
import { Navbar } from "@/components/shared";
import { CircleCheckBig } from "lucide-react";
import Container from "@/components/shared/container";

const defaultValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Enter your email"),
  password: yup.string(),
});

const SignIn: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // let reset = router.query.reset as string;

  const { updateUser } = useAuthToken();

  const path = usePathname();
  // const onSubmit = () => mutation.mutate();
  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(getValues().password, getValues().email);
      
      if (!showPassword) {
        setIsLoading(false);
        return setShowPassword(true);
      }
      setTimeout(() => {
        return router.push("/auth/start");
      }, 2000);
      console.log("...where aapi comes in");
    }, 3000);
  };

  return (
    <AuthLayout heading={"Welcome"} title={"Sign-in"}>
      <>
        <Navbar />
        <PageAnimation>
          <Container>
            <div className="authcard4">
              <div className="authcard5 md:rounded-xl rounded-none">
                <div className="authcard5a md:pt-0 pt-28 md:w-fit w-full">
                  {showPassword ? (
                    <>
                      <>
                        <Image alt="img" src={logo} className="authimg1" />
                        <div className="pb-10">
                          <h1 className="text-[1.6rem] font-medium text-white pb-2">
                            Your Password
                          </h1>
                          <p className="text-[#A5A5A5]">Almost there...</p>
                        </div>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="w-full"
                        >
                          <div>
                            <label className="text-[#F8F8F8] pb-2 text-sm">
                              Password
                            </label>
                            <br />
                            <input
                              {...register("password")}
                              autoComplete="new-password"
                              type="password"
                              placeholder="Enter a password"
                              className="md:pt-0 pt-4 text-[0.98rem] rounded-none text-white w-full mt-1 bg-transparent border-b-[1px] border-primary-border focus:border-b-orange-500 outline-none transition-colors duration-500"
                            />
                            <br />
                            <p className="text-red-400 text-sm">
                              {errors.password?.message}
                            </p>
                          </div>

                          <button className="authbtn">
                            {isLoading ? "signing you in..." : "Sign in"}
                          </button>
                        </form>
                      </>
                    </>
                  ) : (
                    <>
                      <Image alt="img" src={logo} className="authimg2" />
                      <div className="pb-10">
                        <div>
                          <h1 className="text-[1.6rem] font-medium text-white pb-2">
                            Sign in to Your Account
                          </h1>
                          <p className="text-[#A5A5A5]">
                            Enter your email address
                          </p>
                        </div>
                      </div>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full"
                      >
                        <div>
                          <label className="text-[#F8F8F8] pb-2 text-sm">
                            Email address
                          </label>
                          <br />
                          <input
                            {...register("email")}
                            autoComplete="off"
                            type="email"
                            placeholder="Someone@example.com"
                            className="md:pt-0 pt-4 text-[0.98rem] rounded-none text-white w-full mt-1 bg-transparent border-b-[1px] border-primary-border focus:border-b-orange-500 outline-none transition-colors duration-500"
                          />
                          <br />
                          <p className="text-red-400 text-sm">
                            {errors.email?.message}
                          </p>
                        </div>
                        <button className="authbtn">
                          {isLoading ? "Hold on..." : "Sign in with Email"}
                        </button>
                      </form>
                    </>
                  )}
                  <div className="flex gap-x-2 pt-3 text-[#A5A5A5] text-center text-base">
                    Don't Have an account?
                    <Link href="/auth/sign-up" className="link">
                      <span className="text-[#8BAE22]">Sign up instead</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="authcard6">
                {showPassword ? (
                  <Image alt="img" src={authPwdImage} className="authimg3" />
                ) : (
                  <Image alt="img" src={authEmImage} className="authimg3" />
                )}
              </div>
            </div>
          </Container>
        </PageAnimation>
      </>
    </AuthLayout>
  );
};

export default SignIn;

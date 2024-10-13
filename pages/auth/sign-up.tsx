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
import { CircleCheckBig, LoaderCircle } from "lucide-react";
import Container from "@/components/shared/container";

const defaultValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Enter your email"),
  password: yup.string(),
});

const SignUp: FC = () => {
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
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const router = useRouter();
  // let reset = router.query.reset as string;

  const { updateUser } = useAuthToken();

  const path = usePathname();

  // const onSubmit = () => mutation.mutate();
  const onSubmit = () => {
    if (!showPassword) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("...where email check aapi comes in");
        return setShowPassword(true);
      }, 3000);
    }

    if (showPassword && !getValues("password")) {
      console.log(!getValues("password"));
      return setErrorMsg("Enter your password");
    }

    if (showPassword && getValues("password")) {
      setIsLoading(true);
      setTimeout(() => {
        console.log("...where password check aapi comes in");
        setSuccess(true);
        return router.push("/auth/start");
      }, 2000);
    }
  };

  return (
    // TODO: use auth example and protected routes and sign in api example
    <AuthLayout title={"Sign-up"}>
      <Navbar />
      <Container className={"min-h-[40rem]"}>
        <div className="authcard3 md:pt-24 md:pb-16 py-0 lg:px-12 md:px-8 px-0">
          <div className="authcard4">
            {success ? (
              <div className="md:w-1/2 w-full h-full bg-primary-dark z-50 rounded-xl">
                <div className="text-white gap-y-4 flex flex-col justify-center items-center h-full">
                  <CircleCheckBig
                    fill="green"
                    className="text-white md:w-24 md:h-20 w-16 h-20"
                  />
                  <p className="font-semibold text-lg">
                    Account Created Successfully!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="authcard5 md:rounded-xl rounded-none">
                  {showPassword ? (
                    <>
                      <div className="authcard5a md:max-w-[19rem] w-fit md:pt-0 pt-28">
                        <Image alt="img" src={logo} className="authimg1" />
                        <div className="pb-8">
                          <h1 className="md:text-[1.6rem] text-[1.9rem] font-semibold text-white pb-2">
                            Create a Password
                          </h1>
                          <p className="font-medium text-secondary-border">
                            Look at you go! Now, enter a password...
                          </p>
                        </div>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="w-full"
                        >
                          <div>
                            <label className="text-[#F8F8F8] pb-2">
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
                              {errors.password?.message} {errorMsg}
                            </p>
                          </div>

                          {isLoading ? (
                            <button className="authbtn flex justify-center items-center bg-[#74901f] gap-x-4">
                              <LoaderCircle className="text-gray-300 w-5 h-5 rotate-icon" />
                              Creating your account...
                            </button>
                          ) : (
                            <button className="authbtn">
                              Create my Account
                            </button>
                          )}
                        </form>
                        <div className="pt-3 text-secondary-border text-start text-base flex flex-col">
                          By creating an Account, you agree to serviette’s
                          <Link href="/" className="link">
                            <span className="text-[#8BAE22]">
                              Terms and Conditions
                            </span>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:m-auto m-0 md:w-fit px-4 md:pt-0 pt-28 w-full">
                        <Image alt="img" src={logo} className="authimg2" />
                        <div className="pb-8">
                          <div>
                            <h1 className="md:text-[1.6rem] text-[1.9rem] font-semibold text-white pb-2">
                              Create Your Account
                            </h1>
                            <p className="font-medium text-secondary-border">
                              Enter your email address to get started
                            </p>
                          </div>
                        </div>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="w-full"
                        >
                          <div>
                            <label className="text-[#F8F8F8] pb-2">
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
                              {errors.email?.message} {errorMsg}
                            </p>
                          </div>
                          {/* rotate-icon */}
                          {isLoading ? (
                            <button className="authbtn flex justify-center items-center bg-[#74901f] gap-x-4">
                              <LoaderCircle className="text-gray-300 w-5 h-5 rotate-icon" />
                              Hold on...
                            </button>
                          ) : (
                            <button className="authbtn">
                              Sign up with Email
                            </button>
                          )}
                        </form>

                        <p className="text-center text-[#5E5E5E]">Or</p>
                        <div className=" m-auto w-full">
                          <Link
                            href="/"
                            className="rounded-[7px] justify-center items-center p-2 mt-4 text-center w-full border-[0.3px] border-primary-border text-secondary-border flex gap-x-2"
                          >
                            <GoogleSignIn />
                            Sign up with Google Account
                          </Link>
                        </div>
                        <div className="pt-3 text-secondary-border text-center text-base">
                          Have an account?&nbsp;
                          <Link href="/auth/sign-in" className="link">
                            <span className="text-[#8BAE22]">
                              Sign in instead
                            </span>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="authcard6 md:flex hidden">
                  {showPassword ? (
                    <Image alt="img" src={authPwdImage} className="authimg3" />
                  ) : (
                    <Image alt="img" src={authEmImage} className="authimg3" />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </AuthLayout>
  );
};

export default SignUp;

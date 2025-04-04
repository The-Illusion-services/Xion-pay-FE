import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { useAuthToken } from "@/src/hooks";
import { PageAnimation } from "../illusion-ui";
import Image from "next/image";
import img from "public/next.svg";

interface ILayout {
  children: JSX.Element | React.ReactNode;
  title: string;
  subtitle?: string;
  heading?: string;
  description?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  heading,
  description,
}: ILayout) {
  const router = useRouter();
  const { token, isLoading } = useAuthToken();
  title = title || "Page Title";
  subtitle = subtitle || "";
  description = description || "Xion Pay";
  heading = heading || title;

  // useEffect(() => {
  //   if (token) router.push("/user/chats");
  // }, [router, token]);

  return (
    <Fragment>
      <Head>
        <title>{`illusion | ${title}`}</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="author" content="illusion" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="title" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="illusion" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content="http://https://www.illusion.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta
          property="og:image"
          content="https://res.cloudinary.com/dlq0uwrii/image/upload/v1728843002/Logo_qcsyol.png"
        /> //TODO: relace images */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="http://https://www.illusion.com/"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        {/* <meta
          property="twitter:image"
          content="https://res.cloudinary.com/dlq0uwrii/image/upload/v1728843002/Logo_qcsyol.png"
        /> */}
        {/* <link
          rel="icon"
          type="image/x-icon"
          href="https://res.cloudinary.com/dlq0uwrii/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728843002/Logo_qcsyol.png"
        /> */}
      </Head>

      <div>
        <PageAnimation>
          <div className="md:py-8 py-0 h-full flex flex-col justify-center min-h-screen bg-black">
            <div className="flex items-center justify-center h-full px-4">
              {children}
            </div>
          </div>
        </PageAnimation>
      </div>
    </Fragment>
  );
}

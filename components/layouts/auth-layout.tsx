import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthToken } from "@hooks";

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
  const { token } = useAuthToken();
  title = title || "Page Title";
  subtitle = subtitle || ""
  description = description || `Serviette's ${subtitle} ${title} page`;
  heading = heading || title;

  useEffect(() => {
    if (token) router.push("/user");
  }, [router, token]);
  //TODO: uncomment and replace

  return (
    <Fragment>
      <Head>
        <title>{`Serviette | ${title}`}</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="author" content="Serviette" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="title" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Serviette" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_US" />
         <meta property="og:url" content="http://https://www.blnkfinance.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/*<meta property="og:image" content="http://https://www.blnkfinance.com/images/logo-preview.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://https://www.blnkfinance.com/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="http://https://www.blnkfinance.com/images/logo-preview.png" /> */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen min-h-screen">
        {/* nav */}

        {/* form */}
        {children}
      </div>
    </Fragment>
  );
}

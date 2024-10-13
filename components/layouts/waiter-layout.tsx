import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthToken } from "@hooks";
import WaiterSidebar from "../shared/nav/sidebar/waiter";
import { PageAnimation } from "../serviette-ui";

interface ILayout {
  children: JSX.Element | React.ReactNode;
  title: string;
  subtitle?: string;
  heading?: string;
  description?: string;
}

export default function WaiterLayout({
  children,
  title,
  subtitle,
  heading,
  description,
}: ILayout) {
  const router = useRouter();
  const { token } = useAuthToken();
  title = title || "Page Title";
  subtitle = subtitle || "";
  description =
    description ||
    "A Global restaurant known for serving the best meals to customers";
  heading = heading || title;

  // useEffect(() => {
  //   if (token) router.push("/user");
  // }, [router, token]);

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
        <meta property="og:url" content="https://www.serviette.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="http://https://www.serviette.com/images/logo-preview.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="http://https://www.serviette.com/"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="http://https://www.serviette.com/images/logo-preview.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
       
        <meta property="og:site_name" content="Ikọ Africa" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content="https://ikoafrica.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://ikoafrica.com/images/logo-preview.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ikoafrica.com/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://ikoafrica.com/images/logo-preview.png"
        />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <div className="flex flex-col h-screen min-h-screen">
        <WaiterSidebar />
        <PageAnimation>
          {/* nav */}

          {/* form */}
          {children}
        </PageAnimation>
      </div>
    </Fragment>
  );
}

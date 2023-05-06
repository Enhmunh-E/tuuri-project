import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../providers";
import { Header } from "../components";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useLayoutEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Head from "next/head";

NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  useLayoutEffect(() => {
    if (window?.innerWidth < 1024) {
      window.location.href = "https://m.tuuri.mn";
    }
  }, []);
  return (
    <>
      <Head>
        <title>Tuuri.mn</title>
        <meta property="og:title" content="Tuuri.mn" key="title" />
      </Head>
      <MainProvider>
        <Header />
        <Component {...pageProps} />
      </MainProvider>
      <Analytics />
    </>
  );
}

export default MyApp;

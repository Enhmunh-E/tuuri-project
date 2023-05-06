import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../providers";
import { Header } from "../components";
import { Analytics } from "@vercel/analytics/react";
import { useLayoutEffect } from "react";
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
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

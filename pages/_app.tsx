import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../providers";
import { Header } from "../components";
import { Analytics } from "@vercel/analytics/react";
import { useLayoutEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  useLayoutEffect(() => {
    if (window?.innerWidth < 1024) {
      window.location.href = "https://m.tuuri.mn";
    }
  }, []);
  return (
    <>
      <MainProvider>
        <Header />
        <Component {...pageProps} />
      </MainProvider>
      <Analytics />
    </>
  );
}

export default MyApp;

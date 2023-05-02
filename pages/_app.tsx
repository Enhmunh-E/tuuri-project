import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../providers";
import { Header } from "../components";
import { Analytics } from "@vercel/analytics/react";
function MyApp({ Component, pageProps }: AppProps) {
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

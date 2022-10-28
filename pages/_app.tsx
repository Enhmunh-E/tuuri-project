import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainProvider } from "../providers";
import { Header } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Header />
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default MyApp;

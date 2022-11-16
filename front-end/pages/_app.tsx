import "../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { MainProvider } from "../providers";
import { Header } from "../components";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Header />
      <Component {...pageProps} />
    </MainProvider>
  );
}

MyApp.getInitialProps = async (ctx: any) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};
export default MyApp;

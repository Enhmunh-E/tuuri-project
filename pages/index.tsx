import type { NextPage } from "next";
import { Header } from "../components";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { createClient, Entry } from "contentful";
import Carousel from "../components/Carousel";

const Pixi = dynamic(import("../components/Pixi"), { ssr: false });

const data = [
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" },
  { title: "6" },
  { title: "7" },
  { title: "8" },
  { title: "9" },
];

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });
  const res = await client.getEntries({ content_type: "article" });
  return {
    props: {
      articles: res.items,
    },
  };
};

const Home = ({ articles }: { articles: Entry<unknown>[] }) => {
  console.log(articles);
  return (
    <div className={styles.container}>
      <Header />
      {/* Here Lies the Spring and other components */}
      <div className="body-container">
        <div
          id="pixi-container"
          style={{ display: "inline-flex", height: "100vh", width: "100vw" }}
        >
          <Pixi />
        </div>
        <Carousel data={data} />
      </div>
    </div>
  );
};

const homeStyles: Record<string, React.CSSProperties> = {
  bottomContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    height: "calc(100vh - 60px)",
    paddingTop: "40px",
    overflow: "hidden",
  },
};

export default Home;

import type { NextPage } from "next";
import { Header } from "../components";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { createClient, Entry } from "contentful";

const Pixi = dynamic(import("../components/Pixi"), { ssr: false });

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
      <div id="pixi-container">
        <Pixi />
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

import { Header } from "../components";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { createClient, Entry } from "contentful";
import { useMainProvider } from "../providers";
import { useEffect, useState } from "react";
import { Article } from "../components/Article";
import { fetchEntries } from "../util/contentfulArticles";
import { ArticleType } from "../components/types";
import { ScrollProvider } from "../providers";
import List from "../components/List";
import Search from "../components/Search";

const Pixi = dynamic(import("../components/Pixi"), { ssr: false });

const Home = ({ articles }: { articles: ArticleType[] }) => {
  const { setAllArticles, currentDataIndex } = useMainProvider();
  const [transition, setTransition] = useState(false);
  const dummy: ArticleType = {} as ArticleType;
  useEffect(() => {
    if (articles.length == 0) return;
    setAllArticles(articles);
  }, [articles, setAllArticles]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 400);
    return () => clearTimeout(timeOut);
  }, []);
  // if (loading) return <HomeLoading />;
  return (
    <div
      className={styles.container}
      style={{
        transition: "all 400ms",
        opacity: transition ? 1 : 0,
      }}
    >
      <div className="rel">
        <ScrollProvider>
          <div
            id="pixi-container"
            style={{
              display: "inline-flex",
              height: "100vh",
              width: "100vw",
            }}
          >
            <Article setTransition={setTransition} />
            <Pixi />
          </div>
          <List />
        </ScrollProvider>
        <div className="search-container">
          <Search />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetchEntries();

  const articles = res?.filter((p) => p.sys.contentType.sys.id == "article");
  return {
    props: {
      articles,
    },
  };
}

export default Home;

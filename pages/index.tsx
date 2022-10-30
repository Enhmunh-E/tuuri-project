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

const Pixi = dynamic(import("../components/Pixi"), { ssr: false });

const data = [
  { title: "Алтан улсыг бүхэлд эзэлсэн нь", year: "1215\nОН" },
  { title: "Тангудын бослого", year: "1215\nОН" },
  { title: "Их Монголын гадаад бодлогын өргөжилт", year: "1215\nОН" },
  { title: "Хорезмын эзэнт гүрнийг довтолсон", year: "1215\nОН" },
  { title: "Мухаммед шахын орголт", year: "1215\nОН" },
  { title: "Калка голын байлдаан", year: "1215\nОН" },
  { title: "Сүн улсыг эзлэх аян дайн", year: "1215\nОН" },
  { title: "8", year: "1215\nОН" },
  { title: "9", year: "1215\nОН" },
];

// export const getStaticProps = async () => {
//   const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID as string,
//     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
//   });
//   const res = await client.getEntries({ content_type: "article" });
//   return {
//     props: {
//       articles: res.items,
//     },
//   };
// };

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
      <div
        id="scrollIdentifier"
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: -60,
          left: 0,
          opacity: 1,
          zIndex: 1,
          overflow: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {articles.concat(dummy, dummy, dummy, dummy).map((_, index) => (
          <div
            key={index}
            style={{
              height: "20vh",
              scrollSnapAlign: "start",
            }}
          />
        ))}
      </div>
      <div className="rel">
        <ScrollProvider>
          <div
            id="pixi-container"
            style={{ display: "inline-flex", height: "100vh", width: "100vw" }}
          >
            <Article setTransition={setTransition} />
            <Pixi />
          </div>
          <List />
        </ScrollProvider>
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

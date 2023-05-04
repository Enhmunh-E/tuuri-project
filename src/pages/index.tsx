import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMainProvider } from "@providers";
import { fetchEntries } from "@utils";
import { ArticleType } from "@components";

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
  return (
    <div
      className={styles.container}
      style={{
        transition: "all 400ms",
        opacity: transition ? 1 : 0,
      }}
    >
      <div
        style={{
          width: "100%",
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className={styles.homeTitle}>
          Бид түүхийг хүүрнэе
          <br />
          Та ирээдүйг бүтээ
        </div>
        <div className={styles.homeLabel}>
          Монгол хүн танд түүхийн боловсролыг
          <br />
          шинэлэг байдлаар хүргэж байна.
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "48px",
          display: "flex",
          flexDirection: "row",
          gap: "12px",
        }}
      >
        <input
          type="text"
          style={{
            border: "1px solid rgba(47, 42, 46, 0.15)",
            background: "white",
            height: "56px",
            fontFamily: "Montserrat",
            fontSize: "14px",
            lineHeight: "17px",
            outline: "none",
            color: "#2F2A2E",
            padding: "20px",
            borderRadius: 8,
          }}
          placeholder="Хайх"
        />
      </div>
      {/* <div className="rel"> */}
      {/* <ScrollProvider>
          <div
            id="pixi-container"
            style={{ display: "inline-flex", height: "100vh", width: "100vw" }}
          >
            <Article setTransition={setTransition} />
            <Pixi />
          </div>
          <List />
        </ScrollProvider> */}
      {/* </div> */}
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

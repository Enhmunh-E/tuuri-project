import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMainProvider } from "@providers";
import { fetchEntries } from "@utils";
import { AnimatedToScroll, Article, ArticleType } from "@components";
import { ArrowDownIcon, SearchIcon } from "@assets";
import { motion } from "framer-motion";
import List from "@/components/List";
import ListMobile from "@/components/ListMobile";

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
  const [visibleState, setVisibleState] = useState("search");
  const dummy: ArticleType = {} as ArticleType;
  const search = () => {
    console.log("searching");
  };

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
      className="h-screen"
      // className={styles.container}
      style={{
        transition: "all 400ms",
        opacity: transition ? 1 : 0,
      }}
    >
      <motion.div
        className="overflow-scroll"
        style={{
          translateY: visibleState === "search" ? "0%" : "-50%",
          transition: "all 400ms ease",
        }}
      >
        {/* Top */}
        <motion.div
          style={{
            opacity: visibleState === "search" ? 1 : 0,
            transition: "all 400ms ease",
          }}
          className="h-screen relative pt-16 p-8 flex items-center flex-col"
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
          <div className="w-full mt-12 flex flex-row gap-3">
            <input
              type="text"
              className="flex-1 bg-white h-14 text-sm outline-none p-5 rounded-lg"
              style={{
                border: "1px solid rgba(47, 42, 46, 0.15)",
                fontFamily: "Montserrat",
                color: "#2F2A2E",
              }}
              placeholder="Хайх"
            />
            <button
              className="w-14 h-14 rounded-lg flex items-center justify-center"
              style={{
                border: "1px solid rgba(47, 42, 46, 0.15)",
              }}
              onClick={search}
            >
              <SearchIcon />
            </button>
          </div>
          <AnimatedToScroll
            position="bottom"
            text="Бичвэр унших"
            onClick={() => setVisibleState("slide")}
          />
        </motion.div>
        {/* Bottom */}
        <motion.div
          style={{
            opacity: visibleState === "search" ? 0 : 1,
            transition: "all 400ms ease",
            overflow: "hidden",
          }}
          className="h-screen relative p-8 pt-20 flex items-center flex-col "
        >
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
          <ListMobile />
          <AnimatedToScroll
            text=""
            bordered={false}
            position="top"
            onClick={() => setVisibleState("search")}
          />
        </motion.div>
      </motion.div>
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

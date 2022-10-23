import { useRouter } from "next/router";
import React from "react";
import { Header } from "../../components";
import { Block } from "../../components/Block";
import { ArticleType } from "../../components/types";
import { useMainProvider } from "../../providers";
import styles from "../../styles/article.module.css";
import { fetchEntries } from "../../util/contentfulArticles";

export const AritclePage = ({ articles }: { articles: ArticleType[] }) => {
  console.log(articles[0]);
  const articleNumber = 0;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        background: "white",
      }}
    >
      <Header />
      <div
        className={styles.articleIntro}
        style={{
          backgroundImage: `url(${articles[articleNumber]?.backgroundImage.fields.file.url})`,
        }}
      >
        <div className={styles.articleTitle}>
          {articles[articleNumber]?.title}
        </div>
        <div className={styles.articleDescription}>
          Унших цаг {articles[articleNumber]?.readTime} мин
          {articles[articleNumber]?.topic.map((topic: string) => ` • ${topic}`)}
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(180deg, #EFCA9D, #FFF, #FFF)",
        }}
      >
        <div className={styles.articleTextContainer}>
          {articles[articleNumber]?.blocks.map((block: any, index: number) => (
            <Block data={block} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetchEntries();
  const articles = await res?.map((p) => {
    return p.fields;
  });
  return {
    props: {
      articles,
    },
  };
}

export default AritclePage;

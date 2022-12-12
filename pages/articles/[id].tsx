import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../../components";
import { Block } from "../../components/Block";
import { ArticleType } from "../../components/types";
import { useMainProvider } from "../../providers";
import styles from "../../styles/article.module.css";
import { fetchEntries } from "../../util/contentfulArticles";
import { NextSeo } from "next-seo";
import Head from "next/head";
const SEO = () => {
  return (
    <Head>
      <title></title>
      <meta property="og:title" content={"Test title 1234"} />
      <meta name="description" content={"Test desc 1234"} />
      <meta property="og:description" content={"Test desc 1234"} />
      {/* <meta property="og:image" content={fullSeo.shareImage} /> */}
      {/* <meta name="image" content={fullSeo.shareImage} /> */}
    </Head>
  );
};
export const AritclePage = ({ articles }: { articles: ArticleType[] }) => {
  const { currentDataIndex } = useMainProvider();
  const [isRelay, setIsRelay] = useState(true);
  const router = useRouter();
  const article = useMemo(() => {
    if (articles[currentDataIndex]) {
      return articles[currentDataIndex];
    }
    return articles.find((article) => article.fields.title == router.query.id);
  }, [articles]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsRelay(false);
    }, 200);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        background: "white",
        opacity: isRelay ? 0 : 1,
        transition: "all 200ms",
      }}
    >
      <Header />
      <SEO />
      <NextSeo
        openGraph={{
          title: article?.fields.title,
          description: article?.fields.title,
          url: `https://www.tuuri.mn/articles/${article?.fields.title}`,
          type: "article",
          images: [
            {
              url: article?.fields.coverPic.fields.file.url ?? "",
              width: 850,
              height: 650,
              alt: "Cover of the Article",
            },
          ],
        }}
      />
      <div
        className={styles.articleIntro}
        style={{
          backgroundImage: `url(${article?.fields?.backgroundImage.fields.file.url})`,
        }}
      >
        <div className={styles.articleTitle}>{article?.fields.title}</div>
        <div className={styles.articleDescription}>
          Унших цаг {article?.fields?.readTime} мин
          {article?.fields.topic.map((topic: string) => ` • ${topic}`)}
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(180deg, #EFCA9D, #FFF, #FFF)",
        }}
      >
        <div className={styles.articleTextContainer}>
          {article?.fields.blocks.map((block: any, index: number) => (
            <Block data={block} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetchEntries();
  const articles = res?.filter((p) => p.sys.contentType.sys.id == "article");
  return {
    props: {
      articles,
    },
  };
}

export default AritclePage;

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMainProvider } from "../providers";
import styles from "../styles/article.module.css";
import { fetchEntries } from "../util/contentfulArticles";

export const Article = () => {
  const { popUpLocation, popUpInUse, allArticles } = useMainProvider();
  const articleNumber = 0;
  return (
    <div
      className={styles.articleContainer}
      style={{
        display: popUpLocation == null ? "none" : "flex",
        top: popUpLocation ? popUpLocation?.y - 32 - 60 + "px" : "0",
        left: popUpLocation ? popUpLocation?.x - 100 + "px" : "0",
        marginLeft: popUpInUse ? "0px" : "100px",
        marginTop: popUpInUse ? "0px" : "100px",
      }}
    >
      <Link
        style={{
          width: popUpInUse ? "200px" : "0px",
          height: popUpInUse ? "200px" : "0px",
        }}
        href={`/articles/${allArticles[articleNumber]?.title}`}
      >
        <img
          src={allArticles[articleNumber]?.coverPic.fields.file.url}
          draggable={"false"}
          alt="cover"
          className={styles.articleCover}
          style={{
            opacity: 1,
          }}
        />
      </Link>
      <div
        className={styles.articleContentContainer}
        style={{
          width: popUpInUse ? "200px" : "0px",
          height: popUpInUse ? "73px" : "0px",
          opacity: popUpInUse ? 1 : 0,
          display: "flex",
        }}
      >
        <div
          style={{
            width: "72px",
            textAlign: "center",
          }}
        >
          {allArticles[0]?.eventDate}
        </div>
        <div
          style={{
            width: "2px",
            height: "100%",
            background: "rgba(47, 42, 46, 0.5)",
            margin: "0px 8px",
          }}
        />
        <div>{allArticles[0]?.title}</div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
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

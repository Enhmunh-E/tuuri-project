/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useMainProvider } from "../providers";
import styles from "../styles/article.module.css";
import { fetchEntries } from "../util/contentfulArticles";

export const Article = ({
  setTransition,
}: {
  setTransition: Dispatch<SetStateAction<boolean>>;
}) => {
  const { popUpLocation, popUpInUse, allArticles, currentDataIndex } =
    useMainProvider();
  const router = useRouter();
  console.log(currentDataIndex, allArticles[currentDataIndex]?.fields.title);
  return (
    <div
      className={styles.articleContainer}
      style={{
        display: popUpLocation == null ? "none" : "flex",
        top: popUpLocation ? popUpLocation?.y - 32 - 60 + "px" : "0",
        left: popUpLocation ? popUpLocation?.x - 100 + "px" : "0",
        marginLeft: popUpInUse ? "0px" : "110px",
        marginTop: popUpInUse ? "0px" : "110px",
      }}
    >
      <div
        style={{
          width: popUpInUse ? "180px" : "0px",
          height: popUpInUse ? "180px" : "0px",
        }}
        onClick={() => {
          setTransition(false);
          setTimeout(() => {
            router.push(
              `/articles/${allArticles[currentDataIndex]?.fields.title}`
            );
          }, 200);
        }}
      >
        <img
          src={allArticles[currentDataIndex]?.fields.coverPic.fields.file.url}
          draggable={"false"}
          alt="cover"
          className={styles.articleCover}
          style={{
            opacity: 1,
          }}
        />
      </div>
      <div
        className={styles.articleContentContainer}
        style={{
          width: popUpInUse ? "180px" : "0px",
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
          {allArticles[currentDataIndex]?.fields.eventDate}
        </div>
        <div
          style={{
            width: "2px",
            height: "100%",
            background: "rgba(47, 42, 46, 0.5)",
            margin: "0px 8px",
          }}
        />
        <div>{allArticles[currentDataIndex]?.fields.title}</div>
      </div>
    </div>
  );
};

// export async function getStaticProps() {
//   const res = await fetchEntries();
//   const articles = await res?.map((p) => {
//     return p.fields;
//   });
//   return {
//     props: {
//       articles,
//     },
//   };
// }

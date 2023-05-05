/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from "react";
import { useMainProvider } from "@providers";
import styles from "../styles/article.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export const Article = ({
  setTransition,
}: {
  setTransition: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { popUpLocation, popUpInUse, allArticles, currentDataIndex } =
    useMainProvider();
  return (
    <div
      className={styles.articleContainer}
      style={{
        display: popUpLocation == null ? "none" : "flex",
        top: popUpLocation ? popUpLocation?.y + "px" : "0",
        left: popUpLocation ? popUpLocation?.x + "px" : "0",
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div
        onClick={() => {
          setTransition(false);
          router.push(
            `/articles/${allArticles[currentDataIndex]?.fields.title}`
          );
        }}
        style={{
          width: popUpInUse ? "40vmin" : "0px",
          height: popUpInUse ? "40vmin" : "0px",
          zIndex: 5,
        }}
      >
        <img
          src={allArticles[currentDataIndex]?.fields.coverPic?.fields?.file.url}
          draggable={"false"}
          alt="cover"
          className={styles.articleCover}
          style={{
            opacity: 1,
          }}
        />
      </div>
    </div>
  );
};

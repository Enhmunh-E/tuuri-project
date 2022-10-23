import React from "react";
import styles from "../styles/block.module.css";
export const Block = ({ data }: { data: any }) => {
  const type = data.sys.contentType.sys.id;
  return (
    <div
      className={styles.blockContainer}
      style={{
        padding: type == "articleType1" ? "0% 5%" : "0% 0%",
        flexDirection:
          type == "articleType2" ||
          type == "articleType4" ||
          type == "articleType5"
            ? "row"
            : "column",
      }}
    >
      {type !== "articleType3" && (
        <div
          className={styles.blockText}
          style={{
            marginRight: data.fields?.image?.fields?.file.url ? "45px" : "0px",
          }}
        >
          {data.fields.text}
        </div>
      )}

      {data.fields?.image?.fields?.file.url && (
        <div
          className={styles.blockImage}
          style={{
            marginLeft: type !== "articleType3" ? "45px" : "0px",
            backgroundImage: `url(${data.fields.image.fields.file.url})`,
          }}
        />
      )}
    </div>
  );
};

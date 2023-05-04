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
          type == "articleType5"
            ? "row"
            : type == "articleType2" || type == "articleType4"
            ? "row-reverse"
            : "column",
        gap: "80px",
        alignItems: type == "articleType3" ? "center" : "normal",
      }}
    >
      {type !== "articleType3" && (
        <div className={styles.blockText}>
          {data.fields.texts.map(
            (
              text: {
                fields: {
                  text: string;
                };
              },
              index: number
            ) => (
              <div
                key={`text-${index}`}
                style={{
                  marginBottom:
                    index + 1 == data.fields.texts.length ? "0px" : "24px",
                }}
              >
                {text.fields.text}
              </div>
            )
          )}
        </div>
      )}
      {data.fields?.image?.fields?.file.url && (
        <div
          className={styles.blockImage}
          style={{
            backgroundImage: `url(${data.fields.image.fields.file.url})`,
            minHeight: type == "articleType3" ? "520px" : "auto",
            width: type == "articleType3" ? "80%" : "auto",
            // backgroundSize: "contain",
          }}
        />
      )}
    </div>
  );
};

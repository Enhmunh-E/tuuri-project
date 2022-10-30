import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMainProvider } from "../providers";
import { ArticleType } from "./types";

const List = () => {
  const { currentDataIndex, setCurrentDataIndex, allArticles } =
    useMainProvider();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArticles, setShowArticles] = useState(allArticles);
  useEffect(() => {
    const dummy: ArticleType = {
      fields: {
        title: "dummy",
      },
    } as ArticleType;

    const ar = [dummy, dummy, ...allArticles, dummy, dummy];
    setShowArticles(ar);
  }, [allArticles]);
  useEffect(() => {
    const handleScroll: EventListener = (e) => {
      const targetDiv: HTMLDivElement = e.target as HTMLDivElement;
      const nextInd = Math.round(
        targetDiv.scrollTop / (window.innerHeight / 5)
      );
      // elements[nextInd]?.scrollIntoView({ behavior: "smooth" });
      scrollRef.current?.scrollTo({
        top: nextInd * 100,
        behavior: "smooth",
      });
      setCurrentDataIndex(nextInd);
    };
    document
      .getElementById("scrollIdentifier")
      ?.addEventListener("scroll", handleScroll);
    return () =>
      document
        .getElementById("scrollIdentifier")
        ?.removeEventListener("scroll", handleScroll);
  }, [setCurrentDataIndex]);
  return (
    <div className="list" id="list" ref={scrollRef}>
      {showArticles?.map((d: any, index: number) => {
        const { title, eventDate } = d.fields;
        if (title === "dummy") {
          return <div className="list-element" key={index}></div>;
        }
        return index !== currentDataIndex + 2 ? (
          <div
            className="list-element"
            onClick={() =>
              scrollRef.current?.scrollTo({
                top: (index - 2) * 100,
                behavior: "smooth",
              })
            }
            key={index}
          >
            <div className="year">
              <div className="year-content">{eventDate}</div>
            </div>
            <div className="title">
              <div className="title-content">{title}</div>
            </div>
          </div>
        ) : (
          <div
            className="list-element"
            onClick={() => {
              router.push(
                `/articles/${allArticles[currentDataIndex]?.fields.title}`
              );
            }}
            style={{
              cursor: "pointer",
            }}
            key={index}
          >
            <div className="year">
              <div className="year-content selected">{eventDate}</div>
            </div>
            <div className="title">
              <div className="title-content selected">{title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;

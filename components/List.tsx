import React, { useEffect, useRef, useState } from "react";
import { useMainProvider } from "../providers";
import { ArticleType } from "./types";

const List = () => {
  const { currentDataIndex, setCurrentDataIndex, allArticles } =
    useMainProvider();
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
      scrollRef.current?.scrollTo({
        top: (targetDiv.scrollTop / (window.innerHeight / 5)) * 100,
        // behavior: "smooth",
      });
      setCurrentDataIndex(
        Math.round(targetDiv.scrollTop / (window.innerHeight / 5))
      );
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
          <div className="list-element" key={index}>
            <div className="year">
              <div className="year-content">{eventDate}</div>
            </div>
            <div className="title">
              <div className="title-content">{title}</div>
            </div>
          </div>
        ) : (
          <div className="list-element" key={index}>
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

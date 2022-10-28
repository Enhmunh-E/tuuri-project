import React, { useEffect, useRef, useState } from "react";
import { useMainProvider, useScrollContext } from "../providers";
import { ArticleType } from "./types";

const List = () => {
  const { scroll } = useScrollContext();
  const { currentDataIndex, setCurrentDataIndex, allArticles } =
    useMainProvider();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
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
    const nextTop = Math.min(
      Math.max(scrollTop + scroll, 0),
      100 * (showArticles.length - 5)
    );
    setCurrentDataIndex(Math.floor(nextTop / 100));
    if (scrollRef?.current) {
      scrollRef?.current.scrollTo({
        top: Math.floor(nextTop / 100) * 100,
        behavior: "smooth",
      });
    }
    setScrollTop(nextTop);
  }, [scroll, showArticles]);

  return (
    <div className="list" ref={scrollRef}>
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

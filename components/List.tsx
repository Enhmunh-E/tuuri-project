import React, { useEffect, useRef, useState } from "react";
import { useMainProvider, useScrollContext } from "../providers";
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
  return (
    <div
      className="list"
      id="list"
      ref={scrollRef}
      onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.target as HTMLDivElement;
        setCurrentDataIndex(Math.floor(target.scrollTop / 100));
      }}
    >
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

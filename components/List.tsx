import { PathConstraintPositionTimeline } from "@pixi-spine/runtime-4.1";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMainProvider } from "../providers";
import { ArticleType } from "./types";

const List = () => {
  const { currentDataIndex, setCurrentDataIndex, allArticles } =
    useMainProvider();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bigScrollRef = useRef<HTMLDivElement>(null);
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
    bigScrollRef.current?.scroll({
      top: bigScrollRef.current.scrollHeight,
    });
  }, [showArticles]);
  useEffect(() => {
    const handleScroll: EventListener = (e) => {
      const targetDiv: HTMLDivElement = e.target as HTMLDivElement;
      const ind = targetDiv.scrollTop / (window.innerHeight / 5);
      setCurrentDataIndex(Math.round(ind));
      scrollRef.current?.scrollTo({
        top: (targetDiv.scrollTop / (window.innerHeight / 5)) * 100,
      });
    };
    document
      .getElementById("scrollIdentifier")
      ?.addEventListener("scroll", handleScroll);
    return () =>
      document
        .getElementById("scrollIdentifier")
        ?.removeEventListener("scroll", handleScroll);
  });
  return (
    <>
      <div
        id="scrollIdentifier"
        ref={bigScrollRef}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: -60,
          left: `calc((100vw - 1280px)/2 * -1)`,
          opacity: 1,
          zIndex: 1,
          overflow: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {showArticles.map((_, index) => (
          <div
            key={index}
            style={{
              height: "20vh",
              scrollSnapAlign: "start",
            }}
          />
        ))}
      </div>
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
    </>
  );
};

export default List;

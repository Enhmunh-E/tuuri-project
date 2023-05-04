import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMainProvider } from "@providers";
import { ArticleType } from "./types";

const ListMobile = () => {
  const { currentDataIndex, setCurrentDataIndex, allArticles } =
    useMainProvider();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bigScrollRef = useRef<HTMLDivElement>(null);
  const [showArticles, setShowArticles] = useState(allArticles);
  const cardWidth = 192;
  const [howManyCards, setHowManyCards] = useState(5);
  useEffect(() => {
    let howMany = Math.floor(window.innerWidth / cardWidth);
    howMany = howMany % 2 == 0 ? howMany + 1 : howMany;
    setHowManyCards(howMany);
  }, []);
  useEffect(() => {
    const dummy: ArticleType = {
      fields: {
        title: "dummy",
      },
    } as ArticleType;
    const dummyArray = new Array((howManyCards - 1) / 2).fill(dummy);
    const ar = [...dummyArray, ...allArticles, ...dummyArray];
    setShowArticles(ar);
  }, [allArticles]);
  // useEffect(() => {
  //   bigScrollRef.current?.scroll({
  //     left: bigScrollRef.current.scrollWidth,
  //   });
  // }, [showArticles]);
  useEffect(() => {
    const handleScroll: EventListener = (e) => {
      const targetDiv: HTMLDivElement = e.target as HTMLDivElement;
      const ind = targetDiv.scrollLeft / cardWidth;
      setCurrentDataIndex(Math.round(ind));
    };
    document.getElementById("list")?.addEventListener("scroll", handleScroll);
    return () =>
      document
        .getElementById("list")
        ?.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* <div
        id="scrollIdentifier"
        ref={bigScrollRef}
        style={{
          height: "100vh",
          width: howManyCards * cardWidth + "px",
          margin: "auto",
          position: "absolute",
          bottom: 0,
          left: `calc((100vw - ${howManyCards * cardWidth}px) / 2)`,
          opacity: 1,
          zIndex: 1,
          overflow: "scroll",
          scrollSnapType: "x mandatory",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {showArticles.map((_, index) => (
          <div
            key={index}
            style={{
              minWidth: cardWidth,
              scrollSnapAlign: "center",
            }}
          />
        ))}
      </div> */}
      <div
        className="list"
        id="list"
        style={{
          width: howManyCards * cardWidth + "px",
          left: `calc((100vw - ${howManyCards * cardWidth}px) / 2)`,
        }}
        ref={scrollRef}
      >
        {showArticles?.map((d: any, index: number) => {
          const { title, eventDate } = d.fields;
          if (title === "dummy") {
            return (
              <div
                className="list-element"
                style={{
                  minWidth: cardWidth,
                }}
                key={index}
              ></div>
            );
          }
          return index !== currentDataIndex + 2 ? (
            <div
              className="list-element"
              style={{
                minWidth: cardWidth,
              }}
              onClick={() =>
                scrollRef.current?.scrollTo({
                  left: (index - 2) * cardWidth,
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
              style={{
                minWidth: cardWidth,
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(
                  `/articles/${allArticles[currentDataIndex]?.fields.title}`
                );
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

export default ListMobile;

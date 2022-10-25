import React, { useEffect, useRef, useState } from "react";
import { useMainProvider, useScrollContext } from "../providers";

const List = () => {
  const { scroll } = useScrollContext();
  const { setCurrentDataIndex, allArticles } = useMainProvider();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  console.log(allArticles);

  useEffect(() => {
    const nextTop = Math.min(Math.max(scrollTop + scroll, 0), 440);
    setCurrentDataIndex(Math.floor(nextTop / 110) + 2);
    if (scrollRef?.current) {
      scrollRef?.current.scrollTo({
        top: Math.floor(nextTop / 110) * 110,
        behavior: "smooth",
      });
    }
    setScrollTop(nextTop);
  }, [scroll]);

  return (
    <div className="list" ref={scrollRef}>
      {allArticles?.map((d: any, index: number) => {
        const { title, eventDate } = d;
        return (
          <div className="list-element" key={title}>
            <div className="year">{eventDate}</div>
            <div className="line"></div>
            <div className="title">{title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default List;

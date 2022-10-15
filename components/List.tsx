import React, { useEffect, useRef, useState } from "react";
import { useMainProvider, useScrollContext } from "../providers";

const List = ({ data }: any) => {
  const { scroll, setScroll } = useScrollContext();
  const { currentDataIndex, setCurrentDataIndex } = useMainProvider();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

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
      {data.map((d: any, index: number) => {
        const { title, year } = d;
        return (
          <div className="list-element">
            <div className="year">{year}</div>
            <div className="line"></div>
            <div className="title">{title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default List;

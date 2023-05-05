import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMainProvider } from "@providers";
import { ArticleType } from "./types";
import { CustomLine } from "@/assets";

const ListMobile = () => {
    const { currentDataIndex, setCurrentDataIndex, allArticles } =
        useMainProvider();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    // const [showArticles, setShowArticles] = useState(allArticles);
    const cardWidth = 256;
    const [howManyCards, setHowManyCards] = useState(5);
    useEffect(() => {
        let howMany = Math.floor(window.innerWidth / cardWidth) + 2;
        // if (howMany == 1) {
        //   setHowManyCards(3);
        //   return;
        // }
        howMany = howMany % 2 == 0 ? howMany + 1 : howMany;
        setHowManyCards(howMany);
    }, []);
    const showArticles = useMemo(() => {
        const dummy: ArticleType = {
            fields: {
                title: "dummy",
            },
        } as ArticleType;
        const dummyArray = new Array((howManyCards - 1) / 2).fill(dummy);
        const ar = [...dummyArray, ...allArticles, ...dummyArray];
        return ar;
    }, [allArticles, howManyCards]);
    useEffect(() => {
        scrollRef?.current?.scrollTo({
            left: cardWidth * howManyCards + (howManyCards - 1) * 16,
        });
    }, [cardWidth, howManyCards]);
    useEffect(() => {
        const handleScroll: EventListener = (e) => {
            const targetDiv: HTMLDivElement = e.target as HTMLDivElement;
            const ind = Math.floor(targetDiv.scrollLeft / (cardWidth + 16));
            setCurrentDataIndex(ind);
        };
        document
            .getElementById("list")
            ?.addEventListener("scroll", handleScroll);
        return () =>
            document
                .getElementById("list")
                ?.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div
            className="list"
            id="list"
            style={{
                width: howManyCards * cardWidth + "px",
                left: `calc((100vw - ${howManyCards * cardWidth}px) / 2)`,
                paddingBottom: "32px",
            }}
            ref={scrollRef}
        >
            {showArticles?.map((d: any, index: number) => {
                const { title, eventDate } = d.fields;
                if (title === "dummy") {
                    return <div className="list-element" key={index}></div>;
                }
                return index !== currentDataIndex + (howManyCards - 1) / 2 ? (
                    <div
                        className="list-element"
                        style={{
                            overflow: "visible",
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
                        <CustomLine />
                        <div className="title">
                            <div className="title-content">{title}</div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="list-element selected"
                        style={{
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
                            <div className="year-content">{eventDate}</div>
                        </div>
                        <CustomLine />
                        <div className="title">
                            <div className="title-content">{title}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListMobile;

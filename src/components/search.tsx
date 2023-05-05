import React, { useState, useEffect } from "react";
import { useMainProvider } from "../providers";
// import { FaSearch } from "react-icons/fa";
// import { GoSearch } from "react-icons/go";
import { SearchIcon } from "@assets";
import { title } from "process";
import parse from "html-react-parser";
import { useRouter } from "next/router";

const Search = () => {
    const { allArticles } = useMainProvider();
    const [search, setSearch] = useState("");
    const router = useRouter();
    const [convertedArticles, setConvertedArticles] = useState<
        {
            title: string;
            bodyText: string;
        }[]
    >([]);
    const [filteredArticles, setFilteredArticles] = useState<
        {
            title: string;
            bodyText: string;
        }[]
    >([]);

    const getIndex = (bodyText: string) => {
        // return index of search in bodyText.
        return bodyText.indexOf(search);
    };

    const getText = (bodyText: string) => {
        // assume search exist in bodyText.
        const ind = getIndex(bodyText),
            len = bodyText.length;
        bodyText = bodyText.replace(search, `<b>${search}</b>`);
        bodyText = bodyText.substring(ind - 10, ind + 70);
        if (ind > 10) {
            bodyText = "..." + bodyText;
        }
        if (ind + 70 < len) {
            bodyText = bodyText + "...";
        }
        return bodyText;
    };

    const filter = (article: { title: string; bodyText: string }) => {
        return getIndex(article.bodyText) >= 0;
    };

    useEffect(() => {
        const getConvertedArticles = () => {
            return allArticles.map((article) => {
                return {
                    title: article.fields.title,
                    bodyText: article.fields.blocks
                        .map((block) =>
                            block.fields?.texts
                                ?.map((el: any) => {
                                    return el?.fields?.text;
                                })
                                .join(" ")
                        )
                        .join(" "),
                };
            });
        };

        setConvertedArticles(getConvertedArticles());
        setFilteredArticles(getConvertedArticles());
    }, [allArticles]);

    useEffect(() => {
        setFilteredArticles(
            convertedArticles
                .filter((article) => filter(article))
                .map(({ title, bodyText }) => {
                    return {
                        title,
                        bodyText: getText(bodyText),
                    };
                })
        );
    }, [search]);

    return (
        <div className="search">
            <div className="search-input">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Хайх"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {search !== "" && (
                <>
                    <div className="search-results-count">
                        {filteredArticles.length} Илэрц
                    </div>
                    <div className="search-results">
                        {filteredArticles.map((article, index) => (
                            <div
                                key={index}
                                className="search-content"
                                onClick={() => {
                                    router.push(`/articles/${article.title}`);
                                }}
                            >
                                <div>{article.title}</div>
                                <div>{parse(article.bodyText)}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;

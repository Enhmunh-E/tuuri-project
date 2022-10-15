import React from "react";

const List = ({ data }: any) => {
  return (
    <div className="list">
      {/* <div className="rel"> */}
      {/* <div className="line"></div> */}
      {data.map((d: any) => {
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
    // </div>
  );
};

export default List;

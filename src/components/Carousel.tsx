import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMainProvider, useScrollContext } from "@providers";

const Carousel = ({ data }: any) => {
  const { scroll, setScroll } = useScrollContext();
  const { currentDataIndex, setCurrentDataIndex } = useMainProvider();

  const settings: Settings = {
    swipeToSlide: true,
    dots: false,
    accessibility: false,
    infinite: false,
    speed: 200,
    draggable: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    afterChange: (currentSlide) => {
      setCurrentDataIndex(currentSlide);
    },
  };
  const [myslider, setSlider] = useState<Slider>();
  const slide = (y: number) => {
    y > 0 ? myslider?.slickNext() : myslider?.slickPrev();
  };

  slide(scroll);

  return (
    <div className="carousel">
      <div className="relative">
        <div className="line"></div>
        <Slider ref={(slider: Slider) => setSlider(slider)} {...settings}>
          {data.map((d: any, index: number) => {
            const { title, year } = d;
            return index !== currentDataIndex + 3 ? (
              <div className="sidebar-element" key={index}>
                <div className="year">{year}</div>
                <div className="title">{title}</div>
              </div>
            ) : (
              <div className="sidebar-helement" key={index}>
                <div className="year">{year}</div>
                <div className="title">{title}</div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

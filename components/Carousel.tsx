import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMainProvider } from "../providers";

const Carousel = () => {
  const { allArticles } = useMainProvider();
  const settings: Settings = {
    swipeToSlide: true,
    // slidesToScroll: 3,
    dots: false,
    accessibility: false,
    infinite: true,
    speed: 500,
    draggable: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };
  // let myslider: any;
  const [myslider, setSlider] = useState<Slider>();
  const slide = (y: number) => {
    console.log("y:", y);
    y > 0 ? myslider?.slickNext() : myslider?.slickPrev();
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      slide(window.scrollY);
    });
  }, []);

  return (
    <div className="carousel">
      <Slider ref={(slider: Slider) => setSlider(slider)} {...settings}>
        {allArticles.map((d: any, index: number) => {
          return (
            <div className="sidebar-element" key={index}>
              {d.title}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;

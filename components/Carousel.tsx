import React, { useEffect, useState } from "react";
import Slider, { InnerSlider, Settings } from "react-slick";
import styles from "../styles/Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data }: any) => {
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
    console.log("event listening...");
    window.addEventListener("scroll", (e) => {
      slide(window.scrollY);
    });
  }, []);

  return (
    <div className="carousel">
      <Slider ref={(slider: Slider) => setSlider(slider)} {...settings}>
        {data.map((d: any) => {
          const { title } = d;
          return <div className="sidebar-element">{title}</div>;
        })}
      </Slider>
    </div>
  );
};

export default Carousel;

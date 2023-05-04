import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import "pixi-spine";
import { useMainProvider } from "../providers";

const PixiComponent = () => {
  let gameCanvas = <></>;
  let app = PIXI.Application;
  const {
    setPopUpLocation,
    setPopUpInUse,
    popUpInUse,
    popUpLocation,
    allArticles,
  } = useMainProvider();
  // console.log(popUpLocation);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    let appWidth = window.innerWidth,
      appHeight = window.innerHeight,
      aspectRatio = appWidth / appHeight;

    app = new PIXI.Application({
      width: appWidth,
      height: appHeight,
      backgroundColor: 0xffffff,
    });

    document.getElementById("pixi-container").appendChild(app.view);
    app.stage.interactive = true;

    let elapsed = 0.0;
    // Radius of large and small circle
    let R = 250,
      r = 50;

    // Cordinates of the circles
    let Rx = appWidth / 2,
      Ry = appHeight / 2,
      rX = appWidth / 2,
      rY = appHeight / 2;

    let totalCircleCount = 5000,
      circlePerLoop = 100,
      maxRenderDistance = 5000,
      maxCircleSize = 14;

    let Circles = [],
      frontIndex = totalCircleCount - 1,
      resIndex = totalCircleCount - 1,
      circleSizeCorrect = true,
      articlelen = 10,
      totalScroll = 100 * (articlelen - 5);

    const coordinateFinder = (index) => {
      let angle =
        (((360 / circlePerLoop / 2 + 360) / circlePerLoop) * index) % 360;
      let renderDistance = Math.min(maxRenderDistance, frontIndex);
      let radius =
        r +
        ((R - r) / renderDistance) * (index - (frontIndex - renderDistance));
      let x =
        radius * Math.cos((angle * Math.PI) / 180) +
        rX +
        ((Rx - rX) / renderDistance) * (index - (frontIndex - renderDistance));
      let y =
        radius * Math.sin((angle * Math.PI) / 180) +
        rY +
        ((Ry - rY) / renderDistance) * (index - (frontIndex - renderDistance));
      return { x: x, y: y };
    };

    const sizeFinder = (index) => {
      let size = maxCircleSize;
      let angle =
        (((360 / circlePerLoop / 2 + 360) / circlePerLoop) * index + 270) % 360;
      let angleDistance = angle,
        reductionPerAngle = 0.06;
      if (angleDistance > 180) angleDistance = 360 - angleDistance;
      size -= angleDistance * reductionPerAngle;
      let distance = frontIndex - index,
        reductionPerDistance = 0.003;
      size -= distance * reductionPerDistance;
      size = Math.max(size, 0.001);
      return size;
    };

    const distFinder = (x1, x2, y1, y2) => {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    const angleFinder = (x1, x2, y1, y2) => {
      if (x2 == x1) {
        if (y1 > y2) return (270 * Math.PI) / 180;
        return (90 * Math.PI) / 180;
      }
      if (y1 == y2) {
        if (x1 < x2) return 0;
        return (180 * Math.PI) / 180;
      }
      if (x2 > x1) return Math.atan((y2 - y1) / (x2 - x1));
      return Math.atan((y2 - y1) / (x2 - x1)) + Math.PI;
    };
    for (let i = 0; i < totalCircleCount; i++) {
      let circle = new PIXI.Sprite.from("/spiral/particle.gif");
      let coordinate = coordinateFinder(i),
        size = sizeFinder(i);
      circle.position.x = coordinate.x;
      circle.position.y = coordinate.y;

      circle.height = size;
      circle.width = size;

      circle.zIndex = i;
      circle.anchor.x = 0.5;
      circle.anchor.y = 0.5;

      let random = Math.random() * 50,
        type = "instant",
        speed = 10;
      if (random <= 20) {
        type = "delayed";
        let speedrand = Math.floor(Math.random() * 8) + 0.5;
        speed = speedrand;
      }
      Circles.push({
        circle: circle,
        used: true,
        type: type,
        lastMove: elapsed,
        speed: speed,
      });
      app.stage.addChild(circle);
    }

    let popup = {
      container: new PIXI.Container(),
      sprite: new PIXI.Sprite.from("/spiral/contentTMP.png"),
      mask: new PIXI.Graphics(),
      border: new PIXI.Sprite.from("/spiral/border.png"),
      borderSize: 2,
      R: 80,
      inUse: false,
      location: {
        x: 0,
        y: 0,
      },
      delay: 30,
    };

    function SpriteDataSet(
      sprite,
      zIndex,
      height,
      width,
      x,
      y,
      anchorx,
      anchory
    ) {
      sprite.zIndex = zIndex;
      sprite.height = height;
      sprite.width = width;
      sprite.x = x;
      sprite.y = y;
      sprite.anchor.x = anchorx;
      sprite.anchor.y = anchory;
    }

    SpriteDataSet(popup.sprite, 2, popup.R * 2, popup.R * 2, 0, 0, 0.5, 0.5);
    SpriteDataSet(
      popup.border,
      1,
      (popup.R + popup.borderSize) * 2,
      (popup.R + popup.borderSize) * 2,
      0,
      0,
      0.5,
      0.5
    );

    popup.mask.beginFill(0xffffff);
    popup.mask.drawCircle(0, 0, popup.R);
    popup.sprite.mask = popup.mask;

    popup.container.addChild(popup.mask);
    popup.container.addChild(popup.sprite);
    popup.container.addChild(popup.border);
    popup.container.sortableChildren = true;
    popup.container.zIndex = totalCircleCount + 1;

    app.stage.sortableChildren = true;

    // document.getElementById("list").addEventListener("scroll", (e) => {
    //   if (articlelen == 0) return;
    //   // resIndex = e.target.scrollTop * 10;
    //   // resIndex = Math.max(resIndex, circlePerLoop);
    //   // resIndex = Math.min(resIndex, totalCircleCount - 1);
    //   // setScroll(e.target.scrollTop);
    //   console.log(articlelen);
    //   totalScroll = Math.min(
    //     Math.max(totalScroll + e.target.scrollTop, 0),
    //     100 * (articlelen - 1)
    //   );
    //   resIndex =
    //     (Math.floor(totalScroll / 100) *
    //       (totalCircleCount - circlePerLoop * 2)) /
    //       articlelen +
    //     circlePerLoop * 2;
    //   setScroll(e.deltaY);
    // });

    // window.addEventListener("mousewheel", (e) => {
    //   totalScroll = Math.min(
    //     Math.max(totalScroll + e.deltaY, 0),
    //     100 * (articlelen - 1)
    //   );

    //   // resIndex += Math.floor((e.deltaY * Math.floor(Math.random() * 10)) / 10);
    //   // resIndex = Math.max(resIndex, circlePerLoop);
    //   // resIndex = Math.min(resIndex, totalCircleCount - 1);

    //   resIndex =
    //     (Math.floor(totalScroll / 100) *
    //       (totalCircleCount - circlePerLoop * 2)) /
    //       articlelen +
    //     circlePerLoop * 2;
    //   setScroll(e.deltaY);

    // window.addEventListener("mousewheel", (e) => {
    // resIndex += Math.floor((e.deltaY * Math.floor(Math.random() * 10)) / 10);
    // resIndex = Math.max(resIndex, circlePerLoop);
    // resIndex = Math.min(resIndex, totalCircleCount - 1);
    //   setScroll(e.deltaY);
    // });

    window.addEventListener("pointermove", (e) => {
      let x = window.innerWidth / 2 - e.x,
        y = window.innerHeight / 2 - e.y;
      let Rchange = 12,
        rChange = 2.5;
      Rx = appWidth / 2 + x / Rchange;
      Ry = appHeight / 2 + (y / Rchange) * aspectRatio;
      rX = appWidth / 2 + x / rChange;
      rY = appHeight / 2 + (y / rChange) * aspectRatio;
    });

    app.ticker.add((delta) => {
      resIndex = Math.floor(
        ((document.getElementById("list").scrollLeft / 192) *
          (totalCircleCount - circlePerLoop * 2 - 1)) /
          articlelen +
          circlePerLoop * 2
      );

      elapsed += delta;
      let dotRemoved = 0;
      for (let i = 0; i < totalCircleCount; i++) {
        let coordinate = coordinateFinder(i),
          size = sizeFinder(i),
          delay = 2;
        let renderDistance = Math.min(maxRenderDistance, frontIndex);

        if (
          Circles[i].type == "instant" ||
          i < frontIndex - renderDistance ||
          i > frontIndex
        ) {
          Circles[i].circle.x = coordinate.x;
          Circles[i].circle.y = coordinate.y;
        } else {
          let speed = Circles[i].speed;
          if (resIndex != frontIndex) speed *= 1.2;
          let dist = distFinder(
            Circles[i].circle.x,
            coordinate.x,
            Circles[i].circle.y,
            coordinate.y
          );
          let angle = angleFinder(
            Circles[i].circle.x,
            coordinate.x,
            Circles[i].circle.y,
            coordinate.y
          );

          if (elapsed >= Circles[i].lastMove + delay) {
            if (dist <= speed * delta) {
              Circles[i].circle.x = coordinate.x;
              Circles[i].circle.y = coordinate.y;
              Circles[i].lastMove = elapsed;
            } else {
              Circles[i].circle.x += Math.cos(angle) * speed * delta;
              Circles[i].circle.y += Math.sin(angle) * speed * delta;
            }
          }
        }
        if (circleSizeCorrect) {
          Circles[i].circle.height = size;
          Circles[i].circle.width = size;
        }
      }
      for (let i = totalCircleCount - 1; i >= 0; i--) {
        let renderDistance = Math.min(maxRenderDistance, resIndex);

        if (i < resIndex - renderDistance || i > resIndex) {
          if (
            Circles[i].used &&
            dotRemoved < Math.abs(frontIndex - resIndex) / 10 &&
            circleSizeCorrect
          ) {
            dotRemoved++;
            frontIndex = i - 1;
            app.stage.removeChild(Circles[i].circle);
            Circles[i].used = false;
          }
        }
      }

      for (let i = 0; i < totalCircleCount; i++) {
        let renderDistance = Math.min(maxRenderDistance, resIndex);

        if (i >= resIndex - renderDistance && i <= resIndex) {
          if (
            !Circles[i].used &&
            dotRemoved < Math.abs(frontIndex - resIndex) / 10 &&
            circleSizeCorrect
          ) {
            dotRemoved++;
            frontIndex = i;
            app.stage.addChild(Circles[i].circle);
            Circles[i].used = true;
          }
        }
      }
      const newLocation = coordinateFinder(frontIndex);

      if (frontIndex == resIndex) {
        popup.sprite.x = newLocation.x;
        popup.sprite.y = newLocation.y;
        popup.border.x = newLocation.x;
        popup.border.y = newLocation.y;
        popup.mask.x = newLocation.x;
        popup.mask.y = newLocation.y;
        if (!popup.inUse) {
          if (Circles[frontIndex].circle.height == popup.R * 2) {
            setPopUpInUse(true);
            popup.inUse = true;
          } else {
            Circles[frontIndex].circle.height += popup.delay;
            Circles[frontIndex].circle.width += popup.delay;

            Circles[frontIndex].circle.height = Math.min(
              Circles[frontIndex].circle.height,
              popup.R * 2
            );
            Circles[frontIndex].circle.width = Math.min(
              Circles[frontIndex].circle.width,
              popup.R * 2
            );
            circleSizeCorrect = false;
          }
        } else if (
          popup.location.x != newLocation.x ||
          popup.location.y != newLocation.y
        ) {
          popup.location = newLocation;
          setPopUpLocation({ ...newLocation });
        }
      } else {
        if (popup.inUse || !circleSizeCorrect) {
          let psize = sizeFinder(frontIndex);
          if (
            Math.abs(Circles[frontIndex].circle.height - psize) < popup.delay
          ) {
            Circles[frontIndex].circle.height = psize;
            Circles[frontIndex].circle.width = psize;
            setPopUpLocation(null);
            setPopUpInUse(false);
            popup.inUse = false;
            circleSizeCorrect = true;
          } else {
            Circles[frontIndex].circle.height -= popup.delay;
            Circles[frontIndex].circle.width -= popup.delay;
          }
        }
      }
    });
    app.start();

    return () => {
      app.stop();
      app.view.remove();
    };
  }, []);

  return gameCanvas;
};

export default PixiComponent;

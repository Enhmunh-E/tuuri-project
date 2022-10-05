import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import "pixi-spine";

const PixiComponent = () => {
  let gameCanvas = <></>;
  let app = PIXI.Application;

  useEffect(() => {
    let appWidth = window.innerWidth,
      appHeight = window.innerHeight - 60,
      aspectRatio = appWidth / appHeight;

    app = new PIXI.Application({
      width: appWidth,
      height: appHeight,
      backgroundColor: 0xffffff,
    });

    document.getElementById("pixi-container").appendChild(app.view);
    app.stage.interactive = true;

    let textureSize = 400;
    // for (let h = 0; h < appHeight; h += textureSize) {
    //   for (let w = 0; w < appHeight; w += textureSize) {
    //     let background = new PIXI.Sprite.from("/spiral/canvas_texture.png");
    //     background.position.y = h;
    //     background.position.x = w;
    //     background.width = textureSize;
    //     background.height = textureSize;
    //     app.stage.addChild(background);
    //   }
    // }

    let elapsed = 0.0;
    // Radius of large and small circle
    let R = 300,
      r = 75;

    // Cordinates of the circles
    let Rx = appWidth / 2,
      Ry = appHeight / 2,
      rX = appWidth / 2,
      rY = appHeight / 2;

    let totalCircleCount = 5000,
      circlePerLoop = 100,
      maxRenderDistance = 5000,
      maxCircleSize = 15; // not 360 degrees per loop to overlap nicely

    let Circles = [],
      frontIndex = totalCircleCount - 1;

    let circlesContainer = new PIXI.Container();

    const coordinateFinder = (index) => {
      let angle =
        (((360 / circlePerLoop / 2 + 360) / circlePerLoop) * index) % 360;
      let renderDistance = Math.min(maxRenderDistance, frontIndex);
      let radius =
        r +
        ((R - r) / renderDistance) * (index - (frontIndex - renderDistance));
      // if (index == 0) console.log(frontIndex, radius);
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
      let distance = frontIndex - index,
        reductionPerDistance = 0.005;
      size -= distance * reductionPerDistance;
      let angle =
        (((360 / circlePerLoop / 2 + 360) / circlePerLoop) * index + 270) % 360;
      let angleDistance = angle,
        reductionPerAngle = 0.05;
      if (angleDistance > 180) angleDistance = 360 - angleDistance;
      size -= angleDistance * reductionPerAngle;
      size = Math.max(size, 0.001);
      return size;
    };

    const distFinder = (x1, x2, y1, y2) => {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    console.log(((Math.atan(1) + Math.PI) * 180) / Math.PI);

    const angleFinder = (x1, x2, y1, y2) => {
      // console.log(x1, x2, y1, y2);
      // console.log(Math.atan((y2 - y1) / (x2 - x1)));
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
    // Maybe add to app onLoad?
    for (let i = 0; i < totalCircleCount; i++) {
      let circle = new PIXI.Sprite.from("/spiral/particle.gif");
      let coordinate = coordinateFinder(i),
        size = sizeFinder(i);
      circle.position.x = coordinate.x;
      circle.position.y = coordinate.y;

      circle.height = size;
      circle.width = size;

      circle.zIndex = i;
      let random = Math.random() * 50,
        type = "instant",
        speed = 0.5;
      if (random <= 7) {
        type = "delayed";
        if (random <= 3) speed = 0.1;
        else if (random <= 1) speed = 0.05;
      }
      Circles.push({
        circle: circle,
        used: false,
        type: type,
        lastMove: elapsed,
        speed: speed,
      });
    }

    window.addEventListener("mousewheel", (e) => {
      if (e.deltaY < 0) frontIndex -= Math.floor(circlePerLoop / 3);
      else frontIndex += Math.floor(circlePerLoop / 3);
      frontIndex = Math.max(frontIndex, circlePerLoop);
      frontIndex = Math.min(frontIndex, totalCircleCount - 1);
    });
    window.addEventListener("pointermove", (e) => {
      let x = window.innerWidth / 2 - e.x,
        y = window.innerHeight / 2 - e.y;
      let Rchange = 10,
        rChange = 2.5;
      Rx = appWidth / 2 + x / Rchange;
      Ry = appHeight / 2 + (y / Rchange) * aspectRatio;
      rX = appWidth / 2 + x / rChange;
      rY = appHeight / 2 + (y / rChange) * aspectRatio;
    });

    app.ticker.add((delta) => {
      elapsed += delta;
      for (let i = 0; i < totalCircleCount; i++) {
        let renderDistance = Math.min(maxRenderDistance, frontIndex);

        if (i < frontIndex - renderDistance || i > frontIndex) {
          if (Circles[i].used) app.stage.removeChild(Circles[i].circle);
          Circles[i].used = false;
          continue;
        }

        let coordinate = coordinateFinder(i),
          size = sizeFinder(i),
          delay = 10;

        if (
          Circles[i].type == "instant" ||
          frontIndex - i <= circlePerLoop * 5
        ) {
          Circles[i].circle.x = coordinate.x;
          Circles[i].circle.y = coordinate.y;
        } else {
          if (Circles[i].lastMove < elapsed - delay) {
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

            if (dist <= Circles[i].speed * delta) {
              Circles[i].circle.x = coordinate.x;
              Circles[i].circle.y = coordinate.y;
              Circles[i].lastMove = elapsed;
            } else {
              Circles[i].circle.x += Math.cos(angle) * Circles[i].speed * delta;
              Circles[i].circle.y += Math.sin(angle) * Circles[i].speed * delta;
            }
          }
        }
        Circles[i].circle.height = size;
        Circles[i].circle.width = size;
        if (!Circles[i].used) app.stage.addChild(Circles[i].circle);
        Circles[i].used = true;
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

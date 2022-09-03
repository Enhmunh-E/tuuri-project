import type { NextPage } from "next";
import { useEffect } from "react";
import { Header } from "../components";
import Parallax from "parallax-js";
import styles from "../styles/Home.module.css";
import Soldier from "../public/assets/soldier.png";
import SoldierBack from "../public/assets/soldierback.svg";
import Image from "next/image";

const Home: NextPage = () => {
  useEffect(() => {
    var scene = document.getElementById("scene");
    var parallaxInstance = new Parallax(scene);
  });
  return (
    <div className={styles.container}>
      <Header />
      <div style={homeStyles.bottomContainer}>
        <div
          id="scene"
          style={{
            width: "40vw",
          }}
        >
          <div data-depth="0">
            <Image src={SoldierBack} />
          </div>
          <div data-depth="0.1">
            <Image src={SoldierBack} />
          </div>
          <div data-depth="0.2">
            <Image
              src={Soldier}
              style={{ objectFit: "contain" }}
              width="500px"
              height="993px"
            />
          </div>
        </div>
        <div>
          <div>
            Өчигдөр бол түүх, Маргааш бол боломж, Маргаашийн боломжоо атгахын
            төлөө
          </div>
          <div style={homeStyles.header}>түүх, соёлоо танин мэдэцгээе!</div>
        </div>
      </div>
    </div>
  );
};

const homeStyles: Record<string, React.CSSProperties> = {
  bottomContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  header: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "40.6349px",
    lineHeight: "70px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "1.5873px",
    textTransform: "uppercase",
    "-webkit-text-stroke": "1.26984px black",
    color: "#FFFFFF",
    textShadow: "2.53968px 2.53968px 0px #FFC909",
  },
};

export default Home;

import type { NextPage } from "next";
import { useEffect } from "react";
import { Header } from "./Header";
// @ts-ignore
import Parallax from "parallax-js";
import Styles from "../styles/Home.module.css";
import Soldier from "../public/assets/soldier.png";
import SoldierBack from "../public/assets/soldier-back.png";
import Explore from "../public/assets/explore.png";
import Image from "next/image";
import Lottie from "react-lottie";
import animationData from "../public/assets/loading.json";

const HomeLoading: NextPage = () => {
  useEffect(() => {
    var scene = document.getElementById("scene");
    var _ = new Parallax(scene);
  });
  return (
    <div className={Styles.container}>
      <Header />
      <div style={styles.bottomContainer}>
        <div
          id="scene"
          style={{
            width: "40vw",
          }}
        >
          <div data-depth="0">
            <Image
              src={SoldierBack}
              style={{
                objectFit: "contain",
                opacity: 0.2,
                marginBottom: "-10px",
                marginLeft: "-10px",
              }}
              width="398.5px"
              height="808.5px"
              alt="SoldierBack"
            />
          </div>
          <div data-depth="0.1">
            <Image
              src={SoldierBack}
              style={{
                objectFit: "contain",
                opacity: 0.6,
                marginBottom: "-5px",
                marginLeft: "-5px",
              }}
              width="398.5px"
              height="808.5px"
              alt="SoldierBack"
            />
          </div>
          <div data-depth="0.2">
            <Image
              src={Soldier}
              style={{ objectFit: "contain" }}
              width="398.5px"
              height="808.5px"
              alt="soldier"
            />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div
            style={{
              width: "80px",
              height: "80px",
            }}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={80}
              width={80}
            />
          </div>

          <p style={styles.mottoText}>
            Өчигдөр бол түүх,
            <br />
            Маргааш бол боломж,
            <br />
            Маргаашийн боломжоо
            <br />
            <span style={styles.upperMotto}>атгахын төлөө</span>
          </p>
          <Image src={Explore} width="601.9px" height="140px" />
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  bottomContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    height: "calc(100vh)",
    paddingTop: "40px",
    overflow: "hidden",
  },
  mottoText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "36px",
    display: "flex",
    color: "#000000",
    flexDirection: "column",
  },
  upperMotto: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "36px",
    textTransform: "uppercase",
    color: "#000000",
  },
  rightCol: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    // justifyContent: "center",
  },
};

export default HomeLoading;

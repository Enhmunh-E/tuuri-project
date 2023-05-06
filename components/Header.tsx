import React from "react";
import Image from "next/image";
import TuuriLogo from "../public/assets/tuuriLogo.svg";
import Link from "next/link";
export const Header = () => {
  return (
    <header style={styles.headerContainer}>
      <div className="middleContainer">
        <Link href={"/"}>
          <Image
            src={TuuriLogo}
            alt="logo"
            height={48}
            width={172}
            style={{
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
    </header>
  );
};
const styles: Record<string, React.CSSProperties> = {
  headerContainer: {
    height: "60px",
    width: "100%",
    padding: "0px calc((100vw - 1280px) / 2)",
    // borderBottom: "1px solid #FFC909",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    background: "white",
    top: 0,
    zIndex: 10,
  },
};

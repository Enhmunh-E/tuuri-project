import React from "react";
import Image from "next/image";
import TuuriLogo from "../public/assets/tuuriLogo.svg";
import Link from "next/link";
export const Header = () => {
  return (
    <header style={styles.headerContainer}>
      <div className="middleContainer">
        <Link href={"/"}>
          <Image src={TuuriLogo} />
        </Link>
        <div style={{}}>Цагийн эрхи</div>
      </div>
    </header>
  );
};
const styles: Record<string, React.CSSProperties> = {
  headerContainer: {
    height: "60px",
    width: "100%",
    // borderBottom: "1px solid #FFC909",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    background: "white",
    top: 0,
  },
};

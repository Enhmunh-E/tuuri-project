import React from "react";
import Image from "next/image";
import TuuriLogo from "../public/assets/tuuriLogo.svg";
export const Header = () => {
  return (
    <header style={styles.headerContainer}>
      <div className="middleContainer">
        <Image src={TuuriLogo} />
        <div>Цагийн эрхи</div>
      </div>
    </header>
  );
};
const styles: Record<string, React.CSSProperties> = {
  headerContainer: {
    height: "60px",
    width: "100vw",
    // borderBottom: "1px solid #FFC909",
    display: "flex",
    alignItems: "center",
  },
};

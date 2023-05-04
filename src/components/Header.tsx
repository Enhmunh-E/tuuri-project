import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className="middleContainer">
        <div className={styles.headerIcon}>
          <Link href={"/"}>
            <Image
              src={"/assets/tuuriLogo.svg"}
              layout="fill"
              alt="logo"
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
// const styles: Record<string, React.CSSProperties> = {
//   headerContainer: {
//     height: "60px",
//     width: "100%",
//     padding: "0px calc((100vw - 1280px) / 2)",
//     // borderBottom: "1px solid #FFC909",
//     display: "flex",
//     alignItems: "center",
//     position: "fixed",
//     background: "white",
//     top: 0,
//     zIndex: 10,
//   },
// };

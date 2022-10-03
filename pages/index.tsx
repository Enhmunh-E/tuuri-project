import type { NextPage } from "next";
import { Header } from "../components";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const Pixi = dynamic(import("../components/Pixi"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      {/* Here Lies the Spring and other components */}
      <Pixi />
      <div style={homeStyles.bottomContainer}>Home</div>
    </div>
  );
};

const homeStyles: Record<string, React.CSSProperties> = {
  bottomContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    height: "calc(100vh - 60px)",
    paddingTop: "40px",
    overflow: "hidden",
  },
};

export default Home;

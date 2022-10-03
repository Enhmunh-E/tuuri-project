import type { NextPage } from "next";
import { Header } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      {/* Here Lies the Spring and other components */}
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

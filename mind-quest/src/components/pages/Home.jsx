import styles from "./Home.module.css";
import Menu from "../layout/Menu";
function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Home</h1>
      <Menu />
    </section>
  );
}

export default Home;

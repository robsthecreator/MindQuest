import styles from "./Home.module.css";
// import TaskCard from "../layout/TaskCard";

function Home() {
  return (
    <section className={styles.home_container}>
        <h1>Home</h1>
      {/* <div className={styles.tasks_home_container}>
        <TaskCard />
      </div> */}
    </section>
  );
}

export default Home;

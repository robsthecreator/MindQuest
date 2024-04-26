import Taskform from "../taskform/Taskform";
import styles from "./Newtask.module.css";

function Newtask() {
  return (
    <div>
      <h1>Adicione uma tarefa!</h1>
      <div className={styles.create_task_container}>
        <Taskform btnText="Criar tarefa" />
      </div>
    </div>
  );
}

export default Newtask;

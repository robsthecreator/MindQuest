import styles from "./TaskCard.module.css";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function TaskCard() {

    const [tasks, setTasks] = useState([
        {
          id: 1,
          title: "Reunião com o chefe",
          completed: false,
          category: "trabalho",
          description:
            "Alinhar as ideias do projeto, discutir mudanças no formato de trabalho, apresentar melhorias e descobrir o próximo passo.",
        },
        {
          id: 2,
          title: "Sair com meus amigos",
          completed: false,
          category: "pessoal",
          description: "Sair com a galera após entregar os projetos",
        },
        {
          id: 3,
          title: "Estudar programação",
          completed: false,
          category: "estudos",
          description:
            "Devo estudar ReactJs durante a tarde e também aprofundar um pouco mais na organização de pastas e",
        },
        {
          id: 4,
          title: "Tomar os remédios 10h35, 15h35, 20h35",
          completed: false,
          category: "pessoal",
          description: "",
        },
      ]);

  return (
    <div className={styles.task_container}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.task}>
          <div>
            <button className={styles.task_button_delete}>
              <FaTrashAlt />
            </button>
            <button className={styles.task_button_done}>
              <FaCheck />
            </button>
          </div>
          <div className={styles.task_header}>
            <h3>{task.title}</h3>
            <p className={styles.task_category}>{task.category}</p>
          </div>
          <p className={styles.task_description}>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskCard;

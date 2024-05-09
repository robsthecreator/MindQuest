import styles from "./TaskCard.module.css";
// import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function TaskCard({ id, name, description, category, handleRemove }) {
  return (
    <>
      <div key={id} className={styles.task}>
        <div className={styles.buttons_container}>
          <button className={styles.task_button_delete}>
            <FaTrashAlt />
          </button>
          <button className={styles.task_button_done}>
            <FaCheck />
          </button>
        </div>
        <div className={styles.task_header}>
          <h3>{name}</h3>
        </div>
        <div className={styles.task_category}>
          <p>{category}</p>
        </div>
        <p className={styles.task_description}>{description}</p>
      </div>
      
    </>
  );
}

export default TaskCard;

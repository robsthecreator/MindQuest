import styles from "./TaskCard.module.css";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

function TaskCard({ task, id, name, description, category, handleRemove }) {
  const [completed, setCompleted] = useState(task.completed);
  const [localTask, setLocalTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSave = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${updatedTask.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        setLocalTask(updatedTask);
        setIsEditing(false);
      } else {
        console.error("Error updating task:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  useEffect(() => {
    const storedCompleted = localStorage.getItem(`task-${task.id}-completed`);
    if (storedCompleted !== null) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, [task.id]);

  const toggleCompleted = async () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);

    try {
      const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newCompleted }),
      });

      if (response.ok) {
        localStorage.setItem(
          `task-${task.id}-completed`,
          JSON.stringify(newCompleted)
        );
      } else {
        console.error("Error updating task:", response.statusText);
      }
    } catch (err) {
      console.error("Error toggling completed:", err);
    }
  };

  const remove = (e) => {
    e.preventDefault();
    handleRemove(task.id);
  };
  return (
    <>
      <div
        key={id}
        className={`${styles.task} ${completed && styles.completed}`}
      >
        <div className={styles.buttons_container}>
          <button
            className={styles.task_button_delete}
            data-tooltip="Deletar"
            onClick={remove}
          >
            <FaTrashAlt />
          </button>
          <button
            className={styles.task_button_edit}
            data-tooltip="Editar"
            onClick={() => handleEditClick(task)}
          >
            <MdEdit />
          </button>
          <button
            className={styles.task_button_done}
            data-tooltip="Concluir"
            onClick={toggleCompleted}
          >
            <FaCheck />
          </button>
        </div>
        {completed && (
          <div className={styles.task_completed_message}>
            <h2>Tarefa concluída!</h2>
            <CiCircleCheck className={styles.img_done} />
          </div>
        )}
        <div className={styles.task_header}>
          <h3>{name}</h3>
        </div>

        <div className={styles.task_category}>
          <p>{category}</p>
        </div>
        <p className={styles.task_description}>{description}</p>
      </div>
      {isEditing && (
        <EditTaskModal
          show={isEditing}
          onHide={() => setIsEditing(false)}
          task={localTask}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default TaskCard;

import  { useState } from "react";
import styles from "./EditTaskModal.module.css";
import { IoClose } from "react-icons/io5";




function EditTaskModal({ show, onHide, task, onSave }) {
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = async () => {
    const updatedTask = { ...task, name: editedName, description: editedDescription };

    try {
      const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        onSave(updatedTask);
        const message = "Tarefa editada com sucesso!";
        window.location.href = `/tasks?message=${message}`;
        onHide();
      } else {
        console.error("Error updating task:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className={styles.modalContainer} style={{ display: show ? "block" : "none" }}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Editar Tarefa</h2>
          <button className={styles.closeButton} onClick={onHide}>
            <IoClose />
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.editForm}>
            <div className={styles.formGroup}>
              <label htmlFor="task-name">Nome</label>
              <input
                type="text"
                id="task-name"
                className={styles.form_input}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="task-description">Descrição</label>
              <textarea
                id="task-description"
                className={styles.form_desc}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.saveButton} onClick={handleSave}>
            Salvar
          </button>
          <button className={styles.cancelButton} onClick={onHide}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;

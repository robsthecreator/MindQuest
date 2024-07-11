import React, { useState } from "react";
import styles from "./EditTaskModal.module.css";
import { IoClose } from "react-icons/io5";
import Message from "../layout/Message";
import Container from "../layout/Container";

function EditTaskModal({ show, onHide, task, onSave }) {
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    const newErrors = {};

    if (!editedName || editedName.trim() === "") {
      newErrors.name = "Insira o título antes de enviar";
    }

    if (!editedDescription || editedDescription.trim() === "") {
      newErrors.description = "Insira a descrição antes de enviar";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatedTask = {
        ...task,
        name: editedName,
        description: editedDescription,
      };

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
          onHide();

          const message = "Tarefa editada com sucesso!";
          window.location.href = `/tasks?message=${message}`;
        } else {
          console.error("Error updating task:", response.statusText);
        }
      } catch (err) {
        console.error("Error updating task:", err);
      }
    }
  };

  return (
    <div
      className={styles.modalContainer}
      style={{ display: show ? "block" : "none" }}
    >
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
                maxLength={46}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="task-description">Descrição</label>
              <textarea
                id="task-description"
                className={styles.form_desc}
                value={editedDescription}
                maxLength={210}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
            {Object.keys(errors).length > 0 && ( // Check if there are errors
              <Container customClass="message_container">
                {Object.keys(errors).map((key) => (
                  <Message key={key} msg={errors[key]} type="info" />
                ))}
              </Container>
            )}
          </form>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
          >
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

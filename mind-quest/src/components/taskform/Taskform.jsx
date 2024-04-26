import React from "react";
import Container from "../layout/Container";
import styles from "./Taskform.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import Textarea from "../form/Textarea";
import SubmitButton from "../form/SubmitButton";

function Taskform({ btnText }) {
  return (
    <Container>
      <div className={styles.create_task_container}>
        <Input
          type="text"
          text="Título da tarefa"
          name="name"
          placeholder="Insira o título da tarefa"
        />
        <Select name="category_id" text="Selecione a categoria" />
        <Textarea
          type="text"
          text="Descrição da tarefa"
          name="name"
          placeholder="Insira a descrição da tarefa"
        />
        <SubmitButton text={btnText} />
      </div>
    </Container>
  );
}

export default Taskform;

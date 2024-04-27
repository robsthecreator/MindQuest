import Input from "../form/Input";
import Select from "../form/Select";
import { useState, useEffect } from "react";
import SubmitButton from "../form/SubmitButton";
import Textarea from "../form/Textarea";
import Container from "../layout/Container";
import styles from "./Taskform.module.css";

function Taskform({ btnText }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <div className={styles.create_task_container}>
        <Input
          type="text"
          text="Título da tarefa"
          name="name"
          placeholder="Insira o título da tarefa"
        />
        <Select
          name="category_id"
          text="Selecione a categoria"
          options={categories}
        />
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

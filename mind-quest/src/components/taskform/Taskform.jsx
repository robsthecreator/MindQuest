import Input from "../form/Input";
import Select from "../form/Select";
import { useState, useEffect } from "react";
import SubmitButton from "../form/SubmitButton";
import Textarea from "../form/Textarea";
import Container from "../layout/Container";
import styles from "./Taskform.module.css";

function Taskform({ handleSubmit, btnText, taskData }) {
  const [categories, setCategories] = useState([]);
  const [task, setTask] = useState(taskData || {});

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

  const submit = (e) => {
    e.preventDefault();
    // console.log(task)
    handleSubmit(task);
  };

  function handleChange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  function handleCategory(e) {
    setTask({
     ...task,
      category: {
        category_id: e.target.value,
        category_name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <Container>
      <form onSubmit={submit}>
        <div className={styles.create_task_container}>
          <Input
            type="text"
            text="Título da tarefa"
            name="name"
            placeholder="Insira o título da tarefa"
            handleOnChange={handleChange}
            value={task.name ? task.name : ''}
          />
          <Select
            name="category_id"
            text="Selecione a categoria"
            options={categories}
            handleOnChange={handleCategory}
            value={task.category ? task.category.category_id : ''}
          />
          <Textarea
            type="text"
            text="Descrição da tarefa"
            name="description"
            placeholder="Insira a descrição da tarefa"
            handleOnChange={handleChange}
            maxLength={225}
            value={task.description ? task.description : ''}
          />
          <SubmitButton text={btnText} />
        </div>
      </form>
    </Container>
  );
}

export default Taskform;

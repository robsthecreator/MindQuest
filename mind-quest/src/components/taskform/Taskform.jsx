import Input from "../form/Input";
import Select from "../form/Select";
import { useState, useEffect } from "react";
import SubmitButton from "../form/SubmitButton";
import Textarea from "../form/Textarea";
import Container from "../layout/Container";
import styles from "./Taskform.module.css";
import Message from "../layout/Message";

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

  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!task.name || task.name.trim() === "") {
      newErrors.name = "Insira o título antes de enviar";
    }

    if (!task.category || !task.category.category_id) {
      newErrors.category = "Selecione uma categoria antes de enviar";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit(task);
    }
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
    <>
      <form onSubmit={submit}>
        <div className={styles.create_task_container}>
          <Input
            type="text"
            autoComplete="nope"
            text="Título da tarefa"
            name="name"
            placeholder="Insira o título da tarefa"
            handleOnChange={handleChange}
            value={task.name ? task.name : ""}
          />
          <Select
            name="category_id"
            text="Selecione a categoria"
            options={categories}
            handleOnChange={handleCategory}
            value={task.category ? task.category.category_id : ""}
          />

          <Textarea
            type="text"
            text="Descrição da tarefa"
            name="description"
            placeholder="Insira a descrição da tarefa"
            handleOnChange={handleChange}
            maxLength={210}
            value={task.description ? task.description : ""}
          />
          <SubmitButton
            text={btnText}
            disabled={Object.keys(errors).length > 0}
          />
        </div>
      </form>
      <Container customClass="message_container">
        {errors.name && <Message msg={errors.name} type="info" />}
        {errors.category && <Message msg={errors.category} type="info" />}
      </Container>
    </>
  );
}

export default Taskform;

import React, { useState, useEffect } from "react";
import TaskCard from "../layout/TaskCard";
import Message from "../layout/Message";
import { useLocation, useHistory } from "react-router-dom";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import styles from "./Tasks.module.css";

function Tasks() {
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const messageFromQuery = searchParams.get("message");

    // para receber a mensagem vindo do Newtask, aqui é usado o parametro da url e logo depois apagado
    // evitando que reapareça a mensagem de confirmação.
    if (messageFromQuery) {
      setMessage(messageFromQuery);
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.delete("message");
      history.replace({
        pathname: "/tasks",
        search: newSearchParams.toString(),
      });
    }
  }, [history, location.search]);

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message]);

  const [tasks, setTasks] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className={styles.header_container}>
        <h1>Suas tarefas</h1>
        <LinkButton text="Criar nova tarefa" to="/newtask" />
      </div>
      {message && <Message msg={message} type="success" />}
      <div className={styles.task_container}>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              name={task.name}
              description={task.description}
              category={task.category.category_name}
            />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && tasks.length === 0 && (
            <h3 className={styles.notasks}>Parece que você não tem nenhuma tarefa ! Que tal adicionar uma ?</h3>
          )
          
          }
      </div>
    </div>
  );
}

export default Tasks;

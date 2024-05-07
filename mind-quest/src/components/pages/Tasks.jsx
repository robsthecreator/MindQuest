import React, { useState, useEffect } from "react";
import TaskCard from "../layout/TaskCard";
import Message from "../layout/Message";
import { useLocation, useHistory } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import styles from "./Tasks.module.css"

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

  return (
    <div>
      <div className={styles.header_container}>
        <h1>Suas tarefas</h1>
        <LinkButton text="Criar nova tarefa" to="/newtask"/>
      </div>
      {message && <Message msg={message} type="success" />}
      <TaskCard />
    </div>
  );
}

export default Tasks;

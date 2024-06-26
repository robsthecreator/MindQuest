import React, { useState, useEffect } from "react";
import Message from "../layout/Message";
import { useLocation, useHistory } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import styles from "./Tasks.module.css";
import Container from "../layout/Container";
import TaskContainer from "../layout/TaskContainer";
import Loading from "../layout/Loading";

function Tasks() {
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  

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

  function removeTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        if (resp.ok) {
          setTasks(tasks.filter((task) => task.id !== id));
          setMessage("Tarefa deletada com sucesso!"); 
          setTimeout(() => setMessage(""), 3000);
        } else {
          console.error("Error deleting task:", resp.statusText);
        }
      })
      .catch((err) => console.log(err));
  }


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
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
        })
        .catch((err) => console.log(err));
    }, 3000); // delay de 3 segundos para teste, LEMBRAR DE TIRAR
  }, []);

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(category)
        ? prevExpanded.filter((cat) => cat !== category)
        : [...prevExpanded, category]
    );
  };
  const [isTodasExpanded, setIsTodasExpanded] = useState(true);
  const toggleTodasExpansion = () => {
    setIsTodasExpanded(!isTodasExpanded);
  };

  return (
    <div>
      <div className={styles.header_container}>
        <h1>Suas tarefas</h1>
        {/* adicionar Lupa */}
        <h2 className={styles.pesquisar}>O-Pesquisar</h2> 
        <LinkButton text="Criar nova tarefa" to="/newtask" />
      </div>
      <Container customClass="message_container">
        {message && <Message msg={message} type="success" />}
      </Container>
  
      {tasks.length === 0 ? (
        <div className={styles.loading_container}>
          <Loading />
        </div>
      ) : (
        <>
          <TaskContainer
            title="Todas"
            tasks={tasks}
            handleRemove={removeTask}
            isExpanded={isTodasExpanded}
            onToggleExpansion={toggleTodasExpansion}
            itemCount={tasks.length}
          />
  
          {tasks.length > 0 && (
            <div className={styles.category_containers}>
              {Array.from(new Set(tasks.map((task) => task.category.category_name))).map(
                (category) => (
                  <TaskContainer
                    key={category}
                    title={category}
                    tasks={tasks.filter((task) => task.category.category_name === category)}
                    handleRemove={removeTask}
                    isExpanded={expandedCategories.includes(category)}
                    onToggleExpansion={() => toggleCategoryExpansion(category)}
                    itemCount={tasks.filter((task) => task.category.category_name === category).length}
                  />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
  
}

export default Tasks;

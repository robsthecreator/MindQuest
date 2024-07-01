/* eslint-disable no-mixed-operators */
import React, { useState, useEffect } from "react";
import Message from "../layout/Message";
import { useLocation, useHistory } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import styles from "./Tasks.module.css";
import Container from "../layout/Container";
import TaskContainer from "../layout/TaskContainer";
import Loading from "../layout/Loading";
import { CiSearch } from "react-icons/ci";
import Menu from "../layout/Menu";

function Tasks() {
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const messageFromQuery = searchParams.get("message");

    // para receber a mensagem vindo do Newtask, aqui é usado o parametro da url e logo depois apagado
    // evitando que reapareça a mensagem de confirmação.
    if (messageFromQuery) {
      setMessage(messageFromQuery);
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.delete("message");
      setTimeout(() => setMessage(""), 3000);
      history.replace({
        pathname: "/tasks",
        search: newSearchParams.toString(),
      });
    }
  }, [history, location.search]);

  function removeTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
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
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {console.log(err)
        setIsLoading(false);
      }
    );
  }, 3000);
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

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredTasks =
    tasks.length > 0
      ? tasks.filter(
          (task) =>
            (task &&
              task.name?.toLowerCase().includes(searchText.toLowerCase())) ||
            task.category?.category_name
              ?.toLowerCase()
              .includes(searchText.toLowerCase())
        )
      : [];

  return (
    <div>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>Suas tarefas</h1>
        <div className={styles.search_task}>
          <input
            type="text"
            placeholder="Pesquisar tarefas"
            name="search"
            autoComplete="off"
            className={styles.search_input}
            value={searchText}
            onChange={handleSearchChange}
          />
          <CiSearch className={styles.search_icon} />
        </div>

        <LinkButton text="Criar nova tarefa" to="/newtask" />
      </div>
      <Container customClass="message_container">
        {message && (
          <Message
            msg={message}
            type="success"
            onClose={() => setMessage("")}
          />
        )}
      </Container>

      {tasks.length === 0 && !isLoading ? (
        <div className={styles.notasks_container}>
          <h1>Não há tarefas cadastradas, adicione uma !</h1>
        </div>
      ) : isLoading ? (
        <div className={styles.loading_container}>
          <Loading />
        </div>
      ) : (
        <>
          <TaskContainer
            title="Todas"
            tasks={filteredTasks}
            handleRemove={removeTask}
            isExpanded={isTodasExpanded}
            onToggleExpansion={toggleTodasExpansion}
            itemCount={filteredTasks.length}
          />

          {tasks.length > 0 && (
            <div className={styles.category_containers}>
              {Array.from(
                new Set(tasks.map((task) => task.category.category_name))
              ).map((category) => (
                <TaskContainer
                  key={category}
                  title={category}
                  tasks={tasks.filter(
                    (task) => task.category.category_name === category
                  )}
                  handleRemove={removeTask}
                  isExpanded={expandedCategories.includes(category)}
                  onToggleExpansion={() => toggleCategoryExpansion(category)}
                  itemCount={
                    tasks.filter(
                      (task) => task.category.category_name === category
                    ).length
                  }
                />
              ))}
            </div>
          )}
        <Menu />
        </>
      )}
    </div>
  );
}

export default Tasks;

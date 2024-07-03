import Taskform from "../taskform/Taskform";
import { useHistory } from 'react-router-dom';
import styles from "./Newtask.module.css";
import Menu from "../layout/Menu";

function Newtask() {

  const history = useHistory()

  function createPost(task){
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
   .then((response) => response.json())
   .then(() => {
    history.push('/tasks?message=Tarefa%20criada%20com%20sucesso%20!')
   })
   .catch(err => console.log(err))

  }

  return (
    <div>
      <h1>Adicione uma tarefa!</h1>
      <div className={styles.create_task_container}>
        <Taskform handleSubmit={createPost} btnText="Criar tarefa" />
      </div>
      <Menu />
    </div>
  );
}

export default Newtask;

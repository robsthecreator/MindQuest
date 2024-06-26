import TaskCard from "../layout/TaskCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./TaskContainer.module.css";

const TaskContainer = ({
  title,
  tasks,
  handleRemove,
  removeLoading,
  isExpanded,
  onToggleExpansion,
  itemCount,
}) => {
  return (
    <div
      className={`${styles.container_title} ${isExpanded && styles.expanded}`}
    >
      <div className={styles.category_header} onClick={onToggleExpansion}>
          <h2 className={styles.category_title}>
            {title} ({itemCount})
          </h2>
        <div className={styles.icon_container}>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isExpanded && (
        <div className={styles.task_container}>
          {tasks.length > 0 &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                name={task.name}
                description={task.description}
                category={task.category.category_name}
                handleRemove={handleRemove}
                task={task}
              />
            ))}
          {removeLoading && tasks.length === 0 && (
            <h3 className={styles.notasks}>Não há tarefas nesta categoria.</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskContainer;

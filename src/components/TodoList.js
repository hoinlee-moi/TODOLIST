import { useContext, useEffect } from "react";
import { TodoStateContext } from "../pages/Todo";
import styles from "../pages/Todo.module.css";
import TodoItem from "./TodoItem";

const TodoList = ({ checked }) => {
  const listData = useContext(TodoStateContext);
  const checkFilter = () => {
    if (checked) {
      return listData.filter((item) => item.isCompleted)
    } else {
      return listData.filter((item) => !item.isCompleted)
    }
  };
  return (
    <section className={styles.checkedWrap}>
      {checkFilter().map((item) => (
        <TodoItem item={item} key={item.id} />
      ))}
    </section>
  );
};

export default TodoList;

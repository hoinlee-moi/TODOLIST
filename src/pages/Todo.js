import { useEffect, useState } from "react";

import styles from "./Todo.module.css";
import { testList } from "../dummy";
import TodoCreate from "../components/TodoCreate";
import TodoItem from "../components/TodoItem";
const Todo = () => {
  const [listData, setListData] = useState(testList);
  useEffect(() => {}, []);

  const changeHandle = (e) => {
    console.log(e.target.checked);
  };

  return (
    <div className={styles.todoBackground}>
      <div className={styles.todoContainer}>
        <section className={styles.titleWrap}>
          <h2>TO DO LIST!</h2>
        </section>
        <TodoCreate />
        <section className={styles.todoListContainer}>
          <div className={styles.listWrap}>
            <section className={styles.checkedWrap}>
              {listData
                .filter((item) => item.isCompleted)
                .map((item) => (
                  <TodoItem item={item} />
                ))}
            </section>
            <section className={styles.nonCheckedWrap}>
              {listData
                .filter((item) => !item.isCompleted)
                .map((item) => (
                  <TodoItem item={item} />
                ))}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Todo;

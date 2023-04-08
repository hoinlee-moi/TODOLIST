import React, { useCallback, useEffect, useReducer, useState } from "react";

import styles from "./Todo.module.css";
import { testList } from "../dummy";
import TodoCreate from "../components/TodoCreate";
import TodoItem from "../components/TodoItem";
import { reducer } from "../reducer";
const Todo = () => {
  const [listData, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    dispatch({ type: "INIT", data: testList });
  }, []);

  const checkChangeHandle = useCallback(
    (id, check) => {
      dispatch({ type: "CHANGE", data: { id: id, check: check } });
    },
    [listData]
  );

  const onCreateTodo = (value) => {
    dispatch({type:"CREATE",data:value})
  }

  const onDeleteTodo = (id) => {
    dispatch({type:"DELETE",data:id})
  }

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
                  <TodoItem item={item} onChange={checkChangeHandle} />
                ))}
            </section>
            <section className={styles.nonCheckedWrap}>
              {listData
                .filter((item) => !item.isCompleted)
                .map((item) => (
                  <TodoItem item={item} onChange={checkChangeHandle} />
                ))}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Todo);

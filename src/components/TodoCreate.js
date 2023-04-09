import React, { useCallback, useContext, useRef, useState } from "react";
import { enterKeyEvent } from "../enterKeyEvent";
import { TodoDispatchContext } from "../pages/Todo";
import styles from "../pages/Todo.module.css";
import MyButton from "./MyButton";

const TodoCreate = () => {
  const [todoValue, setTodoValue] = useState("");
  const inputRef = useRef(null);
  const { onCreateTodo } = useContext(TodoDispatchContext);
  const createTodo = () => {
    if (todoValue.trim().length < 1) {
      inputRef.current.focus();
      return;
    }
    onCreateTodo(todoValue);
    setTodoValue("");
  };
  return (
    <section className={styles.todoInputContainer}>
      <div className={styles.inputWrap}>
        <input
          type="text"
          data-testid="new-todo-input"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          onKeyDown={(e) => enterKeyEvent(e, createTodo)}
          maxLength="25"
          autoComplete="off"
          ref={inputRef}
        />
        <MyButton testId="new-todo-add-button" clickHandle={createTodo}>
          추가
        </MyButton>
      </div>
    </section>
  );
};

export default TodoCreate;

import { useState } from "react";
import styles from "../pages/Todo.module.css";
import MyButton from "./MyButton";

const TodoCreate = () => {
  const [todoValue,setTodoValue] = useState("")

  return (
    <section className={styles.todoInputContainer}>
      <div className={styles.inputWrap}>
        <input type="text" data-testid="new-todo-input" onChange={(e)=>setTodoValue(e.target.value)} />
        <MyButton testId="new-todo-add-button">추가</MyButton>
      </div>
    </section>
  );
};

export default TodoCreate;

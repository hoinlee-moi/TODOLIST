import styles from "../pages/Todo.module.css";
import MyButton from "./MyButton";
const TodoCreate = () => {
  return (
    <section className={styles.todoInputContainer}>
      <div className={styles.InputWrap}>
        <input type="text" data-testid="new-todo-input" />
      </div>
      <div className={styles.createBtnWrap}>
        <MyButton testId="new-todo-add-button">추가</MyButton>
      </div>
    </section>
  );
};

export default TodoCreate;

import { useContext, useRef, useState } from "react";
import MyCheckBox from "./MyCheckBox";
import styles from "../pages/Todo.module.css";
import MyButton from "./MyButton";
import { enterKeyEvent } from "../enterKeyEvent";
import { TodoDispatchContext } from "../pages/Todo";

const TodoItem = ({ item }) => {
  const [editValue, setEditValue] = useState("");
  const [todoEdit, setTodoEdit] = useState(false);
  const inputRef = useRef(null);
  const { onDeleteTodo, onUpdateTodo } = useContext(TodoDispatchContext);
  const changeHandle = (e) => {
    onUpdateTodo(item.id, e.target.checked, item.todo);
  };
  const editChangeHandle = (e) => {
    const buttonName = e.target.textContent;
    if (buttonName === "삭제") {
      onDeleteTodo(item.id);
      return;
    }
    if (buttonName === "수정") {
      setTodoEdit(true);
      return;
    }
    if (buttonName === "취소") {
      setTodoEdit(false);
      return;
    }
    if (buttonName === "완료") {
      if (editValue.trim().length < 1) {
        inputRef.current.focus();
        return;
      }
      onUpdateTodo(item.id, item.isCompleted, editValue);
      setTodoEdit(false);
      return;
    }
  };
  return (
    <li className={styles.listItemBox}>
      <label>
        <MyCheckBox checked={item.isCompleted} onChange={changeHandle} />
        {todoEdit ? (
          <input
            type="text"
            onChange={(e) => setEditValue(e.target.value)}
            ref={inputRef}
            defaultValue={item.todo}
          />
        ) : (
          <p>{item.todo}</p>
        )}
      </label>

      <MyButton className={styles.editBtn} clickHandle={editChangeHandle}>
        {todoEdit ? "완료" : "수정"}
      </MyButton>
      <MyButton className={styles.deleteBtn} clickHandle={editChangeHandle}>
        {todoEdit ? "취소" : "삭제"}
      </MyButton>
    </li>
  );
};

export default TodoItem;

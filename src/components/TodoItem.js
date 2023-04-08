import { useState } from "react";
import MyCheckBox from "./MyCheckBox";
import styles from "../pages/Todo.module.css";
import MyButton from "./MyButton";

const TodoItem = ({ item, onChange }) => {
  const [checkState, setCheckState] = useState(item.isCompleted);
  const changeHandle = (e) => {
    setCheckState(e.target.checked);
    onChange(item.id, e.target.checked);
  };
  // className={checkState&&styles.checkedAni}
  return (
    <li key={item.id} className={styles.listItemBox}>
      <label>
        <MyCheckBox checked={item.isCompleted} onChange={changeHandle} />
        <p>{item.todo}</p>
      </label>

      <MyButton className={styles.editBtn}>수정</MyButton>
      <MyButton className={styles.deleteBtn}>삭제</MyButton>
    </li>
  );
};

export default TodoItem;

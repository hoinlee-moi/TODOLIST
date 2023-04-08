import { useState } from "react";
import MyCheckBox from "./MyCheckBox";
import styles from "../pages/Todo.module.css"

const TodoItem = ({ item }) => {
    const [checkState,setCheckState] = useState(item.isCompleted)
  return (
    <li key={item.id} className={checkState&&styles.checkedAni}>
      <label>
        <MyCheckBox checked={checkState} onChange={setCheckState}/>
        <span>{item.todo}</span>
      </label>
    </li>
  );
};

export default TodoItem;

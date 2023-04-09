import React,{ useCallback, useContext, useRef, useState } from "react";
import { TodoDispatchContext } from "../pages/Todo";

import MyCheckBox from "./MyCheckBox";
import MyButton from "./MyButton";

import styles from "../pages/Todo.module.css";
import { enterKeyEvent } from "../enterKeyEvent";

const TodoItem = ({ item }) => {
  const [editValue, setEditValue] = useState(item.todo);
  const [todoEdit, setTodoEdit] = useState(false);
  const inputRef = useRef(null);
  const { onDeleteTodo, onUpdateTodo } = useContext(TodoDispatchContext);
  const changeHandle = (e) => {
    onUpdateTodo(item.id, e.target.checked, item.todo, false);
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
    if (buttonName === "제출") {
      if (editValue.trim().length < 1) {
        inputRef.current.focus();
        return;
      }
      onUpdateHandel();
      return;
    }
  };

  const onUpdateHandel = () => {
    onUpdateTodo(item.id, item.isCompleted, editValue, true);
    setTodoEdit(false);
  };
  return (
    <li className={styles.listItemBox}>
      <label>
        <MyCheckBox
          checked={item.isCompleted}
          onChange={changeHandle}
          className={styles.checkInput}
        />
        {todoEdit ? (
          <input
            type="text"
            data-testid="modify-input"
            className={styles.editInput}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => enterKeyEvent(e, onUpdateHandel)}
            ref={inputRef}
            value={editValue}
            maxLength="25"
            autoComplete="off"
          />
        ) : (
          <p>{item.todo}</p>
        )}
      </label>

      <MyButton
        className={styles.editBtn}
        clickHandle={editChangeHandle}
        testId={todoEdit ? "submit-button" : "modify-button"}
      >
        {todoEdit ? "제출" : "수정"}
      </MyButton>
      <MyButton
        className={styles.deleteBtn}
        clickHandle={editChangeHandle}
        testId={todoEdit ? "cancel-button" : "delete-button"}
      >
        {todoEdit ? "취소" : "삭제"}
      </MyButton>
    </li>
  );
};

export default React.memo(TodoItem);

import React, { useCallback, useEffect, useReducer } from "react";

import styles from "./Todo.module.css";
import TodoCreate from "../components/TodoCreate";
import reducer from "../reducer";
import TodoList from "../components/TodoList";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const Todo = () => {
  const [listData, dispatch] = useReducer(reducer, []);
  const navigate = useNavigate();
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    await axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "INIT", data: res.data });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("access_token")
          navigate("/signin", { replace: true });
          alert("로그인 정보가 유효하지 않습니다");
        }
      });
  };

  const onUpdateTodo = async (id, check, value) => {
    await axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        { todo: value, isCompleted: check },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "UPDATE", data: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onCreateTodo = async (value) => {
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          dispatch({ type: "CREATE", data: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버 연결이 올바르지 않습니다");
      });
  };

  const onDeleteTodo = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await axios
        .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          if (res.status === 204) dispatch({ type: "DELETE", targetId: id });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <TodoStateContext.Provider value={listData}>
      <TodoDispatchContext.Provider
        value={{ onCreateTodo, onDeleteTodo, onUpdateTodo }}
      >
        <div className={styles.todoBackground}>
          <div className={styles.todoContainer}>
            <section className={styles.titleWrap}>
              <h2>TO DO LIST!</h2>
            </section>
            <TodoCreate />
            <section className={styles.todoListContainer}>
              <div className={styles.listWrap}>
                <TodoList checked={true} />
                <TodoList checked={false} />
              </div>
            </section>
          </div>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default React.memo(Todo);

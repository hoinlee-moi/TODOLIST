import React, { useEffect, useReducer, useState } from "react";

import styles from "./Todo.module.css";
import TodoCreate from "../components/TodoCreate";
import reducer from "../reducer";
import TodoList from "../components/TodoList";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import LoadingComponent from "../components/LoadingComponent";

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const Todo = () => {
  const [listData, dispatch] = useReducer(reducer, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initData();
  }, []);
  const removeToken = (value, url) => {
    localStorage.removeItem("access_token");
    navigate(`${url}`, { replace: true });
    alert(value);
  };
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
          setLoading(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          removeToken("로그인 정보가 유효하지 않습니다", "/signin");
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
        if (err.response.status === 401) {
          removeToken("로그인 정보가 유효하지 않습니다", "/signin");
        }
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
        if (res.status === 201) {
          dispatch({ type: "CREATE", data: res.data });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          removeToken("로그인 정보가 유효하지 않습니다", "/signin");
        }
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
          if (err.response.status === 401) {
            removeToken("로그인 정보가 유효하지 않습니다", "/signin");
          }
        });
    }
  };
  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?"))
      removeToken("로그아웃을 완료하였습니다", "/");
  };
  return (
    <TodoStateContext.Provider value={listData}>
      <TodoDispatchContext.Provider
        value={{ onCreateTodo, onDeleteTodo, onUpdateTodo }}
      >
        <div className={styles.todoBackground}>
          <div className={styles.todoContainer}>
            <div className={styles.logoutWrap}>
              <label htmlFor="logOut">
                <img src={`${process.env.PUBLIC_URL}/assets/logout_icon.png`} />
              </label>
              <MyButton id="logOut" clickHandle={onLogout}></MyButton>
            </div>
            <section className={styles.titleWrap}>
              <h2>TO DO LIST!</h2>
            </section>
            <TodoCreate />
            <section className={styles.todoListContainer}>
              <div className={styles.listWrap}>
                {loading ? (
                  <>
                    <TodoList checked={true} />
                    <TodoList checked={false} />
                  </>
                ) : (
                  <LoadingComponent />
                )}
              </div>
            </section>
          </div>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default React.memo(Todo);

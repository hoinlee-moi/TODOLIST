import { useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import styles from "./Todo.module.css";
import { testList } from "../dummy";
import MyCheckBox from "../components/MyCheckBox";
import TodoCreate from "../components/TodoCreate";
import TodoItem from "../components/TodoItem";
const Todo = () => {
  const [listData, setListData] = useState(testList);
  const [checkedList,setCheckedList] = useState([])
  const [nonCheckedList,setNonCheckedList] = useState([])
  useEffect(() => {
    const check = listData.filter(item=>item.isCompleted)
    const nonCheck = listData.filter(item=>!item.isCompleted)
    setCheckedList(snap=>[...snap,...check])
    setNonCheckedList(snap=>[...snap,...nonCheck])
  }, []);

  const changeHandle = (e) =>{
    console.log(e.target.checked)
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
            {checkedList.map((item) => {
              return (
                <TodoItem item={item} />
              );
            })}
            {nonCheckedList.map((item) => {
              return (
                <TodoItem item={item} />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Todo;

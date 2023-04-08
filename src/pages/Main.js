import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";

import styles from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token") != null) {
      navigate("/Todo");
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainWrap}>
        <section className={styles.titleWrap}>
          <h2>To Do List에 오신 걸 환영합니다!</h2>
        </section>
        <section className={styles.signBtnWrap}>
          <MyButton clickHandle={()=>navigate("/signin")}>로그인하기</MyButton>
          <MyButton clickHandle={()=>navigate("/signup")}>회원가입하기</MyButton> 
        </section>
      </div>
    </div>
  );
};

export default Main;

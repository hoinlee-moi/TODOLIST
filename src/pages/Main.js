import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../checkToken";
import LoadingComponent from "../components/LoadingComponent";
import MyButton from "../components/MyButton";

import styles from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();
  const [signUpMove, setSignUpMove] = useState(0);
  const [moveStyle, setMoveStyle] = useState();

  useEffect(() => {
    if(checkToken()) navigate("/todo")
  }, []);

  useEffect(() => {
    if (signUpMove === 1) {
      setMoveStyle(styles.signInani);
    }
    if (signUpMove === 2) {
      setMoveStyle(styles.signUpani);
    }
  }, [signUpMove]);
  const signUpPageMove = () => {
    setSignUpMove(2);
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };
  const signInPageMove = () => {
    setSignUpMove(1);
    setTimeout(() => {
      navigate("/signIn");
    }, 500);
  };

  return (
    <div className={`${styles.mainContainer} ${signUpMove && moveStyle}`}>
      <div className={styles.mainWrap}>
        <section className={styles.titleWrap}>
          <h2>To Do List에 오신 걸 환영합니다!</h2>
        </section>
        <section className={styles.signBtnWrap}>
          <MyButton clickHandle={signInPageMove}>로그인하기</MyButton>
          <MyButton clickHandle={signUpPageMove}>회원가입하기</MyButton>
        </section>
      </div>
    </div>
  );
};
export default Main;

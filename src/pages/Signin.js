
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import styles from "./SignIn.module.css"

const SignIn = () => {
  const navigate = useNavigate()
  const [failMs,setFailMs] = useState("")
  const [signInOut, setSignInOut] = useState(false);

  const cancelBtnHandle = () => {
    setSignInOut(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  const signIn = () => {

  }
  return (
    <div className={`${styles.signInBackground} ${signInOut && styles.signInOut}`}>
      <div className={styles.signInContainer}>
        <section className={styles.titleWrap}>
          <h2>로그인</h2>
        </section>
        <section className={styles.inputWrap}>
        <input type="text" placeholder="이메일" />
        <input type="password" placeholder="패스워드 : 8자 이상 "/>
        </section>
        {failMs.length>0&&<p>{failMs}</p>}
        <section className={styles.signInBtnWrap}>
          <MyButton>로그인</MyButton>
          <MyButton clickHandle={cancelBtnHandle}>취소</MyButton>
        </section>
      </div>
    </div>
    )
};

export default SignIn;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MyButton from "../components/MyButton";
import useInput from "../hooks/useInput";
import styles from "./Signup.module.css";
import { checkToken } from "../checkToken";

// const reg = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
const reg = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+/i);

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useInput({
    email: "",
    password: "",
    rePassword: "",
  });
  const [failMs, setFailMs] = useState("");
  const [permit, setPermit] = useState(false);
  const [signUpOut, setSignUpOut] = useState(false);

  useEffect(()=>{
    if(checkToken()) navigate("/todo")
  },[])


  useEffect(() => {
    setFailMs("");
    if (
      reg.test(signUpData.email) &&
      signUpData.password.length >= 8 &&
      signUpData.password === signUpData.rePassword
    ) {
      setPermit(true);
    } else {
      setPermit(false);
    }
  }, [signUpData]);

  const emailCheck = useCallback(() => {
    if (!reg.test(signUpData.email)) {
      setFailMs("email형식이 올바르지 않습니다");
    }
  }, [signUpData.email]);
  const psCheck = useCallback(() => {
    if (signUpData.password.length < 8) {
      setFailMs("비밀번호 형식이 올바르지 않습니다");
    }
  }, [signUpData.password]);
  const rePsCheck = useCallback(() => {
    if (signUpData.password !== signUpData.rePassword) {
      setFailMs("비밀번호 확인이 올바르지 않습니다");
    }
  }, [signUpData.rePassword]);

  const signUpHandler = useCallback(async () => {
    await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signup",
      { email: signUpData.email, password: signUpData.password },
      {headers:{
        "Content-Type": "application/json"
      }}
    ).then(res=>{
      if(res.status===201){
        setSignUpOut(true)
        setTimeout(() => {
          navigate("/signin");
        }, 500);
      }
    }).catch(err=>{
      setFailMs(err.response.data.message)
    })
  }, [signUpData]);

  const cancelBtnHandle = useCallback(() => {
    setSignUpOut(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, [signUpOut]);

  return (
    <div
      className={`${styles.signUpBackground} ${signUpOut && styles.signUpOut}`}
    >
      <div className={styles.signUpContainer}>
        <section className={styles.titleWrap}>
          <h2>회원가입</h2>
        </section>
        <section className={styles.inputWrap}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={setSignUpData}
            onBlur={emailCheck}
            autoComplete="off"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호 : 8자 이상"
            onChange={setSignUpData}
            onBlur={psCheck}
            autoComplete="off"
            data-testid="password-input"
          />
          <input
            type="password"
            name="rePassword"
            placeholder="비밀번호 확인"
            onChange={setSignUpData}
            onBlur={rePsCheck}
            autoComplete="off"
          />
        </section>
        {failMs.length > 0 && <p>{failMs}</p>}
        <section className={styles.signUpBtnWrap}>
          <MyButton
            clickHandle={signUpHandler}
            testId="signup-button"
            disable={!permit && "disabled"}
            className={permit ? styles.signUpBtn : styles.signUpFailBtn}
          >
            회원가입
          </MyButton>
          <MyButton clickHandle={cancelBtnHandle} className={styles.cancelBtn}>
            취소
          </MyButton>
        </section>
      </div>
    </div>
  );
};

export default React.memo(SignUp);

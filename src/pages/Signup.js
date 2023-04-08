import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MyButton from "../components/MyButton";
import useInput from "../hooks/useInput";
import styles from "./Signup.module.css";

const reg = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useInput({
    email: "",
    password: "",
    rePassword: "",
  });
  const [failMs, setFailMs] = useState("");
  const [permit, setPermit] = useState(false);

  useEffect(() => {
    setFailMs("");
    if (
      reg.test(signUpData.email) &&
      signUpData.password.length >= 8 &&
      signUpData.password === signUpData.rePassword
    ) {
      setPermit(true)
    }else{
      setPermit(false)
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
    console.log(signUpData, "성공");
  }, [signUpData]);

  return (
    <div className={styles.signUpBackground}>
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
            className={permit?styles.signUpBtn:styles.signUpFailBtn}
          >
            회원가입
          </MyButton>
          <MyButton clickHandle={() => navigate("/")} className={styles.cancelBtn}>취소</MyButton>
        </section>
      </div>
    </div>
  );
};

export default React.memo(SignUp);

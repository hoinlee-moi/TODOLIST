import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { checkToken } from "../checkToken";
import MyButton from "../components/MyButton";
import useInput from "../hooks/useInput";
import styles from "./SignIn.module.css";

const reg = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+/i);

const SignIn = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useInput({
    email: "",
    password: "",
  });
  const [failMs, setFailMs] = useState("");
  const [permit, setPermit] = useState(false);
  const [signInOut, setSignInOut] = useState(false);

  useEffect(() => {
    if(checkToken()) navigate("/todo")
  }, []);
  useEffect(() => {
    setFailMs("");
    if (reg.test(signInData.email) && signInData.password.length >= 8) {
      setPermit(true);
    } else {
      setPermit(false);
    }
  }, [signInData]);

  const cancelBtnHandle = useCallback(() => {
    setSignInOut(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, []);
  const signInHandle = useCallback(async () => {
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        { email: signInData.email, password: signInData.password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo", { replace: true });
        }
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 404)
          setFailMs("이메일 또는 비밀번호를 확인해주세요");
        else setFailMs("죄송합니다. 서버 점검중입니다");
      });
  }, [signInData]);

  return (
    <div
      className={`${styles.signInBackground} ${signInOut && styles.signInOut}`}
    >
      <div className={styles.signInContainer}>
        <section className={styles.titleWrap}>
          <h2>로그인</h2>
        </section>
        <section className={styles.inputWrap}>
          <input
            type="text"
            name="email"
            placeholder="이메일"
            data-testid="email-input"
            onChange={setSignInData}
          />
          <input
            type="password"
            name="password"
            placeholder="패스워드 : 8자 이상 "
            data-testid="password-input"
            onChange={setSignInData}
          />
        </section>
        {failMs.length > 0 && <p>{failMs}</p>}
        <section className={styles.signInBtnWrap}>
          <MyButton
            testId="signin-button"
            clickHandle={signInHandle}
            disable={!permit && "disabled"}
            className={permit ? styles.signInBtn : styles.signInFailBtn}
          >
            로그인
          </MyButton>
          <MyButton clickHandle={cancelBtnHandle} className={styles.cancelBtn}>
            취소
          </MyButton>
        </section>
      </div>
    </div>
  );
};

export default React.memo(SignIn);

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";

const NoMatch = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      alert("올바른 경로가 아닙니다")
    }, 500);
  },[]);
  return <LoadingComponent />;
};

export default NoMatch;

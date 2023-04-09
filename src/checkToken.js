import { redirect } from "react-router-dom";

export const checkToken = () => {
  if (localStorage.getItem("access_token")) {
    redirect("/Todo");
  }
};

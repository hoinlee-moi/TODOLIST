
export const checkToken = () => {
  if (localStorage.getItem("access_token")!==null) {
    return true
  }
  return false
};

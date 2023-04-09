import { useState, useCallback } from "react";

export default (initalValue) => {
  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    (e) => {
      if (typeof data === "string") {
        setData(e.target.value);
        return;
      }
      const { value, name } = e.target;
      setData((data) => ({ ...data, [name]: value }));
    },
    []
  );
  return [data, handler];
};
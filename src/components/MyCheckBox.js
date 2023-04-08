import { useState } from "react";

const MyCheckBox = ({onChange, checked}) => {
  const [checkState, setCheckState] = useState(checked);
  return (
    <input
      type="checkbox"
      onChange={(e) => setCheckState(e.target.checked)}
      defaultChecked={checkState}
    />
  );
};

export default MyCheckBox;

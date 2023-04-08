import { useState } from "react";

const MyCheckBox = ({onChange, checked}) => {
  const [checkState, setCheckState] = useState(checked);
  return (
    <input
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
      defaultChecked={checkState}
    />
  );
};

export default MyCheckBox;

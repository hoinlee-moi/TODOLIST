import React from "react";
const MyButton = ({ clickHandle, children,className=null, disable=null, testId = null }) => {
  return (
    <button onClick={clickHandle} data-testid={testId} disabled={disable} className={className}>
      {children}
    </button>
  );
};

export default React.memo(MyButton);

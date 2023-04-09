import React from "react";
const MyButton = ({ clickHandle, children,className, disable, testId,id }) => {
  return (
    <button onClick={clickHandle} data-testid={testId} disabled={disable} className={className} id={id}>
      {children}
    </button>
  );
};

export default React.memo(MyButton);

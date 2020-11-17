import React from "react";

const Option = (props) => {
  let value, children;
  ({ value, children, ...props } = props);

  return <option {...{ value, ...props }}>{children}</option>;
};

export default Option;

import React from "react";

const FormList = (props) => {
  let state, setState, values, Component;
  ({ state, setState, values = {}, Component } = props);

  return Object.entries(values).map(([id, object]) => (
    <Component {...{ key: id, state, setState, values: object }} />
  ));
};

export default FormList;

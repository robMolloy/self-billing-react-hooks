import React from "react";
import valid9 from "valid9";
const { toggleClassIfInvalid } = valid9;

const TextInput = (props) => {
  return (
    <div className="inputWrapper">
      <input
        type="text"
        value={props.value}
        name={props.name}
        placeholder=" "
        onChange={(e) => {
          props.setter(e.target.value);
          toggleClassIfInvalid(e.target);
        }}
        checks={props.checks}
      />
      <label>
        <span>{props.label}</span>
      </label>
    </div>
  );
};

export default TextInput;

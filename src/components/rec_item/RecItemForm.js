import React, { useContext } from "react";
import { RecItemContext } from "../../contexts/RecItemContext";
import { RecordContext } from "../../contexts/RecordContext";
import { useForm } from "react-hook-form";
import CreateInputObject from "../../user_modules/CreateInputObject";
import valid9 from "valid9";
const { getAllInvalid, toggleClassIfInvalid } = valid9;

const RecItemForm = () => {
  const { dispatch } = useContext(RecItemContext);
  const { records } = useContext(RecordContext);

  const { register, handleSubmit } = useForm();
  // const { register, handleSubmit, errors } = useForm();

  const onSubmit = (inputs, data) => {
    let invalidInputs = getAllInvalid(inputs);
    let valid = invalidInputs.length === 0;

    if (valid) {
      let type = "ADD_RECITEM";
      let recItem = CreateInputObject(inputs);
      dispatch({ type, recItem });
      Array.from(inputs).forEach((input) => (input.value = ""));
    }

    (valid ? inputs : invalidInputs)[0].focus();
  };

  return (
    <form
      className="panel"
      onSubmit={(e) => {
        e.preventDefault();
        const inputs = e.target.elements;
        handleSubmit(onSubmit.bind(this, inputs))();
      }}
    >
      <div className="inputWrapper">
        <select
          onChange={(e) => toggleClassIfInvalid(e.target)}
          defaultValue={""}
          required
          autoFocus
        >
          <option disabled hidden value={""}></option>
          {Object.values(records).map((record) => (
            <option key={record.id} value={record.id}>
              {record.description}
            </option>
          ))}
        </select>

        <label>
          <span>Record Id</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rci_work"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>Work</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rci_unit"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_1"
        />
        <label>
          <span>Unit</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rci_cost_per_unit"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_1"
        />
        <label>
          <span>Cost Per Unit</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rci_qty"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_1"
        />
        <label>
          <span>Quantity</span>
        </label>
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default RecItemForm;

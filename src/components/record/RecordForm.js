import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { RecordContext } from "../../contexts/RecordContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import CreateInputObject from "../../user_modules/CreateInputObject";
import valid9 from "valid9";
const { getAllInvalid, toggleClassIfInvalid } = valid9;

const RecordForm = () => {
  const { dispatch } = useContext(RecordContext);
  const { projects } = useContext(ProjectContext);

  const { register, handleSubmit } = useForm();
  // const { register, handleSubmit, errors } = useForm();

  const onSubmit = (inputs, data) => {
    let invalidInputs = getAllInvalid(inputs);
    let valid = invalidInputs.length === 0;

    if (valid) {
      let type = "ADD_RECORD";
      let record = CreateInputObject(inputs);
      dispatch({ type, record });

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
          name="rec_prj_id"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          defaultValue={""}
          checks="minChars_1"
          autoFocus
          required
        >
          <option disabled hidden value={""}></option>
          {Object.values(projects).map((project) => (
            <option key={project.id} value={project.id}>
              {project.prj_acronym}
            </option>
          ))}
        </select>
        <label>
          <span>Project Id</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rec_description"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>Description</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rec_timestamp_planned_start"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_1"
        />
        <label>
          <span>Time Start</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rec_duration_qty"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_1"
        />
        <label>
          <span>Qty</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="rec_duration_unit"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          checks="minChars_1"
        />
        <label>
          <span>Unit</span>
        </label>
      </div>
      <div>
        <button type="submit"> Add </button>
      </div>
    </form>
  );
};

export default RecordForm;

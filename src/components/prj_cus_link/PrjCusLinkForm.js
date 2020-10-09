import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import CreateInputObject from "../../user_modules/CreateInputObject";
import valid9 from "valid9";
import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";
import { CustomerContext } from "../../contexts/CustomerContext";
import { ProjectContext } from "../../contexts/ProjectContext";
const { getAllInvalid, toggleClassIfInvalid } = valid9;

const PrjCusLinkForm = () => {
  const { dispatch: PrjCusLinkDispatch } = useContext(PrjCusLinkContext);
  const { customers } = useContext(CustomerContext);
  const { projects } = useContext(ProjectContext);

  const { handleSubmit } = useForm();

  const onSubmit = (inputs, data) => {
    const invalidInputs = getAllInvalid(inputs);
    const valid = invalidInputs.length === 0;
    if (valid) {
      const type = "ADD_PRJCUSLINK";
      const prjCusLink = CreateInputObject(inputs);
      PrjCusLinkDispatch({ type, prjCusLink });

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
          name="pcl_cus_id"
          onChange={(e) => toggleClassIfInvalid(e.target)}
          defaultValue={""}
          required
          autoFocus
        >
          <option disabled hidden value={""}></option>
          {Object.values(customers).map((customer) => {
            const { id, cus_first_name, cus_last_name } = customer;
            return (
              <option key={id} value={id}>
                {cus_first_name} {cus_last_name}
              </option>
            );
          })}
        </select>
        <label>
          <span>Customer Id</span>
        </label>
      </div>
      <div className="inputWrapper">
        <select
          name="pcl_prj_id"
          onChange={(e) => toggleClassIfInvalid(e.target)}
          defaultValue={""}
          required
        >
          <option disabled hidden value={""}></option>
          {Object.values(projects).map((project) => {
            const { id, prj_acronym } = project;
            return (
              <option key={id} value={id}>
                {prj_acronym}
              </option>
            );
          })}
        </select>
        <label>
          <span>Project Id</span>
        </label>
      </div>

      <div className="jr">
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PrjCusLinkForm;

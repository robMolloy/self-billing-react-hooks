import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import CreateInputObject from "../../user_modules/CreateInputObject";
import PrjCusLinkCustomerSubForm from "../prj_cus_link/PrjCusLinkCustomerSubForm";
import valid9 from "valid9";
import { ProjectContext } from "../../contexts/ProjectContext";
import { PrjCusLinkContext } from "../../contexts/PrjCusLinkContext";
import { timeUnits } from "../../contexts/options";
import ArrayOfObjectsFromObjectOfArrays from "../../user_modules/ArrayOfObjectsFromObjectOfArrays";
const { getAllInvalid, toggleClassIfInvalid } = valid9;

const ProjectForm = () => {
  const { dispatch } = useContext(ProjectContext);
  const { dispatch: dispatchPrjCusLink } = useContext(PrjCusLinkContext);

  const { handleSubmit, register } = useForm();

  const blankPrjCusLink = { pcl_prj_id: "", pcl_cus_id: "" };
  const [prj_cus_link_sub_forms, setPrjCusLinkSubForms] = useState({
    [uuid()]: blankPrjCusLink,
  });

  const addPrjCusLinkSubForm = () => {
    setPrjCusLinkSubForms({
      ...prj_cus_link_sub_forms,
      [uuid()]: blankPrjCusLink,
    });
  };

  const removePrjCusLinkSubForm = (temp_id) => {
    let temp_prj_cus_link_sub_forms = { ...prj_cus_link_sub_forms };
    delete temp_prj_cus_link_sub_forms[temp_id];
    setPrjCusLinkSubForms(temp_prj_cus_link_sub_forms);
  };

  const addProject = (project) => {
    dispatch({ type: "ADD_PROJECT", project });
  };

  const addPrjCusLinks = (prjCusLinksArray, projectId) => {
    prjCusLinksArray.forEach((prjCusLink) => {
      prjCusLink.pcl_prj_id = projectId;
      prjCusLink.id = uuid();
      dispatchPrjCusLink({ type: "ADD_PRJCUSLINK", prjCusLink });
    });
  };

  const addProjectAndPrjCusLinksUsingInputs = (inputs) => {
    const projectId = uuid();

    const projectInputObject = CreateInputObject(inputs);
    delete projectInputObject["pcl_cus_id"];

    const { pcl_cus_id } = CreateInputObject(inputs);
    const prjCusLinkArrays = { pcl_cus_id };
    const prjCusLinksArray = ArrayOfObjectsFromObjectOfArrays(prjCusLinkArrays);

    addProject({ ...projectInputObject, id: projectId });
    addPrjCusLinks(prjCusLinksArray, projectId);
  };

  const onSubmit = (inputs, data) => {
    const invalidInputs = getAllInvalid(inputs);
    const valid = invalidInputs.length === 0;

    if (valid) {
      addProjectAndPrjCusLinksUsingInputs(inputs);

      // const inputObject = CreateInputObject(inputs);

      // let project = CreateInputObject(inputs);
      // delete project["pcl_cus_id"];
      // addProject(project);

      Array.from(inputs).forEach((input) => (input.value = ""));
      setPrjCusLinkSubForms({ blankPrjCusLink });
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
      <div>Pick a unique reference for this project</div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_acronym"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
          autoFocus
        />
        <label>
          <span>prj_acronym</span>
        </label>
      </div>
      <div>What is the address of this project?</div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_address_1"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_address_1</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_address_2"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_address_2</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_city"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_city</span>
        </label>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_postcode"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_postcode</span>
        </label>
      </div>
      <div>What work is usually done on this project?</div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_default_work"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_default_work</span>
        </label>
      </div>
      <div>What is the default unit of work?</div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_default_unit"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_default_unit</span>
        </label>
      </div>
      <div>How many units of work will usually take place?</div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_default_qty"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_default_qty</span>
        </label>
      </div>
      <div>What is the rate charged per unit of work?</div>
      <div className="inputWrapper">
        <input
          type="text"
          name="prj_rate_per_default_unit"
          placeholder=" "
          onChange={(e) => toggleClassIfInvalid(e.target)}
          ref={register({ required: true, minLength: 1 })}
          checks="minChars_1"
        />
        <label>
          <span>prj_rate_per_default_unit</span>
        </label>
      </div>
      <div>How often will the work take place?</div>
      <div className="flexGap">
        <div className="width2Lh jc">Every</div>
        <div className="inputWrapper width2Lh">
          <input
            type="text"
            name="prj_default_repeat_every_qty"
            placeholder=" "
            onChange={(e) => toggleClassIfInvalid(e.target)}
            ref={register({ required: true, minLength: 1 })}
            checks="minChars_1"
          />
          <label>
            <span>prj_default_repeat_every_qty</span>
          </label>
        </div>
        <div className="inputWrapper flex1">
          <select defaultValue={""} required>
            <option value="" disabled hidden></option>
            {timeUnits.map((timeUnit) => (
              <option key={timeUnit} value={timeUnit}>
                {timeUnit}
              </option>
            ))}
          </select>

          <label>
            <span>prj_default_repeat_every_unit</span>
          </label>
        </div>
      </div>
      {Object.entries(prj_cus_link_sub_forms).map((entry) => {
        const temp_id = entry[0];
        const prjCusLink = entry[1];

        return (
          <div className="flex1 flexGap ac" key={temp_id}>
            <PrjCusLinkCustomerSubForm prjCusLink={prjCusLink} />
            <sub
              className="circleButton"
              onClick={(e) => removePrjCusLinkSubForm(temp_id)}
            >
              &#120;
            </sub>
          </div>
        );
      })}
      <div>
        <input type="button" value="+" onClick={() => addPrjCusLinkSubForm()} />
        <div className="flex1"></div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default ProjectForm;

import React from "react";

import GridSelect from "../customComponents/GridSelect";
import GridInput from "../customComponents/GridInput";
import GridItem from "../customComponents/GridItem";

import { projectBlankRow } from "../../object_info/blankRows";
import useForm from "../../custom_hooks/useRHForm";
import Schema from "../../schemas/ProjectSchema";
import { timeUnits } from "../../contexts/options";
import Option from "../customComponents/Option";
import { ucFirst } from "../../user_modules/StringManipulation";

const ProjectFormBody = (props) => {
  let values, state, setState;
  ({ values = projectBlankRow, state, setState } = props);

  const objectType = "projects";

  const id = values.id;

  const form = useForm({ defaultValues: values, Schema });

  React.useEffect(() => {
    state[objectType] = state?.[objectType] ?? {};

    let controls = state?.[objectType]?.controls ?? {};
    let stateValues = state?.[objectType]?.values ?? {};

    state[objectType].values = { ...stateValues, [id]: values };
    state[objectType].controls = { ...controls, [id]: form };

    setState(state);

    //eslint-disable-next-line
  }, []);

  const setStateValue = (name, value) => {
    state[objectType].values[id][name] = value;
    setState(state);
  };

  const setFieldValue = (name, value, params = { shouldValidate: true }) => {
    state[objectType].controls[id].setValue(name, value, params);
    setStateValue(name, value);
  };

  const timeUnitOptions = timeUnits.map((value) => (
    <Option {...{ key: value, value }}>{ucFirst(value)}</Option>
  ));
  return (
    <>
      <GridItem>Pick a unique reference for this project</GridItem>
      <GridInput
        autoFocus
        label="Acronym"
        {...form.fieldProps("prj_acronym")}
        onChange={(e) => setFieldValue("prj_acronym", e.target.value)}
      />

      <GridItem>What is the address of this project?</GridItem>
      <GridInput
        label="Address_1"
        {...form.fieldProps("prj_address_1")}
        onChange={(e) => setFieldValue("prj_address_1", e.target.value)}
      />
      <GridInput
        label="Address_2"
        {...form.fieldProps("prj_address_2")}
        onChange={(e) => setFieldValue("prj_address_2", e.target.value)}
      />
      <GridInput
        grid={{ xs: 8 }}
        label="City"
        {...form.fieldProps("prj_city")}
        onChange={(e) => setFieldValue("prj_city", e.target.value)}
      />
      <GridInput
        grid={{ xs: 4 }}
        label="Postcode"
        {...form.fieldProps("prj_postcode")}
        onChange={(e) => setFieldValue("prj_postcode", e.target.value)}
      />

      <GridItem>What work is usually done on this project?</GridItem>
      <GridInput
        label="Default Work"
        {...form.fieldProps("prj_default_work")}
        onChange={(e) => setFieldValue("prj_default_work", e.target.value)}
      />

      <GridItem>What is the default unit of work?</GridItem>
      <GridInput
        label="Default Unit"
        {...form.fieldProps("prj_default_unit")}
        onChange={(e) => setFieldValue("prj_default_unit", e.target.value)}
      />

      <GridItem>How many units of work will usually take place?</GridItem>
      <GridInput
        label="Default Quantity"
        {...form.fieldProps("prj_default_qty")}
        onChange={(e) => setFieldValue("prj_default_qty", e.target.value)}
      />

      <GridItem>What is the rate charged per unit of work?</GridItem>
      <GridInput
        label="Default Rate"
        {...form.fieldProps("prj_rate_per_default_unit")}
        onChange={(e) =>
          setFieldValue("prj_rate_per_default_unit", e.target.value)
        }
      />

      <GridItem>How often will the work take place?</GridItem>
      <GridItem xs={3}>Every</GridItem>
      <GridInput
        grid={{ xs: 3 }}
        label="prj_default_repeat_every_qty"
        {...form.fieldProps("prj_default_repeat_every_qty")}
        onChange={(e) =>
          setFieldValue("prj_default_repeat_every_qty", e.target.value)
        }
      />
      <GridSelect
        grid={{ xs: 6 }}
        label="prj_default_repeat_every_unit"
        {...form.fieldProps("prj_default_repeat_every_unit")}
        onChange={(e) =>
          setStateValue("prj_default_repeat_every_unit", e.target.value)
        }
      >
        {timeUnitOptions}
      </GridSelect>

      <GridItem>What is the usual duration of this work?</GridItem>
      <GridItem>(May be the same as the default unit and quantity)</GridItem>
      <GridInput
        grid={{ xs: 6 }}
        label="prj_default_duration_qty"
        {...form.fieldProps("prj_default_duration_qty")}
        onChange={(e) =>
          setFieldValue("prj_default_duration_qty", e.target.value)
        }
      />
      <GridSelect
        grid={{ xs: 6 }}
        label="prj_default_duration_unit"
        {...form.fieldProps("prj_default_duration_unit")}
        onChange={(e) =>
          setFieldValue("prj_default_duration_unit", e.target.value)
        }
      >
        {timeUnitOptions}
      </GridSelect>

      <GridItem>What is the rate charged per unit of time worked?</GridItem>
      <GridItem>(Leave as 0 if not charged per unit of time)</GridItem>
      <GridItem xs={2}>£</GridItem>
      <GridInput
        grid={{ xs: 7 }}
        label="prj_default_cost_per_duration_unit"
        {...form.fieldProps("prj_default_cost_per_duration_unit")}
        onChange={(e) =>
          setFieldValue("prj_default_cost_per_duration_unit", e.target.value)
        }
      />
      <GridItem xs={3}>Per Unit</GridItem>
    </>
  );
};

// {/* <div>cccccccccccccccc</div>
//                     <div class="fs70 jr"></div>

// <div class="singleColumn gridGap0">
//                     <div>What is the rate charged per unit of time worked?</div>
//                     <div class="fs70 jr">(Leave as 0 if not paid per unit of time)</div>
//                 </div>
//                 <div class="flexGap">
//                     <span class="width2Lh jc borderBottom borderTop padSmall">£</span>
//                     ${wrapInputElement(`<input type="number" value="${issetReturn(()=>project.prj_default_cost_per_duration_unit,'0.00')}"
//                         name="prj_default_cost_per_duration_unit" placeholder="${labelRow.prj_default_cost_per_duration_unit}"
//                         checks="isInt_positive"
//                     >`)}
//                     <div class="borderTop borderBottom padSmall jc nowrap width2Lh">Per Unit</div>
//                 </div> */}

export default ProjectFormBody;

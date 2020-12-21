import * as yup from "yup";
import "yup-phone";

const ProjectSchema = yup.object().shape({
  prj_acronym: yup.string().min(2, "min 2 characters"),
  prj_address_1: yup.string().required("required field"),
  prj_city: yup.string().required("required field"),
  prj_postcode: yup.string().required("required field"),
  prj_default_work: yup.string().required("required field"),
  prj_default_unit: yup.string().required("required field"),
  prj_default_qty: yup.number().required(),
  prj_rate_per_default_unit: yup.number().required(),
  prj_default_repeat_every_qty: yup.number().integer().required(),
  prj_default_repeat_every_unit: yup.string().required(),
  prj_default_duration_qty: yup.number().integer().required(),
  prj_default_duration_unit: yup.string().required(),
  prj_default_cost_per_duration_unit: yup.number().required(),
});

export default ProjectSchema;

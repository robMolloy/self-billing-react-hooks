import * as yup from "yup";

const CustomerSchema = yup.object().shape({
  cus_first_name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  cus_last_name: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

export default CustomerSchema;

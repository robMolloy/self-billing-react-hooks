import * as yup from "yup";
import "yup-phone";

const ContactSchema = yup.object().shape({
  con_type: yup.string().min(2, "Type is a required field"),
  con_method: yup.string().min(2, "Method is a required field"),
  con_address: yup.string().required("Address is a required field"),
  con_address_phone: yup
    .string()
    .phone("Must be a valid phone number")
    .required("Phone number is a required field"),
  con_address_email: yup
    .string()
    .required("Email address is a required field")
    .email("Must be an email address"),
});

export default ContactSchema;

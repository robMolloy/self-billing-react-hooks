const schema = yup.object().shape({
  con_name: yup.string().required("Contact name is a required field"),
  con_address: yup.string().required("Contact address is a required field"),
});

const ContactSubForm = ({ contacts, ...props }) => {
  // const { register, watch, handleSubmit, errors } = useForm({
  const { register, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const con_type = watch("con_type");

  contacts = contacts === undefined ? { [uuid()]: contactBlankRow } : contacts;

  return (
    <GridContainer>
      <GridSelect
        grid={{ xs: 6, sm: 2 }}
        inputRef={register}
        defaultValue=""
        name="con_type"
        label="Type"
        required
      >
        <option disabled value={""}></option>
        {contactTypes.map((contactType) => (
          <option key={contactType} value={contactType}>
            {ucFirst(contactType)}
          </option>
        ))}
      </GridSelect>

      <GridSelect
        grid={{ xs: 6, sm: 2 }}
        name="con_method"
        defaultValue=""
        label="Method"
        required
      >
        <option disabled value={""}></option>
        {(contactMethods[con_type] ? contactMethods[con_type] : []).map(
          (contactMethod) => (
            <option key={contactMethod} value={contactMethod}>
              {ucFirst(contactMethod)}
            </option>
          )
        )}
      </GridSelect>

      <GridInput
        grid={{ xs: 9, sm: 5 }}
        ref={register}
        defaultValue=""
        name="con_address"
        label="Address"
        required
      />
      <GridButton grid={{ xs: 3 }} variant="outlined">
        +
      </GridButton>
    </GridContainer>
  );
};

export default ContactSubForm;

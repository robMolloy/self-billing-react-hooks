import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const useFormProps = (props) => {
  let { mode = "onChange", defaultValues, resolver, Schema } = props;

  if (resolver === undefined) resolver = yupResolver(Schema);

  return { mode, defaultValues, resolver };
};

const useRHForm = (props) => {
  let defaultValues, Schema, resolver;
  ({ defaultValues, Schema, resolver } = props);

  const form = useForm(useFormProps({ defaultValues, Schema, resolver }));

  form.isValid = async () => {
    await form.trigger();
    return !form.isErrors();
  };

  form.isErrors = () => Object.keys(form.errors).length !== 0;

  form.fieldProps = (name) => {
    return {
      inputRef: form.register,
      error: !!form.errors[name],
      helperText: form.errors?.[name]?.message,
      name,
    };
  };

  return form;
};

export default useRHForm;

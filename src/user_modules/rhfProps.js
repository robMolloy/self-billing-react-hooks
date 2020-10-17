const rhfProps = ({ register, name, errors }) => {
  return {
    inputRef: register,
    error: !!errors[name],
    helperText: errors?.[name]?.message,
    name,
  };
};

export default rhfProps;

import { yupResolver } from "@hookform/resolvers/yup";

const formProps = (props) => {
  let { mode = "onChange", defaultValues, resolver, Schema } = props;

  if (resolver === undefined) resolver = yupResolver(Schema);
  return { mode, defaultValues, resolver };
};

export default formProps;

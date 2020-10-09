const CreateInputObject = (inputs) => {
  let inputObject = {};
  for (let input of inputs) {
    if (input.name) {
      let { name, value } = input;
      let currentValue = inputObject[name];
      if (currentValue === undefined) inputObject[input.name] = value;
      else if (typeof currentValue === "object")
        inputObject[input.name] = [...currentValue, value];
      else inputObject[input.name] = [currentValue, value];
    }
  }
  return inputObject;
};

export default CreateInputObject;

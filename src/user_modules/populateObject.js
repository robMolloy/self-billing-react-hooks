const populateObject = (obj1 = {}, obj2 = {}) => {
  Object.entries(obj1).forEach(([key, value]) => {
    obj1[key] = obj2.hasOwnProperty(key) ? obj2[key] : value;
  });

  return obj1;
};

export default populateObject;

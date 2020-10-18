const isObject = (object) => {
  return Object.prototype.toString.call(object) === "[object Object]";
};

export default isObject;

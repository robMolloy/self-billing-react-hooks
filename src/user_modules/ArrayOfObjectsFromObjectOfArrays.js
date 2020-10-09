const ArrayOfObjectsFromObjectOfArrays = (objectOfArrays) => {
  let keys = Object.keys(objectOfArrays);

  let firstKey = keys[0];
  if (firstKey === undefined) return [];

  let firstItem = objectOfArrays[firstKey];
  if (firstItem === undefined) return [];
  if (typeof firstItem === "string") return [objectOfArrays];

  const arrayLength = firstItem.length;
  const equalLength = Object.values(objectOfArrays).every(
    (item) => item.length === arrayLength
  );

  if (!equalLength) {
    console.error("All arrays must be of the same length");
    return undefined;
  }

  let rtn = [];
  for (let i = 0; i < arrayLength; i++) {
    let newObj = {};
    keys.forEach((key) => (newObj[key] = objectOfArrays[key][i]));
    rtn.push(newObj);
  }
  return rtn;
};

export default ArrayOfObjectsFromObjectOfArrays;

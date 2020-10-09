const extractObjectFromHtmlCollection = (htmlCollection, keys) => {
  const newObject = {};
  keys.forEach((key) => {
    const item = htmlCollection.namedItem(key);
    newObject[key] = item === null ? "" : item.value;
  });
  return newObject;
};

export default extractObjectFromHtmlCollection;

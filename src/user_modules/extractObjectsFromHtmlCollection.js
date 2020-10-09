const extractObjectsFromHtmlCollection = (htmlCollection, keys) => {
  const collections = {};
  const arrayOfObjects = [];
  const availableKeys = [];

  // keys.forEach((key) => newObject[key] = []);
  keys.forEach((key) => {
    let collection = htmlCollection.namedItem(key);
    if (collection !== null) {
      availableKeys.push(key);

      collections[key] =
        collection.nodeName === undefined ? collection : [collection];
    }
  });

  if (availableKeys.length === 0) return [];

  const numberOfObjects = collections[availableKeys[0]].length;
  for (let i = 0; i < numberOfObjects; i++) {
    const newObject = {};
    availableKeys.forEach((key) => {
      newObject[key] = collections[key][i].value;
    });
    arrayOfObjects.push(newObject);
  }
  return arrayOfObjects;
};

export default extractObjectsFromHtmlCollection;
